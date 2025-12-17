import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: {
    translation: {
      welcome: 'Bem-vindo ao Watizat',
      needHelp: 'Preciso de Ajuda',
      wantToHelp: 'Quero Ajudar',
      login: 'Entrar',
      register: 'Cadastrar',
      email: 'Email',
      password: 'Senha',
      name: 'Nome',
      food: 'Alimentação',
      legal: 'Jurídico',
      health: 'Saúde',
      housing: 'Moradia',
      work: 'Trabalho',
      education: 'Educação',
      social: 'Social',
      chat: 'Chat AI',
      feed: 'Feed',
      profile: 'Perfil',
      search: 'Buscar',
      askQuestion: 'Faça uma pergunta...',
      sendMessage: 'Enviar',
      migrant: 'Migrante',
      helper: 'Ajudante'
    }
  },
  fr: {
    translation: {
      welcome: 'Bienvenue à Watizat',
      needHelp: "J'ai besoin d'aide",
      wantToHelp: 'Je veux aider',
      login: 'Se connecter',
      register: "S'inscrire",
      email: 'Email',
      password: 'Mot de passe',
      name: 'Nom',
      food: 'Alimentation',
      legal: 'Juridique',
      health: 'Santé',
      housing: 'Logement',
      work: 'Travail',
      education: 'Éducation',
      social: 'Social',
      chat: 'Chat IA',
      feed: 'Fil',
      profile: 'Profil',
      search: 'Rechercher',
      askQuestion: 'Posez une question...',
      sendMessage: 'Envoyer',
      migrant: 'Migrant',
      helper: 'Aidant'
    }
  },
  en: {
    translation: {
      welcome: 'Welcome to Watizat',
      needHelp: 'I Need Help',
      wantToHelp: 'I Want to Help',
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      name: 'Name',
      food: 'Food',
      legal: 'Legal',
      health: 'Health',
      housing: 'Housing',
      work: 'Work',
      education: 'Education',
      social: 'Social',
      chat: 'AI Chat',
      feed: 'Feed',
      profile: 'Profile',
      search: 'Search',
      askQuestion: 'Ask a question...',
      sendMessage: 'Send',
      migrant: 'Migrant',
      helper: 'Helper'
    }
  },
  es: {
    translation: {
      welcome: 'Bienvenido a Watizat',
      needHelp: 'Necesito Ayuda',
      wantToHelp: 'Quiero Ayudar',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      email: 'Email',
      password: 'Contraseña',
      name: 'Nombre',
      food: 'Alimentación',
      legal: 'Legal',
      health: 'Salud',
      housing: 'Vivienda',
      work: 'Trabajo',
      education: 'Educación',
      social: 'Social',
      chat: 'Chat IA',
      feed: 'Feed',
      profile: 'Perfil',
      search: 'Buscar',
      askQuestion: 'Haz una pregunta...',
      sendMessage: 'Enviar',
      migrant: 'Migrante',
      helper: 'Ayudante'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
