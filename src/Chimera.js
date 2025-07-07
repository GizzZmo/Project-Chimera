import React, 'react';
import Login from './components/Login';
import URLBar from './components/URLBar';
import BrowserFrame from './components/BrowserFrame';
import AIAssistant from './components/AIAssistant';
import useAuth from './hooks/useAuth'; // Custom hook to manage auth state
import './App.css';

function App() {
    const { token, login, logout } = useAuth();
    const [currentUrl, setCurrentUrl] = React.useState('about:blank');
    const [aiInsight, setAiInsight] = React.useState(null);

    if (!token) {
        return <Login onLogin={login} />;
    }

    return (
        <div className="app-container">
            <div className="scanline"></div>
            <header className="app-header">
                <h1>//:PROJECT_CHIMERA</h1>
                <button onClick={logout} className="logout-btn">[LOGOUT]</button>
            </header>
            <main className="main-content">
                <div className="browser-view">
                    <URLBar 
                        onNavigate={setCurrentUrl} 
                        setAiInsight={setAiInsight} 
                        token={token} 
                    />
                    <BrowserFrame url={currentUrl} />
                </div>
                <AIAssistant insight={aiInsight} />
            </main>
            <footer className="app-footer">
                <p>STATUS: [SECURE_CONNECTION_ESTABLISHED]</p>
                <p>CORTEX_AI: [ONLINE]</p>
            </footer>
        </div>
    );
}

export default App;
