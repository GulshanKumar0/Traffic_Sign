-- PostgreSQL schema for production deployment
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  preferred_language VARCHAR(20) DEFAULT 'auto',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE chats (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mode VARCHAR(20) NOT NULL,
  title VARCHAR(200),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY,
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL,
  language VARCHAR(20),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE question_bank (
  id UUID PRIMARY KEY,
  year INT,
  exam VARCHAR(80) DEFAULT 'UGC NET JRF Sociology',
  topic VARCHAR(120) NOT NULL,
  question TEXT NOT NULL,
  answer TEXT,
  explanation TEXT,
  difficulty VARCHAR(20),
  tags TEXT[]
);

CREATE TABLE knowledge_documents (
  id UUID PRIMARY KEY,
  source_type VARCHAR(40), -- textbook, syllabus, PYQ
  title VARCHAR(220),
  language VARCHAR(20),
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE embeddings (
  id UUID PRIMARY KEY,
  document_id UUID REFERENCES knowledge_documents(id) ON DELETE CASCADE,
  chunk_text TEXT NOT NULL,
  embedding VECTOR(1536),
  model_name VARCHAR(80),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE uploads (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  file_name VARCHAR(255),
  mime_type VARCHAR(80),
  extracted_text TEXT,
  ocr_confidence NUMERIC(5,2),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE progress_metrics (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  metric_type VARCHAR(80), -- accuracy, revision, topic-score
  topic VARCHAR(120),
  score NUMERIC(5,2),
  payload JSONB,
  recorded_at TIMESTAMP DEFAULT NOW()
);
