import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Loader2, ExternalLink } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AutoJobSearch = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('São Paulo');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setResults([]);
    
    try {
      // Simular busca automática em múltiplos sites
      const mockResults = [
        {
          id: 1,
          title: `${query} - Empresa A`,
          company: 'Empresa A',
          location: location,
          salary: 'R$ 5.000 - R$ 8.000',
          source: 'LinkedIn',
          url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`
        },
        {
          id: 2,
          title: `${query} - Empresa B`,
          company: 'Empresa B',
          location: location,
          salary: 'A combinar',
          source: 'Catho',
          url: `https://www.catho.com.br/vagas/${encodeURIComponent(query)}`
        },
        {
          id: 3,
          title: `${query} - Empresa C`,
          company: 'Empresa C',
          location: location,
          salary: 'R$ 4.500',
          source: 'Indeed',
          url: `https://br.indeed.com/jobs?q=${encodeURIComponent(query)}&l=${encodeURIComponent(location)}`
        }
      ];
      
      // Simular delay de busca
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResults(mockResults);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Card className="p-4 mb-4 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="flex items-center space-x-2 mb-3">
        <Search className="w-5 h-5 text-green-600" />
        <h2 className="text-base font-bold text-gray-900">Busca Automática de Vagas</h2>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Digite o cargo desejado e buscaremos automaticamente em todos os sites parceiros
      </p>
      
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <Input
          placeholder="Ex: Desenvolvedor, Vendedor, Designer..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1 h-10"
        />
        <Input
          placeholder="Localização"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="md:w-64 h-10"
        />
        <Button
          onClick={handleSearch}
          disabled={isSearching || !query.trim()}
          className="bg-green-600 hover:bg-green-700 text-white h-10 px-6"
        >
          {isSearching ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Buscando...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Buscar
            </>
          )}
        </Button>
      </div>

      {/* Results */}
      {isSearching && (
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Buscando vagas em múltiplos sites...</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            {results.length} vagas encontradas automaticamente:
          </p>
          {results.map((job) => (
            <a
              key={job.id}
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-green-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-sm">{job.title}</h3>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        {job.source}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{job.company} • {job.location}</p>
                    <p className="text-xs text-gray-700 font-medium">{job.salary}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </Card>
            </a>
          ))}
        </div>
      )}
    </Card>
  );
};

export default AutoJobSearch;
