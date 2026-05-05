import React from 'react';
import { Heart, Share2 } from 'lucide-react';
import { Card } from './ui/card';

const ThematiqueCard = ({ thematique }) => {
  return (
    <Card className="relative overflow-hidden group cursor-pointer">
      <div className="aspect-[4/3] relative">
        <img
          src={thematique.image}
          alt={thematique.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <h3 className="text-white font-semibold text-sm mb-2">{thematique.title}</h3>
          <div className="flex items-center space-x-3 text-white text-xs">
            <div className="flex items-center space-x-1">
              <Heart className="w-3.5 h-3.5" />
              <span>{thematique.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Share2 className="w-3.5 h-3.5" />
              <span>{thematique.shares}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ThematiqueCard;