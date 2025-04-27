
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { 
  Search, 
  Plus, 
  FileText,
  Filter,
  Calendar,
  CalendarIcon,
  CheckCircle,
  Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data
const MOCK_PUBLICATIONS = [
  {
    id: '1',
    title: 'Decreto Municipal nº 456/2023',
    type: 'Decreto',
    publicationDate: '15/08/2023',
    description: 'Dispõe sobre novas medidas para o funcionamento dos serviços públicos municipais e dá outras providências.',
    status: 'published',
    author: 'Gabinete do Prefeito'
  },
  {
    id: '2',
    title: 'Edital de Licitação nº 23/2023',
    type: 'Edital',
    publicationDate: '14/08/2023',
    description: 'Abertura de processo licitatório para aquisição de materiais de informática para a Secretaria Municipal de Educação.',
    status: 'published',
    author: 'Departamento de Licitações'
  },
  {
    id: '3',
    title: 'Comunicado sobre funcionamento das escolas',
    type: 'Comunicado',
    publicationDate: '13/08/2023',
    description: 'Informações sobre o calendário de atividades escolares e recuperação de aulas no segundo semestre.',
    status: 'draft',
    author: 'Secretaria de Educação'
  },
  {
    id: '4',
    title: 'Decreto Municipal nº 455/2023',
    type: 'Decreto',
    publicationDate: '12/08/2023',
    description: 'Regulamenta o uso de espaços públicos para eventos culturais e dá outras providências.',
    status: 'published',
    author: 'Gabinete do Prefeito'
  },
  {
    id: '5',
    title: 'Portaria nº 78/2023',
    type: 'Portaria',
    publicationDate: '11/08/2023',
    description: 'Designa servidores para compor a comissão de avaliação de desempenho dos servidores públicos municipais.',
    status: 'draft',
    author: 'Secretaria de Administração'
  },
  {
    id: '6',
    title: 'Edital de Concurso Público nº 01/2023',
    type: 'Edital',
    publicationDate: '10/08/2023',
    description: 'Abertura de Concurso Público para preenchimento de vagas na Administração Municipal.',
    status: 'published',
    author: 'Departamento de Recursos Humanos'
  },
  {
    id: '7',
    title: 'Comunicado sobre horário de atendimento',
    type: 'Comunicado',
    publicationDate: '09/08/2023',
    description: 'Alteração temporária no horário de atendimento ao público das repartições municipais.',
    status: 'published',
    author: 'Secretaria de Administração'
  },
  {
    id: '8',
    title: 'Decreto Municipal nº 454/2023',
    type: 'Decreto',
    publicationDate: '08/08/2023',
    description: 'Dispõe sobre a nomeação de membros para o Conselho Municipal de Saúde.',
    status: 'published',
    author: 'Gabinete do Prefeito'
  }
];

const PublicationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPublication, setSelectedPublication] = useState<typeof MOCK_PUBLICATIONS[0] | null>(null);

  const filteredPublications = MOCK_PUBLICATIONS.filter(pub => {
    // Filter by search term
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tab
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'published') return matchesSearch && pub.status === 'published';
    if (activeTab === 'draft') return matchesSearch && pub.status === 'draft';
    
    return matchesSearch;
  });

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="page-title">Publicações</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Nova Publicação
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
            <Input
              placeholder="Buscar publicações..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de documento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="decree">Decretos</SelectItem>
                <SelectItem value="edict">Editais</SelectItem>
                <SelectItem value="communication">Comunicados</SelectItem>
                <SelectItem value="ordinance">Portarias</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" /> Filtrar
            </Button>
          </div>
        </div>
        
        <Tabs 
          defaultValue="all" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 w-full md:w-1/3">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="published">Publicadas</TabsTrigger>
            <TabsTrigger value="draft">Rascunhos</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPublications.map((publication) => (
          <Card key={publication.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Badge className={publication.status === 'published' ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                  {publication.status === 'published' ? 'Publicado' : 'Rascunho'}
                </Badge>
                <Badge variant="outline">{publication.type}</Badge>
              </div>
              <CardTitle className="text-lg mt-2">{publication.title}</CardTitle>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{publication.publicationDate}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[100px]">
                <p className="text-sm text-gray-600">{publication.description}</p>
              </ScrollArea>
              <p className="text-sm text-gray-500 mt-4">
                <span className="font-medium">Autor:</span> {publication.author}
              </p>
            </CardContent>
            <CardFooter className="pt-3 flex justify-between mt-auto">
              <Button variant="ghost" size="sm">
                <FileText className="h-4 w-4 mr-2" /> Visualizar
              </Button>
              {publication.status === 'draft' ? (
                <Button size="sm">
                  <CheckCircle className="h-4 w-4 mr-2" /> Publicar
                </Button>
              ) : (
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" /> Editar
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredPublications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-gray-50 p-4 rounded-full mb-4">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-1">Nenhuma publicação encontrada</h3>
          <p className="text-gray-500 mb-4">
            Não encontramos publicações com os critérios de busca aplicados.
          </p>
          <Button variant="outline" onClick={() => {
            setSearchTerm("");
            setActiveTab("all");
          }}>
            Limpar filtros
          </Button>
        </div>
      )}
      
      <div className="fixed bottom-6 right-6">
        <Button size="icon" className="rounded-full h-12 w-12 shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </AppLayout>
  );
};

export default PublicationsPage;
