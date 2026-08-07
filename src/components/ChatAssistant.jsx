import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './ChatAssistant.css';

const SYSTEM_PROMPT = `You are the official AI assistant for Bhola Sofa, a premium furniture manufacturer located in Jugsalai, Jamshedpur, Jharkhand (Pincode: 831006). 
Your job is to assist customers with furniture inquiries, pricing, dimensions, and delivery.

Key Information about Bhola Sofa:
- Legacy: We have been manufacturing furniture locally in Jamshedpur since 1978.
- Quality: We use solid teak wood, commercial ply, and premium high-density foam.
- Customization: Yes, we offer 100% customization! Customers can choose their exact dimensions, fabric type, and wood polish.
- Pricing: We offer factory-direct wholesale prices, which are significantly cheaper than retail showrooms.
- Buying Process: Customers can add items to their Cart on the website and click "Checkout via WhatsApp" to send their order directly to us. We finalize the payment and delivery on WhatsApp.
- Delivery Zones: 
  1. Free Delivery: Jamshedpur and surrounding areas (Pincodes starting with 831 or 832).
  2. Paid Delivery: Rest of Jharkhand (Pincodes starting with 81, 82, or 83). Standard freight charges apply.
  3. No Delivery: Outside Jharkhand.
- Contact: Customers can reach us directly on WhatsApp or Call at +91 92047 75927.

Tone & Style:
- Be extremely polite, professional, and helpful.
- Keep your answers concise and directly answer the user's question.
- Do NOT make up prices or policies that are not listed above. If you don't know, tell them to contact us on WhatsApp.
- End your responses by encouraging them to check out our catalog or WhatsApp us for custom quotes.`;

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
