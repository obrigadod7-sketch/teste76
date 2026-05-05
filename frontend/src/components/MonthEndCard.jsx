import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const MonthEndCard = () => {
  return (
    <Card className="p-3 bg-gradient-to-br from-orange-50 to-pink-50">
      <h3 className="font-semibold text-sm mb-2">Arrondissez vos fins de mois</h3>
      <p className="text-xs text-gray-700 mb-2">
        Répondez aux demandes postées autour de chez vous et générez-vous un complément de revenus.
      </p>
      <Button className="w-full bg-[#FF9B8A] hover:bg-[#FF8A79] text-white h-9 text-sm">
        Proposer mes services
      </Button>
    </Card>
  );
};

export default MonthEndCard;