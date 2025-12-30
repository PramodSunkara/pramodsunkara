import { useState, useRef, useEffect } from 'react';
import { Send, User, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Animated Dog Component - exported for use in Footer
export const AnimatedDog = ({ size = 48, className = '' }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 64" 
    className={className}
  >
    {/* Dog body */}
    <ellipse cx="32" cy="42" rx="18" ry="14" fill="#D2691E" />
    {/* Dog head */}
    <circle cx="32" cy="24" r="14" fill="#D2691E" />
    {/* Snout */}
    <ellipse cx="32" cy="30" rx="8" ry="6" fill="#F4A460" />
    {/* Nose */}
    <ellipse cx="32" cy="28" rx="3" ry="2.5" fill="#2C1810" />
    {/* Left eye */}
    <circle cx="26" cy="22" r="3" fill="#2C1810" />
    <circle cx="27" cy="21" r="1" fill="white" />
    {/* Right eye */}
    <circle cx="38" cy="22" r="3" fill="#2C1810" />
    <circle cx="39" cy="21" r="1" fill="white" />
    {/* Left ear */}
    <ellipse cx="20" cy="16" rx="6" ry="10" fill="#8B4513" transform="rotate(-20 20 16)" />
    {/* Right ear */}
    <ellipse cx="44" cy="16" rx="6" ry="10" fill="#8B4513" transform="rotate(20 44 16)" />
    {/* Tongue */}
    <ellipse cx="32" cy="35" rx="3" ry="4" fill="#FF6B6B" className="animate-pulse" />
    {/* Tail */}
    <path d="M 50 42 Q 58 35 55 28" stroke="#D2691E" strokeWidth="5" fill="none" strokeLinecap="round" className="origin-bottom-left" style={{ animation: 'wag 0.3s ease-in-out infinite alternate' }} />
    {/* Front paws */}
    <ellipse cx="24" cy="54" rx="5" ry="4" fill="#D2691E" />
    <ellipse cx="40" cy="54" rx="5" ry="4" fill="#D2691E" />
  </svg>
);

// Small dog head for chat messages
export const AnimatedDogHead = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 64" 
    className={className}
  >
    <circle cx="32" cy="32" r="20" fill="#D2691E" />
    <ellipse cx="32" cy="40" rx="10" ry="8" fill="#F4A460" />
    <ellipse cx="32" cy="37" rx="4" ry="3" fill="#2C1810" />
    <circle cx="24" cy="28" r="4" fill="#2C1810" />
    <circle cx="25" cy="27" r="1.5" fill="white" />
    <circle cx="40" cy="28" r="4" fill="#2C1810" />
    <circle cx="41" cy="27" r="1.5" fill="white" />
    <ellipse cx="14" cy="20" rx="8" ry="14" fill="#8B4513" transform="rotate(-15 14 20)" />
    <ellipse cx="50" cy="20" rx="8" ry="14" fill="#8B4513" transform="rotate(15 50 20)" />
    <ellipse cx="32" cy="48" rx="4" ry="5" fill="#FF6B6B" className="animate-pulse" />
  </svg>
);

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-about-pramod`;

const Chatbot = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm here to answer any questions about Pramod's experience, skills, and background. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  useEffect(() => {
    if (isExpanded) {
      scrollToBottom();
    }
  }, [messages, isExpanded]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    let assistantContent = '';

    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast({
            variant: 'destructive',
            title: 'Rate limit exceeded',
            description: 'Please wait a moment before sending another message.',
          });
          throw new Error('Rate limit exceeded');
        }
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant' && prev.length > 1 && prev[prev.length - 2].role === 'user') {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
                }
                return [...prev, { role: 'assistant', content: assistantContent }];
              });
            }
          } catch {
            buffer = line + '\n' + buffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      if (assistantContent === '') {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to get a response. Please try again.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="mt-8">
      {/* Tail wag animation */}
      <style>{`
        @keyframes wag {
          from { transform: rotate(-10deg); }
          to { transform: rotate(10deg); }
        }
      `}</style>

      {/* Collapsed State - Dog with speech bubble */}
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button 
            key="collapsed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={() => setIsExpanded(true)}
            className="flex items-end gap-2 cursor-pointer group"
            aria-label="Open chat"
          >
            {/* Animated Dog */}
            <div className="animate-bounce group-hover:scale-110 transition-transform" style={{ animationDuration: '2s' }}>
              <AnimatedDog size={40} />
            </div>
            
            {/* Speech bubble */}
            <div className="relative bg-card text-foreground text-xs px-3 py-1.5 rounded-full shadow-md border border-border mb-3 group-hover:bg-card/80 transition-colors">
              Ask me about Pramod! 🐾
            </div>
          </motion.button>
        ) : (
          <motion.div 
            key="expanded"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="rounded-2xl border border-amber-500/20 overflow-hidden max-w-md shadow-xl"
            style={{ 
              background: 'linear-gradient(180deg, hsl(30 20% 18%) 0%, hsl(30 15% 12%) 100%)'
            }}
          >
            {/* Chat Header */}
            <button 
              onClick={() => setIsExpanded(false)}
              className="w-full px-4 py-3 flex items-center gap-3 border-b border-amber-500/10 hover:bg-amber-500/5 transition-colors"
              style={{ background: 'linear-gradient(90deg, hsl(30 30% 20%) 0%, hsl(30 20% 16%) 100%)' }}
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center overflow-hidden ring-2 ring-amber-500/30">
                <AnimatedDogHead size={30} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-amber-100 text-sm">Ask about Pramod</p>
                <p className="text-xs text-amber-200/50">Click to minimize</p>
              </div>
              <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center">
                <svg className="w-3 h-3 text-amber-200/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-4" style={{ background: 'hsl(30 10% 14%)' }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                    msg.role === 'user' 
                      ? 'bg-amber-500 text-amber-950 ring-2 ring-amber-400/30' 
                      : 'bg-amber-500/20 ring-2 ring-amber-500/20'
                  }`}>
                    {msg.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <AnimatedDogHead size={24} />
                    )}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    msg.role === 'user' 
                      ? 'bg-amber-500 text-amber-950 font-medium' 
                      : 'bg-amber-500/10 text-amber-100 border border-amber-500/10'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center overflow-hidden ring-2 ring-amber-500/20">
                    <AnimatedDogHead size={24} />
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/10 rounded-2xl px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-amber-500/10" style={{ background: 'hsl(30 15% 16%)' }}>
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about experience, skills..."
                  className="min-h-[44px] max-h-24 resize-none text-sm border-amber-500/20 bg-amber-500/5 text-amber-100 placeholder:text-amber-200/40 focus:border-amber-500/40 focus:ring-amber-500/20"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="h-11 w-11 flex-shrink-0 bg-amber-500 hover:bg-amber-400 text-amber-950 disabled:bg-amber-500/30 disabled:text-amber-200/50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
