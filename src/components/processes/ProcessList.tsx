
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Process {
  id: string;
  title: string;
  number: string;
  createdAt: string;
  department: string;
  status: 'new' | 'inProgress' | 'completed';
}

interface ProcessListProps {
  processes: Process[];
  activeId: string | null;
  onSelectProcess: (id: string) => void;
}

export const ProcessList: React.FC<ProcessListProps> = ({
  processes,
  activeId,
  onSelectProcess,
}) => {
  const isMobile = useIsMobile();

  const getStatusBadge = (status: Process['status']) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">Novo</Badge>;
      case 'inProgress':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 text-xs">Em Análise</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">Finalizado</Badge>;
      default:
        return null;
    }
  };

  const getPriorityColor = (status: Process['status']) => {
    switch (status) {
      case 'new':
        return 'border-l-blue-500';
      case 'inProgress':
        return 'border-l-yellow-500';
      case 'completed':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  return (
    <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
      {processes.map((process) => (
        <div
          key={process.id}
          className={cn(
            "bg-white rounded-lg border-l-4 p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
            getPriorityColor(process.status),
            activeId === process.id && !isMobile && "ring-2 ring-primary ring-opacity-50 shadow-md"
          )}
          onClick={() => onSelectProcess(process.id)}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {process.number}
              </span>
              {getStatusBadge(process.status)}
            </div>
            {isMobile && <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />}
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
            {process.title}
          </h3>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span>{process.createdAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{process.department}</span>
            </div>
          </div>
        </div>
      ))}
      
      {processes.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium mb-2">Nenhum processo encontrado</p>
          <p className="text-sm">Tente ajustar os filtros de busca</p>
        </div>
      )}
    </div>
  );
};
