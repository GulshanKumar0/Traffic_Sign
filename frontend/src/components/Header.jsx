import { useAppContext } from '../hooks/useAppContext';

const Header = () => {
  const { theme, setTheme, language, setLanguage, mode, setMode } = useAppContext();

  return (
    <header className="header">
      <h1>Sociology Mentor AI</h1>
      <div className="header-controls">
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="exam">Exam Preparation</option>
          <option value="learning">Concept Learning</option>
          <option value="revision">Quick Revision</option>
        </select>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="auto">Auto Detect</option>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="hinglish">Hinglish</option>
        </select>
        <button type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
    </header>
  );
};

export default Header;
