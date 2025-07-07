import React, { useState } from 'react';
import { analyzeUrl } from '../services/api'; // API service

function URLBar({ onNavigate, setAiInsight, token }) {
    const [inputUrl, setInputUrl] = useState('');
    const [securityStatus, setSecurityStatus] = useState({ level: 'info', message: 'Awaiting input...' });

    const handleNavigate = async (e) => {
        e.preventDefault();
        // Client-side validation
        if (!inputUrl || !inputUrl.startsWith('https://')) {
            setSecurityStatus({ level: 'error', message: 'Invalid or insecure (non-HTTPS) URL.' });
            setAiInsight({ title: 'Input Error', text: 'Only secure HTTPS URLs are permitted.' });
            return;
        }

        try {
            const analysis = await analyzeUrl(inputUrl, token);
            setAiInsight(analysis.insight); // Update the AI assistant panel

            if (analysis.riskScore > 7) {
                setSecurityStatus({ level: 'error', message: `High Risk! [${analysis.riskScore}/10]` });
                // Optionally block navigation
            } else {
                setSecurityStatus({ level: 'secure', message: `Secure. [Risk: ${analysis.riskScore}/10]` });
                onNavigate(inputUrl);
            }
        } catch (error) {
            setSecurityStatus({ level: 'error', message: 'Analysis failed.' });
            setAiInsight({ title: 'Connection Error', text: 'Could not reach CHIMERA analysis core.' });
        }
    };
    
    // ... JSX for the form with input and security status display
}
