import React from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Users, Mail, Phone, MapPin } from 'lucide-react';

const mockClientes = [
  { id: 1, nome: 'Maria Silva', email: 'maria@email.com', telefone: '(11) 98765-4321', cidade: 'São Paulo', projetos: 5 },
  { id: 2, nome: 'João Santos', email: 'joao@email.com', telefone: '(21) 99876-5432', cidade: 'Rio de Janeiro', projetos: 3 },
  { id: 3, nome: 'Ana Costa', email: 'ana@email.com', telefone: '(31) 98765-1234', cidade: 'Belo Horizonte', projetos: 7 }
];

const Clientes = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Diretório de Clientes</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <Users className="w-4 h-4 mr-2" />
          Adicionar Cliente
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {mockClientes.map((cliente) => (
          <Card key={cliente.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-base mb-1">{cliente.nome}</h3>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                  {cliente.projetos} projetos
                </span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{cliente.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{cliente.telefone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{cliente.cidade}</span>
              </div>
            </div>
            <Button size="sm" className="w-full mt-3" variant="outline">
              Ver Detalhes
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Clientes;