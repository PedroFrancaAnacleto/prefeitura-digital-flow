
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { DocumentCard } from '@/components/documents/DocumentCard';
import { CreateDocumentDialog } from '@/components/documents/CreateDocumentDialog';
import { useDocuments } from '@/hooks/useDocuments';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus,
  Filter,
  FolderOpen,
  Download,
  Trash2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const DocumentsPage = () => {
  const { documents, isLoading, fetchDocuments, downloadDocument, deleteDocument } = useDocuments();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedDocument, setSelectedDocument] = useState<typeof documents[0] | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<typeof documents[0] | null>(null);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.document_number.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'oficios') return matchesSearch && doc.type === 'Ofício';
    if (activeTab === 'memorandos') return matchesSearch && doc.type === 'Memorando';
    
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDownload = (document: typeof documents[0]) => {
    downloadDocument(document);
  };

  const handleDeleteClick = (document: typeof documents[0]) => {
    setDocumentToDelete(document);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (documentToDelete) {
      deleteDocument(documentToDelete);
      setDeleteDialogOpen(false);
      setDocumentToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Carregando documentos...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="page-title">Documentos</h1>
        <Button onClick={() => setCreateDialogOpen(true)}>
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
            <TabsTrigger value="oficios">Ofícios</TabsTrigger>
            <TabsTrigger value="memorandos">Memorandos</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <div key={document.id} className="relative">
              <DocumentCard
                title={document.title}
                type={document.type}
                createdAt={formatDate(document.created_at)}
                status="signed"
                onClick={() => setSelectedDocument(document)}
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 bg-white/80 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(document);
                  }}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 bg-white/80 hover:bg-white text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(document);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
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
              {selectedDocument?.type} • Nº {selectedDocument?.document_number} • {selectedDocument && formatDate(selectedDocument.created_at)}
            </DialogDescription>
          </DialogHeader>
          <div className="bg-gray-50 p-6 rounded-md text-center">
            <p className="text-gray-500 mb-2">Informações do documento</p>
            <div className="space-y-2 text-left">
              <p><strong>Nome do arquivo:</strong> {selectedDocument?.file_name}</p>
              <p><strong>Tamanho:</strong> {selectedDocument && formatFileSize(selectedDocument.file_size)}</p>
              <p><strong>Tipo:</strong> {selectedDocument?.type}</p>
              <p><strong>Número:</strong> {selectedDocument?.document_number}</p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline"
              onClick={() => selectedDocument && handleDownload(selectedDocument)}
            >
              <Download className="h-4 w-4 mr-2" />
              Baixar PDF
            </Button>
            <Button onClick={() => setSelectedDocument(null)}>
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <CreateDocumentDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onDocumentCreated={fetchDocuments}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o documento "{documentToDelete?.title}"? 
              Esta ação não pode ser desfeita e o arquivo será permanentemente removido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <div className="fixed bottom-6 right-6">
        <Button 
          size="icon" 
          className="rounded-full h-12 w-12 shadow-lg"
          onClick={() => setCreateDialogOpen(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </AppLayout>
  );
};

export default DocumentsPage;
