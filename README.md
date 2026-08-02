# PowerFit

Aplicação web para apoiar a rotina de personal trainers e alunos, reunindo cadastro, treinos, acompanhamento de evolução e agenda em uma única interface.

O PowerFit foi desenvolvido como um piloto funcional remunerado para um cliente real. Este repositório apresenta a implementação frontend pública do projeto e uma demonstração navegável.

## Demonstração pública

https://powerfit-app.vercel.app

## Status do projeto

- Piloto funcional remunerado.
- Desenvolvido para um cliente real.
- Demonstração pública disponível.
- Não representa uma implantação operacional.
- O código público atual representa principalmente a camada frontend e utiliza dados de demonstração no navegador.

## Problema abordado

A rotina de um personal trainer envolve informações distribuídas entre cadastros, fichas de treino, registros de evolução, agenda e mensagens. O PowerFit explora uma interface centralizada para organizar essas atividades e oferecer uma experiência separada para personal e aluno.

## Funcionalidades comprovadas na versão pública

### Área do personal trainer

- Cadastro, edição, busca e organização de alunos.
- Criação e edição de treinos com exercícios, séries, repetições, carga e descanso.
- Associação de treinos aos alunos cadastrados.
- Geração de fichas de treino em PDF.
- Compartilhamento de treino por meio de link para WhatsApp.
- Registro de medidas e acompanhamento de evolução física.
- Visualização da evolução em gráficos.
- Agenda mensal com eventos vinculados a alunos.
- Dashboard com indicadores e atalhos para as áreas principais.

### Área do aluno

- Visualização dos treinos atribuídos pelo personal.
- Consulta de métricas físicas e histórico de evolução.
- Cálculos demonstrativos de IMC, taxa metabólica basal e estimativa calórica.
- Módulo demonstrativo de insights de treino calculados localmente.

## Implementação pública

A versão disponível neste repositório foi construída com:

- React 19.
- JavaScript e JSX.
- Vite.
- React Router.
- Recharts para visualizações.
- jsPDF e jsPDF-AutoTable para geração de documentos.
- Lucide React para ícones.
- CSS próprio e interface responsiva.
- Local Storage para persistência dos dados de demonstração.

### Supabase e PostgreSQL

A modelagem de dados e o trabalho de integração com Supabase/PostgreSQL fizeram parte do desenvolvimento do projeto. O repositório inclui um esquema SQL representativo com tabelas e políticas de Row Level Security.

Essa camada não está integralmente conectada à demonstração pública atual. A versão publicada utiliza armazenamento local no navegador para permitir avaliação independente sem acesso a banco, credenciais ou dados do cliente.

## Arquitetura da versão pública

```text
src/
├── components/   Componentes compartilhados da interface
├── lib/          Persistência local, cálculos e geração de PDF
├── pages/        Áreas do personal e do aluno
├── App.jsx       Rotas, contextos e controle de acesso demonstrativo
└── main.jsx      Inicialização da aplicação

supabase_schema.sql  Modelo relacional e políticas RLS do projeto
```

## Executando localmente

### Requisitos

- Node.js compatível com o Vite 8.
- npm.

### Instalação

```bash
git clone https://github.com/Davi-Monteles/powerfit-app.git
cd powerfit-app
npm install
npm run dev
```

O Vite informará no terminal o endereço local da aplicação.

### Build otimizado

```bash
npm run build
npm run preview
```

## Limitações da demonstração

- Os dados da versão pública ficam armazenados no navegador.
- A autenticação da demonstração não representa uma autenticação operacional completa.
- A integração completa com Supabase/PostgreSQL não está habilitada no frontend público.
- O módulo de insights funciona localmente e não deve ser interpretado como aconselhamento médico ou profissional.
- Nenhum dado real do cliente é necessário para executar a demonstração.

## Autor

Davi Monteles — Desenvolvedor Full-Stack Júnior

- Portfólio: https://davimonteles.vercel.app
- GitHub: https://github.com/Davi-Monteles
- LinkedIn: https://www.linkedin.com/in/davi-monteles-9888333a8/
