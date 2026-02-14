import { questionBank } from '../db/mockDb.js';

const modeSystemPrompts = {
  exam: 'Answer in exam-oriented style with structure, keywords, and likely marks distribution.',
  learning: 'Answer in concept-learning style with simple explanation and real-life examples.',
  revision: 'Answer in concise quick revision bullet points.'
};

const languagePrefix = {
  en: 'Respond in English.',
  hi: 'हिंदी में उत्तर दें।',
  hinglish: 'Hinglish me answer karein, clear academic terms ke saath.'
};

export const retrieveRelevantChunks = (query) => {
  const lower = query.toLowerCase();
  const matches = questionBank.filter(
    (item) =>
      item.question.toLowerCase().includes(lower) ||
      item.topic.toLowerCase().includes(lower) ||
      lower.includes(item.topic.toLowerCase().split(' ')[0])
  );

  return (matches.length ? matches : questionBank.slice(0, 2)).map((item) => ({
    source: `UGC NET ${item.year} - ${item.topic}`,
    content: `${item.question} => ${item.answer}`
  }));
};

export const buildPrompt = ({ query, mode, language }) => {
  const context = retrieveRelevantChunks(query);
  return {
    system: `${modeSystemPrompts[mode] || modeSystemPrompts.exam} ${languagePrefix[language] || languagePrefix.en}`,
    context
  };
};

export const generateSociologyAnswer = ({ query, mode, language }) => {
  const { context } = buildPrompt({ query, mode, language });
  const references = context.map((c) => `- ${c.source}`).join('\n');

  if (language === 'hi') {
    return `संक्षिप्त विश्लेषण:\n${query}\n\nमुख्य बिंदु:\n1) परिभाषा और सैद्धांतिक आधार स्पष्ट करें।\n2) प्रमुख समाजशास्त्री और भारतीय उदाहरण जोड़ें।\n3) उत्तर को परिचय-मुख्य भाग-निष्कर्ष में व्यवस्थित करें।\n\nसंदर्भ:\n${references}`;
  }

  if (language === 'hinglish') {
    return `Topic analysis for: ${query}\n\nExam focus:\n1) Definition + thinker perspective likhiye.\n2) Indian context and case study add kijiye.\n3) Structured intro-body-conclusion format follow kijiye.\n\nSources:\n${references}`;
  }

  return `Sociology answer guide for: ${query}\n\nHow to frame the response:\n1) Start with definition and core theoretical lens.\n2) Add key thinkers, schools, and one Indian sociology illustration.\n3) Finish with critical evaluation and concise conclusion.\n\nGrounded references:\n${references}`;
};
