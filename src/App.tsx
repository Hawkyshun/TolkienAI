import React, { useState, useRef, useEffect } from 'react';
import { ScrollText, Send, Sparkles } from 'lucide-react';
import { sendMessage } from './lib/gemini';

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
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { content: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await sendMessage(userMessage);
      if (response) {
        setMessages(prev => [...prev, {
          content: response,
          isBot: true
        }]);
      } else {
        throw new Error('Empty response received');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        content: "Üzgünüm, şu anda cevap veremiyorum. Lütfen tekrar deneyin.",
        isBot: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed"
         style={{ backgroundImage: 'url("https://tse1.mm.bing.net/th?id=OIG4.pB9h79zqWONu2inySKMu&pid=ImgGn")' }}>
      <div className="min-h-screen bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 flex flex-col h-screen">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-yellow-400 font-serif mb-2">
              TolkienAI
            </h1>
            <p className="text-gray-300 italic">
              "Even the smallest person can change the course of the future."
            </p>
          </div>

          {/* Chat Container */}
          <div className="flex-1 bg-black/40 rounded-lg p-4 overflow-y-auto mb-4 border border-yellow-900/30">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.isBot
                        ? 'bg-gray-800/90 text-gray-100'
                        : 'bg-yellow-900/90 text-gray-100'
                    }`}
                  >
                    {message.isBot && (
                      <div className="flex items-center mb-2">
                        <ScrollText className="w-5 h-5 text-yellow-400 mr-2" />
                        <span className="text-yellow-400 font-semibold">TolkienAI</span>
                      </div>
                    )}
                    <p className="text-sm md:text-base">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800/90 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                      <span className="text-gray-400">TolkienAI düşünüyor...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Orta Dünya hakkında bir soru sorun..."
              className="flex-1 bg-gray-800/90 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-yellow-900/30"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-yellow-900/90 text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-800/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;