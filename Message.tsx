
import React from 'react';
import { ChatMessage, ChatRole } from '../types';
import { UserIcon, ChimeraIcon } from './icons';

interface MessageProps {
  message: ChatMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === ChatRole.USER;

  // Basic markdown to HTML for code blocks
  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const code = part.replace(/```(\w*\n)?/g, '').replace(/```$/, '');
        return (
          <pre key={index} className="bg-ch-dark-void rounded-md p-3 my-2 text-sm overflow-x-auto">
            <code className="text-ch-text-primary font-mono">{code}</code>
          </pre>
        );
      }
      return (
        <span key={index} className="whitespace-pre-wrap">
          {part}
        </span>
      );
    });
  };

  return (
    <div className={`flex items-start gap-4 p-4 my-2 rounded-lg ${isUser ? 'bg-ch-secondary/30' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-ch-accent-magenta' : 'bg-ch-accent-cyan'}`}>
        {isUser ? <UserIcon className="w-5 h-5 text-white" /> : <ChimeraIcon className="w-5 h-5 text-ch-primary" />}
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="font-bold text-ch-text-primary">{isUser ? 'You' : 'Chimera'}</p>
        <div className="text-ch-text-secondary">
          {renderContent(message.content)}
        </div>
        {message.sources && message.sources.length > 0 && (
          <div className="mt-4">
            <p className="text-xs italic text-ch-text-secondary mb-2">To ensure transparency and resist censorship, the following sources were consulted:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {message.sources.map((source, index) => (
                <a
                  key={index}
                  href={source.web.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ch-secondary p-2 rounded-md hover:bg-ch-secondary/70 transition-colors text-xs text-ch-text-primary truncate"
                  title={source.web.title}
                >
                  <p className="font-semibold truncate">{source.web.title || 'Untitled'}</p>
                  <p className="text-ch-text-secondary truncate">{source.web.uri}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
