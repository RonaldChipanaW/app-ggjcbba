import React, { useState, useEffect } from 'react';
import logo from '../src/assets/LogoGGJC.svg';
import f1 from '../src/assets/foto1.jpg';
import { 
  Gamepad2, 
  Code2, 
  Cpu, 
  MapPin, 
  Calendar, 
  Users, 
  Zap, 
  ChevronRight, 
  Terminal,
  Menu,
  X,
  Rocket
} from 'lucide-react';

// --- ESTILOS PERSONALIZADOS & ANIMACIONES ---
// Inyectamos estilos CSS para efectos avanzados que Tailwind por defecto no tiene (Scanlines, Grid, Glitch)
const CustomStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@300;500;700&display=swap');

    :root {
      --neon-purple: #a855f7;
      --neon-cyan: #06b6d4;
    }

    body {
      background-color: #020617;
      color: #e2e8f0;
      font-family: 'Space Grotesk', sans-serif;
      overflow-x: hidden;
    }

    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }

    /* Fondo de Cuadrícula Animado */
    .bg-grid {
      background-size: 50px 50px;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
      mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
    }

    /* Efecto CRT Scanline */
    .scanline {
      width: 100%;
      height: 100px;
      z-index: 50;
      background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(0,0,0,0) 100%);
      opacity: 0.1;
      position: fixed;
      bottom: 100%;
      animation: scanline 10s linear infinite;
      pointer-events: none;
    }

    @keyframes scanline {
      0% { bottom: 100%; }
      100% { bottom: -100px; }
    }

    /* Animación de Flotar */
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }

    /* Efecto Glow en textos */
    .text-glow {
      text-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
    }
    
    .card-hover:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px -10px rgba(168, 85, 247, 0.3);
      border-color: rgba(168, 85, 247, 0.5);
    }
  `}</style>
);

// --- COMPONENTES UI REUTILIZABLES ---

const Button = ({ children, primary = false, onClick, className = "" }: { children: React.ReactNode, primary?: boolean, onClick?: () => void, className?: string }) => (
  <button 
    onClick={onClick}
    className={`
      relative overflow-hidden group px-6 py-3 font-mono font-bold uppercase tracking-wider transition-all duration-300
      border-2 
      ${primary 
        ? 'bg-purple-600 border-purple-600 text-white hover:bg-purple-700 hover:border-purple-700' 
        : 'bg-transparent border-cyan-500 text-cyan-400 hover:bg-cyan-500/10'}
      ${className}
    `}
  >
    <span className="relative z-10 flex items-center gap-2">{children}</span>
    {/* Efecto de brillo al hover */}
    <div className="absolute inset-0 h-full w-full scale-0 rounded-md transition-all duration-300 group-hover:scale-100 group-hover:bg-white/5"></div>
  </button>
);

const Card = ({ children, title, icon: Icon, delay = 0 }: { children: React.ReactNode, title: string, icon: any, delay?: number }) => (
  <div 
    className="card-hover relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-xl transition-all duration-300"
    style={{ animation: `fadeIn 0.5s ease-out forwards ${delay}s`, opacity: 0, animationFillMode: 'forwards' }}
  >
    <div className="absolute top-0 right-0 p-3 opacity-20">
      <Icon size={48} />
    </div>
    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
      <Icon className="text-purple-400" size={20} />
      {title}
    </h3>
    <div className="text-slate-400 leading-relaxed">
      {children}
    </div>
    
    {/* Decoración de esquinas estilo Tech */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-purple-500 rounded-tl-md"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500 rounded-br-md"></div>
  </div>
);

// --- PÁGINAS ---

const HomePage = ({ navigate }: { navigate: (page: string) => void }) => {
  return (
    <div className="relative z-10">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 pt-20 overflow-hidden">
        
        {/* --- NUEVO FONDO DE PORTADA --- */}
        <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
            {/* Imagen de fondo */}
            <img 
              src={f1} 
              alt="Background Ambient" 
              className="w-full h-full object-cover opacity-60 mix-blend-screen grayscale-[30%]"
            />
            {/* Gradiente Overlay: Se mezcla con el color de fondo (#020617) para que la imagen se desvanezca sutilmente */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-[#020617]/60"></div>
            <div className="absolute inset-0 bg-[#020617]/40 backdrop-blur-[1px]"></div>
        </div>

        {/* Contenido (Aseguramos z-index para que esté sobre la imagen) */}
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
            <div className="mb-4 inline-block px-4 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 font-mono text-sm animate-pulse">
            &lt; System.Ready /&gt;
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter text-white drop-shadow-2xl">
            GLOBAL GAME JAM
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 text-glow mt-2">
                COCHABAMBA 2026
            </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 font-light drop-shadow-md">
            48 horas para crear, colaborar e innovar. El evento de desarrollo de videojuegos más grande del mundo aterriza en la Llajta.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
            <Button primary onClick={() => navigate('register')}>
                Inscribirse Ahora <ChevronRight size={18} />
            </Button>
            <Button onClick={() => navigate('schedule')}>
                Ver Cronograma
            </Button>
            </div>

            {/* Floating 3D Graphic Placeholder */}
            <div className="mt-16 animate-float opacity-80">
            <Gamepad2 size={120} className="text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            </div>
        </div>
      </section>

      {/* Info Stats */}
      <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card title="Creatividad" icon={Zap} delay={0.1}>
            Libera tu imaginación. No importa tu nivel de experiencia, lo importante es atreverse a crear algo único desde cero.
          </Card>
          <Card title="Comunidad" icon={Users} delay={0.2}>
            Conecta con programadores, artistas, músicos y diseñadores de Cochabamba. Haz networking y forma tu dream team.
          </Card>
          <Card title="Aprendizaje" icon={Code2} delay={0.3}>
            Aprende nuevas herramientas, mejora tus habilidades de trabajo en equipo y recibe feedback de mentores expertos.
          </Card>
        </div>
      </section>
    </div>
  );
};

const SchedulePage = () => {
  const events = [
    { time: "Viernes 17:00", title: "Check-in & Bienvenida", desc: "Registro de participantes y entrega de swags.", type: "start" },
    { time: "Viernes 18:00", title: "Keynote & Tema", desc: "Revelación del tema oficial de la GGJ 2025.", type: "key" },
    { time: "Viernes 19:00", title: "Formación de Equipos", desc: "Dinámicas para encontrar equipo.", type: "normal" },
    { time: "Sábado 12:00", title: "Mentoria Ronda 1", desc: "Feedback de expertos sobre prototipos.", type: "normal" },
    { time: "Domingo 15:00", title: "Subida de Juegos", desc: "Deadline para subir ejecutables.", type: "alert" },
    { time: "Domingo 17:00", title: "Showcase & Demos", desc: "Presentación final de proyectos.", type: "end" },
  ];

  return (
    <div className="pt-24 px-4 max-w-4xl mx-auto min-h-screen">
      <h2 className="text-4xl font-bold mb-10 border-b border-slate-800 pb-4 text-white flex items-center gap-3">
        <Calendar className="text-cyan-400" /> Cronograma
      </h2>
      
      <div className="space-y-6 relative border-l-2 border-slate-800 ml-4 pl-8 md:pl-12">
        {events.map((evt, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline dot */}
            <div className={`
              absolute -left-[43px] md:-left-[59px] top-1 w-6 h-6 rounded-full border-4 border-[#020617] 
              ${evt.type === 'key' ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]' : 
                evt.type === 'alert' ? 'bg-red-500' : 'bg-slate-600'}
            `}></div>
            
            <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-lg hover:border-purple-500/50 transition-colors">
              <span className="font-mono text-cyan-400 text-sm mb-1 block">{evt.time}</span>
              <h3 className="text-xl font-bold text-white mb-2">{evt.title}</h3>
              <p className="text-slate-400">{evt.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LocationPage = () => (
  <div className="pt-24 px-4 max-w-5xl mx-auto min-h-screen">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-4xl font-bold mb-6 text-white flex items-center gap-3">
          <MapPin className="text-purple-400" /> Ubicación
        </h2>
        <div className="space-y-6 text-lg text-slate-300">
          <p>
            La GGJ Cochabamba se llevará a cabo en las instalaciones de la 
            <strong className="text-white"> Universidad Católica Boliviana (UCB)</strong>.
          </p>
          <div className="bg-slate-900/80 p-6 rounded-lg border border-slate-700">
            <h4 className="font-mono text-cyan-400 mb-2">// DIRECCIÓN</h4>
            <p className="mb-4">Calle M. Marquez, Cochabamba</p>
            <h4 className="font-mono text-cyan-400 mb-2">// AMBIENTES</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>Labs de Computación Alta Gama</li>
              <li>Área de descanso 24/7</li>
              <li>Cafetería con snacks gratuitos</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Mapa Abstracto / Mockup */}
      <div className="relative h-96 bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 flex items-center justify-center group">
        <div className="absolute inset-0 bg-[url('_DSC0011.jpg')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-500 mix-blend-overlay"></div>
        <div className="relative z-10 text-center">
            <MapPin size={64} className="mx-auto text-purple-500 mb-4 animate-bounce" />
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur px-6 py-2 rounded-full border border-white/30 text-white transition">
                Ver en Google Maps
            </button>
        </div>
      </div>
    </div>
  </div>
);

const MentorsPage = () => {
    // Datos ficticios para el ejemplo
    const mentors = [
        { name: "Andrea P.", role: "Game Designer", exp: "Ubisoft" },
        { name: "Carlos M.", role: "Unity Dev", exp: "Indie" },
        { name: "Lucia R.", role: "3D Artist", exp: "Freelance" },
        { name: "David T.", role: "Sound Engineer", exp: "Berklee" },
    ];

    return (
        <div className="pt-24 px-4 max-w-6xl mx-auto min-h-screen">
             <h2 className="text-4xl font-bold mb-10 text-white flex items-center gap-3">
                <Terminal className="text-green-400" /> Mentores & Jurados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mentors.map((m, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-center group hover:border-cyan-500 transition-all">
                        <div className="w-24 h-24 bg-slate-800 rounded-full mx-auto mb-4 overflow-hidden relative">
                             {/* Placeholder de avatar */}
                             <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-bold text-2xl bg-gradient-to-br from-slate-700 to-slate-900">
                                {m.name.charAt(0)}
                             </div>
                        </div>
                        <h3 className="text-xl font-bold text-white">{m.name}</h3>
                        <p className="text-purple-400 font-mono text-sm mb-2">{m.role}</p>
                        <p className="text-slate-500 text-xs uppercase tracking-widest">{m.exp}</p>
                    </div>
                ))}
            </div>
            
            <div className="mt-16 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 p-8 rounded-2xl border border-white/10 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">¿Quieres ser mentor?</h3>
                <p className="text-slate-400 mb-6">Buscamos expertos locales para guiar a la próxima generación de desarrolladores.</p>
                <Button>Aplicar como Mentor</Button>
            </div>
        </div>
    )
}

// --- APP PRINCIPAL (ROUTING & LAYOUT) ---

const Navbar = ({ activePage, setPage, mobileMenuOpen, setMobileMenuOpen }: any) => {
  const links = [
    { id: 'home', label: 'Inicio' },
    { id: 'schedule', label: 'Cronograma' },
    { id: 'location', label: 'Ubicación' },
    { id: 'mentors', label: 'Mentores' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-2 font-bold text-xl tracking-tighter cursor-pointer text-white"
            onClick={() => setPage('home')}
          >
            <img src={logo} alt="GGJ Logo" className="h-10 w-auto object-contain" />
            <span className="flex items-center">GGJ<span className="text-cyan-400">C</span></span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setPage(link.id)}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 font-mono
                    ${activePage === link.id 
                      ? 'text-cyan-400 bg-cyan-500/10' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'}
                  `}
                >
                  {link.label}
                </button>
              ))}
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded text-sm font-bold transition">
                Login
              </button>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#020617] border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => { setPage(link.id); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
    <footer className="bg-[#01040f] border-t border-slate-800 pt-12 pb-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
                <h3 className="text-xl font-bold text-white mb-4">GGJ Cochabamba</h3>
                <p className="text-slate-500 text-sm">
                    Parte del evento de creación de juegos más grande del mundo. 
                    Organizado por la comunidad de desarrolladores de Bolivia.
                </p>
            </div>
            <div>
                <h4 className="text-white font-bold mb-4">Enlaces</h4>
                <ul className="space-y-2 text-slate-500 text-sm">
                    <li className="hover:text-cyan-400 cursor-pointer">Código de Conducta</li>
                    <li className="hover:text-cyan-400 cursor-pointer">Kit de Prensa</li>
                    <li className="hover:text-cyan-400 cursor-pointer">Recursos para Jammers</li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold mb-4">Síguenos</h4>
                <div className="flex gap-4">
                    {/* Social Icons Placeholders */}
                    <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-purple-600 cursor-pointer transition">IG</div>
                    <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-blue-600 cursor-pointer transition">FB</div>
                    <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-black cursor-pointer transition">X</div>
                </div>
            </div>
        </div>
        <div className="text-center text-slate-700 text-xs font-mono border-t border-slate-900 pt-6">
            © 2025 Global Game Jam Cochabamba. Built with React & ☕.
        </div>
    </footer>
);

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Efecto simple para scroll top al cambiar de página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const renderPage = () => {
    switch(activePage) {
      case 'home': return <HomePage navigate={setActivePage} />;
      case 'schedule': return <SchedulePage />;
      case 'location': return <LocationPage />;
      case 'mentors': return <MentorsPage />;
      default: return <HomePage navigate={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-purple-500 selection:text-white">
      <CustomStyles />
      
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid z-0 pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-transparent to-[#020617] z-0 pointer-events-none"></div>
      <div className="scanline z-50"></div>

      <Navbar 
        activePage={activePage} 
        setPage={setActivePage} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="relative z-10 transition-opacity duration-500 ease-in-out">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}