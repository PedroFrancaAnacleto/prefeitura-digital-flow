
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Plus,
  UserPlus,
  Settings,
  Users,
  FolderPlus,
  FileText,
  Edit,
  Trash,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock users data
const MOCK_USERS = [
  { id: '1', name: 'Ana Silva', email: 'ana.silva@prefeitura.gov.br', department: 'Administração', role: 'Administrador', status: 'active' },
  { id: '2', name: 'Carlos Mendes', email: 'carlos.mendes@prefeitura.gov.br', department: 'Jurídico', role: 'Gestor', status: 'active' },
  { id: '3', name: 'Mariana Santos', email: 'mariana.santos@prefeitura.gov.br', department: 'Financeiro', role: 'Usuário', status: 'inactive' },
  { id: '4', name: 'Paulo Ferreira', email: 'paulo.ferreira@prefeitura.gov.br', department: 'Obras', role: 'Gestor', status: 'active' },
  { id: '5', name: 'Juliana Costa', email: 'juliana.costa@prefeitura.gov.br', department: 'Meio Ambiente', role: 'Usuário', status: 'active' },
];

// Mock departments data
const MOCK_DEPARTMENTS = [
  { id: '1', name: 'Administração', description: 'Setor responsável pela gestão administrativa', usersCount: 12, processesCount: 45 },
  { id: '2', name: 'Jurídico', description: 'Setor responsável pelos processos jurídicos', usersCount: 8, processesCount: 67 },
  { id: '3', name: 'Financeiro', description: 'Setor responsável pela gestão financeira e orçamentária', usersCount: 10, processesCount: 32 },
  { id: '4', name: 'Obras', description: 'Setor responsável pelo planejamento e execução de obras', usersCount: 15, processesCount: 28 },
  { id: '5', name: 'Meio Ambiente', description: 'Setor responsável pela gestão ambiental', usersCount: 7, processesCount: 19 },
];

// Mock workflow data
const MOCK_WORKFLOWS = [
  { id: '1', name: 'Processo de Licitação', departments: ['Administração', 'Jurídico', 'Financeiro'], stepsCount: 8, active: true },
  { id: '2', name: 'Licença Ambiental', departments: ['Protocolo', 'Meio Ambiente', 'Fiscalização'], stepsCount: 5, active: true },
  { id: '3', name: 'Contratação de Pessoal', departments: ['Recursos Humanos', 'Jurídico', 'Administração'], stepsCount: 6, active: false },
  { id: '4', name: 'Aprovação de Projetos', departments: ['Protocolo', 'Obras', 'Meio Ambiente'], stepsCount: 7, active: true },
];

// Mock document templates
const MOCK_TEMPLATES = [
  { id: '1', name: 'Ofício Padrão', type: 'Ofício', lastUpdated: '15/07/2023', createdBy: 'Ana Silva' },
  { id: '2', name: 'Memorando Interno', type: 'Memorando', lastUpdated: '10/08/2023', createdBy: 'Carlos Mendes' },
  { id: '3', name: 'Portaria de Nomeação', type: 'Portaria', lastUpdated: '05/06/2023', createdBy: 'Mariana Santos' },
  { id: '4', name: 'Decreto Municipal', type: 'Decreto', lastUpdated: '22/07/2023', createdBy: 'Paulo Ferreira' },
  { id: '5', name: 'Circular Informativa', type: 'Circular', lastUpdated: '03/08/2023', createdBy: 'Juliana Costa' },
];

const AdminPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);

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
        
        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div>
                <CardTitle>Gerenciar Usuários</CardTitle>
                <CardDescription>Gerencie os usuários do sistema e suas permissões</CardDescription>
              </div>
              <Button onClick={() => setShowAddUserDialog(true)}>
                <UserPlus className="mr-2 h-4 w-4" /> Adicionar Usuário
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
        </TabsContent>
        
        {/* Departments Tab */}
        <TabsContent value="departments">
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
        </TabsContent>
        
        {/* Workflows Tab */}
        <TabsContent value="workflows">
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
        </TabsContent>
        
        {/* Templates Tab */}
        <TabsContent value="templates">
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
        </TabsContent>
      </Tabs>
      
      {/* Add User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Usuário</DialogTitle>
            <DialogDescription>
              Preencha os dados do novo usuário para adicionar ao sistema
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" placeholder="Nome do usuário" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@prefeitura.gov.br" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Setor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um setor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administração</SelectItem>
                    <SelectItem value="legal">Jurídico</SelectItem>
                    <SelectItem value="finance">Financeiro</SelectItem>
                    <SelectItem value="works">Obras</SelectItem>
                    <SelectItem value="environment">Meio Ambiente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Função</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="manager">Gestor</SelectItem>
                    <SelectItem value="user">Usuário</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>Permissões</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="perm-1" />
                  <label htmlFor="perm-1" className="text-sm">Criar processos</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="perm-2" />
                  <label htmlFor="perm-2" className="text-sm">Assinar documentos</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="perm-3" />
                  <label htmlFor="perm-3" className="text-sm">Gerenciar usuários</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="perm-4" />
                  <label htmlFor="perm-4" className="text-sm">Gerenciar publicações</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="perm-5" />
                  <label htmlFor="perm-5" className="text-sm">Acessar relatórios</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="perm-6" />
                  <label htmlFor="perm-6" className="text-sm">Acessar administração</label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
              Cancelar
            </Button>
            <Button type="submit" onClick={() => setShowAddUserDialog(false)}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default AdminPage;
