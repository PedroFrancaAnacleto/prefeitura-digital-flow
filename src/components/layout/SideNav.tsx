
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  FileText, 
  File, 
  MessageSquare, 
  Share2, 
  BarChart2, 
  Settings, 
  User,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SideNavProps {
  isOpen: boolean;
  isMobile?: boolean;
  onClose?: () => void;
}

type NavItem = {
  title: string;
  path: string;
  icon: React.ElementType;
};

export const SideNav: React.FC<SideNavProps> = ({ isOpen, isMobile, onClose }) => {
  const location = useLocation();

  const navItems: NavItem[] = [
    { title: 'Dashboard', path: '/dashboard', icon: Home },
    { title: 'Processos', path: '/processos', icon: FileText },
    { title: 'Documentos', path: '/documentos', icon: File },
    { title: 'Ouvidoria', path: '/ouvidoria', icon: MessageSquare },
    { title: 'Publicações', path: '/publicacoes', icon: Share2 },
    { title: 'Relatórios', path: '/relatorios', icon: BarChart2 },
    { title: 'Administração', path: '/administracao', icon: Settings },
    { title: 'Perfil', path: '/perfil', icon: User },
  ];

  const handleNavClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-white shadow-lg transition-all duration-300 ease-in-out text-gray-800 border-r border-gray-200 z-50",
        isMobile ? (
          isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"
        ) : (
          isOpen ? "w-64" : "w-20"
        )
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-primary">
        {(isOpen || !isMobile) && (
          <h1 className={cn(
            "font-bold text-white transition-all duration-300",
            isOpen ? "text-xl opacity-100" : "text-lg opacity-0"
          )}>
            {isOpen ? "Prefeitura Digital" : "PD"}
          </h1>
        )}
        {isMobile && isOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <nav className="mt-6 px-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={handleNavClick}
            className={cn(
              "flex items-center py-3 px-3 rounded-lg mb-1 transition-all duration-200 group",
              location.pathname === item.path
                ? "bg-primary text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <item.icon 
              size={20} 
              className={cn(
                "transition-colors duration-200",
                location.pathname === item.path ? "text-white" : "text-gray-500 group-hover:text-gray-700"
              )}
            />
            {(isOpen || isMobile) && (
              <span className={cn(
                "ml-3 font-medium transition-all duration-300",
                isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
              )}>
                {item.title}
              </span>
            )}
          </Link>
        ))}
      </nav>
      
      {(isOpen || isMobile) && (
        <div className="absolute bottom-4 left-0 right-0 px-3">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500">Prefeitura Digital v1.0</p>
          </div>
        </div>
      )}
    </aside>
  );
};
