
import React, { useState } from 'react';
import { SideNav } from './SideNav';
import { TopBar } from './TopBar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={closeSidebar}
        />
      )}
      
      <SideNav isOpen={sidebarOpen} isMobile={isMobile} onClose={closeSidebar} />
      
      <div className={cn(
        "flex flex-col flex-1 transition-all duration-300 ease-in-out min-w-0",
        !isMobile && sidebarOpen ? "ml-64" : !isMobile ? "ml-20" : "ml-0"
      )}>
        <TopBar onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
