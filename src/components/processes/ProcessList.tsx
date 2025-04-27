
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

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
    <div className="overflow-y-auto h-full border rounded-md bg-white">
      {processes.map((process) => (
        <div
          key={process.id}
          className={cn(
            "process-item",
            activeId === process.id && "active"
          )}
          onClick={() => onSelectProcess(process.id)}
        >
          <div className="flex justify-between">
            <span className="text-sm font-medium">{process.number}</span>
            {getStatusBadge(process.status)}
          </div>
          <h3 className="font-medium mt-1">{process.title}</h3>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{process.createdAt}</span>
            <span className="mx-2">•</span>
            <span>{process.department}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
