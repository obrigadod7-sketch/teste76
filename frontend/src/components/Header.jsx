import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Briefcase, MessageCircle, MapPin, User, LogOut, Settings, CreditCard, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/feed', label: 'Início', icon: Home },
    { path: '/empregos', label: 'Empregos', icon: Briefcase },
    { path: '/mensagens', label: 'Mensagens', icon: MessageCircle },
    { path: '/mapa', label: 'Mapa', icon: MapPin },
    { path: '/perfil', label: 'Perfil', icon: User }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link to="/feed" className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                H
              </div>
              <span className="ml-2 text-lg font-bold">
                <span className="text-pink-500">homedaily</span>
                <span className="text-green-500"> serviços jataí</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 text-sm transition-colors ${
                    isActive ? 'text-green-600 font-semibold' : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile - avatar redirects to /perfil; chevron opens menu */}
          <div className="flex items-center space-x-1">
            <Link
              to="/perfil"
              data-testid="user-avatar-link"
              aria-label="Ir para meu perfil"
              className="flex items-center hover:opacity-80 transition-opacity rounded-full"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.avatar} alt={user?.name || ''} />
                <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  data-testid="user-menu-trigger"
                  aria-label="Abrir menu do usuário"
                  className="p-1 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-100 transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/perfil')}>
                  <User className="w-4 h-4 mr-2" />
                  Meu Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/creditos')}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Comprar Créditos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/admin')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Dashboard Admin
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Navigation handled by BottomNav component */}
    </header>
  );
};

export default Header;

