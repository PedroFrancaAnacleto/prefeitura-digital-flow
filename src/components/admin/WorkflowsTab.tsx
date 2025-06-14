
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus,
  ChevronRight,
  Edit,
} from 'lucide-react';

// Mock workflow data
const MOCK_WORKFLOWS = [
  { id: '1', name: 'Processo de Licitação', departments: ['Administração', 'Jurídico', 'Financeiro'], stepsCount: 8, active: true },
  { id: '2', name: 'Licença Ambiental', departments: ['Protocolo', 'Meio Ambiente', 'Fiscalização'], stepsCount: 5, active: true },
  { id: '3', name: 'Contratação de Pessoal', departments: ['Recursos Humanos', 'Jurídico', 'Administração'], stepsCount: 6, active: false },
  { id: '4', name: 'Aprovação de Projetos', departments: ['Protocolo', 'Obras', 'Meio Ambiente'], stepsCount: 7, active: true },
];

export const WorkflowsTab = () => {
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <CardTitle>Fluxos de Trabalho</CardTitle>
          <CardDescription>Configure os fluxos de tramitação de processos</CardDescription>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Novo Fluxo de Trabalho
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {MOCK_WORKFLOWS.map((workflow) => (
            <Card key={workflow.id}>
              <CardHeader className="py-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{workflow.name}</CardTitle>
                  <CardDescription>
                    {workflow.stepsCount} etapas • {workflow.departments.join(" → ")}
                  </CardDescription>
                </div>
                {workflow.active ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inativo</Badge>
                )}
              </CardHeader>
              <CardFooter className="pt-3 flex justify-between">
                <Button variant="outline" size="sm">
                  <ChevronRight className="mr-2 h-4 w-4" /> Ver Detalhes
                </Button>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> Editar
                  </Button>
                  <Button variant="outline" size="sm" className={workflow.active ? "text-red-600" : "text-green-600"}>
                    {workflow.active ? "Desativar" : "Ativar"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
