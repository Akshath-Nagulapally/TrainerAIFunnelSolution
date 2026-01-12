import { Language } from './types';

export const translations = {
  // Tutorial / Welcome
  welcomeTo: { en: 'Welcome to', es: 'Bienvenido a' },
  trainerAI: { en: 'Trainer AI', es: 'Trainer AI' },
  tutorialOne: { en: 'Tutorial (1/2)', es: 'Tutorial (1/2)' },
  tutorialTwo: { en: 'Tutorial (2/2)', es: 'Tutorial (2/2)' },
  taglineNeverSkip: { en: 'Never skip workouts again.', es: 'Nunca vuelvas a saltarte entrenamientos.' },
  tutorialStep1: { en: '#1 Pick up the call.', es: '#1 Contesta la llamada.' },
  tutorialStep2: { en: '#2 Our AI motivates you (automated demo).', es: '#2 Nuestra AI te motiva (demo automática).' },
  tryIt: { en: 'Try it!', es: '¡Pruébalo!' },
  getStarted: { en: 'Get Started', es: 'Comenzar' },
  next: { en: 'Next', es: 'Siguiente' },
  continueLabel: { en: 'Continue', es: 'Continuar' },
  complete: { en: 'Complete', es: 'Completar' },

  // Personalization
  personalizeTitle: { en: "Let's personalize your AI Agent", es: 'Personalicemos tu Agente AI' },
  basicsStartTitle: { en: "Let's start with the basics.", es: 'Comencemos con lo básico.' },

  // Gender
  genderQuestion: { en: 'What is your gender?', es: '¿Cuál es tu género?' },
  genderMale: { en: 'Male', es: 'Hombre' },
  genderFemale: { en: 'Female', es: 'Mujer' },
  genderOther: { en: 'Other', es: 'Otro' },

  // Workout Frequency
  workoutFrequencyQuestion: { en: 'How many times do you wish you worked out per week?', es: '¿Cuántas veces te gustaría entrenar por semana?' },
  workoutOption1_3: { en: '1-3', es: '1-3' },
  workoutOption3_5: { en: '3-5', es: '3-5' },
  workoutOption5_6: { en: '5-6', es: '5-6' },
  workoutOptionEveryday: { en: 'Everyday', es: 'Todos los días' },

  // Auth
  authTitle: { en: 'Sign in/up', es: 'Iniciar sesión/registrarse' },
  signInWithGoogle: { en: 'Sign in with Google', es: 'Inicia sesión con Google' },
  signInWithApple: { en: 'Sign in with Apple', es: 'Inicia sesión con Apple' },
  orDivider: { en: 'OR', es: 'O' },
  signInSuccessTitle: { en: 'Successfully signed in!', es: '¡Sesión iniciada con éxito!' },
  signInSuccessMessage: { en: 'Click Continue below to proceed', es: 'Haz clic en Continuar para seguir' },

  // Survey Questions
  moveOnToGoals: { en: "Let's move on to goals.", es: 'Pasemos a las metas.' },
  
  goalQuestion: { en: 'What is your goal?', es: '¿Cuál es tu objetivo?' },
  goalLoseWeight: { en: 'Lose Weight', es: 'Perder peso' },
  goalMaintain: { en: 'Maintain', es: 'Mantener' },
  goalGainWeight: { en: 'Gain Weight', es: 'Ganar peso' },

  stoppingQuestion: { en: "What's stopping you from achieving your goal?", es: '¿Qué te impide alcanzar tu objetivo?' },
  stoppingLackConsistency: { en: 'Lack of consistency', es: 'Falta de consistencia' },
  stoppingUnhealthyEating: { en: 'Unhealthy eating habits', es: 'Hábitos alimenticios poco saludables' },
  stoppingLackSupport: { en: 'Lack of support', es: 'Falta de apoyo' },
  stoppingBusySchedule: { en: 'Busy schedule', es: 'Agenda ocupada' },

  accomplishQuestion: { en: "What would you like to accomplish?", es: '¿Qué te gustaría lograr?' },
  accomplishWorkout: { en: 'Workout and live healthier', es: 'Entrenar y vivir más saludable' },
  accomplishEnergy: { en: 'Boost energy and mood', es: 'Aumentar energía y estado de ánimo' },
  accomplishMotivated: { en: 'Stay motivated and consistent', es: 'Mantenerme motivado y constante' },
  accomplishFeelBetter: { en: 'Feel better about my body', es: 'Sentirme mejor con mi cuerpo' },

  liftingQuestion: { en: 'What is your experience with lifting?', es: '¿Cuál es tu experiencia con levantamiento de pesas?' },
  liftingNone: { en: 'None', es: 'Ninguna' },
  liftingBeginner: { en: 'Beginner (1 year or less)', es: 'Principiante (1 año o menos)' },
  liftingIntermediate: { en: 'Intermediate (1-4 years)', es: 'Intermedio (1-4 años)' },
  liftingAdvanced: { en: 'Advanced (4+ years)', es: 'Avanzado (4+ años)' },

  relationshipQuestion: { en: 'How do you want to change your relationship with exercise?', es: '¿Cómo quieres cambiar tu relación con el ejercicio?' },
  relationshipScratch: { en: 'I want to become consistent from scratch', es: 'Quiero ser constante desde cero' },
  relationshipBack: { en: 'I want to get back into the habit', es: 'Quiero retomar el hábito' },
  relationshipEasier: { en: 'I want regular exercising feel easier', es: 'Quiero que el ejercicio regular sea más fácil' },
  relationshipDontKnow: { en: "I don't know", es: 'No lo sé' },

  consistentTimesQuestion: { en: 'How many times have you tried to be consistent in the past?', es: '¿Cuántas veces has intentado ser constante en el pasado?' },
  consistentNever: { en: 'Never (first attempt)', es: 'Nunca (primer intento)' },
  consistent1_3: { en: '1-3 times', es: '1-3 veces' },
  consistent4_10: { en: '4-10 times', es: '4-10 veces' },
  consistentLostCount: { en: 'Lost count', es: 'Perdí la cuenta' },

  supportQuestion: { en: 'Have you tried any support before?', es: '¿Has probado algún tipo de apoyo antes?' },
  supportTrainer: { en: 'Personal Trainer', es: 'Entrenador Personal' },
  supportYoutube: { en: 'YouTube', es: 'YouTube' },
  supportAlarm: { en: 'Alarm', es: 'Alarma' },
  supportNothing: { en: 'Nothing', es: 'Nada' },

  confidentQuestion: { en: 'Do you feel confident that you will be able to commit to exercise whenever you decide?', es: '¿Te sientes seguro de que podrás comprometerte con el ejercicio cuando decidas?' },
  confidentYes: { en: 'Yes', es: 'Sí' },
  confidentMaybe: { en: 'Maybe', es: 'Quizás' },
  confidentNo: { en: 'No', es: 'No' },

  excuseQuestion: { en: "What's your favorite excuse?", es: '¿Cuál es tu excusa favorita?' },
  excuse5Minutes: { en: "I'll do it in 5 minutes", es: 'Lo haré en 5 minutos' },
  excuseTomorrow: { en: "I'll do it tomorrow", es: 'Lo haré mañana' },
  excuseSore: { en: "I'm too sore today", es: 'Estoy muy adolorido hoy' },
  excuseAfterTest: { en: 'After this test next week', es: 'Después del examen de la próxima semana' },

  // Infographics
  currentBodyTitle: { en: 'Where are you right now?', es: '¿Dónde estás ahora mismo?' },
  idealBodyTitle: { en: 'Where do you want to be?', es: '¿Dónde quieres estar?' },
  notHardTitle: { en: "Getting there is not hard at all! It's very realistic.", es: '¡Llegar allí no es difícil en absoluto! Es muy realista.' },
  notHardSubtitle: { en: 'Studies show that consistent exercise can boost speed of results by 30-40%', es: 'Los estudios muestran que el ejercicio constante puede aumentar la velocidad de los resultados en un 30-40%' },
  longTermTitle: { en: 'Long-term consistency beats short-term intensity', es: 'La consistencia a largo plazo supera la intensidad a corto plazo' },
  ninetySixTitle: { en: '96% of attempts fail without structured support.', es: 'El 96% de los intentos fallan sin apoyo estructurado.' },
  favouriteExcuseTitle: { en: "We've all been there", es: 'Todos hemos estado ahí' },
  
  // FavouriteExcuse screen
  youLabel: { en: 'You', es: 'Tú' },
  trainerAILabel: { en: 'Trainer AI', es: 'Trainer AI' },
  demoDisclaimer: { en: '*this is a pre-recorded demo', es: '*esta es una demostración pregrabada' },

  // Demo
  personalizingExperience: { en: 'Personalizing your experience', es: 'Personalizando tu experiencia' },
  yourMatch: { en: 'Your Match:', es: 'Tu Match:' },
  agentNumber: { en: 'Agent #5', es: 'Agente #5' },
  demoSubtext: { en: 'Based on your response, this is the AI personality profile that best suits your needs. Personalization Complete!', es: 'Según tus respuestas, este es el perfil de IA que mejor se adapta a tus necesidades. ¡Personalización completa!' },

  // Payment
  paymentHeaderLine1: { en: 'We want you to try', es: 'Queremos que pruebes' },
  paymentHeaderLine2: { en: 'Trainer AI for free.', es: 'Trainer AI gratis.' },
  paymentNoPaymentDue: { en: 'No Payment Due Now', es: 'Sin pago ahora' },
  paymentTryForZero: { en: 'Try for $0.00', es: 'Pruébalo por $0.00' },
  paymentPriceInfo: { en: 'Just $29.99 per year ($2.49/mo)', es: 'Solo $29.99 al año ($2.49/mes)' },

  // Notification
  notificationTitle1: { en: "We'll send you a reminder", es: 'Te enviaremos un recordatorio' },
  notificationTitle2: { en: 'before your free trial ends.', es: 'antes de que termine tu prueba gratuita.' },
  continueForFree: { en: 'Continue for FREE', es: 'Continuar GRATIS' },

  // Paywall
  startFreeTrial: { en: 'Start Free Trial', es: 'Iniciar Prueba Gratuita' },
  paywallTitle: { en: 'Unlock Trainer AI', es: 'Desbloquea Trainer AI' },
  paywallDescription: { en: '7-day free trial, then $29.99/year', es: '7 días de prueba gratis, luego $29.99/año' },
  maybeLater: { en: 'Maybe Later', es: 'Quizás Después' },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Language): string {
  const translation = translations[key];
  if (typeof translation === 'object' && translation !== null) {
    return translation[lang] || translation.en;
  }
  return key;
}

