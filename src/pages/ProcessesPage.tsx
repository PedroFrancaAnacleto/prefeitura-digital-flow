import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProcessList } from '@/components/processes/ProcessList';
import { ProcessDetail } from '@/components/processes/ProcessDetail';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

// Mock data
const MOCK_PROCESSES = [
  {
    id: '1',
    title: 'Aquisição de materiais de escritório',
    number: 'PROC-2023-0145',
    createdAt: '15/08/2023',
    department: 'Setor de Compras',
    status: 'new',
    description: 'Processo para aquisição de materiais de escritório para a Secretaria de Administração.',
    requester: 'Maria Silva',
    priority: 'Normal',
    history: [
      { date: '15/08/2023 14:30', user: 'Maria Silva', action: 'Processo criado' },
      { date: '15/08/2023 16:45', user: 'João Santos', action: 'Processo encaminhado para análise' }
    ],
    documents: [
      { name: 'Requisição de Compra.pdf', type: 'PDF' },
      { name: 'Cotações.xlsx', type: 'XLSX' }
    ]
  },
  {
    id: '2',
    title: 'Licença ambiental para construção',
    number: 'PROC-2023-0144',
    createdAt: '14/08/2023',
    department: 'Setor Ambiental',
    status: 'inProgress',
    description: 'Solicitação de licença ambiental para construção de prédio comercial na Av. Principal.',
    requester: 'Construtora XYZ',
    priority: 'Alta',
    history: [
      { date: '14/08/2023 10:15', user: 'Paulo Mendes', action: 'Processo criado' },
      { date: '14/08/2023 14:30', user: 'Ana Costa', action: 'Análise inicial realizada' },
      { date: '15/08/2023 09:45', user: 'Ricardo Gomes', action: 'Solicitação de documentos adicionais' }
    ],
    documents: [
      { name: 'Projeto_Arquitetonico.pdf', type: 'PDF' },
      { name: 'EIA_RIMA.pdf', type: 'PDF' },
      { name: 'Certidão_Matrícula.pdf', type: 'PDF' }
    ]
  },
  {
    id: '3',
    title: 'Contratação de serviço de limpeza',
    number: 'PROC-2023-0143',
    createdAt: '13/08/2023',
    department: 'Departamento de Administração',
    status: 'completed',
    description: 'Processo para contratação de empresa especializada em serviços de limpeza e conservação para a Prefeitura.',
    requester: 'Roberto Almeida',
    priority: 'Normal',
    history: [
      { date: '13/08/2023 08:30', user: 'Roberto Almeida', action: 'Processo criado' },
      { date: '13/08/2023 11:45', user: 'Carla Sousa', action: 'Processo encaminhado para licitação' },
      { date: '14/08/2023 15:30', user: 'Marcos Vieira', action: 'Análise das propostas' },
      { date: '15/08/2023 10:00', user: 'Júlia Lima', action: 'Processo finalizado - Empresa XYZ contratada' }
    ],
    documents: [
      { name: 'Termo_Referencia.docx', type: 'DOCX' },
      { name: 'Propostas_Preço.pdf', type: 'PDF' },
      { name: 'Contrato_Assinado.pdf', type: 'PDF' }
    ]
  },
  {
    id: '4',
    title: 'Autorização para eventos culturais',
    number: 'PROC-2023-0142',
    createdAt: '12/08/2023',
    department: 'Secretaria de Cultura',
    status: 'inProgress',
    description: 'Solicitação para realização de festival cultural na Praça Central no dia 20/09/2023.',
    requester: 'Associação Cultural ABC',
    priority: 'Normal',
    history: [
      { date: '12/08/2023 13:20', user: 'Fernanda Castro', action: 'Processo criado' },
      { date: '13/08/2023 09:10', user: 'Pedro Sampaio', action: 'Encaminhado para análise técnica' },
      { date: '14/08/2023 16:00', user: 'Luiza Menezes', action: 'Solicitação de cronograma detalhado' }
    ],
    documents: [
      { name: 'Plano_Evento.pdf', type: 'PDF' },
      { name: 'Mapa_Localização.jpg', type: 'JPG' }
    ]
  },
  {
    id: '5',
    title: 'Manutenção de vias públicas',
    number: 'PROC-2023-0141',
    createdAt: '11/08/2023',
    department: 'Secretaria de Obras',
    status: 'new',
    description: 'Solicitação de serviços de manutenção e recapeamento da Rua das Flores, no bairro Jardim das Acácias.',
    requester: 'Fernando Oliveira',
    priority: 'Alta',
    history: [
      { date: '11/08/2023 10:45', user: 'Fernando Oliveira', action: 'Processo criado' },
      { date: '11/08/2023 14:30', user: 'Regina Castro', action: 'Encaminhado para análise técnica' }
    ],
    documents: [
      { name: 'Relatório_Vistoria.pdf', type: 'PDF' },
      { name: 'Fotos_Local.zip', type: 'ZIP' }
    ]
  }
] as const;

const ProcessesPage = () => {
  const [activeProcessId, setActiveProcessId] = useState<string | null>(MOCK_PROCESSES[0].id);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const isMobile = useIsMobile();

  const filteredProcesses = MOCK_PROCESSES.filter(process =>
    process.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    process.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeProcess = MOCK_PROCESSES.find(p => p.id === activeProcessId) || null;

  const handleSelectProcess = (id: string) => {
    setActiveProcessId(id);
    if (isMobile) {
      setShowMobileDetail(true);
    }
  };

  const handleBackToList = () => {
    setShowMobileDetail(false);
  };

  if (isMobile && showMobileDetail) {
    return (
      <AppLayout>
        <ProcessDetail process={activeProcess} onBack={handleBackToList} />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Processos</h1>
            <p className="text-gray-600 mt-1">Gerencie todos os processos administrativos</p>
          </div>
          <Button className="sm:w-auto">
            <Plus className="h-4 w-4 mr-2" /> 
            <span className="hidden sm:inline">Novo Processo</span>
            <span className="sm:hidden">Novo</span>
          </Button>
        </div>

        {/* Mobile Search */}
        {isMobile && (
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
              <Input
                placeholder="Buscar processos..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className={cn(
          "grid gap-6",
          isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3"
        )}>
          {/* Process List */}
          <div className={cn(
            "flex flex-col space-y-4",
            isMobile ? "col-span-1" : "lg:col-span-1"
          )}>
            {!isMobile && (
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
                  <Input
                    placeholder="Buscar processos..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all" className="text-xs sm:text-sm">Todos</TabsTrigger>
                <TabsTrigger value="new" className="text-xs sm:text-sm">Novos</TabsTrigger>
                <TabsTrigger value="progress" className="text-xs sm:text-sm">Em Análise</TabsTrigger>
                <TabsTrigger value="completed" className="text-xs sm:text-sm">Concluídos</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex-1 min-h-0">
              <ProcessList
                processes={filteredProcesses}
                activeId={activeProcessId}
                onSelectProcess={handleSelectProcess}
              />
            </div>
          </div>
          
          {/* Process Detail - Hidden on mobile */}
          {!isMobile && (
            <div className="lg:col-span-2">
              <ProcessDetail process={activeProcess} />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ProcessesPage;
