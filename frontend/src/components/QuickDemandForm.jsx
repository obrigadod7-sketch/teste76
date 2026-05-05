import React, { useState } from 'react';
import { Camera, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

const QuickDemandForm = ({ onSubmit }) => {
  const [photos, setPhotos] = useState([]);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(prev => [...prev, ...files.slice(0, 3 - prev.length)]);
  };

  return (
    <Card className="p-3 mb-2">
      <h3 className="font-semibold text-sm mb-2">Bonjour,</h3>
      
      {/* Photo Upload */}
      <div className="mb-2">
        <Label className="text-xs mb-2 block">Ajoutez des photos</Label>
        <p className="text-xs text-gray-600 mb-2">
          Augmentez vos chances de faire affaire de 25% en illustrant votre besoin.
        </p>
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <label
              key={index}
              className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#7CB342] transition-colors"
            >
              {photos[index] ? (
                <img
                  src={URL.createObjectURL(photos[index])}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Camera className="w-5 h-5 text-gray-400" />
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Address */}
      <div className="mb-2">
        <Label className="text-xs mb-2 block">Adresse</Label>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <Input
            placeholder="54 Avenue de New York, 75016 Paris"
            className="text-xs h-8"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button className="w-full bg-[#7CB342] hover:bg-[#6FA036] text-white h-9 text-sm">
        Poster ma demande
      </Button>
    </Card>
  );
};

export default QuickDemandForm;