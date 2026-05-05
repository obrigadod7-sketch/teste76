import React, { useState, useCallback } from 'react';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { MapPin, Navigation, Star } from 'lucide-react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { mockProviders, serviceCategories } from '../mock/data';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -23.5505,
  lng: -46.6333
};

const Mapa = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [radius, setRadius] = useState('10');
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDUxe-HLztnRiQ8mFew15NCs2TWBUJ8Jl0'
  });

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  const filteredProviders = mockProviders.filter(provider => {
    return selectedCategory === 'Todos' || provider.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-7xl mx-auto px-3 py-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-gray-900">Prestadores Próximos</h1>
          <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-white">
            <Navigation className="w-4 h-4 mr-1" />
            Minha Localização
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-3 mb-3">
          {/* Category Tabs */}
          <div className="flex items-center space-x-2 mb-3 border-b pb-2">
            <Badge className="bg-pink-500 text-white">Todos</Badge>
            <Badge variant="outline">Prestadores (0)</Badge>
            <Badge variant="outline">Locais</Badge>
          </div>

          {/* Category Pills */}
          <div className="flex overflow-x-auto gap-2 mb-3 pb-2">
            {serviceCategories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={`cursor-pointer whitespace-nowrap ${
                  selectedCategory === category 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Radius Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Raio:</span>
            <Select value={radius} onValueChange={setRadius}>
              <SelectTrigger className="w-32 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 km</SelectItem>
                <SelectItem value="10">10 km</SelectItem>
                <SelectItem value="20">20 km</SelectItem>
                <SelectItem value="50">50 km</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline" className="ml-auto">
              <span className="mr-1">🔄</span>
              Atualizar
            </Button>
          </div>
        </Card>

        {/* Google Map */}
        <Card className="mb-3 overflow-hidden">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={13}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
              }}
            >
              {filteredProviders.map((provider) => (
                <Marker
                  key={provider.id}
                  position={provider.location}
                  title={provider.name}
                  icon={{
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="14" fill="#10b981" stroke="white" stroke-width="3"/>
                      </svg>
                    `),
                    scaledSize: new window.google.maps.Size(32, 32),
                  }}
                />
              ))}
            </GoogleMap>
          ) : (
            <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-3 animate-pulse" />
                <p className="text-gray-600 font-medium">Carregando mapa...</p>
              </div>
            </div>
          )}
        </Card>

        {/* Providers List */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">
              {filteredProviders.length} prestadores encontrados
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredProviders.map((provider) => (
              <Card key={provider.id} className="p-3 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start space-x-3">
                  <img
                    src={provider.avatar}
                    alt={provider.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-900 truncate">{provider.name}</h3>
                    <Badge variant="outline" className="text-xs mb-1">{provider.category}</Badge>
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold">{provider.rating}</span>
                      <span className="text-xs text-gray-500">({provider.reviewCount})</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{provider.distance}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white h-8">
                  Contatar
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mapa;
