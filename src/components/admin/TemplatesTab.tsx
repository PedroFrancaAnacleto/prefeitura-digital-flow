
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus,
  FileText,
  Edit,
  Trash,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock document templates
const MOCK_TEMPLATES = [
  { id: '1', name: 'Ofício Padrão', type: 'Ofício', lastUpdated: '15/07/2023', createdBy: 'Ana Silva' },
  { id: '2', name: 'Memorando Interno', type: 'Memorando', lastUpdated: '10/08/2023', createdBy: 'Carlos Mendes' },
  { id: '3', name: 'Portaria de Nomeação', type: 'Portaria', lastUpdated: '05/06/2023', createdBy: 'Mariana Santos' },
  { id: '4', name: 'Decreto Municipal', type: 'Decreto', lastUpdated: '22/07/2023', createdBy: 'Paulo Ferreira' },
  { id: '5', name: 'Circular Informativa', type: 'Circular', lastUpdated: '03/08/2023', createdBy: 'Juliana Costa' },
];

export const TemplatesTab = () => {
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <CardTitle>Modelos de Documentos</CardTitle>
          <CardDescription>Gerencie os modelos de documentos do sistema</CardDescription>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Novo Modelo
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="hidden md:table-cell">Última Atualização</TableHead>
                <TableHead className="hidden md:table-cell">Criado por</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_TEMPLATES.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{template.type}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{template.lastUpdated}</TableCell>
                  <TableCell className="hidden md:table-cell">{template.createdBy}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4 mr-1" /> Visualizar
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-1" /> Editar
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
