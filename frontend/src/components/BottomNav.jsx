import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Briefcase, Plus, MapPin, MessageCircle } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 flex items-center justify-around z-50 lg:hidden"
      data-testid="bottom-nav"
    >
      <button
        onClick={() => navigate('/feed')}
        className="flex flex-col items-center gap-1 p-2 min-w-[56px]"
        data-testid="nav-feed"
      >
        <Home className={`w-6 h-6 ${isActive('/feed') ? 'text-gray-900' : 'text-gray-400'}`} />
        <span className={`text-[10px] ${isActive('/feed') ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>Início</span>
      </button>

      <button
        onClick={() => navigate('/empregos')}
        className="flex flex-col items-center gap-1 p-2 min-w-[56px]"
        data-testid="nav-empregos"
      >
        <Briefcase className={`w-6 h-6 ${isActive('/empregos') ? 'text-gray-900' : 'text-gray-400'}`} />
        <span className={`text-[10px] ${isActive('/empregos') ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>Empregos</span>
      </button>

      <button
        onClick={() => navigate('/publicar')}
        className="flex flex-col items-center gap-1 p-2 min-w-[56px] relative"
        data-testid="nav-publicar"
        aria-label="Publicar pedido"
      >
        <div className="w-12 h-12 -mt-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
          <Plus className="w-7 h-7 text-white" strokeWidth={2.5} />
        </div>
        <span className={`text-[10px] ${isActive('/publicar') ? 'text-green-600 font-semibold' : 'text-gray-500'} mt-1`}>Publicar</span>
      </button>

      <button
        onClick={() => navigate('/mapa')}
        className="flex flex-col items-center gap-1 p-2 min-w-[56px]"
        data-testid="nav-mapa"
      >
        <MapPin className={`w-6 h-6 ${isActive('/mapa') ? 'text-gray-900' : 'text-gray-400'}`} />
        <span className={`text-[10px] ${isActive('/mapa') ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>Mapa</span>
      </button>

      <button
        onClick={() => navigate('/mensagens')}
        className="flex flex-col items-center gap-1 p-2 min-w-[56px] relative"
        data-testid="nav-mensagens"
      >
        <div className="relative">
          <MessageCircle className={`w-6 h-6 ${isActive('/mensagens') ? 'text-gray-900' : 'text-gray-400'}`} />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-semibold">2</div>
        </div>
        <span className={`text-[10px] ${isActive('/mensagens') ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>Mensagens</span>
      </button>
    </div>
  );
};

export default BottomNav;
