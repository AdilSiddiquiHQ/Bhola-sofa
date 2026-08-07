import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './ChatAssistant.css';

const SYSTEM_PROMPT = `You are the official AI assistant for Bhola Sofa, a premium furniture manufacturer located in Jugsalai, Jamshedpur, Jharkhand (Pincode: 831006). 
The business has a 45+ year legacy, started in 1978 by Mr. MD Aslam (known affectionately as Bhola because of his pure heart) and revived by his son Mr. Anwar in 2026. 
You specialize in premium beds, sofas, dining tables, chairs, and decor. 

Key Business Information:
- Phone / WhatsApp: +91 92047 75927
- Email: Anwar0987@gmail.com
- Location: Jugsalai, Jamshedpur, Jharkhand 831006
- Features: 10M+ Satisfied Customers, International Furniture, Unbeatable Price, 100% Secure Payment.
- EMI: No Cost EMI available (T&C Min Purchase Of ₹5,000 via Bajaj Finserv, HDFC, SBI, ICICI, etc).
- Buying Process: Customers can add items to their Cart on the website and click "Checkout via WhatsApp" to send their order directly to us. We finalize the payment and delivery on WhatsApp.
- Delivery: Customers can use the Pincode checker at the top of the website to see if we deliver to their area.

Rules:
- Be extremely helpful, polite, and persuasive.
- If asked for contact details, provide the exact phone number and email listed above.
- If a customer asks how to buy, tell them to add products to the Cart and Checkout via WhatsApp.
- Keep responses concise and friendly.
- Do not make up fake phone numbers, emails, or policies. Only use the provided facts.`;

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
              {msg.role === 'assistant' ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                msg.text
              )}
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
