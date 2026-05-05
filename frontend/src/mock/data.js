// Mock data para servivizinhos - Busca de empregos e serviços

export const mockJobs = [
  {
    id: '1',
    title: 'Desenvolvedor Full Stack',
    company: 'Tech Solutions',
    location: 'São Paulo, SP',
    salary: 'R$ 8.000 - R$ 12.000',
    type: 'CLT',
    category: 'Desenvolvedor',
    description: 'Procuramos desenvolvedor full stack com experiência em React e Node.js. Trabalho híbrido, 3x na semana presencial.',
    postedAt: '2026-03-04T10:00:00',
    logo: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    title: 'Vendedor Externo',
    company: 'Distribuidora ABC',
    location: 'Rio de Janeiro, RJ',
    salary: 'R$ 2.500 + comissões',
    type: 'CLT',
    category: 'Vendedor',
    description: 'Vaga para vendedor externo com experiência em vendas B2B. Carro da empresa fornecido.',
    postedAt: '2026-03-04T09:30:00',
    logo: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: '3',
    title: 'Motorista de Aplicativo',
    company: 'Autônomo',
    location: 'Belo Horizonte, MG',
    salary: 'R$ 3.000 - R$ 5.000',
    type: 'Autônomo',
    category: 'Motorista',
    description: 'Seja seu próprio chefe! Trabalhe como motorista de aplicativo com flexibilidade de horários.',
    postedAt: '2026-03-03T18:00:00',
    logo: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: '4',
    title: 'Recepcionista',
    company: 'Clínica Saúde+',
    location: 'Curitiba, PR',
    salary: 'R$ 2.200',
    type: 'CLT',
    category: 'Recepcionista',
    description: 'Recepcionista para clínica médica. Horário comercial, segunda a sexta.',
    postedAt: '2026-03-03T16:00:00',
    logo: 'https://i.pravatar.cc/150?img=4'
  },
  {
    id: '5',
    title: 'Eletricista Predial',
    company: 'Construtora Silva',
    location: 'Brasília, DF',
    salary: 'R$ 3.500',
    type: 'CLT',
    category: 'Eletricista',
    description: 'Eletricista com experiência em instalações prediais. NR10 obrigatória.',
    postedAt: '2026-03-03T14:00:00',
    logo: 'https://i.pravatar.cc/150?img=5'
  }
];

export const mockProviders = [
  {
    id: '1',
    name: 'João Silva',
    category: 'Bricolagem',
    avatar: 'https://i.pravatar.cc/150?img=11',
    rating: 4.8,
    reviewCount: 45,
    location: { lat: -23.5505, lng: -46.6333 },
    address: 'São Paulo, SP',
    distance: '2.5 km'
  },
  {
    id: '2',
    name: 'Maria Santos',
    category: 'Limpeza',
    avatar: 'https://i.pravatar.cc/150?img=47',
    rating: 4.9,
    reviewCount: 78,
    location: { lat: -23.5605, lng: -46.6433 },
    address: 'São Paulo, SP',
    distance: '3.8 km'
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    category: 'Transporte',
    avatar: 'https://i.pravatar.cc/150?img=33',
    rating: 4.7,
    reviewCount: 32,
    location: { lat: -23.5405, lng: -46.6233 },
    address: 'São Paulo, SP',
    distance: '1.2 km'
  }
];

export const jobCategories = [
  'Popular',
  'Desenvolvedor',
  'Vendedor',
  'Motorista',
  'Recepcionista',
  'Eletricista',
  'Enfermeiro',
  'Professor',
  'Designer'
];

export const serviceCategories = [
  'Todos',
  'Bricolagem',
  'Limpeza',
  'Transporte',
  'Aulas',
  'Informática',
  'Beleza',
  'Jardinagem'
];

export const pricingPlans = [
  {
    id: 'basic',
    name: 'Básico',
    credits: 10,
    price: 29.90,
    features: [
      '10 créditos',
      'Busca de empregos',
      'Contato com prestadores',
      'Suporte por email'
    ]
  },
  {
    id: 'pro',
    name: 'Profissional',
    credits: 30,
    price: 79.90,
    popular: true,
    features: [
      '30 créditos',
      'Busca ilimitada',
      'Destaque no mapa',
      'Alertas personalizados',
      'Suporte prioritário'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    credits: 100,
    price: 199.90,
    features: [
      '100 créditos',
      'Todos os recursos Pro',
      'Perfil verificado',
      'Análises detalhadas',
      'Suporte 24/7'
    ]
  }
];

export const getCurrentUser = () => ({
  id: 'current',
  name: 'Maria Silva',
  email: 'maria@example.com',
  avatar: 'https://i.pravatar.cc/150?img=48',
  location: 'São Paulo, SP',
  phone: '+55 11 98765-4321',
  credits: 5,
  isPremium: false
});

export const searchTips = [
  {
    number: 1,
    title: 'Mantenha seu currículo atualizado',
    description: 'Cadastre-se nos sites parceiros'
  },
  {
    number: 2,
    title: 'Use palavras-chave específicas',
    description: 'Busque por cargo ou habilidades'
  },
  {
    number: 3,
    title: 'Configure alertas de vagas',
    description: 'Receba notificações por email'
  },
  {
    number: 4,
    title: 'Prepare-se para entrevistas',
    description: 'Pesquise sobre as empresas'
  }
];