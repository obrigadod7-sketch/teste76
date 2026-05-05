import React, { useState } from 'react';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Check, X, Crown, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useNavigate } from 'react-router-dom';

const Assinatura = () => {
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleUpgrade = () => {
    setShowPaymentModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-5xl mx-auto px-3 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assinatura</h1>
          <p className="text-gray-600">Compare as diferentes fórmulas</p>
        </div>

        {/* Plans Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Standard Plan */}
          <Card className="p-6 bg-white">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Standard</h2>
              <div className="text-3xl font-bold text-gray-900 mb-2">Gratuito</div>
              <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                Plano Atual
              </div>
            </div>
          </Card>

          {/* Premier Plan */}
          <Card className="p-6 bg-gradient-to-br from-pink-50 to-red-50 border-2 border-pink-300 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-pink-500 text-white px-4 py-1 rounded-full flex items-center space-x-1 text-sm font-bold">
                <Crown className="w-4 h-4" />
                <span>Premier</span>
              </div>
            </div>
            
            <div className="text-center mb-6 mt-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center space-x-2">
                <Crown className="w-6 h-6 text-pink-500" />
                <span>Premier</span>
              </h2>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-lg text-gray-500 line-through">R$ 31,75</span>
                <span className="bg-green-500 text-white px-2 py-0.5 rounded text-sm font-bold">-R$ 25</span>
              </div>
              <div className="text-4xl font-bold text-pink-600 mb-2">
                R$ 6,75 <span className="text-lg text-gray-600">/ mês</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Sem compromisso • Cancele quando quiser
              </p>
              <Button
                onClick={handleUpgrade}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white h-12 text-base font-semibold"
              >
                Converter →
              </Button>
            </div>
          </Card>
        </div>

        {/* Features Comparison Table */}
        <Card className="p-6">
          {/* Section 1: Propor meus serviços */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Propor meus serviços</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4 items-center py-3 border-b">
                <div className="text-sm text-gray-700">🗺️ Perímetro de intervenção</div>
                <div className="text-center">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </div>
                <div className="text-center">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center py-3 border-b">
                <div className="text-sm text-gray-700">🔔 Notificações "Novas demandas"</div>
                <div className="text-center">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </div>
                <div className="text-center">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Responder às demandas */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Responder às demandas</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4 items-center py-3 border-b">
                <div className="text-sm text-gray-700">⚡ Aluguel de material</div>
                <div className="text-center">
                  <span className="text-sm text-gray-600">Amostra</span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold text-pink-600">Ilimitado*</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center py-3 border-b">
                <div className="text-sm text-gray-700">✓ Prestação de serviço</div>
                <div className="text-center">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </div>
                <div className="text-center">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Minha visibilidade */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Minha visibilidade</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4 items-center py-3">
                <div className="text-sm text-gray-700">📞 Número de telefone no perfil</div>
                <div className="text-center">
                  <X className="w-5 h-5 text-red-500 mx-auto" />
                </div>
                <div className="text-center">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Additional Benefits */}
        <Card className="p-6 mt-4 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-start space-x-3">
            <Zap className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Por que assinar Premier?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Receba até 5x mais demandas que o plano gratuito</li>
                <li>✓ Seu telefone visível para clientes entrarem em contato diretamente</li>
                <li>✓ Responda ilimitadamente a ofertas de aluguel de material</li>
                <li>✓ Cancele quando quiser, sem compromisso</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-pink-500" />
              <span>Assinar Premier</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Plano Premier</span>
                <span className="font-semibold">Mensal</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-pink-600">R$ 6,75</span>
                <span className="text-gray-600">/ mês</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Economize R$ 25 por mês</p>
            </div>

            <Tabs defaultValue="pix">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pix">PIX</TabsTrigger>
                <TabsTrigger value="card">Cartão</TabsTrigger>
              </TabsList>

              <TabsContent value="pix" className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="w-48 h-48 bg-white mx-auto mb-3 rounded-lg flex items-center justify-center border-2">
                    <span className="text-xs text-gray-500">QR Code PIX</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">Escaneie o código ou copie a chave</p>
                  <Input
                    value="00020126580014BR.GOV.BCB.PIX..."
                    readOnly
                    className="text-xs"
                  />
                </div>
              </TabsContent>

              <TabsContent value="card" className="space-y-3">
                <div>
                  <Label className="text-sm">Número do Cartão</Label>
                  <Input placeholder="0000 0000 0000 0000" className="h-10" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm">Validade</Label>
                    <Input placeholder="MM/AA" className="h-10" />
                  </div>
                  <div>
                    <Label className="text-sm">CVV</Label>
                    <Input placeholder="123" type="password" maxLength={3} className="h-10" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button
              onClick={() => {
                alert('Assinatura Premier ativada com sucesso!');
                setShowPaymentModal(false);
                navigate('/perfil');
              }}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white h-11"
            >
              Confirmar Assinatura
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Assinatura;
