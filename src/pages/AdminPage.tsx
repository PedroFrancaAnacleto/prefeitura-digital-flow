
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { 
  Users,
  Settings,
  FolderPlus,
  FileText,
} from 'lucide-react';
import { UsersTab } from '@/components/admin/UsersTab';
import { DepartmentsTab } from '@/components/admin/DepartmentsTab';
import { WorkflowsTab } from '@/components/admin/WorkflowsTab';
import { TemplatesTab } from '@/components/admin/TemplatesTab';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <AppLayout>
      <h1 className="page-title">Administração</h1>
      
      <Tabs 
        defaultValue="users" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
          <TabsTrigger value="users" className="flex items-center">
            <Users className="h-4 w-4 mr-2" /> Usuários
          </TabsTrigger>
          <TabsTrigger value="departments" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" /> Setores
          </TabsTrigger>
          <TabsTrigger value="workflows" className="flex items-center">
            <FolderPlus className="h-4 w-4 mr-2" /> Fluxos de Trabalho
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" /> Modelos de Documentos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <UsersTab />
        </TabsContent>
        
        <TabsContent value="departments">
          <DepartmentsTab />
        </TabsContent>
        
        <TabsContent value="workflows">
          <WorkflowsTab />
        </TabsContent>
        
        <TabsContent value="templates">
          <TemplatesTab />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default AdminPage;
