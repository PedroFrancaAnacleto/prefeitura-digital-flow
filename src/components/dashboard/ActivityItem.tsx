
import React from 'react';
import { cn } from '@/lib/utils';

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  type?: 'default' | 'new' | 'urgent';
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  title,
  description,
  time,
  icon,
  type = 'default',
}) => {
  return (
    <div className={cn(
      "flex items-start p-4 border-b",
      type === 'new' && "bg-blue-50",
      type === 'urgent' && "bg-red-50"
    )}>
      <div className="bg-gray-100 rounded-full p-2">
        {icon}
      </div>
      <div className="ml-3 flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium">{title}</h4>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};
