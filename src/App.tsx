/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Dumbbell, 
  Play, 
  User as UserIcon, 
  Settings, 
  ChevronRight, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  Search
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock Data for Preview
const MOCK_MACHINES = [
  // PERNAS (1-10)
  { id: '1', name: 'Leg Press 45º', category: 'Pernas' as const, description: 'Trabalho completo de membros inferiores.', muscles: ['Quadríceps', 'Glúteos'], learned: true, video: '/videos/legpress.mp4' },
  { id: '2', name: 'Cadeira Extensora', category: 'Pernas' as const, description: 'Isolamento total do quadríceps.', muscles: ['Quadríceps'], learned: false, video: '/videos/extensora.mp4' },
  { id: '3', name: 'Cadeira Flexora', category: 'Pernas' as const, description: 'Foco nos isquiotibiais (posterior).', muscles: ['Isquiotibiais'], learned: false, video: '/videos/flexora.mp4' },
  { id: '4', name: 'Hack Squat', category: 'Pernas' as const, description: 'Agachamento guiado com segurança.', muscles: ['Quadríceps', 'Glúteos'], learned: false, video: '/videos/hack.mp4' },
  { id: '5', name: 'Cadeira Adutora', category: 'Pernas' as const, description: 'Trabalha a parte interna da coxa.', muscles: ['Adutores'], learned: false, video: '/videos/adutora.mp4' },
  { id: '21', name: 'Cadeira Abdutora', category: 'Pernas' as const, description: 'Trabalha a parte externa do glúteo.', muscles: ['Glúteo Médio'], learned: false, video: '/videos/abdutora.mp4' },
  { id: '22', name: 'Mesa Flexora', category: 'Pernas' as const, description: 'Posterior de coxa deitado.', muscles: ['Isquiotibiais'], learned: false, video: '/videos/mesaflexora.mp4' },
  { id: '23', name: 'Panturrilha Sentado', category: 'Pernas' as const, description: 'Isolamento de sóleo.', muscles: ['Panturrilha'], learned: false, video: '/videos/panturrilha.mp4' },
  { id: '24', name: 'Agachamento Smith', category: 'Pernas' as const, description: 'Agachamento na barra guiada.', muscles: ['Quadríceps', 'Glúteos'], learned: false, video: '/videos/smith.mp4' },
  { id: '25', name: 'Glúteo Máquina', category: 'Pernas' as const, description: 'Extensão de quadril isolada.', muscles: ['Glúteo Maior'], learned: false, video: '/videos/gluteo.mp4' },
  
  // PEITO (11-15)
  { id: '6', name: 'Supino Reto (Máquina)', category: 'Peito' as const, description: 'Desenvolvimento de peitoral guiado.', muscles: ['Peitoral Maior'], learned: false, video: '/videos/supino_maq.mp4' },
  { id: '7', name: 'Peck Deck (Voador)', category: 'Peito' as const, description: 'Isolamento e abertura de peitoral.', muscles: ['Peitoral Maior'], learned: false, video: '/videos/peckdeck.mp4' },
  { id: '8', name: 'Cross Over', category: 'Peito' as const, description: 'Trabalho de cabos para definição.', muscles: ['Peitoral'], learned: false, video: '/videos/crossover.mp4' },
  { id: '26', name: 'Supino Inclinado Máquina', category: 'Peito' as const, description: 'Parte superior do peitoral.', muscles: ['Peitoral Superior'], learned: false, video: '/videos/inclinado.mp4' },
  { id: '27', name: 'Crucifixo Máquina', category: 'Peito' as const, description: 'Abertura isolada de peitoral.', muscles: ['Peitoral'], learned: false, video: '/videos/crucifixo.mp4' },

  // COSTAS (16-20)
  { id: '9', name: 'Puxada Aberta Pulley', category: 'Costas' as const, description: 'Largura das costas e latíssimo.', muscles: ['Latíssimo'], learned: false, video: '/videos/puxada.mp4' },
  { id: '10', name: 'Remada Baixa', category: 'Costas' as const, description: 'Espessura das costas.', muscles: ['Romboides', 'Trapézio'], learned: false, video: '/videos/remada.mp4' },
  { id: '11', name: 'Pulldown Corda', category: 'Costas' as const, description: 'Isolamento de grande dorsal.', muscles: ['Latíssimo'], learned: false, video: '/videos/pulldown.mp4' },
  { id: '28', name: 'Remada Articulada', category: 'Costas' as const, description: 'Remada com pegada neutra.', muscles: ['Costas'], learned: false, video: '/videos/remada_art.mp4' },
  { id: '29', name: 'Gravitron (Barra Fixa)', category: 'Costas' as const, description: 'Puxada com auxílio de carga.', muscles: ['Dorsais'], learned: false, video: '/videos/gravitron.mp4' },

  // OMBROS (21-25)
  { id: '12', name: 'Desenvolvimento Máquina', category: 'Ombros' as const, description: 'Força e volume nos deltoides.', muscles: ['Deltoide Anterior'], learned: false, video: '/videos/desenv.mp4' },
  { id: '13', name: 'Elevação Lateral', category: 'Ombros' as const, description: 'Largura e formato dos ombros.', muscles: ['Deltoide Lateral'], learned: false, video: '/videos/lateral.mp4' },
  { id: '30', name: 'Posterior de Ombro Máquina', category: 'Ombros' as const, description: 'Deltoide posterior e trapézio.', muscles: ['Deltoide Posterior'], learned: false, video: '/videos/posterior.mp4' },
  { id: '31', name: 'Elevação Frontal Cabo', category: 'Ombros' as const, description: 'Parte frontal dos ombros.', muscles: ['Deltoide Anterior'], learned: false, video: '/videos/frontal.mp4' },
  { id: '32', name: 'Encolhimento Halter', category: 'Ombros' as const, description: 'Trabalho de trapézio superior.', muscles: ['Trapézio'], learned: false, video: '/videos/encolhimento.mp4' },

  // BRAÇOS (26-30)
  { id: '14', name: 'Rosca Direta Polia', category: 'Braços' as const, description: 'Bíceps com tensão constante.', muscles: ['Bíceps'], learned: false, video: '/videos/rosca.mp4' },
  { id: '15', name: 'Tríceps Pulley', category: 'Braços' as const, description: 'Extensão de cotovelos.', muscles: ['Tríceps'], learned: false, video: '/videos/triceps.mp4' },
  { id: '33', name: 'Tríceps Corda', category: 'Braços' as const, description: 'Foco na cabeça longa do tríceps.', muscles: ['Tríceps'], learned: false, video: '/videos/corda.mp4' },
  { id: '34', name: 'Rosca Martelo Halter', category: 'Braços' as const, description: 'Trabalho de braquial e antebraço.', muscles: ['Bíceps', 'Braquial'], learned: false, video: '/videos/martelo.mp4' },
  { id: '35', name: 'Banco Scott Máquina', category: 'Braços' as const, description: 'Bíceps isolado com apoio.', muscles: ['Bíceps'], learned: false, video: '/videos/scott.mp4' },

  // ABDÔMEN (31-35)
  { id: '16', name: 'Abdominal Máquina', category: 'Abdômen' as const, description: 'Fortalecimento do core.', muscles: ['Reto Abdominal'], learned: false, video: '/videos/abs.mp4' },
  { id: '36', name: 'Elevação de Pernas', category: 'Abdômen' as const, description: 'Foco no infra abdominal.', muscles: ['Abdominal Inferior'], learned: false, video: '/videos/infra.mp4' },
  { id: '37', name: 'Torção de Tronco', category: 'Abdômen' as const, description: 'Foco nos oblíquos.', muscles: ['Oblíquos'], learned: false, video: '/videos/obliquos.mp4' },

  // CARDIO (36-40)
  { id: '17', name: 'Esteira', category: 'Cardio' as const, description: 'Caminhada ou corrida.', muscles: ['Coração', 'Pernas'], learned: false, video: '/videos/esteira.mp4' },
  { id: '18', name: 'Bicicleta', category: 'Cardio' as const, description: 'Pedalada de alto gasto calórico.', muscles: ['Quadríceps'], learned: false, video: '/videos/bike.mp4' },
  { id: '19', name: 'Elíptico', category: 'Cardio' as const, description: 'Cardio de baixo impacto.', muscles: ['Corpo Todo'], learned: false, video: '/videos/eliptico.mp4' },
  { id: '20', name: 'Escada', category: 'Cardio' as const, description: 'Subida infinita de degraus.', muscles: ['Glúteos', 'Pernas'], learned: false, video: '/videos/escada.mp4' },
  { id: '38', name: 'Remo Seco', category: 'Cardio' as const, description: 'Trabalho cardiovascular completo.', muscles: ['Costas', 'Pernas'], learned: false, video: '/videos/remo.mp4' },
  { id: '39', name: 'Jump', category: 'Cardio' as const, description: 'Cama elástica para cardio intenso.', muscles: ['Pernas'], learned: false, video: '/videos/jump.mp4' },
  { id: '40', name: 'Corda Naval', category: 'Cardio' as const, description: 'Explosão e resistência.', muscles: ['Braços', 'Core'], learned: false, video: '/videos/corda_naval.mp4' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'machines' | 'videos' | 'continue' | 'profile'>('home');
  const [user] = useState({
    name: 'Atleta Iniciante',
    email: 'atleta@exemplo.com',
    progress: 15,
    learnedCount: 3
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView user={user} />;
      case 'machines':
        return <MachinesView />;
      case 'videos':
        return <VideosView />;
      case 'continue':
        return <ContinueView />;
      case 'profile':
        return <ProfileView user={user} />;
      default:
        return <HomeView user={user} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Dynamic Content */}
      <main className="flex-1 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 bg-gradient-to-t from-black via-black/95 to-transparent">
        <div className="max-w-md mx-auto h-16 glass-card rounded-2xl flex items-center justify-around px-2 shadow-2xl shadow-brand/10">
          <NavButton 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
            icon={<Home size={22} />} 
            label="Início" 
          />
          <NavButton 
            active={activeTab === 'continue'} 
            onClick={() => setActiveTab('continue')} 
            icon={<Play size={22} />} 
            label="Continuar" 
          />
          <NavButton 
            active={activeTab === 'machines'} 
            onClick={() => setActiveTab('machines')} 
            icon={<Dumbbell size={22} />} 
            label="Aparelhos" 
          />
          <NavButton 
            active={activeTab === 'videos'} 
            onClick={() => setActiveTab('videos')} 
            icon={<Play size={22} className="rotate-90" />} 
            label="Vídeos" 
          />
          <NavButton 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')} 
            icon={<UserIcon size={22} />} 
            label="Perfil" 
          />
        </div>
      </nav>
    </div>
  );
}

// --- Views ---

function HomeView({ user }: { user: any }) {
  return (
    <div className="space-y-8 p-6">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl premium-gradient p-8 min-h-[220px] flex flex-col justify-center border border-brand/20">
        <div className="relative z-10 space-y-4">
          <span className="text-brand font-bold text-xs uppercase tracking-[0.2em]">Guia Definitivo</span>
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white max-w-[240px]">
            Aprenda a Identificar os <span className="text-brand">Aparelhos</span> da Academia do Zero
          </h1>
          <p className="text-gray-400 text-sm max-w-[200px]">
            Pare de ficar perdido e comece a treinar com segurança.
          </p>
          <button className="bg-brand text-black font-black px-6 py-2.5 rounded-full text-sm hover:scale-105 transition-transform active:scale-95">
            👉 Começar Agora
          </button>
        </div>
        {/* Abstract shapes for design */}
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-brand/10 rounded-full blur-3xl" />
      </section>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <TrendingUp size={16} />
            <span className="text-[10px] uppercase font-bold tracking-wider">Progresso</span>
          </div>
          <div className="text-2xl font-black text-brand">{user.progress}%</div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-brand h-full" style={{ width: `${user.progress}%` }} />
          </div>
        </div>
        <div className="glass-card p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <CheckCircle2 size={16} />
            <span className="text-[10px] uppercase font-bold tracking-wider">Concluídos</span>
          </div>
          <div className="text-2xl font-black text-white">{user.learnedCount} <span className="text-sm font-normal text-gray-400">/ 40</span></div>
          <p className="text-[10px] text-gray-500">Mantenha o foco!</p>
        </div>
      </div>

      {/* Featured Machine */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black tracking-tight uppercase italic underline decoration-brand decoration-4 underline-offset-4">Aparelho do Dia</h2>
          <span className="text-brand text-xs font-bold uppercase">Mais Usado 🔥</span>
        </div>
        <div className="glass-card rounded-3xl overflow-hidden group">
          <div className="aspect-video bg-white/5 relative flex items-center justify-center">
            <img 
              src="https://picsum.photos/seed/legpress/800/450" 
              alt="Leg Press" 
              className="object-cover w-full h-full opacity-60 group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-xl font-black">Leg Press 45º</h3>
              <p className="text-gray-400 text-xs">Foco: Quadríceps e Glúteos</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MachinesView() {
  const categories = ['Tudo', 'Pernas', 'Peito', 'Costas', 'Ombros', 'Braços', 'Abdômen', 'Cardio'];
  const [selectedCat, setSelectedCat] = useState('Tudo');

  return (
    <div className="space-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-tighter uppercase italic">Aparelhos</h1>
        <div className="w-10 h-10 glass-card rounded-full flex items-center justify-center text-gray-400">
          <Search size={20} />
        </div>
      </header>

      {/* Categories Horizontal Scroll */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
              selectedCat === cat 
                ? "bg-brand text-black border-brand scale-105" 
                : "bg-surface-soft text-gray-400 border-white/5"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Machines List */}
      <div className="space-y-4">
        {MOCK_MACHINES.map(machine => (
          <div key={machine.id} className="glass-card rounded-2xl p-4 flex gap-4 group hover:border-brand/30 transition-colors">
            <div className="w-20 h-20 bg-white/5 rounded-xl overflow-hidden flex-shrink-0">
               <img 
                src={`https://picsum.photos/seed/${machine.id}/200/200`} 
                alt={machine.name} 
                className="object-cover w-full h-full opacity-70 group-hover:scale-110 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-white group-hover:text-brand transition-colors">{machine.name}</h3>
                {machine.learned && <CheckCircle2 size={16} className="text-brand" />}
              </div>
              <p className="text-xs text-gray-500 line-clamp-1">{machine.description}</p>
              <div className="flex gap-1 pt-1">
                {machine.muscles.slice(0, 2).map(m => (
                  <span key={m} className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-gray-400 uppercase tracking-wider">{m}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <ChevronRight size={20} className="text-gray-600 group-hover:text-brand translate-x-0 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VideosView() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-black tracking-tighter uppercase italic">Execução Prática</h1>
      <div className="grid grid-cols-2 gap-4">
        {MOCK_MACHINES.slice(0, 20).map((machine, i) => (
          <div key={machine.id} className="aspect-[9/16] glass-card rounded-2xl overflow-hidden relative group cursor-pointer">
              {/* If video exists, we would use a <video> tag here, but for preview we use thumbnails */}
              <img 
                src={`https://picsum.photos/seed/gymvid${i}/300/600`} 
                alt={machine.name} 
                className="object-cover w-full h-full opacity-60 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-brand/90 text-black rounded-full flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Play fill="currentColor" size={24} className="ml-1" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[10px] font-bold text-white leading-tight uppercase tracking-tighter">{machine.name}</p>
                <div className="flex items-center gap-1 text-[8px] text-brand mt-1 uppercase font-black">
                  <Clock size={8} /> 0:30
                </div>
              </div>
              
              {/* Hidden Video element for future use */}
              {/* <video src={machine.video} loop muted className="hidden" /> */}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContinueView() {
  return (
    <div className="space-y-8 p-6 max-w-md mx-auto h-[70vh] flex flex-col justify-center text-center">
       <div className="w-24 h-24 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand/20">
          <Play size={40} className="text-brand translate-x-1" />
       </div>
       <div className="space-y-2">
         <h1 className="text-2xl font-black italic">CONTINUAR APRENDENDO</h1>
         <p className="text-gray-400 text-sm">Você parou no aparelho <b>Supino Reto</b>. Vamos continuar sua jornada?</p>
       </div>
       <div className="glass-card p-6 rounded-3xl mt-4 border-l-4 border-l-brand relative overflow-hidden text-left">
          <div className="relative z-10">
            <span className="text-[10px] uppercase text-brand font-black tracking-widest">Último Visto</span>
            <h3 className="text-xl font-bold mt-1">Supino Reto</h3>
            <div className="flex items-center gap-2 text-gray-400 text-xs mt-2">
               <Clock size={14} /> há 2 horas
            </div>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
            <Dumbbell size={100} />
          </div>
       </div>
       <button className="w-full bg-brand text-black font-black py-4 rounded-2xl text-lg hover:shadow-xl hover:shadow-brand/20 transition-all active:scale-95 mt-6">
         Retomar Agora
       </button>
    </div>
  );
}

function ProfileView({ user }: { user: any }) {
  return (
    <div className="space-y-8 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-black tracking-widest uppercase italic">Perfil do Atleta</h1>
        <button className="w-10 h-10 glass-card rounded-full flex items-center justify-center text-gray-400">
          <Settings size={20} />
        </button>
      </header>

      <div className="flex flex-col items-center text-center space-y-4 pt-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand to-brand-dark p-1">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
            <UserIcon size={40} className="text-brand" />
          </div>
        </div>
        <div>
           <h2 className="text-2xl font-black">{user.name}</h2>
           <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
      </div>

      <section className="space-y-3">
        <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] px-2 text-center">Meus Conquistas</h3>
        <div className="glass-card rounded-3xl p-6 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-gray-400 text-xs">Aparelhos Dominados</p>
            <p className="text-2xl font-black">{user.learnedCount} / 40</p>
          </div>
          <div className="w-14 h-14 rounded-full border-4 border-white/5 flex items-center justify-center relative">
             <svg className="w-full h-full -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-brand"
                  strokeDasharray={`${2 * Math.PI * 24}`}
                  strokeDashoffset={`${2 * Math.PI * 24 * (1 - user.learnedCount / 40)}`}
                />
             </svg>
             <span className="absolute text-[10px] font-black">{Math.round((user.learnedCount / 40) * 100)}%</span>
          </div>
        </div>
      </section>

      <div className="pt-4">
        <button className="w-full bg-surface-soft text-gray-400 font-bold py-4 rounded-2xl hover:bg-red-500/10 hover:text-red-500 transition-colors">
          Sair da Conta
        </button>
      </div>
    </div>
  );
}

// --- Components ---

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function NavButton({ active, onClick, icon, label }: NavButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-300",
        active ? "text-brand" : "text-gray-600"
      )}
    >
      <div className={cn(
        "p-1.5 rounded-xl transition-all duration-300",
        active ? "bg-brand/10 scale-110" : "scale-100"
      )}>
        {icon}
      </div>
      <span className={cn(
        "text-[9px] mt-1 font-black uppercase tracking-widest transition-all",
        active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
      )}>
        {label}
      </span>
      {active && (
        <motion.div 
          layoutId="activeTab"
          className="absolute -top-1 w-1 h-1 bg-brand rounded-full shadow-[0_0_8px_#facc15]" 
        />
      )}
    </button>
  );
}
