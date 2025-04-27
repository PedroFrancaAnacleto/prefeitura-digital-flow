
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { DocumentCard } from '@/components/documents/DocumentCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus,
  Filter,
  FolderOpen
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Mock data
const MOCK_DOCUMENTS = [
  {
    id: '1',
    title: 'Ofício de solicitação ao Tribunal de Contas',
    type: 'Ofício',
    createdAt: '15/08/2023',
    status: 'pending' as const
  },
  {
    id: '2',
    title: 'Memorando interno sobre procedimentos administrativos',
    type: 'Memorando',
    createdAt: '14/08/2023',
    status: 'signed' as const
  },
  {
    id: '3',
    title: 'Circular sobre nova política de atendimento ao público',
    type: 'Circular',
    createdAt: '13/08/2023',
    status: 'signed' as const
  },
  {
    id: '4',
    title: 'Ofício ao Governo do Estado sobre convênio',
    type: 'Ofício',
    createdAt: '12/08/2023',
    status: 'pending' as const
  },
  {
    id: '5',
    title: 'Memorando sobre férias coletivas',
    type: 'Memorando',
    createdAt: '11/08/2023',
    status: 'signed' as const
  },
  {
    id: '6',
    title: 'Circular sobre horário de funcionamento',
    type: 'Circular',
    createdAt: '10/08/2023',
    status: 'pending' as const
  },
  {
    id: '7',
    title: 'Ofício de resposta ao Ministério Público',
    type: 'Ofício',
    createdAt: '09/08/2023',
    status: 'signed' as const
  },
  {
    id: '8',
    title: 'Memorando sobre inventário patrimonial',
    type: 'Memorando',
    createdAt: '08/08/2023',
    status: 'pending' as const
  }
];

const DocumentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedDocument, setSelectedDocument] = useState<typeof MOCK_DOCUMENTS[0] | null>(null);

  const filteredDocuments = MOCK_DOCUMENTS.filter(doc => {
    // Filter by search term
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tab
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'pending') return matchesSearch && doc.status === 'pending';
    if (activeTab === 'signed') return matchesSearch && doc.status === 'signed';
    
    return matchesSearch;
  });

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="page-title">Documentos</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Novo Documento
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
            <Input
              placeholder="Buscar documentos..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="md:w-auto">
            <Filter className="h-4 w-4 mr-2" /> Filtrar
          </Button>
        </div>
        
        <Tabs 
          defaultValue="all" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 w-full md:w-1/3">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="signed">Assinados</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <DocumentCard
              key={document.id}
              title={document.title}
              type={document.type}
              createdAt={document.createdAt}
              status={document.status}
              onClick={() => setSelectedDocument(document)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-gray-50 p-4 rounded-full mb-4">
            <FolderOpen className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-1">Nenhum documento encontrado</h3>
          <p className="text-gray-500 mb-4">
            Não encontramos documentos com os critérios de busca aplicados.
          </p>
          <Button variant="outline" onClick={() => {
            setSearchTerm("");
            setActiveTab("all");
          }}>
            Limpar filtros
          </Button>
        </div>
      )}
      
      <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.title}</DialogTitle>
            <DialogDescription>
              {selectedDocument?.type} • {selectedDocument?.createdAt}
            </DialogDescription>
          </DialogHeader>
          <div className="bg-gray-50 p-6 rounded-md text-center">
            <p className="text-gray-500 mb-2">Pré-visualização do documento</p>
            <div className="border-2 border-dashed border-gray-300 p-8 rounded-md">
              <p className="font-medium mb-2">{selectedDocument?.title}</p>
              <p className="text-sm text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce condimentum
                massa eget tellus facilisis, vel fermentum nibh mollis. Donec bibendum
                convallis urna, nec accumsan est egestas quis.
              </p>
              <p className="text-sm text-gray-600">
                Proin in sollicitudin risus, non dignissim arcu. Etiam venenatis libero at
                tellus aliquet, at facilisis nisi facilisis. Aenean tincidunt consequat
                nisl, non congue felis.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Editar</Button>
            <Button>Visualizar Completo</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="fixed bottom-6 right-6">
        <Button size="icon" className="rounded-full h-12 w-12 shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </AppLayout>
  );
};

export default DocumentsPage;
