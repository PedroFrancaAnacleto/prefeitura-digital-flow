
import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const isMobile = useIsMobile();

  return (
    <header className="h-16 px-4 lg:px-6 border-b bg-white flex items-center justify-between shadow-sm">
      <div className="flex items-center flex-1">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onMenuClick}
          className="hover:bg-gray-100"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {!isMobile && (
          <div className="ml-6 relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
            <Input 
              placeholder="Buscar processos, documentos..." 
              className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            />
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        {isMobile && (
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <Search className="h-5 w-5" />
          </Button>
        )}
        
        <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            3
          </Badge>
        </Button>
        
        <div className="flex items-center space-x-3 pl-2 border-l border-gray-200">
          <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
            <User className="h-4 w-4" />
          </div>
          {!isMobile && (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">Ana Silva</span>
              <span className="text-xs text-gray-500">Administradora</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
