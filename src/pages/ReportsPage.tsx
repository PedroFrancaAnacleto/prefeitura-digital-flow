
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  FileText,
  BarChart2,
  PieChart,
  Calendar as CalendarIcon,
  Printer
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Mock data
const processByDepartmentData = [
  { name: 'Administração', quantidade: 120 },
  { name: 'Finanças', quantidade: 80 },
  { name: 'Obras', quantidade: 60 },
  { name: 'Saúde', quantidade: 90 },
  { name: 'Educação', quantidade: 70 },
  { name: 'Meio Ambiente', quantidade: 45 },
];

const processByStatusData = [
  { name: 'Novos', value: 42, color: '#2563EB' },
  { name: 'Em Andamento', value: 78, color: '#F59E0B' },
  { name: 'Concluídos', value: 35, color: '#10B981' },
  { name: 'Arquivados', value: 25, color: '#6B7280' },
];

const documentsByTypeData = [
  { name: 'Ofícios', quantidade: 65 },
  { name: 'Memorandos', quantidade: 45 },
  { name: 'Circulares', quantidade: 20 },
  { name: 'Portarias', quantidade: 30 },
  { name: 'Decretos', quantidade: 25 },
];

const processingTimeData = [
  { name: 'Administração', tempo: 5.2 },
  { name: 'Finanças', tempo: 7.8 },
  { name: 'Obras', tempo: 12.4 },
  { name: 'Saúde', tempo: 4.3 },
  { name: 'Educação', tempo: 6.1 },
  { name: 'Meio Ambiente', tempo: 8.7 },
];

const ReportsPage = () => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="page-title">Relatórios</h1>
        <div className="flex items-center space-x-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd/MM/yyyy") : <span>Selecione uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                initialFocus
                locale={ptBR}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          <Button>
            <Printer className="mr-2 h-4 w-4" /> Imprimir
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="processes" className="w-full mb-6">
        <TabsList className="grid grid-cols-3 w-full md:w-1/3">
          <TabsTrigger value="processes">Processos</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="performance">Desempenho</TabsTrigger>
        </TabsList>
        
        <TabsContent value="processes" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5" /> Processos por Departamento
                </CardTitle>
                <CardDescription>
                  Total de processos distribuídos por departamento
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={processByDepartmentData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="quantidade" name="Quantidade" fill="#0A4B87" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="mr-2 h-5 w-5" /> Processos por Status
                </CardTitle>
                <CardDescription>
                  Distribuição de processos por status atual
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={processByStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {processByStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button variant="outline" className="mr-2">
              <FileText className="mr-2 h-4 w-4" /> Visualizar Completo
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" /> Exportar Relatório
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="mr-2 h-5 w-5" /> Documentos por Tipo
              </CardTitle>
              <CardDescription>
                Total de documentos gerados por tipo
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={documentsByTypeData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantidade" name="Quantidade" fill="#1976D2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="mt-6 flex justify-end">
            <Button variant="outline" className="mr-2">
              <FileText className="mr-2 h-4 w-4" /> Visualizar Completo
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" /> Exportar Relatório
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="mr-2 h-5 w-5" /> Tempo Médio de Tramitação (dias)
              </CardTitle>
              <CardDescription>
                Tempo médio de tramitação dos processos por departamento
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={processingTimeData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tempo" name="Tempo (dias)" fill="#0A4B87" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="mt-6 flex justify-end">
            <Button variant="outline" className="mr-2">
              <FileText className="mr-2 h-4 w-4" /> Visualizar Completo
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" /> Exportar Relatório
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default ReportsPage;
