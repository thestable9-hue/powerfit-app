import { Lock, Crown, Sparkles } from 'lucide-react';

export default function PremiumGate({ children, isPremium, featureName = 'Recurso Premium' }) {
  if (isPremium) return children;

  return (
    <div className="premium-gate-wrapper">
      <div className="premium-gate-content">
        {children}
      </div>
      <div className="premium-gate-overlay">
        <div className="premium-gate-card animate-slide-up">
          <div className="premium-gate-icon">
            <Crown size={32} />
          </div>
          <h3>{featureName}</h3>
          <p>Este recurso é exclusivo para alunos <strong>Premium</strong>.</p>
          <p className="premium-gate-sub">Fale com seu personal trainer para fazer o upgrade! 🚀</p>
          <div className="premium-gate-features">
            <div className="premium-gate-feature">
              <Sparkles size={14} /> Atlas Anatômico 3D
            </div>
            <div className="premium-gate-feature">
              <Sparkles size={14} /> Assistente IA
            </div>
            <div className="premium-gate-feature">
              <Sparkles size={14} /> Modo Offline
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .premium-gate-wrapper {
          position: relative;
          min-height: 200px;
        }
        .premium-gate-content {
          filter: blur(6px);
          pointer-events: none;
          user-select: none;
          opacity: 0.4;
        }
        .premium-gate-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          background: rgba(11, 17, 32, 0.3);
          border-radius: var(--radius-lg);
        }
        .premium-gate-card {
          text-align: center;
          padding: 32px 40px;
          background: var(--bg-card);
          border: 1px solid rgba(255, 107, 53, 0.3);
          border-radius: var(--radius-xl);
          box-shadow: 0 0 40px rgba(255, 107, 53, 0.1);
          max-width: 360px;
        }
        .premium-gate-icon {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-lg);
          background: linear-gradient(135deg, #FF6B35, #F59E0B);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: white;
          animation: float 3s ease-in-out infinite;
        }
        .premium-gate-card h3 {
          font-size: 1.2rem;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #FF6B35, #F59E0B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .premium-gate-card p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 4px;
        }
        .premium-gate-sub {
          font-size: 0.8rem !important;
          color: var(--text-muted) !important;
          margin-bottom: 16px !important;
        }
        .premium-gate-features {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 12px;
        }
        .premium-gate-feature {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--text-muted);
          justify-content: center;
        }
        .premium-gate-feature svg {
          color: #F59E0B;
        }
      `}</style>
    </div>
  );
}
