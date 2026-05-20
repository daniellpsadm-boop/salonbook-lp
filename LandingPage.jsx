import { useEffect, useState } from 'react';
import {
  Calendar, Users, TrendingUp, ArrowRight, CheckCircle, Zap, BarChart2,
  MessagesSquare, MessageCircle, Scissors, BellRing, Home, DollarSign,
  Sparkles, Menu, X, Star,
} from 'lucide-react';

const appScreens = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: Home,
    image: '/app-dashboard.png',
    imageAlt: 'Tela do dashboard com faturamento do mês, agenda de hoje e indicadores do salão',
    description: 'No dashboard você tem controle de tudo do seu salão ou barbearia.',
  },
  {
    id: 'agenda',
    title: 'Agenda',
    icon: Calendar,
    image: '/app-agenda.png',
    imageAlt: 'Tela da agenda semanal com agendamentos e status dos clientes',
    description: 'Na agenda você recebe os agendamentos realizados automaticamente via WhatsApp.',
  },
  {
    id: 'financeiro',
    title: 'Financeiro',
    icon: DollarSign,
    image: '/app-financeiro.png',
    imageAlt: 'Tela financeira com entradas, saídas, saldo e lançamentos do negócio',
    description: 'No financeiro você faz todo o controle financeiro do seu salão ou barbearia.',
  },
  {
    id: 'ai-growth',
    title: 'AI Growth',
    icon: Zap,
    image: '/app-ai-growth.png',
    imageAlt: 'Tela AI Growth com sugestão de mensagem para recuperar cliente inativo',
    description: 'No AI Growth envie mensagens automáticas para clientes sumidos.',
  },
];
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { appLink, SALONBOOK_CTA_URL } from './src/app-links.js';

function SectionLabel({ icon: Icon, children }) {
  return (
    <div className="inline-flex items-center justify-center gap-2 bg-[#C9A227]/10 text-[#D4AF37] border border-[#C9A227]/25 text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm text-center max-w-[min(100%,20rem)] leading-snug">
      {Icon ? <Icon className="w-3 h-3 shrink-0" /> : null}
      {children}
    </div>
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const fadeUp = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } },
  };

  const chatStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.06, delayChildren: reduceMotion ? 0 : 0.2 } },
  };

  const chatBubble = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: 10, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } } };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { href: '#funcionalidades', label: 'Funcionalidades' },
    { href: '#app', label: 'O App' },
    { href: '#como-funciona', label: 'Como Funciona' },
    { href: '#agendamento-whatsapp', label: 'Agendamento' },
    { href: '#ai-growth', label: 'AI Growth' },
    { href: '#planos', label: 'Planos' },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-inter overflow-x-hidden pb-safe">
      {/* Navbar */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-300 ${
          scrolled
            ? 'bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]'
            : 'bg-black/30 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-4 flex items-center justify-between gap-3">
          <a href="/" className="inline-flex items-center rounded-xl px-1.5 sm:px-3 py-1 sm:py-2 ring-1 ring-[#C9A227]/40 shadow-sm shrink-0 min-h-[44px]">
            <img
              src="/salonbook-logo.png"
              alt="SalonBook"
              className="h-8 sm:h-14 md:h-16 lg:h-[4.5rem] w-auto max-w-[140px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[340px] object-contain object-left"
            />
          </a>

          <div className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-white/65">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-[#D4AF37] transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a href={SALONBOOK_CTA_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:block">
              <Button className="bg-[#C9A227] hover:bg-[#D4AF37] text-black font-semibold border-0 h-9 sm:h-10 px-3 sm:px-4 text-sm">
                Teste grátis — 7 dias
              </Button>
            </a>
            <a href={appLink('/demo/dashboard')} className="hidden sm:block">
              <Button
                variant="outline"
                className="border-[#C9A227] text-[#D4AF37] hover:bg-[#C9A227] hover:text-black transition-all bg-transparent h-9 sm:h-10 px-3 sm:px-4 text-sm"
              >
                Ver demo
              </Button>
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden min-w-[44px] min-h-[44px] w-11 h-11 inline-flex items-center justify-center rounded-lg border border-white/10 text-white/80 hover:text-white hover:border-white/30 transition-colors touch-manipulation"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ${
            menuOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] space-y-0.5">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center min-h-[48px] px-3 py-3.5 rounded-lg text-white/80 hover:text-[#D4AF37] hover:bg-white/5 transition-colors text-base font-medium touch-manipulation"
              >
                {l.label}
              </a>
            ))}
            <a href={SALONBOOK_CTA_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="block pt-2">
              <Button className="w-full bg-[#C9A227] hover:bg-[#D4AF37] text-black font-semibold border-0 h-11">
                Teste grátis — 7 dias
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href={appLink('/demo/dashboard')} onClick={() => setMenuOpen(false)} className="block pt-1">
              <Button
                variant="outline"
                className="w-full border-[#C9A227]/60 text-[#D4AF37] hover:bg-[#C9A227]/10 bg-transparent font-semibold h-11"
              >
                Ver demo
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-black pt-nav-safe sm:pt-32 md:pt-36 lg:pt-40 pb-10 sm:pb-20 md:pb-24 lg:pb-12 xl:pb-14 px-4 sm:px-6 lg:min-h-[calc(100svh-9rem)] lg:flex lg:items-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-8 xl:gap-12 items-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="max-w-xl lg:max-w-lg xl:max-w-xl text-center lg:text-left mx-auto lg:mx-0"
            >
              <motion.div variants={fadeUp} className="mb-5 flex flex-col items-center lg:items-start gap-2">
                <SectionLabel icon={Sparkles}>Novo · Agendamento por IA no WhatsApp</SectionLabel>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-[1.875rem] sm:text-5xl md:text-5xl lg:text-4xl xl:text-5xl font-black text-white leading-[1.08] tracking-tight mb-4 sm:mb-5 lg:mb-4 text-balance"
              >
                O sistema completo<br />
                para <span className="text-gradient-gold">salões e barbearias</span><br />
                que crescem.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-[15px] sm:text-lg md:text-xl lg:text-base xl:text-lg text-white/65 mb-6 sm:mb-8 lg:mb-6 leading-relaxed text-pretty"
              >
                <span className="text-white font-semibold">A IA marca horários automaticamente pelo WhatsApp enquanto o profissional trabalha</span>
                <span className="sm:hidden"> — agenda, clientes, financeiro e relatórios em uma plataforma.</span>
                <span className="hidden sm:inline"> — o cliente não sai da conversa. Agenda online, gestão de clientes, controle financeiro, equipe, relatórios e IA de crescimento — tudo em uma plataforma para salões de beleza, barbearias e negócios de estética premium.</span>
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 lg:gap-3">
                <a href={SALONBOOK_CTA_URL} target="_blank" rel="noopener noreferrer" className="block">
                  <Button
                    size="lg"
                    className="bg-[#C9A227] hover:bg-white text-black px-6 py-3.5 lg:px-5 lg:py-2.5 text-base lg:text-sm xl:px-6 xl:py-3 xl:text-base font-semibold rounded-xl h-auto border-0 w-full sm:w-auto shadow-[0_8px_32px_-8px_rgba(212,175,55,0.55)] hover:shadow-[0_8px_32px_-8px_rgba(255,255,255,0.2)] transition-colors"
                  >
                    Começar teste grátis — 7 dias
                  </Button>
                </a>
                <a href={appLink('/demo/dashboard')} className="block">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#C9A227]/60 text-[#D4AF37] hover:bg-[#C9A227]/10 bg-transparent px-6 py-3.5 lg:px-5 lg:py-2.5 text-base lg:text-sm xl:px-6 xl:py-3 xl:text-base font-semibold rounded-xl h-auto w-full sm:w-auto"
                  >
                    Ver demo
                  </Button>
                </a>
              </motion.div>
              <motion.p variants={fadeUp} className="mt-3 text-xs sm:text-sm text-[#D4AF37]/90 font-medium text-center lg:text-left">
                Teste todas as funcionalidades por 7 dias sem custo. Depois, escolha o plano ideal.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-5 sm:mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs sm:text-[13px] text-white/55"
              >
                <span className="inline-flex items-center gap-1.5">
                  <div className="flex -space-x-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-white/40 text-white/40" />
                    ))}
                  </div>
                  4.9 · 2.400+ salões
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.2 : 0.6, ease: 'easeOut', delay: reduceMotion ? 0 : 0.1 }}
              className="relative z-10 w-full flex justify-center lg:justify-end -mt-2 sm:mt-0"
            >
              <motion.div className="relative w-full max-w-full sm:max-w-[480px] md:max-w-[520px] lg:max-w-none lg:w-full lg:max-w-[min(100%,36rem)] xl:max-w-[40rem] 2xl:max-w-[44rem] mx-auto lg:mx-0 lg:ml-auto">
                <img
                  src="/hero-whatsapp-phone.png"
                  alt="Cliente agenda pelo WhatsApp na conversa, com fluxo automático de serviços e horários"
                  className="block w-full h-auto max-h-[min(52svh,420px)] sm:max-h-[min(58svh,480px)] lg:max-h-[min(72svh,640px)] xl:max-h-[min(76svh,720px)] object-contain object-center bg-black"
                  loading="eager"
                  decoding="async"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-10 sm:py-16 px-4 sm:px-6 bg-[#C9A227] overflow-hidden">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(0,0,0,0.25), transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.25), transparent 40%)' }}
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center"
        >
          {[
            { value: '2.400+', label: 'Salões e barbearias ativos' },
            { value: '180k+', label: 'Agendamentos/mês' },
            { value: '98%', label: 'Taxa de retenção' },
            { value: '4.9★', label: 'Avaliação média' },
          ].map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <div className="text-2xl sm:text-4xl md:text-5xl font-black text-black mb-1 tracking-tight">{s.value}</div>
              <div className="text-xs sm:text-sm text-black/75 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section id="funcionalidades" className="relative py-10 sm:py-16 px-4 sm:px-6 bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 -z-0 pointer-events-none">
          <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] gold-orb opacity-30" />
          <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] gold-orb opacity-25" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center mb-8 sm:mb-10"
          >
            <motion.div variants={fadeUp} className="mb-4 inline-flex">
              <SectionLabel icon={Sparkles}>Plataforma completa</SectionLabel>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight leading-tight">
              Tudo que seu salão ou<br className="sm:hidden" /> barbearia precisa
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed px-2">
              A IA fecha horários pelo WhatsApp enquanto a equipe atende. Plataforma completa para operar e crescer, sem complicação.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {[
              { icon: MessagesSquare, title: 'IA marca pelo WhatsApp', desc: 'Agenda na conversa com horários em tempo real — você atende, a IA fecha os horários e você supervisiona quando quiser.' },
              { icon: Calendar, title: 'Agenda Inteligente', desc: 'Visualização por dia, semana ou profissional. Arraste, edite, confirme e acompanhe em tempo real.' },
              { icon: Users, title: 'Gestão de Clientes', desc: 'Histórico completo, frequência, ticket médio, tags automáticas e segmentação por comportamento.' },
              { icon: TrendingUp, title: 'Financeiro Simplificado', desc: 'Faturamento, ticket médio, entradas e saídas. Visão clara do dinheiro da operação.' },
              { icon: BarChart2, title: 'Relatórios Completos', desc: 'Serviços mais vendidos, profissionais mais ativos, horários de pico e tendências.' },
              { icon: Zap, title: 'AI Growth Engine', desc: 'IA detecta clientes inativos, horários fracos e gera mensagens prontas para reativação.' },
            ].map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="group relative bg-black/60 rounded-2xl gold-ring p-5 sm:p-7 transition-all sm:hover:-translate-y-1 sm:hover:shadow-[0_20px_60px_-20px_rgba(201,162,39,0.4)]"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C9A227]/0 via-transparent to-[#C9A227]/0 group-hover:from-[#C9A227]/10 group-hover:to-transparent transition-opacity pointer-events-none" />
                <div className="relative">
                  <div className="mb-4 sm:mb-5 rounded-xl w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#C9A227]/25 to-[#C9A227]/5 border border-[#C9A227]/30 text-[#D4AF37] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                    <f.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* App screens */}
      <section id="app" className="relative py-10 sm:py-16 px-4 sm:px-6 bg-black border-y border-white/10 overflow-hidden">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-10 sm:mb-14">
            <motion.div variants={fadeUp} className="mb-4 inline-flex">
              <SectionLabel icon={Sparkles}>Por dentro do app</SectionLabel>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight leading-tight">
              Tudo na palma da mão
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed px-2">
              Dashboard, agenda, financeiro e AI Growth — cada área do BarbFlow foi pensada para o dia a dia do seu salão ou barbearia.
            </motion.p>
          </div>

          <motion.div variants={stagger} className="space-y-14 sm:space-y-20 md:space-y-24">
            {appScreens.map((screen, index) => {
              const reverse = index % 2 === 1;
              const ScreenIcon = screen.icon;
              return (
                <motion.div
                  key={screen.id}
                  variants={fadeUp}
                  className={`grid grid-cols-1 md:gap-x-8 lg:gap-x-10 gap-y-6 sm:gap-y-8 items-center max-w-4xl mx-auto w-full ${
                    reverse ? 'md:grid-cols-[1fr_220px]' : 'md:grid-cols-[220px_1fr]'
                  }`}
                >
                  <motion.div
                    className={`relative w-full max-w-[168px] sm:max-w-[190px] md:max-w-[220px] mx-auto md:mx-0 ${
                      reverse
                        ? 'md:col-start-2 md:row-start-1 md:justify-self-end'
                        : 'md:col-start-1 md:row-start-1 md:justify-self-start'
                    }`}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  >
                    <motion.div
                      className="absolute -inset-3 rounded-[1.5rem] bg-gradient-to-br from-[#C9A227]/20 via-transparent to-[#C9A227]/5 blur-xl pointer-events-none"
                      aria-hidden
                    />
                    <img
                      src={screen.image}
                      alt={screen.imageAlt}
                      className="relative block w-full h-auto object-contain drop-shadow-[0_16px_32px_-10px_rgba(0,0,0,0.7)]"
                      loading="lazy"
                      decoding="async"
                    />
                  </motion.div>

                  <div
                    className={`min-w-0 text-center md:text-left ${
                      reverse ? 'md:col-start-1 md:row-start-1' : 'md:col-start-2'
                    }`}
                  >
                    <motion.div variants={fadeUp} className="mb-4 flex justify-center md:justify-start">
                      <SectionLabel icon={ScreenIcon}>{screen.title}</SectionLabel>
                    </motion.div>
                    <motion.h3
                      variants={fadeUp}
                      className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 tracking-tight leading-tight"
                    >
                      {screen.title}
                    </motion.h3>
                    <motion.p
                      variants={fadeUp}
                      className="text-base sm:text-lg text-white/65 leading-relaxed max-w-none"
                    >
                      {screen.description}
                    </motion.p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="relative py-10 sm:py-16 px-4 sm:px-6 bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 -z-0 pointer-events-none bg-grid mask-radial-fade opacity-50" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center mb-8 sm:mb-10"
          >
            <motion.div variants={fadeUp} className="mb-4 inline-flex">
              <SectionLabel icon={Zap}>Passo a passo</SectionLabel>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight">Como funciona</motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-base sm:text-lg px-2">
              Em minutos, seu salão ou barbearia está operando com o BarbFlow
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          >
            {[
              { step: '01', title: 'Cadastre seu salão ou barbearia', desc: 'Configure nome, logo, serviços e profissionais em minutos.' },
              { step: '02', title: 'Vincule o WhatsApp ao app', desc: 'Conecte o número do negócio por QR Code ou código de pareamento, direto no aplicativo.' },
              { step: '03', title: 'Clientes agendam pelo WhatsApp', desc: 'A IA fecha horários na conversa — a agenda atualiza sozinha enquanto você atende.' },
              { step: '04', title: 'Gerencie e cresça', desc: 'Painel completo para operar, com IA orientando o crescimento.' },
            ].map((s, i) => (
              <motion.div key={s.step} variants={fadeUp} className="relative text-center">
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+44px)] w-[calc(100%-88px)] h-px bg-gradient-to-r from-[#C9A227]/40 to-transparent" />
                )}
                <div className="relative w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#C9A227] text-black rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-5 shadow-[0_0_28px_-4px_rgba(212,175,55,0.7)] ring-1 ring-[#D4AF37]/30">
                  {s.step}
                </div>
                <h3 className="font-bold text-white mb-2 text-base sm:text-base">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WhatsApp scheduling flow */}
      <section id="agendamento-whatsapp" className="relative pt-10 sm:pt-14 pb-6 sm:pb-8 px-4 sm:px-6 bg-neutral-950 border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 -z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] gold-orb opacity-25" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex mb-4 sm:mb-5">
              <SectionLabel icon={MessageCircle}>Fluxo real no WhatsApp</SectionLabel>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight leading-tight">
              Como a IA agenda<br className="sm:hidden" /> pelo WhatsApp
            </h2>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed px-2">
              O cliente conversa no WhatsApp do salão. A assistente consulta serviços, profissionais e horários reais da agenda — e registra tudo automaticamente, sem você sair do atendimento.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_340px] gap-6 sm:gap-8 lg:gap-10 items-start">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
            >
              {[
                { icon: MessageCircle, title: 'Cliente chama no WhatsApp', desc: 'A IA entende o pedido e já carrega serviços, profissionais e horários do salão.' },
                { icon: Scissors, title: 'Escolha na conversa', desc: 'Serviço, profissional, dia e horário livre — uma pergunta por vez, sem sair do chat.' },
                { icon: CheckCircle, title: 'Confirma e registra', desc: 'Resumo do agendamento e horário entra na agenda do BarbFlow na hora.' },
                { icon: BellRing, title: 'Lembrete e remarcação', desc: 'Aviso 1h antes e opção de confirmar, cancelar ou remarcar pelo mesmo WhatsApp.' },
              ].map((step, i) => (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  className="flex flex-col gap-3 p-4 sm:p-5 h-full rounded-2xl border border-white/10 bg-black/60 hover:border-[#C9A227]/40 hover:bg-black/80 transition-colors"
                >
                  <motion.div
                    className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#C9A227]/25 to-[#C9A227]/5 border border-[#C9A227]/30 flex items-center justify-center text-[#D4AF37]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <step.icon className="w-5 h-5" />
                  </motion.div>
                  <motion.div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]/80 block mb-1">
                      Passo {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-bold text-white mb-1 text-[15px] sm:text-base">{step.title}</h3>
                    <p className="text-[13px] sm:text-sm text-white/60 leading-relaxed">{step.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="order-first lg:order-none lg:sticky lg:top-28 mx-auto w-full max-w-[260px] mb-2 lg:mb-0"
            >
              <motion.div className="phone-mockup">
                <motion.div className="phone-mockup__screen">
                  <motion.div className="phone-mockup__status shrink-0">
                    <span className="relative z-10">9:41</span>
                    <motion.div className="phone-mockup__notch" aria-hidden />
                    <span className="relative z-10 flex items-center gap-1 text-[10px]">
                      <span className="opacity-90">●●●</span>
                      <span className="opacity-70">▮</span>
                    </span>
                  </motion.div>
                  <motion.div
                  className="shrink-0 px-2.5 py-1.5 bg-[#075E54] flex items-center gap-2 border-b border-white/10"
                  initial={{ opacity: 0, y: -8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="w-7 h-7 rounded-full bg-[#C9A227]/30 flex items-center justify-center text-[9px] font-bold text-[#D4AF37]">
                    SB
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 }}
                  >
                    <motion.div className="text-[13px] font-semibold text-white leading-tight" animate={{ opacity: [1, 0.85, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                      Assistente SalonBook
                    </motion.div>
                    <div className="text-[10px] text-white/60">online · responde na hora</div>
                  </motion.div>
                </motion.div>
                <motion.div variants={chatStagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="phone-mockup__chat bg-[#0b141a]">
                  <motion.div className="phone-mockup__chat-flow">
                  {[
                    { from: 'client', text: 'Oi, quero marcar um corte' },
                    { from: 'bot', text: 'Olá! Bem-vindo ao salão 👋\nQual é o seu nome completo?' },
                    { from: 'client', text: 'João Silva' },
                    { from: 'bot', text: 'Serviços disponíveis:\n1️⃣ Corte Degradê — R$50 (45 min)\n2️⃣ Barba Completa — R$40 (30 min)\n3️⃣ Combo Corte+Barba — R$80 (75 min)\n\nQual serviço? (responda com o número)' },
                    { from: 'client', text: '1' },
                    { from: 'bot', text: 'Por favor, escolha um barbeiro:\n1️⃣ João Silva\n2️⃣ Pedro Santos\n\n👇 Digite o número ou o nome' },
                    { from: 'client', text: '1' },
                    { from: 'bot', text: 'Para qual dia você gostaria de agendar?\nHoje é 14/05/2026 (sexta-feira).' },
                    { from: 'client', text: 'Sexta' },
                    { from: 'bot', text: 'Horários livres com João Silva:\n☀️ Manhã: 09:00 · 10:00\n🌤️ Tarde: 14:00 · 15:30\n\nQual horário prefere?' },
                    { from: 'client', text: '14:00' },
                    { from: 'bot', text: '✅ Agendado com sucesso!\n\nCorte Degradê · João Silva\nSex. 14/05 às 14:00 · R$50\n\nLembrete automático 1h antes no WhatsApp.' },
                  ].map((msg, idx) => (
                    <motion.div
                      key={idx}
                      variants={chatBubble}
                      className={`flex shrink-0 ${msg.from === 'client' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[92%] rounded-lg px-2 py-[3px] text-[10px] leading-[1.35] whitespace-pre-line ${
                          msg.from === 'client'
                            ? 'bg-[#005C4B] text-white rounded-br-md'
                            : 'bg-[#1f2c34] text-white/90 rounded-bl-md border border-white/5'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  </motion.div>
                </motion.div>
                  <div className="phone-mockup__home shrink-0">
                    <div className="phone-mockup__home-bar" aria-hidden />
                  </div>
                </motion.div>
              </motion.div>
              <motion.p variants={fadeUp} className="text-center text-[11px] text-white/40 mt-2 px-2 leading-snug">
                Exemplo simplificado do fluxo BarbFlow — Agendamento Inteligente (n8n + agenda em tempo real).
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Growth */}
      <section id="ai-growth" className="relative pt-4 sm:pt-6 pb-10 sm:pb-16 px-4 sm:px-6 bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 -z-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] gold-orb opacity-20" />
        </div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative max-w-7xl mx-auto grid md:grid-cols-[1fr_220px] md:gap-x-8 lg:gap-x-10 gap-y-8 items-center"
        >
          <motion.div variants={fadeUp} className="min-w-0 text-center md:text-left md:col-start-1">
            <motion.div variants={fadeUp} className="mb-5 sm:mb-6 flex justify-center md:justify-start">
              <SectionLabel icon={Zap}>AI Growth Engine</SectionLabel>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-white mb-5 sm:mb-6 tracking-tight leading-tight">
              IA que trabalha<br className="sm:hidden" /> enquanto você atende
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 mb-4 leading-relaxed text-base sm:text-lg">
              No AI Growth envie mensagens automáticas para clientes sumidos. O sistema identifica quem parou de voltar, monta a mensagem e você dispara pelo WhatsApp em um clique.
            </motion.p>
            <motion.p variants={fadeUp} className="text-white/50 mb-7 sm:mb-8 leading-relaxed text-sm sm:text-base">
              Estratégias para aumentar seu faturamento — clientes VIP, horários vazios e reativação com mensagem pronta.
            </motion.p>
            <motion.div variants={stagger} className="space-y-3">
              {['Detecção de clientes inativos', 'Mensagens prontas para reativação', 'Envio direto pelo WhatsApp', 'Recalcular oportunidades a qualquer momento'].map((f) => (
                <motion.div variants={fadeUp} key={f} className="flex items-center justify-center md:justify-start gap-3 text-sm font-medium text-white/85">
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                  {f}
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8 flex justify-center md:justify-start">
              <a href={appLink('/demo/ai-growth')} className="inline-block w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-[#C9A227] text-black hover:bg-[#D4AF37] border-0 h-11 px-6 shadow-[0_8px_28px_-8px_rgba(212,175,55,0.5)]">
                  Ver AI Growth na Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative w-full max-w-[168px] sm:max-w-[190px] md:max-w-[220px] mx-auto md:mx-0 md:col-start-2 md:justify-self-end"
            whileHover={reduceMotion ? undefined : { y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            <motion.div
              className="absolute -inset-3 rounded-[1.5rem] bg-gradient-to-br from-[#C9A227]/20 via-transparent to-[#C9A227]/5 blur-xl pointer-events-none"
              aria-hidden
            />
            <img
              src="/app-ai-growth.png"
              alt="Tela AI Growth com recuperação de cliente VIP e envio de mensagem pelo WhatsApp"
              className="relative block w-full h-auto object-contain drop-shadow-[0_16px_32px_-10px_rgba(0,0,0,0.7)]"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Pricing */}
      <section id="planos" className="relative py-10 sm:py-16 px-4 sm:px-6 bg-black border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 -z-0 pointer-events-none bg-grid mask-radial-fade opacity-40" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center mb-8 sm:mb-10"
          >
            <motion.div variants={fadeUp} className="mb-4 inline-flex">
              <SectionLabel icon={Sparkles}>Planos</SectionLabel>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight">
              Planos simples e claros
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-base sm:text-base px-2 max-w-2xl mx-auto">
              <span className="text-[#D4AF37] font-semibold">7 dias de teste grátis</span> em qualquer plano.
              Depois, pague só o valor mensal do plano escolhido.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-5xl mx-auto"
          >
            {[
              { name: 'Starter', price: 'R$89,00', per: '/mês', desc: 'Para salões e barbearias que estão começando', features: ['Até 2 profissionais', 'Agenda online', 'Gestão de clientes', 'Agendamento automático pelo WhatsApp — 24h, 7 dias por semana', 'Controle financeiro completo da barbearia', 'AI Growth: contato automático com clientes sumidos'] },
              { name: 'Pro', price: 'R$189,00', per: '/mês', desc: 'Para salões e barbearias em crescimento', features: ['Até 8 profissionais', 'Agenda online', 'Gestão de clientes', 'Agendamento automático pelo WhatsApp — 24h, 7 dias por semana', 'Controle financeiro completo da barbearia', 'AI Growth: contato automático com clientes sumidos'], highlight: true },
              { name: 'Enterprise', price: 'R$389,00', per: '/mês', desc: 'Para redes, salões premium e barbearias', features: ['Profissionais ilimitados', 'Agenda online', 'Gestão de clientes', 'Agendamento automático pelo WhatsApp — 24h, 7 dias por semana', 'Controle financeiro completo da barbearia', 'AI Growth: contato automático com clientes sumidos'] },
            ].map((p) => (
              <motion.div
                key={p.name}
                variants={fadeUp}
                className={`relative rounded-3xl p-6 sm:p-7 md:p-8 border transition-all sm:hover:-translate-y-1 ${
                  p.highlight
                    ? 'bg-gradient-to-br from-[#D4AF37] to-[#C9A227] border-[#D4AF37] shadow-[0_20px_60px_-12px_rgba(212,175,55,0.55)] lg:scale-[1.02] xl:scale-105'
                    : 'bg-neutral-950/80 border-white/10 hover:border-[#C9A227]/40 backdrop-blur-sm'
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black text-[10px] sm:text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/40 shadow-md uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    Mais popular
                  </div>
                )}
                <div className={`text-sm font-semibold mb-2 ${p.highlight ? 'text-black/70' : 'text-white/55'}`}>{p.name}</div>
                <div className={`text-4xl sm:text-5xl font-black mb-1 tracking-tight ${p.highlight ? 'text-black' : 'text-white'}`}>
                  {p.price}
                  <span className={`text-base sm:text-lg font-normal ${p.highlight ? 'text-black/60' : 'text-white/45'}`}>{p.per}</span>
                </div>
                <div className={`text-sm mb-3 ${p.highlight ? 'text-black/70' : 'text-white/60'}`}>{p.desc}</div>
                <p className={`text-xs font-bold uppercase tracking-wide mb-6 sm:mb-8 ${p.highlight ? 'text-black/80' : 'text-[#D4AF37]'}`}>
                  7 dias grátis para testar
                </p>
                <div className="space-y-2.5 sm:space-y-3 mb-7 sm:mb-8">
                  {p.features.map((f) => (
                    <div key={f} className={`flex items-start gap-2 text-sm leading-snug ${p.highlight ? 'text-black/90' : 'text-white/75'}`}>
                      <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${p.highlight ? 'text-black' : 'text-[#D4AF37]'}`} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <a href={SALONBOOK_CTA_URL} target="_blank" rel="noopener noreferrer" className="block">
                  <Button
                    className={`w-full h-11 border-0 font-semibold ${
                      p.highlight
                        ? 'bg-black text-white hover:bg-black/90'
                        : 'bg-[#C9A227] text-black hover:bg-[#D4AF37]'
                    }`}
                  >
                    Começar teste grátis
                  </Button>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-10 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-[#C9A227] via-[#D4AF37] to-[#B8941F] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(0,0,0,0.4), transparent 45%), radial-gradient(circle at 75% 70%, rgba(0,0,0,0.35), transparent 45%)' }}
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-5 sm:mb-6 tracking-tight leading-tight">
            Pronto para transformar<br className="sm:hidden" /> seu salão ou barbearia?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-black/75 text-base sm:text-lg mb-8 sm:mb-10 px-2">
            Comece com <span className="font-bold text-black">7 dias de teste grátis</span> ou explore a demo completa na prática.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={SALONBOOK_CTA_URL} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-black text-white hover:bg-black/90 px-8 sm:px-10 py-3.5 sm:py-4 text-base font-bold h-auto border-0 rounded-xl shadow-[0_18px_44px_-12px_rgba(0,0,0,0.55)]"
              >
                Começar teste grátis — 7 dias
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href={appLink('/demo/dashboard')} className="inline-block w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-black/30 text-black hover:bg-black/10 bg-transparent px-8 sm:px-10 py-3.5 sm:py-4 text-base font-bold h-auto rounded-xl"
              >
                Ver demo
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 sm:py-12 px-5 sm:px-6 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src="/salonbook-logo.png"
            alt="SalonBook"
            className="h-9 sm:h-10 md:h-11 w-auto max-w-[200px] sm:max-w-[220px] object-contain object-left"
          />
          <p className="text-white/40 text-xs sm:text-sm text-center">© 2026 BarbFlow. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
