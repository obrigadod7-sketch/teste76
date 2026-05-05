import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Briefcase, Plus, MapPin, MessageCircle } from 'lucide-react';

/**
 * BottomNav
 *  - Default (mobile): fixed at bottom of screen
 *  - inline=true (desktop): renders as inline horizontal bar (used inside Header)
 */
const BottomNav = ({ inline = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const NavBtn = ({ path, Icon, label, testid, isPublish, badge }) => {
    const active = isActive(path);
    if (inline) {
      // Desktop top bar style
      return (
        <button
          onClick={() => navigate(path)}
          data-testid={testid}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
            isPublish
              ? 'bg-green-500 hover:bg-green-600 text-white font-medium shadow-sm'
              : active
              ? 'text-green-600 font-semibold'
              : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
          }`}
        >
          <span className="relative flex">
            <Icon className="w-4 h-4" strokeWidth={isPublish ? 2.5 : 2} />
            {badge && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-semibold">
                {badge}
              </span>
            )}
          </span>
          <span>{label}</span>
        </button>
      );
    }
    // Mobile bottom bar style
    return (
      <button
        onClick={() => navigate(path)}
        data-testid={testid}
        className={`flex flex-col items-center gap-1 p-2 min-w-[56px] ${isPublish ? 'relative' : ''}`}
      >
        {isPublish ? (
          <div className="w-12 h-12 -mt-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
        ) : (
          <span className="relative">
            <Icon className={`w-6 h-6 ${active ? 'text-gray-900' : 'text-gray-400'}`} />
            {badge && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-semibold">
                {badge}
              </span>
            )}
          </span>
        )}
        <span
          className={`text-[10px] ${
            isPublish ? (active ? 'text-green-600 font-semibold mt-1' : 'text-gray-500 mt-1') : active ? 'text-gray-900 font-semibold' : 'text-gray-500'
          }`}
        >
          {label}
        </span>
      </button>
    );
  };

  const items = (
    <>
      <NavBtn path="/feed" Icon={Home} label="Início" testid="nav-feed" />
      <NavBtn path="/empregos" Icon={Briefcase} label="Empregos" testid="nav-empregos" />
      <NavBtn path="/publicar" Icon={Plus} label="Publicar" testid="nav-publicar" isPublish />
      <NavBtn path="/mapa" Icon={MapPin} label="Mapa" testid="nav-mapa" />
      <NavBtn path="/mensagens" Icon={MessageCircle} label="Mensagens" testid="nav-mensagens" badge={2} />
    </>
  );

  if (inline) {
    return (
      <div
        className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-center gap-4"
        data-testid="bottom-nav-desktop"
      >
        {items}
      </div>
    );
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-2 py-2 flex items-center justify-around lg:hidden"
      data-testid="bottom-nav"
    >
      {items}
    </nav>
  );
};

export default BottomNav;
