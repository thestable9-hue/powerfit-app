import { useState } from 'react';
import { useAuth, useToast } from '../App';
import { Crown, Check, Shield, Zap, Info } from 'lucide-react';

export default function Plans() {
  const { user } = useAuth();
  const addToast = useToast();
  const [loading, setLoading] = useState(false);

  // Link de Pagamento padrão do Mercado Pago gerado em sua conta
  // Substitua este link pelo link real gerado no painel do Mercado Pago
  const MERCADO_PAGO_LINK = 'https://link.mercadopago.com.br/assinaturapowerfit'; 

  const isPremium = user?.tier === 'premium';

  const handleSubscribe = () => {
    setLoading(true);
    // Aqui seria feito o redirecionamento. Num cenário real via SDK, abriria o modal.
    // Usaremos window.open para o Link de Pagamento.
    setTimeout(() => {
      window.open(MERCADO_PAGO_LINK, '_blank');
      setLoading(false);
      addToast('Redirecionando para o Mercado Pago...', 'info');
    }, 600);
  };

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '60px' }}>
      <div className="page-header" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>
          Mude para o <span style={{ background: 'linear-gradient(135deg, #FF6B35, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Premium</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px' }}>Evolua sua experiência na gestão e visualização de treinos com ferramentas exclusivas da nossa plataforma.</p>
      </div>

      {isPremium ? (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '40px 20px', border: '2px solid #F59E0B', background: 'rgba(245, 158, 11, 0.05)' }}>
          <Crown size={48} style={{ color: '#F59E0B', margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Você já é Premium!</h3>
          <p style={{ color: 'var(--text-muted)' }}>Sua conta já possui todos os benefícios exclusivos ativados. Aproveite a plataforma da melhor maneira possível!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          {/* Card Free */}
          <div className="card" style={{ width: '100%', maxWidth: '340px', padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Plano Free</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>Essentials para gerenciar seus treinos</p>
            <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '32px' }}>R$ 0<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '400' }}>/mês</span></div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <Check size={18} style={{ color: 'var(--success)', flexShrink: 0 }} /> Gestão básica de alunos
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <Check size={18} style={{ color: 'var(--success)', flexShrink: 0 }} /> Criação de Treinos limitados
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <Check size={18} style={{ color: 'var(--success)', flexShrink: 0 }} /> Acompanhamento de peso
              </li>
            </ul>
            
            <button className="btn btn-outline" style={{ width: '100%' }} disabled>Plano Atual</button>
          </div>

          {/* Card Premium */}
          <div className="card" style={{ 
            width: '100%', maxWidth: '360px', padding: '32px 24px', display: 'flex', flexDirection: 'column',
            border: '2px solid #FF6B35', background: 'linear-gradient(to bottom, rgba(255, 107, 53, 0.05), transparent)',
            position: 'relative', transform: 'scale(1.02)'
          }}>
            <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #FF6B35, #F59E0B)', color: 'white', padding: '4px 16px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Crown size={14} /> RECOMENDADO
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>Plano Premium <Zap size={18} style={{ color: '#F59E0B' }} /></h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>Para quem leva saúde e resultados a sério</p>
            <div style={{ fontSize: '2.4rem', fontWeight: '800', marginBottom: '8px', color: '#FF6B35' }}>R$ 24,90<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '400' }}>/mês</span></div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '32px' }}>Pagamento seguro via Mercado Pago</p>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '500' }}>
                <Check size={20} style={{ color: '#FF6B35', flexShrink: 0 }} /> Atlas Muscular 3D Interativo
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '500' }}>
                <Check size={20} style={{ color: '#FF6B35', flexShrink: 0 }} /> Assistente IA (Power Coach)
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <Check size={18} style={{ color: 'var(--success)', flexShrink: 0 }} /> Alunos e Treinos ilimitados
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <Check size={18} style={{ color: 'var(--success)', flexShrink: 0 }} /> Gráficos de Evolução avançados
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <Check size={18} style={{ color: 'var(--success)', flexShrink: 0 }} /> Suporte Prioritário
              </li>
            </ul>
            
            <button className="btn" style={{ 
              width: '100%', padding: '16px', fontSize: '1.1rem', background: '#009EE3', color: 'white', display: 'flex', justifyContent: 'center', gap: '8px'
            }} onClick={handleSubscribe} disabled={loading}>
              <Shield size={20} /> {loading ? 'Aguarde...' : 'Assinar com Mercado Pago'}
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <Info size={12} /> Cancele quando quiser
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
