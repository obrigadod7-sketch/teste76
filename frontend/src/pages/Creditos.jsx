import React, { useState } from 'react';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Check, CreditCard, Smartphone } from 'lucide-react';
import { pricingPlans, getCurrentUser } from '../mock/data';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const Creditos = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('pix');

  const handlePurchase = (plan) => {
    setSelectedPlan(plan);
  };

  const confirmPurchase = () => {
    // Mock purchase
    alert(`Compra de ${selectedPlan.credits} créditos realizada com sucesso via ${paymentMethod.toUpperCase()}!`);
    setSelectedPlan(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-16 md:pb-0">
      <Header />

      <div className="max-w-6xl mx-auto px-3 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">💳</span>
            <span className="text-sm font-semibold text-yellow-700">Créditos Atuais: {user.credits}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Comprar Créditos
          </h1>
          <p className="text-gray-600">
            Escolha o plano ideal para você e tenha acesso ilimitado
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative p-6 hover:shadow-xl transition-all ${
                plan.popular ? 'border-2 border-green-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600">
                  Mais Popular
                </Badge>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-gray-900">R$</span>
                  <span className="text-5xl font-bold text-gray-900">{plan.price.toFixed(2).split('.')[0]}</span>
                  <span className="text-2xl text-gray-600">,{plan.price.toFixed(2).split('.')[1]}</span>
                </div>
                <p className="text-sm text-gray-600">{plan.credits} créditos</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gray-900 hover:bg-gray-800'
                    } text-white`}
                    onClick={() => handlePurchase(plan)}
                  >
                    Comprar Agora
                  </Button>
                </DialogTrigger>
                {selectedPlan?.id === plan.id && (
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Finalizar Compra</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Plano:</span>
                          <span className="font-semibold">{selectedPlan.name}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Créditos:</span>
                          <span className="font-semibold">{selectedPlan.credits}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="font-semibold">Total:</span>
                          <span className="text-xl font-bold text-green-600">R$ {selectedPlan.price.toFixed(2)}</span>
                        </div>
                      </div>

                      <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="pix">
                            <Smartphone className="w-4 h-4 mr-2" />
                            PIX
                          </TabsTrigger>
                          <TabsTrigger value="card">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Cartão
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="pix" className="space-y-3">
                          <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <div className="w-48 h-48 bg-white mx-auto mb-3 rounded-lg flex items-center justify-center border-2 border-dashed">
                              <span className="text-gray-400 text-sm">QR Code PIX</span>
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
                            <Input placeholder="0000 0000 0000 0000" className="h-9" />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-sm">Validade</Label>
                              <Input placeholder="MM/AA" className="h-9" />
                            </div>
                            <div>
                              <Label className="text-sm">CVV</Label>
                              <Input placeholder="123" className="h-9" type="password" maxLength={3} />
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm">Nome no Cartão</Label>
                            <Input placeholder="NOME COMPLETO" className="h-9" />
                          </div>
                        </TabsContent>
                      </Tabs>

                      <Button
                        onClick={confirmPurchase}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        Confirmar Pagamento
                      </Button>
                    </div>
                  </DialogContent>
                )}
              </Dialog>
            </Card>
          ))}
        </div>

        {/* Benefits */}
        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Por que comprar créditos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-sm mb-1">Acesso Ilimitado</h3>
              <p className="text-xs text-gray-600">Busque quantas vagas quiser</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm mb-1">Contato Direto</h3>
              <p className="text-xs text-gray-600">Fale com prestadores e empresas</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-sm mb-1">Alertas Personalizados</h3>
              <p className="text-xs text-gray-600">Receba notificações de novas vagas</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Creditos;