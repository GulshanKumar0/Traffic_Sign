# Sociology Mentor AI (Full-Stack)

A responsive AI chatbot platform for **UGC NET JRF Sociology preparation** with bilingual support (Hindi/English/Hinglish), chat modes, document upload + OCR parsing, and RAG-ready backend architecture.

## Features Included
- ChatGPT-style chat interface with timestamps and typing indicator.
- Bilingual + Hinglish support with auto language detection and manual override.
- Modes: Exam Preparation, Concept Learning, Quick Revision.
- Drag-drop upload for JPG/PNG/PDF with extracted text preview.
- Backend auth (signup/login), chat memory endpoints, and searchable Sociology question bank.
- Dashboard cards for progress analytics (sample UI).
- Dark/light mode toggle.
- RAG scaffolding for Sociology knowledge grounding.

## Project Structure

```text
.
├── backend/
│   ├── src/
│   │   ├── config/          # env config
│   │   ├── controllers/     # auth/chat/document controllers
│   │   ├── db/              # mock database + seed questions
│   │   ├── middleware/      # JWT auth middleware
│   │   ├── routes/          # API routes
│   │   ├── services/        # RAG + OCR processing services
│   │   ├── utils/           # language detection helpers
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # chat ui, sidebar, header, upload
│   │   ├── context/         # app-wide state (theme/language/mode)
│   │   ├── pages/           # chat + dashboard pages
│   │   ├── services/        # API client
│   │   ├── styles/          # responsive theme styles
│   │   └── App.jsx
├── docs/
│   ├── architecture.md
│   └── database_schema.sql
└── README.md
```

## Setup Instructions

### 1) Backend
```bash
cd backend
npm install
cp .env.example .env # optional, otherwise defaults are used
npm run dev
```

Create `backend/.env` (optional):
```env
PORT=5000
JWT_SECRET=super-secret-change-me
AI_PROVIDER_API_KEY=your_llm_api_key
MODE_DEFAULT=exam
```

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

Optional frontend env (`frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## API Endpoints (Sample)
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/chats` (auth)
- `POST /api/chats` (auth)
- `POST /api/chats/:chatId/message` (auth)
- `GET /api/chats/question-bank/search?topic=indian` (auth)
- `POST /api/docs/parse` (auth, multipart file)

## Data + RAG Integration Notes
- Replace `backend/src/db/mockDb.js` with PostgreSQL tables from `docs/database_schema.sql`.
- Replace `generateSociologyAnswer` in `backend/src/services/ragService.js` with your LLM provider call.
- Use embedding pipeline over:
  1. UGC NET JRF past 10+ year papers,
  2. UG/PG Sociology syllabus,
  3. Standard textbooks and Indian sociology references.

## Important
This scaffold is ready for extension and demonstrates architecture, APIs, UI, OCR hooks, and bilingual UX. For true “pre-trained” behavior, connect curated Sociology corpora + embedding index + model API in production.
