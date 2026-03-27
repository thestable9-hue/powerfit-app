import { Link } from 'react-router-dom';
import { Dumbbell, Users, TrendingUp, MessageCircle, LayoutDashboard, Zap, ArrowRight, CheckCircle } from 'lucide-react';

const features = [
  { icon: Dumbbell, title: 'Criação de Treinos', description: 'Personal trainers podem criar treinos detalhados com exercícios, séries, repetições e observações personalizadas.', gradient: 'primary' },
  { icon: Users, title: 'Gestão de Alunos', description: 'Cadastre alunos com ficha completa, atribua treinos e acompanhe o progresso de todos em um só lugar.', gradient: 'accent' },
  { icon: TrendingUp, title: 'Gráficos de Evolução', description: 'Alunos visualizam sua evolução através de gráficos interativos de peso, medidas e outros indicadores.', gradient: 'primary' },
  { icon: MessageCircle, title: 'Envio via WhatsApp', description: 'Envie treinos formatados diretamente pelo WhatsApp para seus alunos com apenas um clique.', gradient: 'accent' },
  { icon: LayoutDashboard, title: 'Dashboard Intuitivo', description: 'Interface moderna e fácil de usar para personal trainers acessarem informações rapidamente.', gradient: 'primary' },
  { icon: Zap, title: 'Acompanhamento em Tempo Real', description: 'Atualizações instantâneas quando treinos são atribuídos ou modificados pelo personal trainer.', gradient: 'accent' },
];

export default function Landing() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content animate-fade-in">
          <div className="hero-logo">
            <div className="hero-logo-icon"><Zap size={28} /></div>
            <span className="hero-logo-text">PowerFit</span>
          </div>
          <h1>Transforme a Gestão dos <span className="text-gradient">Seus Treinos</span></h1>
          <p>Plataforma completa para personal trainers gerenciarem treinos e alunos acompanharem sua evolução com gráficos inteligentes.</p>
          <div className="hero-actions">
            <Link to="/auth"><button className="btn btn-primary btn-lg">Começar Agora <ArrowRight size={20} /></button></Link>
            <Link to="/auth"><button className="btn btn-outline btn-lg">Fazer Login</button></Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><CheckCircle size={16} /> <span>100% Gratuito</span></div>
            <div className="hero-stat"><CheckCircle size={16} /> <span>Sem Cartão</span></div>
            <div className="hero-stat"><CheckCircle size={16} /> <span>Uso Imediato</span></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2>Funcionalidades <span className="text-gradient">Poderosas</span></h2>
            <p>Tudo que você precisa para gerenciar treinos e acompanhar resultados</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card card card-glow animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`feature-icon ${f.gradient}`}>
                  <f.icon size={24} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Tiers */}
      <section className="pricing-section">
        <div className="features-container">
          <div className="features-header">
            <h2>Planos <span className="text-gradient">PowerFit</span></h2>
            <p>Escolha o melhor plano para você ou para seus alunos</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card card animate-slide-up">
              <div className="pricing-header">
                <h3>Plano Free</h3>
                <div className="price">R$ 0<span>/mês</span></div>
                <p>Ideal para alunos começando sua jornada.</p>
              </div>
              <ul className="pricing-features">
                <li><CheckCircle size={16} /> Acesso aos treinos atribuídos</li>
                <li><CheckCircle size={16} /> Evolução de peso e medidas</li>
                <li><CheckCircle size={16} /> Cálculo de calorias e IMC</li>
              </ul>
              <Link to="/auth"><button className="btn btn-outline" style={{ width: '100%' }}>Criar Conta Free</button></Link>
            </div>
            
            <div className="pricing-card card card-glow premium-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="premium-badge">Mais Popular</div>
              <div className="pricing-header">
                <h3>Plano Premium</h3>
                <div className="price">R$ 19,90<span>/mês</span></div>
                <p>A experiência completa e personalizada.</p>
              </div>
              <ul className="pricing-features">
                <li><CheckCircle size={16} color="var(--success)" /> Tudo do plano Free</li>
                <li><Zap size={16} color="#FF6B35" /> <strong>Atlas Anatômico 3D interativo</strong></li>
                <li><Zap size={16} color="#FF6B35" /> <strong>IA Personal Trainer com dicas</strong></li>
                <li><Zap size={16} color="#FF6B35" /> <strong>Acesso Offline (PWA) na academia</strong></li>
                <li><Zap size={16} color="#FF6B35" /> Suporte prioritário via WhatsApp</li>
              </ul>
              <Link to="/auth"><button className="btn btn-primary" style={{ width: '100%' }}>Seja Premium <ArrowRight size={16} /></button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>Pronto para Transformar Seus Treinos?</h2>
          <p>Junte-se a centenas de personal trainers que já estão usando o PowerFit</p>
          <Link to="/auth"><button className="btn btn-primary btn-lg">Começar Gratuitamente <ArrowRight size={20} /></button></Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-logo">
          <Zap size={18} />
          <span>PowerFit</span>
        </div>
        <p>© 2025 PowerFit. Todos os direitos reservados.</p>
      </footer>

      <style>{`
        .landing { min-height: 100vh; }
        
        .hero {
          position: relative;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 80px 20px;
        }
        
        .hero-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 50%, rgba(255,107,53,0.12) 0%, transparent 60%),
                      radial-gradient(ellipse at 70% 50%, rgba(59,130,246,0.08) 0%, transparent 60%),
                      var(--bg-primary);
        }
        
        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 700px;
          text-align: center;
        }
        
        .hero-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }
        
        .hero-logo-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .hero-logo-text {
          font-size: 1.5rem;
          font-weight: 900;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero h1 {
          font-size: 3.2rem;
          font-weight: 900;
          margin-bottom: 20px;
          line-height: 1.1;
        }
        
        .text-gradient {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero p {
          font-size: 1.15rem;
          color: var(--text-secondary);
          margin-bottom: 32px;
          line-height: 1.7;
        }
        
        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        
        .hero-stats {
          display: flex;
          gap: 24px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .hero-stat {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        
        .hero-stat svg { color: var(--success); }
        
        .features-section {
          padding: 80px 20px;
          background: rgba(255,255,255,0.01);
        }
        
        .features-container {
          max-width: 1100px;
          margin: 0 auto;
        }
        
        .features-header {
          text-align: center;
          margin-bottom: 48px;
        }
        
        .features-header h2 {
          font-size: 2.2rem;
          margin-bottom: 12px;
        }
        
        .features-header p {
          color: var(--text-secondary);
          font-size: 1.05rem;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        
        .feature-card {
          padding: 28px;
        }
        
        .feature-icon {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          color: white;
        }
        
        .feature-icon.primary { background: var(--gradient-primary); }
        .feature-icon.accent { background: var(--gradient-accent); }
        
        .feature-card h3 {
          font-size: 1.15rem;
          margin-bottom: 8px;
        }
        
        .feature-card p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
        }
        
        .pricing-section {
          padding: 80px 20px;
        }
        
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .pricing-card {
          padding: 40px 30px;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        
        .premium-card {
          border-color: rgba(255,107,53,0.3);
          box-shadow: 0 0 30px rgba(255,107,53,0.1);
          transform: scale(1.05);
        }
        
        .premium-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #FF6B35, #F59E0B);
          color: white;
          padding: 4px 16px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 10px rgba(255,107,53,0.3);
        }
        
        .pricing-header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 30px;
          border-bottom: 1px solid var(--border);
        }
        
        .pricing-header h3 { font-size: 1.4rem; margin-bottom: 10px; }
        
        .price {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 10px;
          color: var(--text-primary);
        }
        
        .price span {
          font-size: 1rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        
        .pricing-header p {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        
        .pricing-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 40px;
          flex: 1;
        }
        
        .pricing-features li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
        
        .pricing-features li svg { flex-shrink: 0; }
        
        .cta-section {
          padding: 80px 20px;
        }
        
        .cta-card {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
          background: var(--gradient-primary);
          border-radius: var(--radius-xl);
          padding: 60px 40px;
          box-shadow: 0 0 60px rgba(255,107,53,0.2);
        }
        
        .cta-card h2 {
          font-size: 2rem;
          margin-bottom: 12px;
        }
        
        .cta-card p {
          color: rgba(255,255,255,0.85);
          font-size: 1.05rem;
          margin-bottom: 28px;
        }
        
        .cta-card .btn {
          background: white;
          color: var(--primary-dark);
          box-shadow: none;
        }
        
        .cta-card .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        
        .landing-footer {
          text-align: center;
          padding: 32px 20px;
          border-top: 1px solid var(--border);
        }
        
        .footer-logo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--primary);
          font-weight: 800;
          margin-bottom: 8px;
        }
        
        .landing-footer p {
          color: var(--text-muted);
          font-size: 0.8rem;
        }
        
        @media (max-width: 768px) {
          .hero h1 { font-size: 2rem; }
          .hero { min-height: 500px; padding: 60px 20px; }
          .features-header h2 { font-size: 1.6rem; }
          .cta-card { padding: 40px 20px; }
          .cta-card h2 { font-size: 1.5rem; }
          .features-grid { grid-template-columns: 1fr; }
          .premium-card { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
