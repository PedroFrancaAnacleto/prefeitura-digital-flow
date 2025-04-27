
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
  User 
} from 'lucide-react';

interface SideNavProps {
  isOpen: boolean;
}

type NavItem = {
  title: string;
  path: string;
  icon: React.ElementType;
};

export const SideNav: React.FC<SideNavProps> = ({ isOpen }) => {
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

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar transition-all duration-300 ease-in-out text-sidebar-foreground border-r border-sidebar-border z-30",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="h-16 flex items-center justify-center border-b border-sidebar-border">
        {isOpen ? (
          <h1 className="text-xl font-bold text-white">
            Prefeitura Digital
          </h1>
        ) : (
          <h1 className="text-xl font-bold text-white">PD</h1>
        )}
      </div>
      <nav className="mt-5 px-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center py-3 px-4 rounded-md mb-1 transition-colors",
              location.pathname === item.path
                ? "bg-sidebar-accent text-white"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:bg-opacity-70"
            )}
          >
            <item.icon size={20} />
            {isOpen && <span className="ml-3">{item.title}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
