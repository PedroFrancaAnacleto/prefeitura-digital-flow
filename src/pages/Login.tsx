
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate('/dashboard');
  };

  return (
    <div className="h-screen w-full flex">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gov-blue-600">Prefeitura Digital</h1>
            <p className="mt-2 text-gray-600">Sistema de Gestão de Processos Administrativos</p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email ou CPF</Label>
                <Input
                  id="email"
                  placeholder="Digite seu e-mail ou CPF"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                    Esqueceu a senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full bg-gov-blue-500 hover:bg-gov-blue-600">
                Entrar
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Acessar com Certificado Digital
            </a>
          </div>
        </div>
      </div>
      
      {/* Right Side - Image */}
      <div 
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&q=80')",
          backgroundPosition: "center",
        }}
      >
        <div className="h-full w-full bg-gov-blue-800 opacity-70 flex items-center justify-center">
          <div className="text-center text-white px-12">
            <h2 className="text-4xl font-bold mb-4">Bem-vindo ao Prefeitura Digital</h2>
            <p className="text-xl">
              Sistema de gestão de processos administrativos 100% digital para maior eficiência e transparência.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
