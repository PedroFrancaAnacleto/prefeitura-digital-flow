
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  FileIcon,
  CheckCircle, 
  Clock,
  Download,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentCardProps {
  title: string;
  type: string;
  createdAt: string;
  status: 'signed' | 'pending';
  onClick?: () => void;
  onDownload?: () => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  title,
  type,
  createdAt,
  status,
  onClick,
  onDownload,
}) => {
  return (
    <div 
      className="bg-white border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors">
          {type === 'Ofício' && <FileText className="h-6 w-6 text-blue-600" />}
          {type === 'Memorando' && <FileIcon className="h-6 w-6 text-blue-600" />}
          {type === 'Circular' && <FileText className="h-6 w-6 text-blue-600" />}
        </div>
        <div className="flex items-center gap-2">
          <Badge className={cn(
            "text-xs",
            status === 'signed' 
              ? "bg-green-100 text-green-700 hover:bg-green-100" 
              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
          )}>
            {status === 'signed' ? (
              <><CheckCircle className="h-3 w-3 mr-1" /> Assinado</>
            ) : (
              <><Clock className="h-3 w-3 mr-1" /> Pendente</>
            )}
          </Badge>
          {onDownload && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onDownload();
              }}
            >
              <Download className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
        {title}
      </h3>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Badge variant="outline" className="text-xs">
            {type}
          </Badge>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <Calendar className="h-3 w-3" />
          <span>{createdAt}</span>
        </div>
      </div>
    </div>
  );
};
