
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ActivityItem } from '@/components/dashboard/ActivityItem';
import {
  FileText,
  FileSignature,
  Clock,
  MessageSquare,
  Edit,
  Bell,
  CheckCircle
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const pieData = [
  { name: 'Novos', value: 42, color: '#2563EB' },
  { name: 'Em Andamento', value: 78, color: '#F59E0B' },
  { name: 'Concluídos', value: 35, color: '#10B981' }
];

const barData = [
  { name: 'Jurídico', documentos: 12, processos: 24 },
  { name: 'Financeiro', documentos: 19, processos: 13 },
  { name: 'Recursos Humanos', documentos: 8, processos: 17 },
  { name: 'Meio Ambiente', documentos: 5, processos: 9 },
  { name: 'Obras', documentos: 15, processos: 20 }
];

const recentActivity = [
  {
    title: 'Novo Processo Criado',
    description: 'Processo #2023-0145 iniciado pelo Setor Jurídico',
    time: '15 min atrás',
    icon: <FileText className="h-4 w-4 text-blue-600" />,
    type: 'new'
  },
  {
    title: 'Documento Assinado',
    description: 'Ofício #OF-2023-0078 assinado por Diretor de RH',
    time: '1 hora atrás',
    icon: <FileSignature className="h-4 w-4 text-green-600" />,
    type: 'default'
  },
  {
    title: 'Prazo Vencendo',
    description: 'Processo #2023-0089 vence em 24 horas',
    time: '3 horas atrás',
    icon: <Clock className="h-4 w-4 text-red-600" />,
    type: 'urgent'
  },
  {
    title: 'Nova Mensagem na Ouvidoria',
    description: 'Reclamação #OUV-2023-0034 sobre iluminação pública',
    time: '5 horas atrás',
    icon: <MessageSquare className="h-4 w-4 text-purple-600" />,
    type: 'new'
  },
  {
    title: 'Edição de Documento',
    description: 'Memorando #MEM-2023-0056 editado pelo Setor Financeiro',
    time: '1 dia atrás',
    icon: <Edit className="h-4 w-4 text-orange-600" />,
    type: 'default'
  },
];

const Dashboard = () => {
  return (
    <AppLayout>
      <h1 className="page-title">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Processos em andamento"
          value="78"
          icon={<FileText className="h-5 w-5" />}
          color="blue"
        />
        <StatCard
          title="Documentos para assinar"
          value="13"
          icon={<FileSignature className="h-5 w-5" />}
          color="green"
        />
        <StatCard
          title="Prazos vencendo"
          value="5"
          icon={<Clock className="h-5 w-5" />}
          color="red"
        />
        <StatCard
          title="Ouvidorias pendentes"
          value="9"
          icon={<MessageSquare className="h-5 w-5" />}
          color="yellow"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Atividade por Departamento</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="documentos" fill="#1976D2" name="Documentos" />
                <Bar dataKey="processos" fill="#0A4B87" name="Processos" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Processos por Status</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {recentActivity.map((activity, index) => (
              <ActivityItem
                key={index}
                title={activity.title}
                description={activity.description}
                time={activity.time}
                icon={activity.icon}
                type={activity.type as any}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Dashboard;
