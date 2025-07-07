
import React, { useState, useCallback } from 'react';
import FileBrowser from './components/FileBrowser';
import ChatPanel from './components/ChatPanel';
import AddressBar from './components/AddressBar';
import { UploadedFile, ChatMessage, ChatRole, WebContext, GroundingSource } from './types';
import { generateContentStream } from './services/geminiService';
import { ChimeraIcon } from './components/icons';

const App: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [webContext, setWebContext] = useState<WebContext | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWebSearchLoading, setIsWebSearchLoading] = useState<boolean>(false);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    Array.from(uploadedFiles).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newFile: UploadedFile = {
          id: `${file.name}-${Date.now()}`,
          name: file.name,
          type: file.type,
          size: file.size,
          content: e.target?.result as string,
        };
        setFiles(prev => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    });
  }, []);
  
  const handleFileSelect = useCallback((file: UploadedFile) => {
    setSelectedFile(file);
    setWebContext(null);
    setMessages([]);
    setMessages([{
        id: `system-${Date.now()}`,
        role: ChatRole.SYSTEM,
        content: `Conversation started about file: ${file.name}.`
    }]);
  }, []);

  const handleClearContext = useCallback(() => {
    setSelectedFile(null);
    setWebContext(null);
    setMessages([]);
  }, []);

  const handleWebSearch = useCallback(async (query: string) => {
    setIsWebSearchLoading(true);
    setSelectedFile(null);
    setMessages([]);
    
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: ChatRole.USER,
      content: query,
    };
    setMessages([userMessage]);
    
    setIsLoading(true);
    
    try {
      const stream = await generateContentStream(query, undefined, true);
      let modelResponse = '';
      let sources: GroundingSource[] = [];

      const modelMessageId = `model-${Date.now()}`;
      setMessages(prev => [...prev, { id: modelMessageId, role: ChatRole.MODEL, content: '...', sources: [] }]);

      for await (const chunk of stream) {
        modelResponse += chunk.text;
        const groundingChunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (groundingChunks) {
            const currentSources: GroundingSource[] = groundingChunks
                .filter(c => c.web && c.web.uri)
                .map(c => ({
                    web: {
                        uri: c.web!.uri!,
                        title: c.web!.title || c.web!.uri!,
                    },
                }));
            
            if (currentSources.length > sources.length) {
                sources = currentSources;
            }
        }

        setMessages(prev => prev.map(msg => msg.id === modelMessageId ? {...msg, content: modelResponse, sources: sources} : msg));
      }
      setWebContext({ query, sources });

    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMessageId = `model-error-${Date.now()}`;
      setMessages(prev => [...prev, { id: errorMessageId, role: ChatRole.MODEL, content: `Error: ${error instanceof Error ? error.message : 'An unknown error occurred.'}` }]);
    } finally {
      setIsLoading(false);
      setIsWebSearchLoading(false);
    }
  }, []);


  const handleSendMessage = useCallback(async (prompt: string) => {
    setIsLoading(true);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: ChatRole.USER,
      content: prompt,
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const stream = await generateContentStream(prompt, selectedFile || undefined, !!webContext);
      let modelResponse = '';
      let sources: GroundingSource[] = webContext?.sources || [];
      
      const modelMessageId = `model-${Date.now()}`;
      setMessages(prev => [...prev, { id: modelMessageId, role: ChatRole.MODEL, content: '...', sources: sources }]);

      for await (const chunk of stream) {
        modelResponse += chunk.text;
        const groundingChunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (groundingChunks) {
          const newValidSources: GroundingSource[] = groundingChunks
            .filter(c => c.web && c.web.uri)
            .map(c => ({
              web: {
                uri: c.web!.uri!,
                title: c.web!.title || c.web!.uri!,
              },
            }));

          if (newValidSources.length > 0) {
            const combinedSources = [...sources, ...newValidSources];
            sources = Array.from(new Map(combinedSources.map(item => [item.web.uri, item])).values());
          }
        }
        
        setMessages(prev => prev.map(msg => msg.id === modelMessageId ? {...msg, content: modelResponse, sources: sources} : msg));
      }

      if (webContext) {
          setWebContext(prev => prev ? { ...prev, sources } : null);
      }

    } catch (error) {
        console.error("Gemini API Error:", error);
        const errorMessageId = `model-error-${Date.now()}`;
        setMessages(prev => [...prev, { id: errorMessageId, role: ChatRole.MODEL, content: `Error: ${error instanceof Error ? error.message : 'An unknown error occurred.'}` }]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile, webContext]);

  return (
    <div className="h-screen w-screen flex flex-col bg-ch-dark-void text-ch-text-primary">
       <header className="flex-shrink-0 bg-ch-primary p-3 border-b border-ch-secondary flex items-center gap-4 z-10">
         <div className="flex items-center gap-2">
            <ChimeraIcon className="w-6 h-6 text-ch-accent-magenta"/>
            <h1 className="text-xl font-bold">Chimera</h1>
         </div>
         <AddressBar onSearch={handleWebSearch} isLoading={isWebSearchLoading} />
      </header>
      <div className="flex flex-1 overflow-hidden">
        <FileBrowser 
          files={files}
          selectedFile={selectedFile}
          onFileSelect={handleFileSelect}
          onFileUpload={handleFileUpload}
        />
        <ChatPanel 
          messages={messages}
          isLoading={isLoading}
          onSendMessage={handleSendMessage}
          context={{ file: selectedFile, web: webContext }}
          onClearContext={handleClearContext}
        />
      </div>
    </div>
  );
};

export default App;
