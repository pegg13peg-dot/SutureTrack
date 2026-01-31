import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { askWoundCareAdvisor } from '../services/geminiService';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await askWoundCareAdvisor(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-brand-light/40 overflow-hidden flex flex-col" style={{ maxHeight: '500px', height: '60vh' }}>
          <div className="bg-brand-dark text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></div>
              <h3 className="font-semibold">Wound Care AI</h3>
            </div>
            <button onClick={toggleChat} className="text-brand-light hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-brand-pale/30 space-y-3">
            {messages.length === 0 && (
                <div className="text-center text-brand-dark/50 text-sm mt-8">
                    <p>👋 Hi! I can help answer general questions about suture care and infection signs.</p>
                </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${msg.role === 'user' ? 'bg-brand-orange text-white rounded-br-none shadow-md shadow-brand-orange/20' : 'bg-white border border-brand-light/30 text-brand-ink rounded-bl-none shadow-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                   <div className="bg-white border border-brand-light/30 rounded-2xl rounded-bl-none px-4 py-2 shadow-sm">
                       <div className="flex space-x-1">
                           <div className="w-2 h-2 bg-brand-light rounded-full animate-bounce"></div>
                           <div className="w-2 h-2 bg-brand-light rounded-full animate-bounce delay-75"></div>
                           <div className="w-2 h-2 bg-brand-light rounded-full animate-bounce delay-150"></div>
                       </div>
                   </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-brand-light/20">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask a question..."
                className="flex-1 bg-brand-pale/50 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-brand-orange focus:bg-white transition-all outline-none text-brand-ink"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2 bg-brand-orange text-white rounded-full hover:bg-brand-orange/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md shadow-brand-orange/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className={`${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} transition-all duration-300 bg-brand-dark hover:bg-brand-ink text-white p-4 rounded-full shadow-lg shadow-brand-dark/30 flex items-center gap-2 group border-2 border-brand-light/20`}
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-sm font-medium">Ask Assistant</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
};

export default AIChat;