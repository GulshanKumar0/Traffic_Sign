import { v4 as uuid } from 'uuid';

export const users = [];
export const chats = [];

export const questionBank = [
  {
    id: uuid(),
    year: 2023,
    topic: 'Sociological Thinkers',
    question: 'Explain Emile Durkheim’s concept of social facts with examples.',
    answer:
      'Durkheim defined social facts as ways of acting, thinking, and feeling external to individuals and endowed with coercive power.'
  },
  {
    id: uuid(),
    year: 2019,
    topic: 'Indian Sociology',
    question: 'Discuss the concept of Sanskritization and dominant caste by M. N. Srinivas.',
    answer:
      'Sanskritization refers to mobility through imitation of upper-caste practices. Dominant caste combines ritual status, landownership, and political power.'
  },
  {
    id: uuid(),
    year: 2016,
    topic: 'Research Methods',
    question: 'Differentiate positivism and interpretivism in sociological methodology.',
    answer:
      'Positivism emphasizes objectivity and quantification; interpretivism prioritizes meanings, context, and qualitative understanding.'
  }
];
