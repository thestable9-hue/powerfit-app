// PowerFit — Muscle Database for Atlas & AI Engine

export const MUSCLE_GROUPS = {
  // ===== VISTA FRONTAL =====
  peitoral: {
    id: 'peitoral',
    name: 'Peitoral Maior',
    region: 'Tronco Anterior',
    view: 'front',
    function: 'Adução horizontal, flexão e rotação interna do braço. Principal músculo do empurrar.',
    exercises: ['Supino Reto', 'Supino Inclinado', 'Crucifixo', 'Crossover', 'Flexão de Braço', 'Supino Declinado', 'Peck Deck'],
    synergists: ['deltoide_anterior', 'triceps'],
    antagonists: ['dorsal'],
    recoveryHours: 48,
    tips: [
      'Mantenha as escápulas retraídas no supino para maior ativação.',
      'Varie os ângulos (reto, inclinado, declinado) para desenvolvimento completo.',
      'Contraia o peitoral no topo do movimento, não apenas empurre o peso.'
    ]
  },
  deltoide_anterior: {
    id: 'deltoide_anterior',
    name: 'Deltóide Anterior',
    region: 'Ombro',
    view: 'front',
    function: 'Flexão e rotação interna do ombro. Atua em movimentos de empurrar acima da cabeça.',
    exercises: ['Desenvolvimento com Halteres', 'Desenvolvimento Militar', 'Elevação Frontal', 'Arnold Press'],
    synergists: ['peitoral', 'triceps'],
    antagonists: ['deltoide_posterior'],
    recoveryHours: 48,
    tips: [
      'Evite elevar os ombros durante a elevação frontal.',
      'Controle a descida para máxima ativação.',
      'Já recebe muito estímulo em treinos de peito — cuidado com overtraining.'
    ]
  },
  biceps: {
    id: 'biceps',
    name: 'Bíceps Braquial',
    region: 'Braço Anterior',
    view: 'front',
    function: 'Flexão do cotovelo e supinação do antebraço. Principal flexor do braço.',
    exercises: ['Rosca Direta', 'Rosca Alternada', 'Rosca Scott', 'Rosca Martelo', 'Rosca Concentrada', 'Rosca no Cabo'],
    synergists: ['antebraco'],
    antagonists: ['triceps'],
    recoveryHours: 48,
    tips: [
      'Evite balançar o corpo — isole o bíceps.',
      'Rosca Martelo trabalha também o braquial, dando volume ao braço.',
      'Faça a fase excêntrica (descida) lenta para maior hipertrofia.'
    ]
  },
  antebraco: {
    id: 'antebraco',
    name: 'Antebraço',
    region: 'Antebraço',
    view: 'front',
    function: 'Flexão e extensão do punho, força de preensão (grip).',
    exercises: ['Rosca de Punho', 'Rosca Inversa', 'Farmer Walk', 'Dead Hang'],
    synergists: ['biceps'],
    antagonists: [],
    recoveryHours: 24,
    tips: [
      'Fortalecer antebraços melhora a pegada em todos os exercícios.',
      'Farmer Walk é excelente para grip funcional.',
      'Evite usar straps excessivamente — fortaleça a pegada natural.'
    ]
  },
  abdomen: {
    id: 'abdomen',
    name: 'Reto Abdominal',
    region: 'Core',
    view: 'front',
    function: 'Flexão do tronco e estabilização da coluna. Fundamental para postura.',
    exercises: ['Abdominal Crunch', 'Prancha Frontal', 'Elevação de Pernas', 'Abdominal Infra', 'Abdominal na Máquina', 'Roda Abdominal'],
    synergists: ['obliquos'],
    antagonists: ['lombar'],
    recoveryHours: 24,
    tips: [
      'Definição abdominal depende mais de dieta do que de exercício.',
      'Prancha é superior ao crunch para estabilização do core.',
      'Não negligencie — core forte protege a coluna em exercícios pesados.'
    ]
  },
  obliquos: {
    id: 'obliquos',
    name: 'Oblíquos',
    region: 'Core Lateral',
    view: 'front',
    function: 'Rotação e flexão lateral do tronco. Estabilização em movimentos unilaterais.',
    exercises: ['Prancha Lateral', 'Russian Twist', 'Woodchop', 'Abdominal Oblíquo', 'Pallof Press'],
    synergists: ['abdomen'],
    antagonists: [],
    recoveryHours: 24,
    tips: [
      'Russian Twist com controle é melhor do que com velocidade.',
      'Pallof Press é excelente para estabilidade anti-rotacional.',
      'Evite exercícios laterais com carga muito alta — pode alargar a cintura.'
    ]
  },
  quadriceps: {
    id: 'quadriceps',
    name: 'Quadríceps',
    region: 'Coxa Anterior',
    view: 'front',
    function: 'Extensão do joelho. Principal músculo para agachar e subir escadas.',
    exercises: ['Agachamento Livre', 'Leg Press 45°', 'Cadeira Extensora', 'Agachamento Frontal', 'Hack Squat', 'Afundo'],
    synergists: ['gluteo'],
    antagonists: ['isquiotibiais'],
    recoveryHours: 72,
    tips: [
      'Agachamento profundo (abaixo de 90°) ativa mais o glúteo.',
      'Cadeira extensora isola — boa para finalizar o treino.',
      'Aqueça bem os joelhos antes de cargas pesadas.'
    ]
  },
  adutor: {
    id: 'adutor',
    name: 'Adutores',
    region: 'Coxa Interna',
    view: 'front',
    function: 'Adução da coxa (aproximar as pernas). Estabilização do quadril.',
    exercises: ['Cadeira Adutora', 'Agachamento Sumô', 'Copenhagen Plank', 'Afundo Lateral'],
    synergists: ['quadriceps'],
    antagonists: [],
    recoveryHours: 48,
    tips: [
      'Agachamento Sumô ativa mais os adutores que o agachamento convencional.',
      'Adutores fracos aumentam risco de lesão no joelho.',
      'Alonge após o treino — adutores tendem a encurtar.'
    ]
  },
  tibial: {
    id: 'tibial',
    name: 'Tibial Anterior',
    region: 'Canela',
    view: 'front',
    function: 'Dorsiflexão do tornozelo. Importante para equilíbrio e corrida.',
    exercises: ['Dorsiflexão com Peso', 'Caminhada no Calcanhar', 'Tibial Raise'],
    synergists: [],
    antagonists: ['panturrilha'],
    recoveryHours: 24,
    tips: [
      'Tibial forte previne canelite em corredores.',
      'Exercício simples: caminhar nos calcanhares por 30s.',
      'Frequentemente negligenciado — inclua pelo menos 2x por semana.'
    ]
  },
  // ===== VISTA POSTERIOR =====
  trapezio: {
    id: 'trapezio',
    name: 'Trapézio',
    region: 'Costas Superior',
    view: 'back',
    function: 'Elevação, retração e depressão das escápulas. Sustentação da postura.',
    exercises: ['Encolhimento com Halteres', 'Encolhimento com Barra', 'Remada Alta', 'Face Pull'],
    synergists: ['deltoide_posterior', 'dorsal'],
    antagonists: [],
    recoveryHours: 48,
    tips: [
      'Face Pull é essencial para saúde dos ombros.',
      'Segure no topo do encolhimento por 2-3 segundos.',
      'Trapézio forte melhora a postura e previne dores cervicais.'
    ]
  },
  deltoide_posterior: {
    id: 'deltoide_posterior',
    name: 'Deltóide Posterior',
    region: 'Ombro Posterior',
    view: 'back',
    function: 'Extensão e rotação externa do ombro. Essencial para equilíbrio do ombro.',
    exercises: ['Face Pull', 'Crucifixo Inverso', 'Remada com Halteres', 'Peck Deck Inverso', 'Band Pull-Apart'],
    synergists: ['trapezio', 'dorsal'],
    antagonists: ['deltoide_anterior', 'peitoral'],
    recoveryHours: 48,
    tips: [
      'Músculo mais negligenciado — treine 2-3x por semana.',
      'Face Pull com rotação externa é o melhor exercício preventivo.',
      'Deltóide posterior fraco causa ombros curvados para frente.'
    ]
  },
  triceps: {
    id: 'triceps',
    name: 'Tríceps Braquial',
    region: 'Braço Posterior',
    view: 'back',
    function: 'Extensão do cotovelo. Compõe 2/3 do volume do braço.',
    exercises: ['Tríceps Pulley', 'Tríceps Testa', 'Mergulho', 'Tríceps Francês', 'Tríceps Kickback', 'Tríceps Corda'],
    synergists: ['peitoral', 'deltoide_anterior'],
    antagonists: ['biceps'],
    recoveryHours: 48,
    tips: [
      'O tríceps é maior que o bíceps — treine com igual ou mais volume.',
      'Variações acima da cabeça (francês) ativam a cabeça longa.',
      'Já recebe estímulo em treinos de peito/ombro — ajuste o volume total.'
    ]
  },
  dorsal: {
    id: 'dorsal',
    name: 'Grande Dorsal',
    region: 'Costas',
    view: 'back',
    function: 'Adução, extensão e rotação interna do braço. Principal músculo do puxar.',
    exercises: ['Puxada Frontal', 'Barra Fixa', 'Remada Curvada', 'Remada Unilateral', 'Pullover', 'Remada Cavaleiro'],
    synergists: ['biceps', 'trapezio', 'deltoide_posterior'],
    antagonists: ['peitoral'],
    recoveryHours: 48,
    tips: [
      'Foque na conexão mente-músculo — puxe com as costas, não com os braços.',
      'Barra fixa é o rei dos exercícios de costas.',
      'Mantenha o peito aberto e escápulas retraídas nas remadas.'
    ]
  },
  lombar: {
    id: 'lombar',
    name: 'Eretores da Espinha',
    region: 'Lombar',
    view: 'back',
    function: 'Extensão e estabilização da coluna vertebral. Proteção da lombar.',
    exercises: ['Hiperextensão', 'Levantamento Terra', 'Good Morning', 'Superman', 'Bird Dog'],
    synergists: ['gluteo'],
    antagonists: ['abdomen'],
    recoveryHours: 48,
    tips: [
      'Lombar forte é a base para agachamento e terra seguros.',
      'Nunca arredonde a lombar em exercícios com carga.',
      'Superman e Bird Dog são excelentes para iniciantes.'
    ]
  },
  gluteo: {
    id: 'gluteo',
    name: 'Glúteo Máximo',
    region: 'Quadril',
    view: 'back',
    function: 'Extensão e rotação externa do quadril. Maior músculo do corpo.',
    exercises: ['Hip Thrust', 'Agachamento Búlgaro', 'Levantamento Terra Romeno', 'Afundo', 'Glúteo na Máquina', 'Elevação Pélvica'],
    synergists: ['isquiotibiais', 'lombar'],
    antagonists: [],
    recoveryHours: 48,
    tips: [
      'Hip Thrust é o exercício com maior ativação de glúteo.',
      'Aperte o glúteo no topo de cada repetição (squeeze).',
      'Glúteo fraco causa dor no joelho e lombar.'
    ]
  },
  isquiotibiais: {
    id: 'isquiotibiais',
    name: 'Isquiotibiais',
    region: 'Coxa Posterior',
    view: 'back',
    function: 'Flexão do joelho e extensão do quadril. Equilíbrio com o quadríceps.',
    exercises: ['Mesa Flexora', 'Levantamento Terra Romeno', 'Cadeira Flexora', 'Nordic Curl', 'Stiff', 'Good Morning'],
    synergists: ['gluteo'],
    antagonists: ['quadriceps'],
    recoveryHours: 72,
    tips: [
      'Proporção ideal: força isquiotibiais = 60-70% da força do quadríceps.',
      'Stiff com halteres permite maior amplitude.',
      'Nordic Curl é avançado mas excelente para prevenção de lesões.'
    ]
  },
  panturrilha: {
    id: 'panturrilha',
    name: 'Panturrilha',
    region: 'Perna Posterior Inferior',
    view: 'back',
    function: 'Flexão plantar (ficar na ponta dos pés). Propulsão na caminhada e corrida.',
    exercises: ['Panturrilha no Smith', 'Panturrilha Sentado', 'Panturrilha no Leg Press', 'Gêmeos em Pé', 'Salto com Panturrilha'],
    synergists: [],
    antagonists: ['tibial'],
    recoveryHours: 24,
    tips: [
      'Panturrilha responde bem a alto volume (15-20+ repetições).',
      'Sentado ativa mais o sóleo; em pé ativa mais o gastrocnêmio.',
      'Faça a amplitude completa — estenda e contraia totalmente.'
    ]
  },
};

// Get front-view muscles
export function getFrontMuscles() {
  return Object.values(MUSCLE_GROUPS).filter(m => m.view === 'front');
}

// Get back-view muscles
export function getBackMuscles() {
  return Object.values(MUSCLE_GROUPS).filter(m => m.view === 'back');
}

// Get muscle by ID
export function getMuscleById(id) {
  return MUSCLE_GROUPS[id] || null;
}

// Get all muscles
export function getAllMuscles() {
  return Object.values(MUSCLE_GROUPS);
}

// Match exercise name to muscles it works
export function getMusclesForExercise(exerciseName) {
  const name = exerciseName.toLowerCase();
  const results = [];

  for (const muscle of Object.values(MUSCLE_GROUPS)) {
    for (const ex of muscle.exercises) {
      if (ex.toLowerCase().includes(name) || name.includes(ex.toLowerCase())) {
        results.push({ muscle, isPrimary: true });
        break;
      }
    }
    // Check synergists
    if (!results.find(r => r.muscle.id === muscle.id)) {
      for (const synId of muscle.synergists) {
        const synMuscle = MUSCLE_GROUPS[synId];
        if (synMuscle) {
          for (const ex of synMuscle.exercises) {
            if (ex.toLowerCase().includes(name) || name.includes(ex.toLowerCase())) {
              results.push({ muscle, isPrimary: false });
              break;
            }
          }
        }
      }
    }
  }

  return results;
}

// Get exercise categories mapped to muscles
export const EXERCISE_MUSCLE_MAP = {
  'Peito': ['peitoral'],
  'Costas': ['dorsal', 'trapezio'],
  'Ombro': ['deltoide_anterior', 'deltoide_posterior'],
  'Bíceps': ['biceps'],
  'Tríceps': ['triceps'],
  'Perna': ['quadriceps', 'isquiotibiais', 'panturrilha'],
  'Glúteo': ['gluteo'],
  'Abdômen': ['abdomen', 'obliquos'],
  'Cardio': [],
  'Funcional': ['abdomen', 'lombar', 'gluteo'],
};
