
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus,
  Edit,
  Trash,
} from 'lucide-react';

// Mock departments data
const MOCK_DEPARTMENTS = [
  { id: '1', name: 'Administração', description: 'Setor responsável pela gestão administrativa', usersCount: 12, processesCount: 45 },
  { id: '2', name: 'Jurídico', description: 'Setor responsável pelos processos jurídicos', usersCount: 8, processesCount: 67 },
  { id: '3', name: 'Financeiro', description: 'Setor responsável pela gestão financeira e orçamentária', usersCount: 10, processesCount: 32 },
  { id: '4', name: 'Obras', description: 'Setor responsável pelo planejamento e execução de obras', usersCount: 15, processesCount: 28 },
  { id: '5', name: 'Meio Ambiente', description: 'Setor responsável pela gestão ambiental', usersCount: 7, processesCount: 19 },
];

export const DepartmentsTab = () => {
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <CardTitle>Gerenciar Setores</CardTitle>
          <CardDescription>Configure os setores e departamentos da organização</CardDescription>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Setor
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
            <Input
              placeholder="Buscar setores..."
              className="pl-9"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          {MOCK_DEPARTMENTS.map((department) => (
            <Card key={department.id}>
              <CardHeader className="py-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{department.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-gray-600 mb-3">{department.description}</p>
                <div className="flex flex-wrap gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Usuários</p>
                    <p className="text-lg font-semibold">{department.usersCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Processos</p>
                    <p className="text-lg font-semibold">{department.processesCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
