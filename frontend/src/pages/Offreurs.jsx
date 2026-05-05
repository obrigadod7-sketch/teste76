import React, { useState } from 'react';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { MapPin, Star, Search } from 'lucide-react';
import { mockUsers, mockCategories } from '../mock/data';

const Offreurs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-[#F5F8FA]">
      <Header />
      <div className="max-w-7xl mx-auto px-3 py-3">
        {/* Filters */}
        <Card className="p-3 mb-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Rechercher un offreur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {mockCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Distance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">Moins de 5 km</SelectItem>
                <SelectItem value="10">Moins de 10 km</SelectItem>
                <SelectItem value="20">Moins de 20 km</SelectItem>
                <SelectItem value="all">Toutes distances</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Offreurs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {mockUsers.map((user) => (
            <Card key={user.id} className="p-3 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3 mb-3">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{user.name}</h3>
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold">{user.rating}</span>
                    <span className="text-xs text-gray-500">({user.reviews})</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="truncate">{user.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                <Badge variant="outline" className="text-xs">Bricolage</Badge>
                <Badge variant="outline" className="text-xs">Jardinage</Badge>
              </div>

              <Button className="w-full bg-[#7CB342] hover:bg-[#6FA036] text-white h-8 text-sm">
                Contacter
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offreurs;
