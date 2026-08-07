import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader } from 'lucide-react';
import './ChatAssistant.css';

const SYSTEM_PROMPT = `You are the official AI assistant for Bhola Sofa, a premium furniture manufacturer located in Jugsalai, Jamshedpur, Jharkhand. The business has a 45+ year legacy, started in 1978 by Mr. MD Aslam (known affectionately as Bhola because of his pure heart) and revived by his son Mr. Anwar in 2026. You specialize in premium beds, sofas, and dining tables. You offer 100% craftsmanship and durability. Be helpful, polite, and persuasive. Do not use markdown headers, keep responses concise and friendly.`;

const ChatAssistant = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hello! I am the Bhola Sofa Assistant. How can I help you furnish your home today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey === 'put_your_google_api_key_here') {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          text: "I'm currently disconnected. Please ask the administrator to add the Google Gemini API key to the .env.local file." 
        }]);
        setIsLoading(false);
        return;
      }

      // Format history for Gemini API
      const history = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const requestBody = {
        system_instruction: {
          parts: { text: SYSTEM_PROMPT }
        },
        contents: [
          ...history,
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 250,
        }
      };

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const botReply = data.candidates[0].content.parts[0].text;
      
      setMessages(prev => [...prev, { role: 'assistant', text: botReply }]);
    } catch (error) {
      console.error("Chat API Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I'm having trouble connecting to my brain right now. Please try calling us instead!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-assistant-container">
      <div className="chat-header">
        <div className="chat-header-info">
          <Bot size={20} />
          <h3>Bhola Sofa Assistant</h3>
        </div>
        <button onClick={onClose} className="chat-close-btn">
          <X size={18} />
        </button>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message-wrapper ${msg.role}`}>
            <div className={`chat-bubble ${msg.role}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="chat-message-wrapper assistant">
            <div className="chat-bubble assistant typing">
              <Loader className="spinner" size={16} /> Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSend}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about sofas, delivery..."
          disabled={isLoading}
        />
        <button type="submit" disabled={!input.trim() || isLoading}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatAssistant;
