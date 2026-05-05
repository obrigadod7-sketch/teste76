import React from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Settings, Bell, Lock, Globe } from 'lucide-react';

const Parametros = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Parâmetros</h1>

      <Card className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Settings className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-bold">Configurações Gerais</h2>
        </div>
        <div className="space-y-4">
          <div>
            <Label>Nome da Empresa</Label>
            <Input defaultValue="Minha Empresa Ltda" className="h-10" />
          </div>
          <div>
            <Label>Email Comercial</Label>
            <Input defaultValue="contato@empresa.com" className="h-10" />
          </div>
          <div>
            <Label>Telefone</Label>
            <Input defaultValue="(11) 98765-4321" className="h-10" />
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Bell className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-bold">Notificações</h2>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Novas demandas', desc: 'Receber notificações de novas demandas' },
            { label: 'Mensagens', desc: 'Notificar quando receber mensagens' },
            { label: 'Orçamentos aceitos', desc: 'Avisar quando um orçamento for aceito' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
              <div>
                <p className="font-semibold text-sm">{item.label}</p>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </div>
      </Card>

      <Button className="w-full bg-green-600 hover:bg-green-700">Salvar Alterações</Button>
    </div>
  );
};

export default Parametros;