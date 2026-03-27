import { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { getStudentById, getWorkouts } from '../lib/storage';
import { MUSCLE_GROUPS, getFrontMuscles, getBackMuscles } from '../lib/muscleData';
import { generateTips, suggestExercises, getRecoveryTip } from '../lib/ai-engine';
import { RotateCcw, Info, Dumbbell, Clock, Zap, ChevronRight, X, Sparkles } from 'lucide-react';
import PremiumGate from '../components/PremiumGate';

// SVG path data for muscle groups (simplified anatomical shapes)
const MUSCLE_PATHS = {
  // ===== FRONT VIEW =====
  peitoral: { d: 'M 115,95 C 120,85 140,78 150,80 L 150,110 C 145,115 125,112 115,95 Z M 185,95 C 180,85 160,78 150,80 L 150,110 C 155,115 175,112 185,95 Z', view: 'front' },
  deltoide_anterior: { d: 'M 108,75 C 100,80 97,95 100,105 L 112,95 C 115,85 113,78 108,75 Z M 192,75 C 200,80 203,95 200,105 L 188,95 C 185,85 187,78 192,75 Z', view: 'front' },
  biceps: { d: 'M 98,108 C 95,115 93,135 96,148 L 105,148 C 108,135 107,115 105,108 Z M 202,108 C 205,115 207,135 204,148 L 195,148 C 192,135 193,115 195,108 Z', view: 'front' },
  antebraco: { d: 'M 95,150 C 92,160 88,175 90,190 L 100,190 C 102,175 103,160 105,150 Z M 205,150 C 208,160 212,175 210,190 L 200,190 C 198,175 197,160 195,150 Z', view: 'front' },
  abdomen: { d: 'M 135,115 L 165,115 L 165,175 L 135,175 Z', view: 'front' },
  obliquos: { d: 'M 118,115 L 135,115 L 135,170 L 122,165 Z M 182,115 L 165,115 L 165,170 L 178,165 Z', view: 'front' },
  quadriceps: { d: 'M 125,185 C 120,200 118,230 120,260 L 140,260 C 142,230 143,200 140,185 Z M 175,185 C 180,200 182,230 180,260 L 160,260 C 158,230 157,200 160,185 Z', view: 'front' },
  adutor: { d: 'M 140,185 L 150,185 L 150,240 L 142,240 Z M 160,185 L 150,185 L 150,240 L 158,240 Z', view: 'front' },
  tibial: { d: 'M 122,265 C 121,280 120,300 122,320 L 132,320 C 132,300 133,280 132,265 Z M 178,265 C 179,280 180,300 178,320 L 168,320 C 168,300 167,280 168,265 Z', view: 'front' },
  // ===== BACK VIEW =====
  trapezio: { d: 'M 130,65 L 150,55 L 170,65 L 170,90 L 150,85 L 130,90 Z', view: 'back' },
  deltoide_posterior: { d: 'M 108,75 C 100,80 97,95 100,105 L 112,95 C 115,85 113,78 108,75 Z M 192,75 C 200,80 203,95 200,105 L 188,95 C 185,85 187,78 192,75 Z', view: 'back' },
  triceps: { d: 'M 98,108 C 95,118 94,138 97,148 L 106,148 C 108,138 107,118 104,108 Z M 202,108 C 205,118 206,138 203,148 L 194,148 C 192,138 193,118 196,108 Z', view: 'back' },
  dorsal: { d: 'M 118,88 C 115,100 112,115 115,140 L 135,145 L 150,140 L 165,145 L 185,140 C 188,115 185,100 182,88 L 170,90 L 150,85 L 130,90 Z', view: 'back' },
  lombar: { d: 'M 130,145 L 170,145 L 170,178 L 130,178 Z', view: 'back' },
  gluteo: { d: 'M 120,180 C 118,190 120,205 130,210 L 150,208 L 170,210 C 180,205 182,190 180,180 Z', view: 'back' },
  isquiotibiais: { d: 'M 123,213 C 120,230 118,250 120,268 L 140,268 C 142,250 143,230 140,213 Z M 177,213 C 180,230 182,250 180,268 L 160,268 C 158,250 157,230 160,213 Z', view: 'back' },
  panturrilha: { d: 'M 122,272 C 119,290 120,310 123,325 L 135,325 C 136,310 135,290 133,272 Z M 178,272 C 181,290 180,310 177,325 L 165,325 C 164,310 165,290 167,272 Z', view: 'back' },
};

export default function MuscleAtlas() {
  const { user } = useAuth();
  const [view, setView] = useState('front');
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [hoveredMuscle, setHoveredMuscle] = useState(null);
  const [student, setStudent] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [tips, setTips] = useState([]);
  const isPremium = student?.tier === 'premium';

  useEffect(() => {
    if (user?.studentId) {
      const s = getStudentById(user.studentId);
      setStudent(s);
      if (s?.workoutIds?.length) {
        const all = getWorkouts();
        setWorkouts(all.filter(w => s.workoutIds.includes(w.id)));
      }
    } else if (user?.type === 'personal') {
      // Personal trainer always has access
      setStudent({ tier: 'premium' });
    }
  }, [user]);

  useEffect(() => {
    if (selectedMuscle) {
      const newTips = generateTips([selectedMuscle.id], student?.objective);
      setTips(newTips);
    }
  }, [selectedMuscle]);

  const handleMuscleClick = (muscleId) => {
    const muscle = MUSCLE_GROUPS[muscleId];
    if (muscle) {
      setSelectedMuscle(muscle);
    }
  };

  const getMyExercisesForMuscle = (muscleId) => {
    const exercises = [];
    for (const w of workouts) {
      if (!w.exercises) continue;
      for (const ex of w.exercises) {
        const muscle = MUSCLE_GROUPS[muscleId];
        if (muscle?.exercises.some(me =>
          ex.name.toLowerCase().includes(me.toLowerCase()) ||
          me.toLowerCase().includes(ex.name.toLowerCase())
        )) {
          exercises.push({ ...ex, workoutName: w.name });
        }
      }
    }
    return exercises;
  };

  const recovery = selectedMuscle ? getRecoveryTip(selectedMuscle.id) : null;

  const viewMuscles = Object.entries(MUSCLE_PATHS).filter(([_, data]) => data.view === view);

  const atlasContent = (
    <div className="atlas-page">
      <div className="page-header">
        <h2><Sparkles size={24} style={{ color: 'var(--primary)' }} /> Atlas Muscular</h2>
        <div className="atlas-view-toggle">
          <button className={`btn ${view === 'front' ? 'btn-primary' : 'btn-outline'} btn-sm`} onClick={() => { setView('front'); setSelectedMuscle(null); }}>
            Frontal
          </button>
          <button className={`btn ${view === 'back' ? 'btn-primary' : 'btn-outline'} btn-sm`} onClick={() => { setView('back'); setSelectedMuscle(null); }}>
            Posterior
          </button>
        </div>
      </div>

      <div className="atlas-layout">
        {/* SVG Body */}
        <div className="atlas-body-container">
          <div className="atlas-body-card card">
            <svg viewBox="60 30 180 320" className="atlas-svg" xmlns="http://www.w3.org/2000/svg">
              {/* Body outline */}
              <ellipse cx="150" cy="45" rx="22" ry="25" fill="var(--bg-elevated)" stroke="var(--border-hover)" strokeWidth="1" />
              {/* Neck */}
              <rect x="143" y="65" width="14" height="12" rx="3" fill="var(--bg-elevated)" stroke="var(--border-hover)" strokeWidth="0.5" />
              {/* Body base */}
              <path d="M 108,75 C 95,80 88,110 90,190 L 90,195 L 120,185 L 150,180 L 180,185 L 210,195 L 210,190 C 212,110 205,80 192,75 L 170,65 L 150,68 L 130,65 Z" fill="var(--bg-elevated)" stroke="var(--border-hover)" strokeWidth="1" />
              {/* Legs base */}
              <path d="M 120,185 C 115,220 115,270 120,325 L 140,325 L 140,310 L 150,185" fill="var(--bg-elevated)" stroke="var(--border-hover)" strokeWidth="0.5" />
              <path d="M 180,185 C 185,220 185,270 180,325 L 160,325 L 160,310 L 150,185" fill="var(--bg-elevated)" stroke="var(--border-hover)" strokeWidth="0.5" />

              {/* Muscle paths */}
              {viewMuscles.map(([id, data]) => {
                const isSelected = selectedMuscle?.id === id;
                const isHovered = hoveredMuscle === id;
                const muscle = MUSCLE_GROUPS[id];

                return (
                  <path
                    key={id}
                    d={data.d}
                    fill={isSelected ? 'rgba(255,107,53,0.7)' : isHovered ? 'rgba(255,107,53,0.4)' : 'rgba(255,107,53,0.15)'}
                    stroke={isSelected ? '#FF6B35' : isHovered ? '#FF8C5A' : 'rgba(255,107,53,0.3)'}
                    strokeWidth={isSelected ? 2 : 1}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      filter: isSelected ? 'drop-shadow(0 0 8px rgba(255,107,53,0.5))' : 'none'
                    }}
                    onClick={() => handleMuscleClick(id)}
                    onMouseEnter={() => setHoveredMuscle(id)}
                    onMouseLeave={() => setHoveredMuscle(null)}
                  >
                    <title>{muscle?.name}</title>
                  </path>
                );
              })}
            </svg>

            {/* Muscle labels */}
            <div className="atlas-legend">
              {viewMuscles.map(([id]) => {
                const muscle = MUSCLE_GROUPS[id];
                const isSelected = selectedMuscle?.id === id;
                return (
                  <button
                    key={id}
                    className={`atlas-legend-item ${isSelected ? 'active' : ''}`}
                    onClick={() => handleMuscleClick(id)}
                    onMouseEnter={() => setHoveredMuscle(id)}
                    onMouseLeave={() => setHoveredMuscle(null)}
                  >
                    <span className="atlas-legend-dot" />
                    {muscle?.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="atlas-info-panel">
          {selectedMuscle ? (
            <div className="atlas-muscle-info card animate-slide-up">
              <div className="atlas-info-header">
                <h3>{selectedMuscle.name}</h3>
                <button className="btn btn-ghost btn-icon" onClick={() => setSelectedMuscle(null)}>
                  <X size={18} />
                </button>
              </div>
              <span className="badge badge-primary" style={{ marginBottom: '12px' }}>{selectedMuscle.region}</span>

              <div className="atlas-info-section">
                <h4><Info size={16} /> Função</h4>
                <p>{selectedMuscle.function}</p>
              </div>

              {recovery && (
                <div className="atlas-info-section">
                  <h4><Clock size={16} /> Recuperação</h4>
                  <p>{recovery.message}</p>
                </div>
              )}

              <div className="atlas-info-section">
                <h4><Dumbbell size={16} /> Exercícios Recomendados</h4>
                <div className="atlas-exercises-list">
                  {selectedMuscle.exercises.map((ex, i) => (
                    <div key={i} className="atlas-exercise-item">
                      <ChevronRight size={14} /> {ex}
                    </div>
                  ))}
                </div>
              </div>

              {/* My exercises for this muscle */}
              {workouts.length > 0 && (
                <div className="atlas-info-section">
                  <h4><Zap size={16} /> Nos Seus Treinos</h4>
                  {(() => {
                    const myExs = getMyExercisesForMuscle(selectedMuscle.id);
                    if (myExs.length === 0) return <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Nenhum exercício deste músculo nos seus treinos.</p>;
                    return (
                      <div className="atlas-exercises-list">
                        {myExs.map((ex, i) => (
                          <div key={i} className="atlas-exercise-item highlight">
                            <span style={{ flex: 1 }}>{ex.name}</span>
                            <span className="badge badge-secondary">{ex.sets}x{ex.reps}</span>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* AI Tips */}
              {tips.length > 0 && (
                <div className="atlas-info-section">
                  <h4><Sparkles size={16} /> Dicas da IA</h4>
                  <div className="atlas-tips-list">
                    {tips.filter(t => t.type === 'muscle').map((tip, i) => (
                      <div key={i} className="atlas-tip-card">
                        <span className="atlas-tip-icon">{tip.icon}</span>
                        <p>{tip.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="atlas-placeholder card">
              <div className="atlas-placeholder-icon">🦴</div>
              <h3>Selecione um Músculo</h3>
              <p>Clique em qualquer área do corpo para ver informações detalhadas, exercícios recomendados e dicas personalizadas.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .atlas-page { max-width: 1200px; margin: 0 auto; padding: 24px; }
        .atlas-view-toggle { display: flex; gap: 8px; }

        .atlas-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
        }

        .atlas-body-container { position: sticky; top: 24px; }

        .atlas-body-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .atlas-svg {
          width: 100%;
          max-width: 300px;
          height: auto;
        }

        .atlas-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 16px;
          justify-content: center;
        }

        .atlas-legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          background: transparent;
          color: var(--text-secondary);
          font-size: 0.72rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .atlas-legend-item:hover,
        .atlas-legend-item.active {
          background: rgba(255,107,53,0.15);
          border-color: var(--primary);
          color: var(--primary-light);
        }

        .atlas-legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--primary);
          opacity: 0.6;
        }

        .atlas-legend-item.active .atlas-legend-dot { opacity: 1; }

        .atlas-info-panel { min-height: 400px; }

        .atlas-muscle-info { padding: 24px; }

        .atlas-info-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .atlas-info-header h3 {
          font-size: 1.3rem;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .atlas-info-section {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }

        .atlas-info-section h4 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .atlas-info-section h4 svg { color: var(--primary); }

        .atlas-info-section p {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .atlas-exercises-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .atlas-exercise-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(255,255,255,0.02);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .atlas-exercise-item svg { color: var(--primary); flex-shrink: 0; }

        .atlas-exercise-item.highlight {
          background: rgba(255,107,53,0.08);
          border: 1px solid rgba(255,107,53,0.15);
        }

        .atlas-tips-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .atlas-tip-card {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 14px;
          background: rgba(255,107,53,0.06);
          border: 1px solid rgba(255,107,53,0.12);
          border-radius: var(--radius-md);
        }

        .atlas-tip-icon { font-size: 1.1rem; flex-shrink: 0; }
        .atlas-tip-card p { font-size: 0.83rem; color: var(--text-secondary); line-height: 1.5; }

        .atlas-placeholder {
          padding: 48px 32px;
          text-align: center;
        }

        .atlas-placeholder-icon {
          font-size: 3rem;
          margin-bottom: 16px;
          animation: float 3s ease-in-out infinite;
        }

        .atlas-placeholder h3 { margin-bottom: 8px; }
        .atlas-placeholder p { color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; }

        @media (max-width: 768px) {
          .atlas-layout { grid-template-columns: 1fr; }
          .atlas-body-container { position: static; }
        }
      `}</style>
    </div>
  );

  // Personal trainer always sees premium content
  if (user?.type === 'personal') {
    return <div className="animate-fade-in">{atlasContent}</div>;
  }

  return (
    <div className="animate-fade-in">
      <PremiumGate isPremium={isPremium} featureName="Atlas Muscular 3D">
        {atlasContent}
      </PremiumGate>
    </div>
  );
}
