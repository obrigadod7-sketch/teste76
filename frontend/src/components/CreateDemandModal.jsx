import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Wrench, Droplet, Truck, Trees, Home, GraduationCap, Monitor, Sparkles, Scissors, MoreHorizontal } from 'lucide-react';

const categories = [
  { id: 'bricolagem', name: 'Bricolagem', icon: Wrench, color: 'bg-orange-500' },
  { id: 'limpeza', name: 'Limpeza', icon: Droplet, color: 'bg-blue-500' },
  { id: 'transporte', name: 'Transporte', icon: Truck, color: 'bg-green-500' },
  { id: 'jardinagem', name: 'Jardinagem', icon: Trees, color: 'bg-teal-500' },
  { id: 'mudanca', name: 'Mudança', icon: Home, color: 'bg-purple-500' },
  { id: 'aulas', name: 'Aulas', icon: GraduationCap, color: 'bg-indigo-500' },
  { id: 'informatica', name: 'Informática', icon: Monitor, color: 'bg-cyan-500' },
  { id: 'beleza', name: 'Beleza', icon: Sparkles, color: 'bg-pink-500' },
  { id: 'estetica', name: 'Estética', icon: Scissors, color: 'bg-red-500' },
  { id: 'outros', name: 'Outros', icon: MoreHorizontal, color: 'bg-gray-500' }
];

const CreateDemandModal = ({ open, onOpenChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Demanda criada:', { ...formData, category: selectedCategory });
    onOpenChange(false);
    // Reset form
    setSelectedCategory('');
    setFormData({ title: '', description: '', budget: '', location: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Criar demanda</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Selection */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">Categoria</Label>
            <div className="grid grid-cols-5 gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                      selectedCategory === category.id
                        ? 'ring-2 ring-green-500 bg-green-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mb-2`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-medium text-center">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <Label className="text-sm">Título</Label>
            <Input
              placeholder="Ex: Preciso de eletricista"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="h-10"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label className="text-sm">Descrição</Label>
            <Textarea
              placeholder="Descreva o que você precisa..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          {/* Budget and Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm">Orçamento (R$)</Label>
              <Input
                placeholder="Opcional"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="h-10"
              />
            </div>
            <div>
              <Label className="text-sm">Localização</Label>
              <Input
                placeholder="Sua cidade"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="h-10"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white h-11"
            disabled={!selectedCategory}
          >
            Publicar demanda
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDemandModal;
