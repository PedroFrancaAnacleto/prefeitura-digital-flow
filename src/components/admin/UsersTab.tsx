
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  UserPlus,
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
import { CreateUserForm } from '@/components/admin/CreateUserForm';

// Mock users data
const MOCK_USERS = [
  { id: '1', name: 'Ana Silva', email: 'ana.silva@prefeitura.gov.br', department: 'Administração', role: 'Administrador', status: 'active' },
  { id: '2', name: 'Carlos Mendes', email: 'carlos.mendes@prefeitura.gov.br', department: 'Jurídico', role: 'Gestor', status: 'active' },
  { id: '3', name: 'Mariana Santos', email: 'mariana.santos@prefeitura.gov.br', department: 'Financeiro', role: 'Usuário', status: 'inactive' },
  { id: '4', name: 'Paulo Ferreira', email: 'paulo.ferreira@prefeitura.gov.br', department: 'Obras', role: 'Gestor', status: 'active' },
  { id: '5', name: 'Juliana Costa', email: 'juliana.costa@prefeitura.gov.br', department: 'Meio Ambiente', role: 'Usuário', status: 'active' },
];

export const UsersTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateUserDialog, setShowCreateUserDialog] = useState(false);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <div>
            <CardTitle>Gerenciar Usuários</CardTitle>
            <CardDescription>Gerencie os usuários do sistema e suas permissões</CardDescription>
          </div>
          <Button onClick={() => setShowCreateUserDialog(true)}>
            <UserPlus className="mr-2 h-4 w-4" /> Criar Usuário
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
              <Input
                placeholder="Buscar usuários..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por setor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os setores</SelectItem>
                <SelectItem value="admin">Administração</SelectItem>
                <SelectItem value="legal">Jurídico</SelectItem>
                <SelectItem value="finance">Financeiro</SelectItem>
                <SelectItem value="works">Obras</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="hidden md:table-cell">Setor</TableHead>
                  <TableHead className="hidden md:table-cell">Função</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_USERS.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{user.department}</TableCell>
                    <TableCell className="hidden md:table-cell">{user.role}</TableCell>
                    <TableCell>
                      {user.status === 'active' ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inativo</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
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
      
      <CreateUserForm 
        open={showCreateUserDialog} 
        onOpenChange={setShowCreateUserDialog} 
      />
    </>
  );
};
