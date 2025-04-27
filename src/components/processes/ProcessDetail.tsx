
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Send,
  Check,
  FileSignature,
  Printer,
  Clock,
  FileText,
  User,
  Archive
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Process {
  id: string;
  title: string;
  number: string;
  createdAt: string;
  department: string;
  status: 'new' | 'inProgress' | 'completed';
  description: string;
  requester: string;
  priority: string;
  history: {
    date: string;
    user: string;
    action: string;
  }[];
  documents: {
    name: string;
    type: string;
  }[];
}

interface ProcessDetailProps {
  process: Process | null;
}

export const ProcessDetail: React.FC<ProcessDetailProps> = ({ process }) => {
  if (!process) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500 bg-gray-50 border rounded-md">
        <FileText size={48} className="mb-4 text-gray-400" />
        <h3 className="text-lg font-medium mb-2">Nenhum processo selecionado</h3>
        <p>Selecione um processo da lista para visualizar os detalhes</p>
      </div>
    );
  }

  const getStatusBadge = (status: Process['status']) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Novo</Badge>;
      case 'inProgress':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Em Análise</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Finalizado</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-md h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium">{process.title}</h2>
          {getStatusBadge(process.status)}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium mr-1">Processo:</span>
          <span>{process.number}</span>
          <span className="mx-2">•</span>
          <Clock className="h-3 w-3 mr-1" />
          <span>{process.createdAt}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {/* Process Info */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Informações</h3>
          <div className="bg-gray-50 p-3 rounded-md text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-gray-500">Solicitante</p>
                <p className="font-medium">{process.requester}</p>
              </div>
              <div>
                <p className="text-gray-500">Departamento atual</p>
                <p className="font-medium">{process.department}</p>
              </div>
              <div>
                <p className="text-gray-500">Prioridade</p>
                <p className="font-medium">{process.priority}</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-gray-500 mb-1">Descrição</p>
              <p>{process.description}</p>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Documentos anexados</h3>
          <div className="bg-gray-50 rounded-md">
            {process.documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border-b last:border-b-0">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{doc.name}</span>
                </div>
                <Badge variant="outline">{doc.type}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Histórico</h3>
          <div className="bg-gray-50 rounded-md">
            {process.history.map((item, index) => (
              <div key={index} className="p-3 border-b last:border-b-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="font-medium">{item.user}</span>
                  </div>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <p className="text-sm">{item.action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="border-t p-3 flex gap-2 justify-end">
        <Button variant="outline" size="sm">
          <Archive className="h-4 w-4 mr-1" /> Arquivar
        </Button>
        <Button variant="outline" size="sm">
          <Printer className="h-4 w-4 mr-1" /> Imprimir
        </Button>
        <Button variant="outline" size="sm">
          <FileSignature className="h-4 w-4 mr-1" /> Assinar
        </Button>
        <Button variant="outline" size="sm">
          <Send className="h-4 w-4 mr-1" /> Encaminhar
        </Button>
        <Button size="sm">
          <Check className="h-4 w-4 mr-1" /> Concluir
        </Button>
      </div>
    </div>
  );
};
