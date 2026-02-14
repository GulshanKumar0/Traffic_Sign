# Sociology Mentor AI - Architecture Overview

## Stack
- **Frontend**: React + Vite, responsive chat/dashboard UI.
- **Backend**: Node.js + Express APIs for auth, chat, document parsing.
- **RAG Layer**: Embedding + vector DB integration point in `backend/src/services/ragService.js`.
- **Document AI**: OCR for PNG/JPG (Tesseract), parser for PDF (`pdf-parse`).

## Core Workflow
1. User logs in and starts chat in selected mode (exam, learning, revision).
2. Backend detects language automatically unless user forces preference.
3. Retrieval service fetches best Sociology context chunks from knowledge stores.
4. LLM API (to be plugged into ragService) synthesizes grounded answer.
5. Uploaded image/PDF goes through OCR parser, extracted text is shown in UI, then passed to same RAG flow.

## Production hardening suggestions
- Replace in-memory DB with PostgreSQL + Redis.
- Add pgvector / Pinecone / Weaviate for embeddings.
- Add queue workers for OCR jobs (BullMQ/Celery).
- Add rate limiting, request tracing, and encrypted object storage.
