import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, UploadedFile, WebContext } from '../types';
import Message from './Message';
import Spinner from './Spinner';
import { SendIcon, CloseIcon, FileIcon, ImageIcon, ChimeraIcon } from './icons';

interface ChatPanelProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (prompt: string) => void;
  context: { file: UploadedFile | null; web: WebContext | null; };
  onClearContext: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ messages, isLoading, onSendMessage, context, onClearContext }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderContextChip = () => {
    if (!context.file && !context.web) return null;
    
    let icon;
    let text;

    if (context.file) {
        icon = context.file.type.startsWith('image/') ? <ImageIcon className="w-4 h-4 text-ch-accent-magenta"/> : <FileIcon className="w-4 h-4 text-ch-accent-magenta"/>;
        text = context.file.name;
    } else if (context.web) {
        icon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-ch-accent-magenta"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>;
        text = context.web.query;
    } else {
        return null;
    }

    return (
        <div className="flex items-center gap-2 bg-ch-accent-magenta/20 text-ch-accent-magenta font-medium text-sm px-3 py-1.5 rounded-full mb-2">
            {icon}
            <span className="truncate max-w-xs">{text}</span>
            <button onClick={onClearContext} className="ml-2 hover:bg-ch-accent-magenta/30 rounded-full p-0.5">
                <CloseIcon className="w-4 h-4"/>
            </button>
        </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-ch-primary/50">
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
            <div className="text-center h-full flex flex-col justify-center items-center">
                <ChimeraIcon className="w-24 h-24 text-ch-secondary" />
                <h1 className="text-2xl font-bold text-ch-text-primary mt-4">Chimera</h1>
                <p className="text-ch-text-secondary mt-2">Upload a file or ask a question about the web to begin.</p>
            </div>
        ) : (
            <div>
                {messages.map((msg) => <Message key={msg.id} message={msg} />)}
                <div ref={messagesEndRef} />
            </div>
        )}
      </div>
      <div className="p-4 bg-ch-primary/70 border-t border-ch-secondary">
        <div className="max-w-3xl mx-auto">
            <div className="flex items-start">
                {renderContextChip()}
            </div>
            <div className="relative flex items-center">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Send a message..."
                className="w-full bg-ch-secondary border border-ch-secondary text-ch-text-primary rounded-lg py-3 pl-4 pr-20 resize-none focus:outline-none focus:ring-2 focus:ring-ch-accent-magenta"
                rows={1}
                style={{maxHeight: '150px'}}
            />
            <button
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-ch-accent-magenta text-white p-2.5 rounded-full hover:bg-opacity-90 disabled:bg-ch-secondary disabled:cursor-not-allowed transition-all"
            >
                {isLoading ? <Spinner /> : <SendIcon className="w-5 h-5" />}
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;