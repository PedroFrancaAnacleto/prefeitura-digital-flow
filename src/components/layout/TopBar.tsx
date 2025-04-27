
import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  return (
    <header className="h-16 px-4 border-b bg-white flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="ml-6 hidden md:block relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
          <Input 
            placeholder="Buscar..." 
            className="pl-9 w-64 bg-gray-50"
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="ml-4 flex items-center">
          <div className="h-8 w-8 bg-gov-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            AS
          </div>
          <span className="ml-2 text-sm font-medium hidden md:inline-block">
            Ana Silva
          </span>
        </div>
      </div>
    </header>
  );
};
