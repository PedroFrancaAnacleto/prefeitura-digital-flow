
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { OmbudsmanItem } from '@/components/ombudsman/OmbudsmanItem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Send, 
  MessageSquare,
  User,
  Clock,
  CornerUpRight
} from 'lucide-react';

// Mock data
const MOCK_OMBUDSMAN_ITEMS = [
  {
    id: '1',
    title: 'Problemas na coleta de lixo',
    type: 'complaint' as const,
    createdAt: '15/08/2023',
    status: 'new' as const,
    content: 'Gostaria de reclamar sobre a coleta de lixo na Rua das Flores, que não está sendo realizada regularmente nas segundas e quartas-feiras conforme informado no calendário da prefeitura. Há duas semanas o lixo está se acumulando e causando mau cheiro e problemas de saúde.',
    requester: 'João Silva',
    contact: 'joao.silva@email.com',
    preview: 'Gostaria de reclamar sobre a coleta de lixo na Rua das Flores, que não está sendo realizada regularmente...'
  },
  {
    id: '2',
    title: 'Sugestão de melhoria no atendimento',
    type: 'suggestion' as const,
    createdAt: '13/08/2023',
    status: 'inProgress' as const,
    content: 'Sugiro que o sistema de agendamento online da prefeitura permita o cancelamento de consultas com pelo menos 12 horas de antecedência, liberando a vaga para outro cidadão. Isso melhoraria bastante a eficiência do atendimento.',
    requester: 'Maria Santos',
    contact: 'maria.santos@email.com',
    preview: 'Sugiro que o sistema de agendamento online da prefeitura permita o cancelamento de consultas com pelo menos...'
  },
  {
    id: '3',
    title: 'Elogio ao atendimento da Assistência Social',
    type: 'praise' as const,
    createdAt: '10/08/2023',
    status: 'completed' as const,
    content: 'Gostaria de elogiar a equipe de Assistência Social pelo atendimento prestado à minha família. Fomos muito bem recebidos e atendidos com muita atenção e profissionalismo. A assistente social Ana Paula merece reconhecimento pelo seu trabalho.',
    requester: 'Roberto Oliveira',
    contact: 'roberto.oliveira@email.com',
    preview: 'Gostaria de elogiar a equipe de Assistência Social pelo atendimento prestado à minha família. Fomos muito bem...'
  },
  {
    id: '4',
    title: 'Denúncia de obra irregular',
    type: 'report' as const,
    createdAt: '08/08/2023',
    status: 'inProgress' as const,
    content: 'Quero denunciar uma construção irregular na Avenida Central, número 1250. O proprietário está avançando sobre a calçada pública e realizando obras em horários não permitidos, inclusive aos domingos de manhã cedo.',
    requester: 'Anônimo',
    contact: 'anonimo123@email.com',
    preview: 'Quero denunciar uma construção irregular na Avenida Central, número 1250. O proprietário está avançando...'
  },
  {
    id: '5',
    title: 'Sugestão para eventos culturais',
    type: 'suggestion' as const,
    createdAt: '05/08/2023',
    status: 'new' as const,
    content: 'Sugiro que a prefeitura promova eventos culturais mensais na praça central, com apresentações de artistas locais e feira de artesanato. Isso valorizaria a cultura da cidade e poderia atrair turistas.',
    requester: 'Carla Mendes',
    contact: 'carla.mendes@email.com',
    preview: 'Sugiro que a prefeitura promova eventos culturais mensais na praça central, com apresentações de artistas...'
  }
];

const OmbudsmanPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItem, setSelectedItem] = useState(MOCK_OMBUDSMAN_ITEMS[0]);
  const [responseText, setResponseText] = useState("");

  const filteredItems = MOCK_OMBUDSMAN_ITEMS.filter(item => {
    // Filter by search term
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tab
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'suggestion') return matchesSearch && item.type === 'suggestion';
    if (activeTab === 'complaint') return matchesSearch && item.type === 'complaint';
    if (activeTab === 'praise') return matchesSearch && item.type === 'praise';
    if (activeTab === 'report') return matchesSearch && item.type === 'report';
    
    return matchesSearch;
  });

  return (
    <AppLayout>
      <h1 className="page-title">Ouvidoria</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1 flex flex-col">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
              <Input
                placeholder="Buscar manifestações..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs 
            defaultValue="all" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-4"
          >
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="suggestion">Sugestões</TabsTrigger>
              <TabsTrigger value="complaint">Reclamações</TabsTrigger>
              <TabsTrigger value="praise">Elogios</TabsTrigger>
              <TabsTrigger value="report">Denúncias</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex-1 min-h-0 border rounded-md overflow-hidden bg-white">
            {filteredItems.map((item) => (
              <OmbudsmanItem
                key={item.id}
                id={item.id}
                title={item.title}
                type={item.type}
                createdAt={item.createdAt}
                status={item.status}
                preview={item.preview}
                isActive={selectedItem.id === item.id}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-2 border rounded-md flex flex-col bg-white">
          {/* Header */}
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">{selectedItem.title}</h2>
              <span className={
                selectedItem.status === 'new' 
                  ? "badge badge-blue" 
                  : selectedItem.status === 'inProgress' 
                  ? "badge badge-yellow" 
                  : "badge badge-green"
              }>
                {selectedItem.status === 'new' ? 'Novo' : selectedItem.status === 'inProgress' ? 'Em Análise' : 'Concluído'}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>{selectedItem.createdAt}</span>
              <span className="mx-2">•</span>
              <span className={
                selectedItem.type === 'suggestion' 
                  ? "text-blue-600" 
                  : selectedItem.type === 'complaint' 
                  ? "text-red-600" 
                  : selectedItem.type === 'praise' 
                  ? "text-green-600" 
                  : "text-yellow-600"
              }>
                {selectedItem.type === 'suggestion' ? 'Sugestão' : 
                 selectedItem.type === 'complaint' ? 'Reclamação' : 
                 selectedItem.type === 'praise' ? 'Elogio' : 'Denúncia'}
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-auto p-4">
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                  <User className="h-4 w-4" />
                </div>
                <div className="ml-2">
                  <h4 className="font-medium">{selectedItem.requester}</h4>
                  <p className="text-sm text-gray-500">{selectedItem.contact}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p>{selectedItem.content}</p>
              </div>
            </div>
            
            {selectedItem.status === 'completed' && (
              <div className="mb-6">
                <div className="flex items-start">
                  <div className="mt-1 mr-2 text-blue-500">
                    <CornerUpRight className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <User className="h-3 w-3" />
                      </div>
                      <div className="ml-2">
                        <h4 className="text-sm font-medium">Atendente da Ouvidoria</h4>
                        <p className="text-xs text-gray-500">Respondido em {selectedItem.createdAt}</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md text-sm">
                      <p>Agradecemos pelo seu contato. Sua manifestação foi devidamente registrada e encaminhada para o setor responsável. Estamos à disposição para qualquer esclarecimento adicional.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedItem.status !== 'completed' && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Responder</h3>
                  <Select defaultValue="direct">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tipo de resposta" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="direct">Resposta Direta</SelectItem>
                      <SelectItem value="forward">Encaminhar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  placeholder="Digite sua resposta..."
                  className="min-h-[120px]"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                />
                <div className="flex justify-end mt-3">
                  <Button variant="default">
                    <Send className="h-4 w-4 mr-2" /> Enviar Resposta
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default OmbudsmanPage;
