import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowUp, ChevronDown } from 'lucide-react';
import { generateAIResponse, getWelcomeMessage, type Message } from '../utils/mockAI';
import { useNavigate } from 'react-router-dom';

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 初始化歡迎訊息
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([getWelcomeMessage()]);
    }
  }, [isOpen, messages.length]);

  // 自動滾動到最新訊息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 處理發送訊息
  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // 添加用戶訊息
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // 模擬思考時間
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 800);
  };

  // 處理快速回覆
  const handleQuickReply = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  // 處理連結點擊
  const handleLinkClick = (url: string) => {
    if (url.startsWith('#/')) {
      navigate(url.substring(1));
      setIsOpen(false);
    } else {
      window.location.href = url;
    }
  };

  // 處理 Enter 鍵送出
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* 懸浮按鈕 */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-sky-600 backdrop-blur-md border border-white/20 text-white rounded-full shadow-lg transition-all flex items-center justify-center group overflow-hidden"
            aria-label="開啟 AI 助手"
          >
            <MessageCircle className="w-8 h-8 relative z-10 drop-shadow-sm" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 聊天視窗 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif" }}
            className="fixed bottom-8 right-8 z-50 w-[360px] md:w-[400px] h-[550px] max-h-[80vh] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/50 ring-1 ring-black/5"
          >
            {/* 標題列 - 加上明顯的底部分隔線 */}
            <div className="bg-white/50 backdrop-blur-sm px-6 py-4 flex items-center justify-between border-b border-black/10">
              <h3 className="font-bold text-gray-800 text-base">智慧購鞋助手</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 hover:bg-black/5 rounded-full flex items-center justify-center transition-colors text-gray-500"
                aria-label="關閉聊天"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* 訊息列表 - 隱藏 scrollbar */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 hide-scrollbar">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-[15px] shadow-sm backdrop-blur-sm ${
                        message.sender === 'user'
                          ? 'bg-sky-600 text-white rounded-br-sm'
                          : 'bg-white/90 text-gray-800 rounded-bl-sm border border-white/50'
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-normal font-medium">{message.text}</p>
                    </div>

                    {/* 連結按鈕 */}
                    {message.links && message.links.length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        {message.links.map((link, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleLinkClick(link.url)}
                            className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white/70 hover:bg-white/90 backdrop-blur-sm text-gray-800 text-sm rounded-xl transition-all border border-white/50 shadow-sm hover:shadow-md hover:border-sky-100 group"
                          >
                            <span className="font-medium truncate">{link.text}</span>
                            <span className="text-gray-400 group-hover:text-sky-500 transition-colors">→</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* 快速回覆建議 */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickReply(suggestion)}
                            className="px-3 py-1.5 bg-white/70 hover:bg-white/90 backdrop-blur-sm text-sky-600 text-[13px] font-medium rounded-full border border-white/50 hover:border-sky-200 transition-all shadow-sm"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    <p className={`text-[10px] mt-1 px-1 ${message.sender === 'user' ? 'text-right text-gray-500' : 'text-left text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {/* 輸入中提示 */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-white/50">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 輸入框 - 極簡風格 */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="輸入您的問題..."
                  className="w-full pl-5 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 text-[15px] text-gray-800 placeholder-gray-400"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-gray-900 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center"
                  aria-label="發送訊息"
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 樣式調整: 隱藏 scrollbar & 手機版適配 */}
      <style>{`
        /* 隱藏 Scrollbar */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        @media (max-width: 768px) {
          .fixed.bottom-8.right-8.z-50.w-\\[360px\\] {
            inset: 0;
            width: 100%;
            height: 100%;
            max-height: 100vh;
            border-radius: 0;
            bottom: 0;
            right: 0;
            border: none;
            background-color: rgba(255, 255, 255, 0.95);
          }
        }
      `}</style>
    </>
  );
};
