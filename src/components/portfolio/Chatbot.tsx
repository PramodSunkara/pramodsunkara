import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// Animated Dog Head Component
const AnimatedDogHead = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 64" 
    className={className}
  >
    {/* Dog head */}
    <circle cx="32" cy="32" r="20" fill="#D2691E" />
    {/* Snout */}
    <ellipse cx="32" cy="40" rx="10" ry="8" fill="#F4A460" />
    {/* Nose */}
    <ellipse cx="32" cy="37" rx="4" ry="3" fill="#2C1810" />
    {/* Left eye */}
    <circle cx="24" cy="28" r="4" fill="#2C1810" />
    <circle cx="25" cy="27" r="1.5" fill="white" />
    {/* Right eye */}
    <circle cx="40" cy="28" r="4" fill="#2C1810" />
    <circle cx="41" cy="27" r="1.5" fill="white" />
    {/* Left ear */}
    <ellipse cx="14" cy="20" rx="8" ry="14" fill="#8B4513" transform="rotate(-15 14 20)" />
    {/* Right ear */}
    <ellipse cx="50" cy="20" rx="8" ry="14" fill="#8B4513" transform="rotate(15 50 20)" />
    {/* Tongue */}
    <ellipse cx="32" cy="48" rx="4" ry="5" fill="#FF6B6B" className="animate-pulse" />
  </svg>
);

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-about-pramod`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);
  const [isOnAboutSection, setIsOnAboutSection] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm here to answer any questions about Pramod's experience, skills, and background. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Show hint when user scrolls OR reaches about section
  useEffect(() => {
    const handleScroll = () => {
      if (!hintDismissed && !isOpen && window.scrollY > 50) {
        setShowHint(true);
      }
    };

    // Observe the about section
    const aboutSection = document.getElementById('about');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsOnAboutSection(true);
            if (!isOpen) {
              setShowHint(true);
            }
          } else {
            setIsOnAboutSection(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (aboutSection) {
      observer.observe(aboutSection);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (aboutSection) {
        observer.unobserve(aboutSection);
      }
    };
  }, [hintDismissed, isOpen]);

  // Auto-dismiss hint after 5 seconds, but only if NOT on about section
  useEffect(() => {
    if (showHint && !isOnAboutSection) {
      const timer = setTimeout(() => {
        setShowHint(false);
        setHintDismissed(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showHint, isOnAboutSection]);

  // Hide hint when chat opens
  useEffect(() => {
    if (isOpen) {
      setShowHint(false);
      setHintDismissed(true);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    // Use scrollIntoView with block: 'nearest' to prevent page scroll
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  useEffect(() => {
    // Only scroll to bottom when chat is open
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

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
    <>
      {/* Floating Chat Button with Hint */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {showHint && !isOpen && (
          <div className="flex items-end gap-2 animate-fade-in">
            {/* Animated Dog */}
            <div className="relative">
              <div className="animate-bounce" style={{ animationDuration: '1s' }}>
                <svg 
                  width="48" 
                  height="48" 
                  viewBox="0 0 64 64" 
                  className="drop-shadow-md"
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
              </div>
            </div>
            {/* Speech bubble */}
            <div className="bg-card text-foreground text-xs px-3 py-1.5 rounded-full shadow-md border border-border relative">
              Ask me about Pramod! 🐾
              <div className="absolute -left-2 bottom-2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-card border-b-[6px] border-b-transparent" />
            </div>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform flex items-center justify-center ${
            !isOpen ? 'animate-pulse' : ''
          }`}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>

      {/* Tail wag animation */}
      <style>{`
        @keyframes wag {
          from { transform: rotate(-10deg); }
          to { transform: rotate(10deg); }
        }
      `}</style>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-2xl">
          {/* Chat Header */}
          <div className="bg-primary/10 px-4 py-3 flex items-center gap-3 border-b border-border">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
              <AnimatedDogHead size={28} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">Pramod's AI Assistant</p>
              <p className="text-xs text-muted-foreground">Ask me anything</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-3 space-y-3 bg-background/50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                  msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}>
                  {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <AnimatedDogHead size={22} />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                  <AnimatedDogHead size={22} />
                </div>
                <div className="bg-secondary rounded-2xl px-3 py-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-card">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about experience, skills..."
                className="min-h-[40px] max-h-24 resize-none bg-background text-sm"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="h-10 w-10 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
