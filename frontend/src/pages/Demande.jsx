import React, { useState } from 'react';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Camera, MapPin, Euro } from 'lucide-react';
import { mockCategories } from '../mock/data';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';

const Demande = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    location: ''
  });
  const [photos, setPhotos] = useState([]);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(prev => [...prev, ...files.slice(0, 5 - prev.length)]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: 'Demande publiée !',
      description: 'Votre demande a été publiée avec succès.',
    });
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5F8FA]">
      <Header />
      <div className="max-w-4xl mx-auto px-3 py-4">
        <Card className="p-4">
          <h1 className="text-xl font-bold mb-1">Poster une demande</h1>
          <p className="text-sm text-gray-600 mb-4">
            Décrivez votre besoin et recevez des propositions de vos voisins
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Category */}
            <div>
              <Label className="text-sm">Catégorie *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div>
              <Label className="text-sm">Titre de votre demande *</Label>
              <Input
                placeholder="Ex: Aide pour déménagement appartement T3"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="h-9"
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label className="text-sm">Description *</Label>
              <Textarea
                placeholder="Décrivez votre besoin en détail..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                required
              />
            </div>

            {/* Photos */}
            <div>
              <Label className="text-sm">Photos (optionnel)</Label>
              <p className="text-xs text-gray-600 mb-2">
                Ajoutez jusqu'à 5 photos pour illustrer votre demande
              </p>
              <div className="flex flex-wrap gap-2">
                {photos.map((photo, index) => (
                  <div key={index} className="w-20 h-20 relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
                {photos.length < 5 && (
                  <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#7CB342] transition-colors">
                    <Camera className="w-6 h-6 text-gray-400" />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <Label className="text-sm">Adresse *</Label>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <Input
                  placeholder="54 Avenue de New York, 75016 Paris"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="h-9"
                  required
                />
              </div>
            </div>

            {/* Budget */}
            <div>
              <Label className="text-sm">Budget (optionnel)</Label>
              <div className="flex items-center space-x-2">
                <Euro className="w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Ex: 50€ ou Sur devis"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="h-9"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex space-x-2 pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#7CB342] hover:bg-[#6FA036] text-white"
              >
                Publier ma demande
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Demande;