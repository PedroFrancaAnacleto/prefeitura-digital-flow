
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  FileIcon,
  CheckCircle, 
  Clock
} from 'lucide-react';

interface DocumentCardProps {
  title: string;
  type: string;
  createdAt: string;
  status: 'signed' | 'pending';
  onClick?: () => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  title,
  type,
  createdAt,
  status,
  onClick,
}) => {
  return (
    <div 
      className="border rounded-md bg-white p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="bg-blue-50 p-2 rounded-md">
          {type === 'Ofício' && <FileText className="h-6 w-6 text-blue-600" />}
          {type === 'Memorando' && <FileIcon className="h-6 w-6 text-blue-600" />}
          {type === 'Circular' && <FileText className="h-6 w-6 text-blue-600" />}
        </div>
        <Badge className={cn(
          status === 'signed' ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
        )}>
          {status === 'signed' ? (
            <><CheckCircle className="h-3 w-3 mr-1" /> Assinado</>
          ) : (
            <><Clock className="h-3 w-3 mr-1" /> Pendente</>
          )}
        </Badge>
      </div>
      <h3 className="mt-3 font-medium">{title}</h3>
      <div className="flex items-center justify-between mt-2 text-sm">
        <span className="text-blue-600 font-medium">{type}</span>
        <span className="text-gray-500">{createdAt}</span>
      </div>
    </div>
  );
};
