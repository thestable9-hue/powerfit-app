-- ----------------------------------------------------
-- POWERFIT - SUPABASE SCHEMA E MIGRATION SCRIPT
-- ----------------------------------------------------
-- Copie e cole este script na aba "SQL Editor" do seu projeto no Supabase
-- e clique em "Run" para gerar todas as tabelas e politicas.

-- 1. TABELA DE USUÁRIOS (Personal Trainers e Alunos logados)
-- O Supabase gerencia a auth em auth.users, esta tabela é o perfil vinculado.
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  type TEXT NOT NULL CHECK (type IN ('personal', 'aluno')),
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'premium')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar RLS (Row Level Security) para Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de Profiles: Um usuário pode ler e atualizar seu próprio perfil.
CREATE POLICY "Usuários podem ver o próprio perfil" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Usuários podem atualizar próprio perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ----------------------------------------------------
-- 2. TABELA DE ALUNOS (Vinculados a um Personal Trainer)
-- Quando um Aluno cria conta, ele também vai existir em Profiles,
-- porém esta tabela de Alunos é gerenciada pelo Personal.
CREATE TABLE public.students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  personal_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- Se o aluno tiver conta logável, conecta aqui
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  birth_date DATE,
  gender TEXT,
  height NUMERIC,
  weight NUMERIC,
  objective TEXT,
  days_per_week INTEGER,
  shift TEXT,
  tier TEXT DEFAULT 'free',
  medical_notes TEXT,
  workout_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
-- Personal vê e edita apenas seus alunos
CREATE POLICY "Personal vê seus alunos" ON public.students FOR SELECT USING (auth.uid() = personal_id);
CREATE POLICY "Personal insere alunos" ON public.students FOR INSERT WITH CHECK (auth.uid() = personal_id);
CREATE POLICY "Personal atualiza alunos" ON public.students FOR UPDATE USING (auth.uid() = personal_id);
CREATE POLICY "Personal deleta alunos" ON public.students FOR DELETE USING (auth.uid() = personal_id);
-- Aluno que tem log in, pode ver seu próprio cadastro de aluno
CREATE POLICY "Aluno vê seu próprio cadastro" ON public.students FOR SELECT USING (auth.uid() = user_id);

-- ----------------------------------------------------
-- 3. TABELA DE TREINOS
CREATE TABLE public.workouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  personal_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  exercises JSONB DEFAULT '[]'::jsonb, -- Armazena a lista de exercícios
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Personal gerencia treinos" ON public.workouts FOR ALL USING (auth.uid() = personal_id);
-- Permitir que aluno veja o treino se o ID do treino estiver no array workout_ids dele
-- (Uma política simplificada seria permitir Select se ele for aluno e o treino estiver associado)
CREATE POLICY "Alunos podem ver treinos a eles atribuídos" ON public.workouts FOR SELECT
USING (
  id IN (
    SELECT unnest(workout_ids) FROM public.students WHERE user_id = auth.uid() OR personal_id = auth.uid()
  )
);

-- ----------------------------------------------------
-- 4. TABELA DE EVOLUÇÃO
CREATE TABLE public.evolution (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  weight NUMERIC,
  body_fat NUMERIC,
  chest NUMERIC,
  waist NUMERIC,
  hip NUMERIC,
  arm NUMERIC,
  thigh NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.evolution ENABLE ROW LEVEL SECURITY;
-- Personal vê e edita a evolução dos seus alunos
CREATE POLICY "Personal gerencia evolução (Select)" ON public.evolution FOR SELECT USING (
  student_id IN (SELECT id FROM public.students WHERE personal_id = auth.uid())
);
CREATE POLICY "Personal gerencia evolução (All)" ON public.evolution FOR ALL USING (
  student_id IN (SELECT id FROM public.students WHERE personal_id = auth.uid())
);
-- Aluno pode ver sua própria evolução
CREATE POLICY "Aluno vê sua evolução" ON public.evolution FOR SELECT USING (
  student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid())
);

-- ----------------------------------------------------
-- 5. TABELA DE AGENDA (SCHEDULE)
CREATE TABLE public.schedule (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  personal_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES public.students(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  title TEXT NOT NULL,
  type TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.schedule ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Personal gerencia sua agenda" ON public.schedule FOR ALL USING (auth.uid() = personal_id);

-- ----------------------------------------------------
-- FUNÇÃO PARA ATUALIZAR 'updated_at' AUTOMATICAMENTE
-- ----------------------------------------------------
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_students_modtime BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_workouts_modtime BEFORE UPDATE ON public.workouts FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- ====================================================
-- IMPORTANTE: CRIAÇÃO AUTOMÁTICA DE PROFILE NO LOGIN
-- ====================================================
-- Crie essa trigger para garantir que, quando você criar um usuário via Autenticação do Supabase,
-- o Perfil seja preenchido usando os raw_user_meta_data passados no Cadastro.
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, phone, type, tier)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'name',
    new.email,
    new.raw_user_meta_data->>'phone',
    COALESCE(new.raw_user_meta_data->>'type', 'personal'),
    CASE 
      WHEN new.email = 'thestable9@gmail.com' THEN 'premium' 
      ELSE 'free' 
    END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
