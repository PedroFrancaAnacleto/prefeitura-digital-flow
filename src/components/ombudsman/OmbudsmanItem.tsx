
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type OmbudsmanType = 'suggestion' | 'complaint' | 'praise' | 'report';
type OmbudsmanStatus = 'new' | 'inProgress' | 'completed';

interface OmbudsmanItemProps {
  id: string;
  title: string;
  type: OmbudsmanType;
  createdAt: string;
  status: OmbudsmanStatus;
  preview: string;
  isActive: boolean;
  onClick: () => void;
}

export const OmbudsmanItem: React.FC<OmbudsmanItemProps> = ({
  title,
  type,
  createdAt,
  status,
  preview,
  isActive,
  onClick,
}) => {
  const getTypeBadge = (type: OmbudsmanType) => {
    const types = {
      suggestion: { label: 'Sugestão', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
      complaint: { label: 'Reclamação', className: 'bg-red-100 text-red-800 hover:bg-red-100' },
      praise: { label: 'Elogio', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
      report: { label: 'Denúncia', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
    };

    const { label, className } = types[type];
    return <Badge className={className}>{label}</Badge>;
  };

  const getStatusBadge = (status: OmbudsmanStatus) => {
    const statuses = {
      new: { label: 'Novo', className: 'bg-purple-100 text-purple-800' },
      inProgress: { label: 'Em análise', className: 'bg-orange-100 text-orange-800' },
      completed: { label: 'Concluído', className: 'bg-gray-100 text-gray-800' },
    };

    const { label, className } = statuses[status];
    return (
      <span className={cn(
        "text-xs font-medium px-2 py-1 rounded-full",
        className
      )}>
        {label}
      </span>
    );
  };

  return (
    <div 
      className={cn(
        "border-b last:border-b-0 p-4 cursor-pointer",
        isActive && "bg-blue-50"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <h3 className="font-medium">{title}</h3>
        {getTypeBadge(type)}
      </div>
      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{preview}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-500">{createdAt}</span>
        {getStatusBadge(status)}
      </div>
    </div>
  );
};
