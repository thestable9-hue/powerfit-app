import { useState, useEffect } from 'react';
import { generateWorkoutInsight, getBalanceRadarData } from '../lib/ai-engine';
import { Sparkles, Brain, ChevronDown, ChevronUp, Bot } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

export default function AIAssistant({ student, workouts, evolution }) {
  const [insights, setInsights] = useState([]);
  const [radarData, setRadarData] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (student && workouts) {
      // Simulate a brief loading for effect
      setLoading(true);
      const timer = setTimeout(() => {
        setInsights(generateWorkoutInsight(student, workouts, evolution));
        setRadarData(getBalanceRadarData(workouts));
        setLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [student, workouts, evolution]);

  if (!student || !workouts) return null;

  return (
    <div className="ai-assistant">
      <div className="ai-header" onClick={() => setExpanded(!expanded)}>
        <div className="ai-header-left">
          <div className="ai-avatar">
            <Bot size={20} />
          </div>
          <div>
            <h4>Assistente PowerFit IA</h4>
            <span>Análise personalizada do seu treino</span>
          </div>
        </div>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {expanded && (
        <div className="ai-content animate-slide-up">
          {loading ? (
            <div className="ai-loading">
              <div className="ai-loading-dots">
                <span></span><span></span><span></span>
              </div>
              <p>Analisando seus treinos...</p>
            </div>
          ) : (
            <>
              {/* Radar Chart */}
              {radarData.length > 0 && (
                <div className="ai-section">
                  <h5><Brain size={16} /> Equilíbrio Muscular</h5>
                  <div className="ai-radar-container">
                    <ResponsiveContainer width="100%" height={220}>
                      <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                        <PolarGrid stroke="rgba(255,255,255,0.08)" />
                        <PolarAngleAxis dataKey="region" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                        <PolarRadiusAxis tick={false} axisLine={false} />
                        <Radar name="Equilíbrio" dataKey="value" stroke="#FF6B35" fill="rgba(255,107,53,0.25)" strokeWidth={2} dot={{ fill: '#FF6B35', r: 3 }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Insights */}
              <div className="ai-insights">
                {insights.map((insight, i) => (
                  <div key={i} className="ai-insight-card" style={{ animationDelay: `${i * 0.1}s` }}>
                    <span className="ai-insight-icon">{insight.icon}</span>
                    <div className="ai-insight-content">
                      <strong>{insight.title}</strong>
                      <p>{insight.content}</p>
                      {insight.score !== undefined && (
                        <div className="ai-score">
                          <div className="ai-score-bar">
                            <div
                              className="ai-score-fill"
                              style={{
                                width: `${insight.score}%`,
                                background: insight.score >= 80 ? 'var(--success)' : insight.score >= 50 ? 'var(--warning)' : 'var(--danger)'
                              }}
                            />
                          </div>
                          <span>{insight.score}/100</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        .ai-assistant {
          background: var(--gradient-card);
          border: 1px solid rgba(255,107,53,0.2);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 0 30px rgba(255,107,53,0.08);
        }

        .ai-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          cursor: pointer;
          border-bottom: 1px solid var(--border);
          transition: background 0.2s;
        }

        .ai-header:hover { background: rgba(255,255,255,0.02); }

        .ai-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ai-avatar {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, #FF6B35, #F59E0B);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          animation: float 3s ease-in-out infinite;
        }

        .ai-header h4 {
          font-size: 0.95rem;
          margin-bottom: 2px;
        }

        .ai-header span {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .ai-header svg { color: var(--text-muted); }

        .ai-content { padding: 20px; }

        .ai-loading {
          text-align: center;
          padding: 30px;
        }

        .ai-loading-dots {
          display: flex;
          gap: 6px;
          justify-content: center;
          margin-bottom: 12px;
        }

        .ai-loading-dots span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--primary);
          animation: pulse 1.2s ease-in-out infinite;
        }

        .ai-loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .ai-loading-dots span:nth-child(3) { animation-delay: 0.4s; }

        .ai-loading p { color: var(--text-muted); font-size: 0.85rem; }

        .ai-section {
          margin-bottom: 20px;
        }

        .ai-section h5 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }

        .ai-section h5 svg { color: var(--primary); }

        .ai-radar-container {
          background: rgba(0,0,0,0.15);
          border-radius: var(--radius-md);
          padding: 8px;
        }

        .ai-insights {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ai-insight-card {
          display: flex;
          gap: 12px;
          padding: 14px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          animation: slideUp 0.3s ease backwards;
        }

        .ai-insight-icon {
          font-size: 1.3rem;
          flex-shrink: 0;
          line-height: 1;
          margin-top: 2px;
        }

        .ai-insight-content { flex: 1; }

        .ai-insight-content strong {
          display: block;
          font-size: 0.85rem;
          margin-bottom: 4px;
        }

        .ai-insight-content p {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .ai-score {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }

        .ai-score-bar {
          flex: 1;
          height: 6px;
          background: rgba(255,255,255,0.06);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .ai-score-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 1s ease;
        }

        .ai-score span {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
