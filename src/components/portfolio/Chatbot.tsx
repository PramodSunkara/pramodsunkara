import { useState, useRef, useEffect } from 'react';
import { Send, User, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

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

const suggestedQuestions = [
  "What kind of problems does Pramod solve?",
  "What makes Pramod different from other web developers?"
];

const Chatbot = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Simba, here to answer any questions about Pramod's experience, skills, and background. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastAssistantMessageRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevMessageCountRef = useRef(messages.length);
  const { toast } = useToast();

  const saveMessage = async (role: 'user' | 'assistant', content: string) => {
    try {
      await supabase.from('chatbot_conversations').insert({
        session_id: sessionId,
        role,
        content,
        user_agent: navigator.userAgent
      });
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  };

  const scrollToNewMessage = () => {
    if (scrollContainerRef.current && lastAssistantMessageRef.current) {
      const container = scrollContainerRef.current;
      const messageElement = lastAssistantMessageRef.current;
      
      // Calculate the offset of the message within the container
      const messageTop = messageElement.offsetTop;
      
      // Scroll container to show the message at the top with some padding
      container.scrollTo({
        top: messageTop - 16,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to the top of new assistant message when it first appears (not during streaming)
  useEffect(() => {
    if (isExpanded && messages.length > prevMessageCountRef.current) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        setTimeout(scrollToNewMessage, 100);
      }
    }
    prevMessageCountRef.current = messages.length;
  }, [messages.length, isExpanded]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isTakeMeThereRequest = (text: string) => {
    const lowerText = text.toLowerCase();
    return lowerText.includes('take me there') || 
           lowerText.includes('show me') || 
           lowerText.includes('go to certifications') || 
           lowerText.includes('go to education');
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    
    // Check if user wants to navigate to certifications section
    if (isTakeMeThereRequest(input.trim())) {
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      
      // Add assistant response and scroll
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "Taking you there now! 🐾 Scroll down to see Pramod's Certifications and Education." 
        }]);
        scrollToSection('certifications');
      }, 300);
      return;
    }

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Save user message to database
    saveMessage('user', userMessage.content);

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
      // Save assistant message to database after streaming is complete
      if (assistantContent) {
        saveMessage('assistant', assistantContent);
      }
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
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
              <AnimatedDog size={64} />
            </div>
            
            {/* Speech bubble */}
            <div className="relative bg-card text-foreground text-sm px-4 py-2 rounded-full shadow-md border border-border mb-6 group-hover:bg-card/80 transition-colors">
              Ask me about Pramod! 🐾
            </div>
          </motion.button>
        ) : (
          <motion.div 
            key="expanded"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="rounded-2xl border border-white/10 overflow-hidden max-w-md shadow-2xl bg-[#1a1a1a]"
          >
            {/* Chat Header */}
            <button 
              onClick={() => setIsExpanded(false)}
              className="w-full px-4 py-3 flex items-center gap-3 border-b border-white/10 hover:bg-white/5 transition-colors bg-[#222]"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                <AnimatedDogHead size={30} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-white text-sm">Ask about Pramod</p>
                <p className="text-xs text-white/50">Click to minimize</p>
              </div>
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Messages */}
            <div ref={scrollContainerRef} className="h-64 overflow-y-auto p-4 space-y-4 bg-[#151515]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  ref={msg.role === 'assistant' && i === messages.length - 1 ? lastAssistantMessageRef : null}
                  className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                    msg.role === 'user' 
                      ? 'bg-white text-black' 
                      : 'bg-white/10'
                  }`}>
                    {msg.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <AnimatedDogHead size={24} />
                    )}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    msg.role === 'user' 
                      ? 'bg-white text-black' 
                      : 'bg-white/10 text-white/90'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}

              {/* Suggested Questions - show only when no conversation yet */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs bg-white/10 hover:bg-white/20 text-white/80 hover:text-white px-3 py-1.5 rounded-full transition-colors border border-white/10 hover:border-white/20"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}

              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                    <AnimatedDogHead size={24} />
                  </div>
                  <div className="bg-white/10 rounded-2xl px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-[#1a1a1a]">
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about experience, skills..."
                  className="min-h-[44px] max-h-24 resize-none text-base md:text-sm border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:border-white/20 focus:ring-white/10"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="h-11 w-11 flex-shrink-0 bg-white hover:bg-white/90 text-black disabled:bg-white/20 disabled:text-white/50"
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
