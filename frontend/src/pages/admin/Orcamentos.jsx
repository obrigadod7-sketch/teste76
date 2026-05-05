import React from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { FileText, Download, Eye } from 'lucide-react';

const mockOrcamentos = [
  { id: 1, cliente: 'Maria Silva', servico: 'Instalação Elétrica', valor: 'R$ 1.200', status: 'Pendente', data: '04/03/2026' },
  { id: 2, cliente: 'João Santos', servico: 'Pintura Residencial', valor: 'R$ 2.800', status: 'Aceito', data: '03/03/2026' },
  { id: 3, cliente: 'Ana Costa', servico: 'Encanamento', valor: 'R$ 850', status: 'Enviado', data: '02/03/2026' }
];

const Orcamentos = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orçamentos</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <FileText className="w-4 h-4 mr-2" />
          Novo Orçamento
        </Button>
      </div>

      <div className="space-y-3">
        {mockOrcamentos.map((orc) => (
          <Card key={orc.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-base mb-1">{orc.cliente}</h3>
                <p className="text-sm text-gray-600 mb-1">{orc.servico}</p>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span>{orc.data}</span>
                  <span className={`px-2 py-0.5 rounded ${
                    orc.status === 'Aceito' ? 'bg-green-100 text-green-700' :
                    orc.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>{orc.status}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-600 mb-2">{orc.valor}</p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline"><Eye className="w-4 h-4" /></Button>
                  <Button size="sm" variant="outline"><Download className="w-4 h-4" /></Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orcamentos;