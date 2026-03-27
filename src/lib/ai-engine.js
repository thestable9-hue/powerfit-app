// PowerFit — AI Engine (100% Local, Zero APIs)
// Motor de IA baseado em regras para dicas personalizadas

import { MUSCLE_GROUPS, getMusclesForExercise } from './muscleData.js';

// ===== EXERCISE DATABASE WITH MUSCLE MAPPING =====
const EXERCISE_DB = [
  { name: 'Supino Reto', primary: ['peitoral'], secondary: ['deltoide_anterior', 'triceps'], difficulty: 'intermediário', equipment: 'barra' },
  { name: 'Supino Inclinado', primary: ['peitoral'], secondary: ['deltoide_anterior', 'triceps'], difficulty: 'intermediário', equipment: 'barra' },
  { name: 'Crucifixo', primary: ['peitoral'], secondary: ['deltoide_anterior'], difficulty: 'iniciante', equipment: 'halteres' },
  { name: 'Crossover', primary: ['peitoral'], secondary: [], difficulty: 'iniciante', equipment: 'cabo' },
  { name: 'Puxada Frontal', primary: ['dorsal'], secondary: ['biceps', 'deltoide_posterior'], difficulty: 'iniciante', equipment: 'máquina' },
  { name: 'Barra Fixa', primary: ['dorsal'], secondary: ['biceps', 'antebraco'], difficulty: 'avançado', equipment: 'barra fixa' },
  { name: 'Remada Curvada', primary: ['dorsal'], secondary: ['biceps', 'trapezio', 'lombar'], difficulty: 'intermediário', equipment: 'barra' },
  { name: 'Remada Unilateral', primary: ['dorsal'], secondary: ['biceps', 'trapezio'], difficulty: 'iniciante', equipment: 'halteres' },
  { name: 'Desenvolvimento Militar', primary: ['deltoide_anterior'], secondary: ['triceps', 'trapezio'], difficulty: 'intermediário', equipment: 'barra' },
  { name: 'Desenvolvimento com Halteres', primary: ['deltoide_anterior'], secondary: ['triceps'], difficulty: 'iniciante', equipment: 'halteres' },
  { name: 'Elevação Lateral', primary: ['deltoide_anterior'], secondary: [], difficulty: 'iniciante', equipment: 'halteres' },
  { name: 'Face Pull', primary: ['deltoide_posterior'], secondary: ['trapezio'], difficulty: 'iniciante', equipment: 'cabo' },
  { name: 'Crucifixo Inverso', primary: ['deltoide_posterior'], secondary: ['trapezio'], difficulty: 'iniciante', equipment: 'máquina' },
  { name: 'Rosca Direta', primary: ['biceps'], secondary: ['antebraco'], difficulty: 'iniciante', equipment: 'barra' },
  { name: 'Rosca Alternada', primary: ['biceps'], secondary: ['antebraco'], difficulty: 'iniciante', equipment: 'halteres' },
  { name: 'Rosca Martelo', primary: ['biceps'], secondary: ['antebraco'], difficulty: 'iniciante', equipment: 'halteres' },
  { name: 'Tríceps Pulley', primary: ['triceps'], secondary: [], difficulty: 'iniciante', equipment: 'cabo' },
  { name: 'Tríceps Testa', primary: ['triceps'], secondary: [], difficulty: 'intermediário', equipment: 'barra' },
  { name: 'Mergulho', primary: ['triceps'], secondary: ['peitoral', 'deltoide_anterior'], difficulty: 'avançado', equipment: 'paralela' },
  { name: 'Agachamento Livre', primary: ['quadriceps'], secondary: ['gluteo', 'lombar', 'abdomen'], difficulty: 'intermediário', equipment: 'barra' },
  { name: 'Leg Press 45°', primary: ['quadriceps'], secondary: ['gluteo'], difficulty: 'iniciante', equipment: 'máquina' },
  { name: 'Cadeira Extensora', primary: ['quadriceps'], secondary: [], difficulty: 'iniciante', equipment: 'máquina' },
  { name: 'Afundo', primary: ['quadriceps'], secondary: ['gluteo'], difficulty: 'iniciante', equipment: 'halteres' },
  { name: 'Mesa Flexora', primary: ['isquiotibiais'], secondary: [], difficulty: 'iniciante', equipment: 'máquina' },
  { name: 'Levantamento Terra Romeno', primary: ['isquiotibiais'], secondary: ['gluteo', 'lombar'], difficulty: 'intermediário', equipment: 'barra' },
  { name: 'Stiff', primary: ['isquiotibiais'], secondary: ['gluteo', 'lombar'], difficulty: 'intermediário', equipment: 'barra' },
  { name: 'Hip Thrust', primary: ['gluteo'], secondary: ['isquiotibiais'], difficulty: 'iniciante', equipment: 'barra' },
  { name: 'Agachamento Búlgaro', primary: ['quadriceps'], secondary: ['gluteo'], difficulty: 'intermediário', equipment: 'halteres' },
  { name: 'Panturrilha Sentado', primary: ['panturrilha'], secondary: [], difficulty: 'iniciante', equipment: 'máquina' },
  { name: 'Panturrilha no Smith', primary: ['panturrilha'], secondary: [], difficulty: 'iniciante', equipment: 'smith' },
  { name: 'Abdominal Crunch', primary: ['abdomen'], secondary: ['obliquos'], difficulty: 'iniciante', equipment: 'nenhum' },
  { name: 'Prancha Frontal', primary: ['abdomen'], secondary: ['obliquos', 'lombar'], difficulty: 'iniciante', equipment: 'nenhum' },
  { name: 'Russian Twist', primary: ['obliquos'], secondary: ['abdomen'], difficulty: 'iniciante', equipment: 'nenhum' },
  { name: 'Hiperextensão', primary: ['lombar'], secondary: ['gluteo', 'isquiotibiais'], difficulty: 'iniciante', equipment: 'banco' },
  { name: 'Levantamento Terra', primary: ['lombar'], secondary: ['quadriceps', 'gluteo', 'trapezio', 'antebraco', 'dorsal'], difficulty: 'avançado', equipment: 'barra' },
  { name: 'Encolhimento com Halteres', primary: ['trapezio'], secondary: [], difficulty: 'iniciante', equipment: 'halteres' },
  { name: 'Cadeira Adutora', primary: ['adutor'], secondary: [], difficulty: 'iniciante', equipment: 'máquina' },
  { name: 'Agachamento Sumô', primary: ['quadriceps'], secondary: ['adutor', 'gluteo'], difficulty: 'iniciante', equipment: 'halteres' },
];

// ===== OBJECTIVE TEMPLATES =====
const OBJECTIVE_ADVICE = {
  'Hipertrofia': {
    repRange: '8-12 reps',
    restRange: '60-90s',
    setsRange: '3-4 sets',
    calAdvice: 'Mantenha superávit calórico de 300-500kcal.',
    proteinAdvice: 'Consuma 1.6-2.2g de proteína por kg de peso corporal.',
    generalTips: [
      'Foque na sobrecarga progressiva — aumente carga ou volume a cada semana.',
      'Priorize exercícios compostos antes dos isolados.',
      'Durma 7-9h por noite — o músculo cresce durante o descanso.',
      'Hidrate-se com pelo menos 35ml/kg de peso corporal.'
    ]
  },
  'Emagrecimento': {
    repRange: '12-15 reps',
    restRange: '30-60s',
    setsRange: '3-4 sets',
    calAdvice: 'Mantenha déficit calórico de 300-500kcal.',
    proteinAdvice: 'Consuma pelo menos 2g de proteína por kg para preservar massa muscular.',
    generalTips: [
      'Combine musculação com cardio HIIT para máxima queima calórica.',
      'Não reduza calorias drasticamente — perda sustentável é mais eficaz.',
      'Treinos circuitados (superset) aumentam o gasto energético.',
      'Mantenha a intensidade alta mesmo em déficit calórico.'
    ]
  },
  'Condicionamento': {
    repRange: '15-20 reps',
    restRange: '30-45s',
    setsRange: '2-3 sets',
    calAdvice: 'Mantenha ingestão calórica no nível de manutenção.',
    proteinAdvice: 'Consuma 1.4-1.6g de proteína por kg de peso corporal.',
    generalTips: [
      'Inclua exercícios funcionais e pliométricos.',
      'Varie os estímulos — seu corpo se adapta rápido.',
      'Trabalhe mobilidade e flexibilidade regularmente.',
      'Inclua treino cardiovascular 3-5x por semana.'
    ]
  },
  'Reabilitação': {
    repRange: '15-20 reps (carga leve)',
    restRange: '60-120s',
    setsRange: '2-3 sets',
    calAdvice: 'Mantenha alimentação equilibrada e anti-inflamatória.',
    proteinAdvice: 'Consuma 1.6g de proteína por kg para ajudar na recuperação tecidual.',
    generalTips: [
      'Sempre respeite a dor — se doer, pare e informe seu personal.',
      'Amplitude de movimento é mais importante que carga.',
      'Fortaleça os estabilizadores e músculos auxiliares.',
      'Progressão deve ser lenta e controlada.'
    ]
  },
  'Saúde': {
    repRange: '10-15 reps',
    restRange: '60-90s',
    setsRange: '2-3 sets',
    calAdvice: 'Mantenha alimentação equilibrada e variada.',
    proteinAdvice: 'Consuma 1.2-1.6g de proteína por kg.',
    generalTips: [
      'Consistência é mais importante que intensidade.',
      'Combine treino de força com atividade aeróbica.',
      'Não negligencie alongamento e mobilidade.',
      'Treine pelo menos 3x por semana para manter a saúde.'
    ]
  }
};

// ===== AI ENGINE FUNCTIONS =====

/**
 * Generate personalized tips based on muscles and objective
 */
export function generateTips(selectedMuscles, objective = 'Hipertrofia') {
  const tips = [];
  const objAdvice = OBJECTIVE_ADVICE[objective] || OBJECTIVE_ADVICE['Hipertrofia'];

  // Add objective-specific tips
  tips.push({
    type: 'objective',
    icon: '🎯',
    title: `Dicas para ${objective}`,
    content: `Para ${objective.toLowerCase()}, trabalhe com ${objAdvice.repRange} por exercício, descansando ${objAdvice.restRange} entre séries.`
  });

  tips.push({
    type: 'nutrition',
    icon: '🥗',
    title: 'Nutrição',
    content: `${objAdvice.calAdvice} ${objAdvice.proteinAdvice}`
  });

  // Add muscle-specific tips
  for (const muscleId of selectedMuscles) {
    const muscle = MUSCLE_GROUPS[muscleId];
    if (muscle && muscle.tips.length > 0) {
      const randomTip = muscle.tips[Math.floor(Math.random() * muscle.tips.length)];
      tips.push({
        type: 'muscle',
        icon: '💪',
        title: muscle.name,
        content: randomTip
      });
    }
  }

  // Add a general tip
  const generalTips = objAdvice.generalTips;
  tips.push({
    type: 'general',
    icon: '💡',
    title: 'Dica do Dia',
    content: generalTips[Math.floor(Math.random() * generalTips.length)]
  });

  return tips;
}

/**
 * Suggest complementary exercises based on muscles
 */
export function suggestExercises(selectedMuscles, currentExercises = []) {
  const currentNames = currentExercises.map(e => (e.name || e).toLowerCase());
  const suggestions = [];

  for (const muscleId of selectedMuscles) {
    const matching = EXERCISE_DB.filter(ex =>
      ex.primary.includes(muscleId) &&
      !currentNames.some(cn => cn.includes(ex.name.toLowerCase()) || ex.name.toLowerCase().includes(cn))
    );

    for (const ex of matching.slice(0, 2)) {
      suggestions.push({
        exercise: ex,
        muscle: MUSCLE_GROUPS[muscleId],
        reason: `Complementa o treino de ${MUSCLE_GROUPS[muscleId]?.name || muscleId}`
      });
    }
  }

  return suggestions.slice(0, 6);
}

/**
 * Analyze muscle balance across all workouts
 */
export function analyzeBalance(workouts) {
  const muscleFrequency = {};

  // Initialize all muscles
  for (const id of Object.keys(MUSCLE_GROUPS)) {
    muscleFrequency[id] = 0;
  }

  // Count muscle activations across workouts
  for (const workout of workouts) {
    if (!workout.exercises) continue;
    for (const exercise of workout.exercises) {
      const matches = EXERCISE_DB.filter(db =>
        exercise.name.toLowerCase().includes(db.name.toLowerCase()) ||
        db.name.toLowerCase().includes(exercise.name.toLowerCase())
      );
      for (const match of matches) {
        for (const m of match.primary) muscleFrequency[m] = (muscleFrequency[m] || 0) + 2;
        for (const m of match.secondary) muscleFrequency[m] = (muscleFrequency[m] || 0) + 1;
      }
    }
  }

  // Find imbalances
  const warnings = [];
  const pairs = [
    { a: 'peitoral', b: 'dorsal', label: 'Peito vs Costas' },
    { a: 'quadriceps', b: 'isquiotibiais', label: 'Quadríceps vs Posterior' },
    { a: 'biceps', b: 'triceps', label: 'Bíceps vs Tríceps' },
    { a: 'deltoide_anterior', b: 'deltoide_posterior', label: 'Deltóide Anterior vs Posterior' },
    { a: 'abdomen', b: 'lombar', label: 'Abdômen vs Lombar' },
  ];

  for (const pair of pairs) {
    const freqA = muscleFrequency[pair.a] || 0;
    const freqB = muscleFrequency[pair.b] || 0;
    const total = freqA + freqB;

    if (total > 0) {
      const ratio = Math.min(freqA, freqB) / Math.max(freqA, freqB);
      if (ratio < 0.5) {
        const stronger = freqA > freqB ? MUSCLE_GROUPS[pair.a].name : MUSCLE_GROUPS[pair.b].name;
        const weaker = freqA > freqB ? MUSCLE_GROUPS[pair.b].name : MUSCLE_GROUPS[pair.a].name;
        warnings.push({
          type: 'imbalance',
          icon: '⚠️',
          pair: pair.label,
          message: `Você treina muito ${stronger} e pouco ${weaker}. Isso pode causar descompensação.`
        });
      }
    }
  }

  // Check neglected muscles
  const neglected = Object.entries(muscleFrequency)
    .filter(([_, freq]) => freq === 0)
    .map(([id]) => MUSCLE_GROUPS[id]?.name)
    .filter(Boolean);

  if (neglected.length > 0) {
    warnings.push({
      type: 'neglected',
      icon: '🔍',
      message: `Músculos sem treino: ${neglected.slice(0, 4).join(', ')}${neglected.length > 4 ? ` e mais ${neglected.length - 4}` : ''}.`
    });
  }

  return {
    frequency: muscleFrequency,
    warnings,
    score: Math.max(0, 100 - warnings.length * 15)
  };
}

/**
 * Generate full workout insight for a student
 */
export function generateWorkoutInsight(student, workouts, evolution = []) {
  const insights = [];
  const objective = student.objective || 'Hipertrofia';
  const objAdvice = OBJECTIVE_ADVICE[objective] || OBJECTIVE_ADVICE['Hipertrofia'];

  // Objective insight
  insights.push({
    type: 'objective',
    icon: '🎯',
    title: 'Seu Objetivo',
    content: `Para ${objective.toLowerCase()}: ${objAdvice.repRange}, descanso ${objAdvice.restRange}. ${objAdvice.calAdvice}`
  });

  // Evolution insight
  if (evolution.length >= 2) {
    const first = evolution[0];
    const last = evolution[evolution.length - 1];
    const weightDiff = (last.weight - first.weight).toFixed(1);
    const fatDiff = last.bodyFat && first.bodyFat ? (last.bodyFat - first.bodyFat).toFixed(1) : null;

    let evoMessage = '';
    if (objective === 'Emagrecimento' && weightDiff < 0) {
      evoMessage = `Excelente! Você perdeu ${Math.abs(weightDiff)}kg. Continue assim! 🔥`;
    } else if (objective === 'Hipertrofia' && weightDiff > 0) {
      evoMessage = `Ótimo progresso! Ganhou ${weightDiff}kg. `;
      if (fatDiff && fatDiff <= 0) evoMessage += 'E a gordura se manteve ou reduziu — ganho limpo! 💪';
    } else {
      evoMessage = `Variação de ${weightDiff > 0 ? '+' : ''}${weightDiff}kg no período avaliado.`;
    }

    insights.push({
      type: 'evolution',
      icon: '📊',
      title: 'Sua Evolução',
      content: evoMessage
    });
  }

  // Balance insight
  if (workouts.length > 0) {
    const balance = analyzeBalance(workouts);
    if (balance.warnings.length > 0) {
      insights.push({
        type: 'balance',
        icon: '⚖️',
        title: 'Equilíbrio Muscular',
        content: balance.warnings[0].message,
        score: balance.score
      });
    } else {
      insights.push({
        type: 'balance',
        icon: '✅',
        title: 'Equilíbrio Muscular',
        content: 'Seu treino está bem equilibrado! Todos os grupos musculares estão sendo trabalhados.',
        score: balance.score
      });
    }
  }

  // Recovery tip
  insights.push({
    type: 'recovery',
    icon: '😴',
    title: 'Recuperação',
    content: `Descanse cada grupo muscular pelo menos 48h antes de treinar novamente. Durma 7-9h por noite.`
  });

  // General tip
  const tip = objAdvice.generalTips[Math.floor(Math.random() * objAdvice.generalTips.length)];
  insights.push({
    type: 'tip',
    icon: '💡',
    title: 'Dica do Personal IA',
    content: tip
  });

  return insights;
}

/**
 * Get recovery tip for a specific muscle
 */
export function getRecoveryTip(muscleId) {
  const muscle = MUSCLE_GROUPS[muscleId];
  if (!muscle) return null;

  const hours = muscle.recoveryHours;
  return {
    muscle: muscle.name,
    hours,
    message: hours <= 24
      ? `${muscle.name} se recupera rápido (~${hours}h). Pode treinar com mais frequência.`
      : hours <= 48
        ? `${muscle.name} precisa de ~${hours}h de descanso. Treine no máximo a cada 2 dias.`
        : `${muscle.name} é um grupo grande e precisa de ~${hours}h (3 dias) para se recuperar totalmente.`
  };
}

/**
 * Get the balance radar data for a chart
 */
export function getBalanceRadarData(workouts) {
  const balance = analyzeBalance(workouts);
  const regions = [
    { label: 'Peito', muscles: ['peitoral'] },
    { label: 'Costas', muscles: ['dorsal', 'trapezio'] },
    { label: 'Ombros', muscles: ['deltoide_anterior', 'deltoide_posterior'] },
    { label: 'Braços', muscles: ['biceps', 'triceps'] },
    { label: 'Core', muscles: ['abdomen', 'obliquos', 'lombar'] },
    { label: 'Pernas', muscles: ['quadriceps', 'isquiotibiais', 'gluteo', 'panturrilha'] },
  ];

  const maxFreq = Math.max(...Object.values(balance.frequency), 1);

  return regions.map(r => ({
    region: r.label,
    value: Math.round(
      (r.muscles.reduce((sum, m) => sum + (balance.frequency[m] || 0), 0) / r.muscles.length / maxFreq) * 100
    ),
    fullMark: 100,
  }));
}
