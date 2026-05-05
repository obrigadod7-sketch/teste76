import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, CreditCard, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useAuth } from '../context/AuthContext';
import BottomNav from './BottomNav';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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

      {/* Top nav on desktop (rendered as second row inside sticky header) */}
      <div className="hidden lg:block border-t border-gray-100 bg-white">
        <BottomNav inline />
      </div>
    </header>
  );
};

export default Header;
