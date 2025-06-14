
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Clock, 
  User, 
  Calendar,
  ArrowRight,
  CheckCircle,
  Send
} from 'lucide-react';

interface ProcessDocument {
  id?: string;
  name: string;
  type: string;
  url?: string;
}

interface ProcessHistoryItem {
  date: string;
  user: string;
  action: string;
}

interface Process {
  id: string;
  title: string;
  number: string;
  createdAt: string;
  department: string;
  status: string;
  priority: string;
  description: string;
  documents: ProcessDocument[];
  history: ProcessHistoryItem[];
}

interface ProcessDetailProps {
  process: Process;
}

export const ProcessDetail: React.FC<ProcessDetailProps> = ({ process }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo': return 'bg-blue-100 text-blue-800';
      case 'Em Análise': return 'bg-yellow-100 text-yellow-800';
      case 'Pendente': return 'bg-orange-100 text-orange-800';
      case 'Finalizado': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return 'bg-red-100 text-red-800';
      case 'Média': return 'bg-yellow-100 text-yellow-800';
      case 'Baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{process.title}</h1>
          <div className="flex gap-2">
            <Badge className={getStatusColor(process.status)}>{process.status}</Badge>
            <Badge className={getPriorityColor(process.priority)}>{process.priority}</Badge>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">Processo nº {process.number}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            Criado em {process.createdAt}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <User className="h-4 w-4 mr-2" />
            {process.department}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            Última atualização: hoje
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Button>
          <Send className="h-4 w-4 mr-2" />
          Encaminhar
        </Button>
        <Button variant="outline">
          <CheckCircle className="h-4 w-4 mr-2" />
          Assinar
        </Button>
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Adicionar Documento
        </Button>
      </div>

      <Separator />

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Descrição</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{process.description}</p>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Documentos Anexos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {process.documents.map((doc, index) => (
              <div key={doc.id || index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-500">{doc.type}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Visualizar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Histórico de Tramitação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {process.history.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-3 h-3 bg-blue-600 rounded-full mt-2 mr-4"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.action}</p>
                  <p className="text-sm text-gray-500">
                    {item.user} • {item.date}
                  </p>
                </div>
                {index < process.history.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-gray-400 mt-2 ml-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
