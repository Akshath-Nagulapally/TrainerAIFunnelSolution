import { QuestionConfig, InfoScreenData } from './types';

// Info screens data (for InfoScreen template)
export const infoScreens: Record<string, InfoScreenData> = {
  welcome: {
    id: 'welcome',
    title: { en: ['Welcome to', 'Trainer AI'], es: ['Bienvenido a', 'Trainer AI'] },
    subtitle: { en: 'Never skip workouts again.', es: 'Nunca vuelvas a saltarte entrenamientos.' },
    image: 'demo_1.png',
    buttonText: { en: 'Get Started', es: 'Comenzar' },
    showPaginationDots: true,
    totalPages: 3,
  },
  tutorial1: {
    id: 'tutorial1',
    title: { en: 'Tutorial (1/2)', es: 'Tutorial (1/2)' },
    subtitle: { en: '#1 Pick up the call.', es: '#1 Contesta la llamada.' },
    image: 'demo_2.png',
    buttonText: { en: 'Next', es: 'Siguiente' },
    showPaginationDots: true,
    totalPages: 3,
  },
  tutorial2: {
    id: 'tutorial2',
    title: { en: 'Tutorial (2/2)', es: 'Tutorial (2/2)' },
    subtitle: { en: '#2 Our AI motivates you (automated demo).', es: '#2 Nuestra AI te motiva (demo automática).' },
    image: 'iphone-frame.svg',
    buttonText: { en: 'Next', es: 'Siguiente' },
    showPaginationDots: true,
    totalPages: 3,
    tryItAudio: { en: '/audio/demo_english.wav', es: '/audio/demo_spanish.wav' },
    tryItButtonText: { en: 'Try It', es: 'Pruébalo' },
  },
  personalize: {
    id: 'personalize',
    title: { en: "Let's personalize your AI Agent", es: 'Personalicemos tu Agente AI' },
    image: 'lets_personalize.png',
    buttonText: { en: 'Get Started', es: 'Comenzar' },
  },
  basicsStart: {
    id: 'basicsStart',
    title: { en: "Let's start with the basics.", es: 'Comencemos con lo básico.' },
    image: 'basics_start.png',
    buttonText: { en: 'Get Started', es: 'Comenzar' },
  },
  guiderGoal: {
    id: 'guiderGoal',
    title: { en: "Let's move on to goals.", es: 'Pasemos a las metas.' },
    image: 'guider_goal.png',
    buttonText: { en: 'Continue', es: 'Continuar' },
  },
  demo: {
    id: 'demo',
    title: { en: ['Your Match:', 'Agent #5'], es: ['Tu Match:', 'Agente #5'] },
    subtitle: { 
      en: 'Based on your response, this is the AI personality profile that best suits your needs. Personalization Complete!', 
      es: 'Según tus respuestas, este es el perfil de IA que mejor se adapta a tus necesidades. ¡Personalización completa!' 
    },
    image: 'personalized.png',
    buttonText: { en: 'Continue', es: 'Continuar' },
  },
  payment: {
    id: 'payment',
    title: { en: ['We want you to try', 'Trainer AI for free.'], es: ['Queremos que pruebes', 'Trainer AI gratis.'] },
    image: 'demo_2.png',
    buttonText: { en: 'Try for $0.00', es: 'Pruébalo por $0.00' },
  },
  notification: {
    id: 'notification',
    title: { en: ["We'll send you a reminder", 'before your free trial ends.'], es: ['Te enviaremos un recordatorio', 'antes de que termine tu prueba gratuita.'] },
    image: 'notification_bell.png',
    buttonText: { en: 'Continue for FREE', es: 'Continuar GRATIS' },
  },
};

// Survey questions
export const surveyQuestions: QuestionConfig[] = [
  // Goals section
  {
    id: 'guiderGoal',
    type: 'infographic',
    component: 'GuiderGoal',
  },
  {
    id: 'goal',
    type: 'question',
    question: { en: 'What is your goal?', es: '¿Cuál es tu objetivo?' },
    options: {
      en: ['Lose Weight', 'Maintain', 'Gain Weight'],
      es: ['Perder peso', 'Mantener', 'Ganar peso'],
    },
  },
  {
    id: 'stopping',
    type: 'question',
    question: { en: "What's stopping you from achieving your goal?", es: '¿Qué te impide alcanzar tu objetivo?' },
    options: {
      en: ['Lack of consistency', 'Unhealthy eating habits', 'Lack of support', 'Busy schedule'],
      es: ['Falta de consistencia', 'Hábitos alimenticios poco saludables', 'Falta de apoyo', 'Agenda ocupada'],
    },
  },
  {
    id: 'accomplish',
    type: 'question',
    question: { en: "What would you like to accomplish?", es: '¿Qué te gustaría lograr?' },
    options: {
      en: ['Workout and live healthier', 'Boost energy and mood', 'Stay motivated and consistent', 'Feel better about my body'],
      es: ['Entrenar y vivir más saludable', 'Aumentar energía y estado de ánimo', 'Mantenerme motivado y constante', 'Sentirme mejor con mi cuerpo'],
    },
  },
  // Body composition infographics
  {
    id: 'currentBody',
    type: 'infographic',
    component: 'CurrentBodyComposition',
  },
  {
    id: 'idealBody',
    type: 'infographic',
    component: 'IdealBodyComposition',
  },
  {
    id: 'notHard',
    type: 'infographic',
    component: 'NotHardAtAll',
  },
  // Experience questions
  {
    id: 'lifting',
    type: 'question',
    question: { en: 'What is your experience with lifting?', es: '¿Cuál es tu experiencia con levantamiento de pesas?' },
    options: {
      en: ['None', 'Beginner (1 year or less)', 'Intermediate (1-4 years)', 'Advanced (4+ years)'],
      es: ['Ninguna', 'Principiante (1 año o menos)', 'Intermedio (1-4 años)', 'Avanzado (4+ años)'],
    },
  },
  {
    id: 'relationship',
    type: 'question',
    question: { en: 'How do you want to change your relationship with exercise?', es: '¿Cómo quieres cambiar tu relación con el ejercicio?' },
    options: {
      en: ['I want to become consistent from scratch', 'I want to get back into the habit', 'I want regular exercising feel easier', "I don't know"],
      es: ['Quiero ser constante desde cero', 'Quiero retomar el hábito', 'Quiero que el ejercicio regular sea más fácil', 'No lo sé'],
    },
  },
  {
    id: 'consistentTimes',
    type: 'question',
    question: { en: 'How many times have you tried to be consistent in the past?', es: '¿Cuántas veces has intentado ser constante en el pasado?' },
    options: {
      en: ['Never (first attempt)', '1-3 times', '4-10 times', 'Lost count'],
      es: ['Nunca (primer intento)', '1-3 veces', '4-10 veces', 'Perdí la cuenta'],
    },
  },
  // Long term infographic
  {
    id: 'longTerm',
    type: 'infographic',
    component: 'LongTermConsistency',
  },
  // More questions
  {
    id: 'support',
    type: 'question',
    question: { en: 'Have you tried any support before?', es: '¿Has probado algún tipo de apoyo antes?' },
    options: {
      en: ['Personal Trainer', 'YouTube', 'Alarm', 'Nothing'],
      es: ['Entrenador Personal', 'YouTube', 'Alarma', 'Nada'],
    },
  },
  {
    id: 'confident',
    type: 'question',
    question: { en: 'Do you feel confident that you will be able to commit to exercise whenever you decide?', es: '¿Te sientes seguro de que podrás comprometerte con el ejercicio cuando decidas?' },
    options: {
      en: ['Yes', 'Maybe', 'No'],
      es: ['Sí', 'Quizás', 'No'],
    },
  },
  // 96% infographic
  {
    id: 'ninetySix',
    type: 'infographic',
    component: 'NinetySixPercent',
  },
  // Excuse question
  {
    id: 'excuse',
    type: 'question',
    question: { en: "What's your favorite excuse?", es: '¿Cuál es tu excusa favorita?' },
    options: {
      en: ["I'll do it in 5 minutes", "I'll do it tomorrow", "I'm too sore today", 'After this test next week'],
      es: ['Lo haré en 5 minutos', 'Lo haré mañana', 'Estoy muy adolorido hoy', 'Después del examen de la próxima semana'],
    },
  },
  // Favourite excuse infographic
  {
    id: 'favouriteExcuse',
    type: 'infographic',
    component: 'FavouriteExcuse',
  },
];

// Basic questions (before auth)
export const basicQuestions: QuestionConfig[] = [
  {
    id: 'gender',
    type: 'question',
    question: { en: 'What is your gender?', es: '¿Cuál es tu género?' },
    options: {
      en: ['Male', 'Female', 'Other'],
      es: ['Hombre', 'Mujer', 'Otro'],
    },
  },
  {
    id: 'frequency',
    type: 'question',
    question: { en: 'How many times do you wish you worked out per week?', es: '¿Cuántas veces te gustaría entrenar por semana?' },
    options: {
      en: ['1-3', '3-5', '5-6', 'Everyday'],
      es: ['1-3', '3-5', '5-6', 'Todos los días'],
    },
  },
];

