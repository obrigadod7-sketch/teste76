import React, { useState } from 'react';
import Header from '../components/Header';
import AutoJobSearch from '../components/AutoJobSearch';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { MapPin, Briefcase, DollarSign, Clock, Search, ExternalLink } from 'lucide-react';
import { mockJobs, jobCategories } from '../mock/data';
import { useSearchParams } from 'react-router-dom';

// Principais sites de emprego do Brasil
const jobBoards = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/', color: 'bg-blue-600', icon: '💼' },
  { name: 'Catho', url: 'https://www.catho.com.br/', color: 'bg-orange-500', icon: '🎯' },
  { name: 'Indeed', url: 'https://br.indeed.com/', color: 'bg-blue-700', icon: '🔍' },
  { name: 'InfoJobs', url: 'https://www.infojobs.com.br/', color: 'bg-pink-600', icon: '💡' },
  { name: 'Vagas.com', url: 'https://www.vagas.com.br/', color: 'bg-green-600', icon: '📋' },
  { name: 'Gupy', url: 'https://www.gupy.io/', color: 'bg-purple-600', icon: '🚀' },
  { name: 'Glassdoor', url: 'https://www.glassdoor.com.br/', color: 'bg-teal-600', icon: '⭐' },
  { name: 'Trampos.co', url: 'https://www.trampos.co/', color: 'bg-indigo-600', icon: '🎨' },
  { name: 'Empregos.com.br', url: 'https://www.empregos.com.br/', color: 'bg-red-600', icon: '🔔' },
  { name: 'Jooble', url: 'https://br.jooble.org/', color: 'bg-yellow-600', icon: '🌟' },
  { name: 'Trabalha Brasil', url: 'https://www.trabalhabrasil.com.br/', color: 'bg-blue-800', icon: '🇧🇷' },
  { name: 'Manager', url: 'https://www.manager.com.br/', color: 'bg-gray-700', icon: '💼' }
];

const Empregos = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-6xl mx-auto px-3 py-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Vagas de Emprego</h1>
          <p className="text-sm text-gray-600">Busque em múltiplos sites ou veja nossas vagas</p>
        </div>

        {/* Auto Job Search */}
        <AutoJobSearch />

        {/* Job Boards Section */}
        <Card className="p-4 mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <Briefcase className="w-5 h-5 text-green-600" />
            <h2 className="text-base font-bold text-gray-900">Buscar em Sites Parceiros</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Clique para buscar vagas nos principais sites de emprego do Brasil
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {jobBoards.map((board) => (
              <a
                key={board.name}
                href={board.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="p-3 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-green-500">
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 ${board.color} rounded-lg flex items-center justify-center mb-2 text-2xl group-hover:scale-110 transition-transform`}>
                      {board.icon}
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900 truncate w-full">{board.name}</h3>
                    <ExternalLink className="w-3 h-3 text-gray-400 mt-1" />
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </Card>

        {/* Search and Filters */}
        <Card className="p-3 mb-4">
          <div className="flex flex-col md:flex-row gap-2 mb-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar vaga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-9"
              />
            </div>
          </div>
          
          {/* Category Pills */}
          <div className="flex overflow-x-auto gap-2 pb-2">
            <Badge
              variant={selectedCategory === 'Todos' ? 'default' : 'outline'}
              className={`cursor-pointer whitespace-nowrap ${
                selectedCategory === 'Todos' 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory('Todos')}
            >
              Todos
            </Badge>
            {jobCategories.filter(c => c !== 'Popular').map((category) => (
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
        </Card>

        {/* Jobs List */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            {filteredJobs.length} vagas encontradas
          </h2>
          <div className="space-y-3">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start space-x-3">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base text-gray-900 mb-1">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        {job.type}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Há {Math.floor(Math.random() * 5) + 1} dias</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-3">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white h-8">
                        Candidatar-se
                      </Button>
                      <Button size="sm" variant="outline" className="h-8">
                        Salvar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {filteredJobs.length === 0 && (
          <Card className="p-8 text-center">
            <Briefcase className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">Nenhuma vaga encontrada</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Empregos;
