import React, { useState, useRef, useEffect } from 'react';
import { ScrollText, Send, Sparkles } from 'lucide-react';

interface Message {
  content: string;
  isBot: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Mae govannen! Ben TolkienAI, Orta Dünya diyarlarında size rehberlik etmek için buradayım. Arda dünyası hakkında ne konuşmak istersiniz?",
      isBot: true
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { content: input, isBot: false }]);
    
    // Clear input
    setInput('');

    // Simulate AI response (replace this with actual Gemini API call)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        content: "Bu bir örnek yanıttır. Gerçek uygulamada, bu yanıt Gemini API'den gelecektir.",
        isBot: true
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1635705163669-3c4b19c86eb0?auto=format&fit=crop&q=80')] bg-cover bg-center">
      <div className="min-h-screen bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 flex flex-col h-screen max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2 font-serif">
              TolkienAI
            </h1>
            <p className="text-gray-300 text-lg">Orta Dünya'daki Rehberiniz</p>
          </div>

          {/* Chat Container */}
          <div className="flex-1 bg-black/40 rounded-lg p-4 mb-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.isBot
                        ? 'bg-gray-800/80 text-gray-100'
                        : 'bg-yellow-900/80 text-yellow-100'
                    }`}
                  >
                    {message.isBot && (
                      <div className="flex items-center mb-2">
                        <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="text-yellow-400 font-semibold">TolkienAI</span>
                      </div>
                    )}
                    <p className="text-sm md:text-base">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Konuş dostum ve gir..."
              className="w-full bg-gray-800/80 text-gray-100 rounded-lg pl-4 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-yellow-400 hover:text-yellow-300 transition-colors p-2"
            >
              <Send className="w-6 h-6" />
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-4 text-gray-400 text-sm">
            <p>Gemini AI tarafından desteklenmektedir • Tolkien Estate ile bağlantısı yoktur</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;