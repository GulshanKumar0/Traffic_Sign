import { NavLink, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import { useAppContext } from './hooks/useAppContext';

const App = () => {
  const { theme } = useAppContext();

  return (
    <div className={`app ${theme}`}>
      <Header />
      <nav className="top-nav">
        <NavLink to="/">Chat</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>
      <main className="layout">
        <Sidebar />
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
