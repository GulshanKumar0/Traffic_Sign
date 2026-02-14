import { useState } from 'react';
import { authApi } from '../services/api';
import ChatWindow from '../components/ChatWindow';
import FileUpload from '../components/FileUpload';
import { useAppContext } from '../hooks/useAppContext';

const DEMO_TOKEN =
  'paste-login-token-here';

const ChatPage = () => {
  const { mode, language } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [extractedPreview, setExtractedPreview] = useState('');

  const submitMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    try {
      const client = authApi(DEMO_TOKEN);
      const response = await client.post('/chats', {
        message: text,
        mode,
        languagePreference: language === 'auto' ? undefined : language
      });
      setMessages(response.data.messages);
      setText('');
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Please login and configure a valid API token.', timestamp: new Date() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('mode', mode);
    if (language !== 'auto') formData.append('languagePreference', language);

    setLoading(true);
    try {
      const client = authApi(DEMO_TOKEN);
      const response = await client.post('/docs/parse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setExtractedPreview(response.data.extractedText);
      setMessages((prev) => [
        ...prev,
        { role: 'user', text: `Uploaded file: ${file.name}`, timestamp: new Date() },
        { role: 'assistant', text: response.data.answer, timestamp: new Date() }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Unable to parse file. Ensure image/PDF quality is sufficient.',
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="chat-layout">
      <ChatWindow messages={messages} loading={loading} />
      <form className="chat-form" onSubmit={submitMessage}>
        <textarea
          placeholder="Ask Sociology question in Hindi, English, or Hinglish..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="chat-actions">
          <button type="submit">Send</button>
          <button type="button" onClick={uploadFile}>
            Analyze Upload
          </button>
        </div>
      </form>
      <FileUpload onFileChange={setFile} extractedPreview={extractedPreview} />
    </section>
  );
};

export default ChatPage;
