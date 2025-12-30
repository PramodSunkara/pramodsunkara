import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Lock, Calendar, MessageSquare, User, Bot } from 'lucide-react';
import { format } from 'date-fns';
import FloatingBackButton from '@/components/FloatingBackButton';

interface Conversation {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  user_agent: string | null;
  created_at: string;
}

interface GroupedConversation {
  session_id: string;
  messages: Conversation[];
  started_at: string;
}

const ADMIN_PASSWORD = 'pramod2024'; // Simple password protection

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [conversations, setConversations] = useState<GroupedConversation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set());

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const fetchConversations = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('chatbot_conversations')
        .select('*')
        .order('created_at', { ascending: false });

      if (dateFilter) {
        const startDate = new Date(dateFilter);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(dateFilter);
        endDate.setHours(23, 59, 59, 999);
        query = query
          .gte('created_at', startDate.toISOString())
          .lte('created_at', endDate.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;

      // Group by session_id
      const grouped = (data || []).reduce((acc: Record<string, Conversation[]>, msg) => {
        if (!acc[msg.session_id]) {
          acc[msg.session_id] = [];
        }
        acc[msg.session_id].push({
          ...msg,
          role: msg.role as 'user' | 'assistant'
        });
        return acc;
      }, {});

      // Convert to array and sort by earliest message
      const groupedArray: GroupedConversation[] = Object.entries(grouped).map(([session_id, messages]) => ({
        session_id,
        messages: messages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
        started_at: messages.reduce((earliest, msg) => 
          new Date(msg.created_at) < new Date(earliest) ? msg.created_at : earliest, 
          messages[0].created_at
        )
      })).sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime());

      setConversations(groupedArray);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchConversations();
    }
  }, [isAuthenticated, dateFilter]);

  const filteredConversations = conversations.filter(conv => 
    searchQuery === '' || 
    conv.messages.some(msg => 
      msg.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const toggleSession = (sessionId: string) => {
    setExpandedSessions(prev => {
      const next = new Set(prev);
      if (next.has(sessionId)) {
        next.delete(sessionId);
      } else {
        next.add(sessionId);
      }
      return next;
    });
  };

  const totalMessages = conversations.reduce((sum, conv) => sum + conv.messages.length, 0);
  const totalSessions = conversations.length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <FloatingBackButton />
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Admin Dashboard</CardTitle>
            <p className="text-muted-foreground text-sm mt-2">Enter password to access chatbot analytics</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-center"
              />
              {passwordError && (
                <p className="text-destructive text-sm text-center">{passwordError}</p>
              )}
              <Button type="submit" className="w-full">
                Access Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <FloatingBackButton />
      
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Chatbot Analytics</h1>
            <p className="text-muted-foreground">View and search through conversations</p>
          </div>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
            Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalMessages}</p>
                <p className="text-sm text-muted-foreground">Total Messages</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalSessions}</p>
                <p className="text-sm text-muted-foreground">Sessions</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-auto"
                />
                {dateFilter && (
                  <Button variant="ghost" size="sm" onClick={() => setDateFilter('')}>
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversations */}
        <div className="space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                Loading conversations...
              </CardContent>
            </Card>
          ) : filteredConversations.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No conversations found
              </CardContent>
            </Card>
          ) : (
            filteredConversations.map((conv) => {
              const isExpanded = expandedSessions.has(conv.session_id);
              const userMessages = conv.messages.filter(m => m.role === 'user');
              const previewMessage = userMessages[0]?.content || 'No user message';
              
              return (
                <Card key={conv.session_id} className="overflow-hidden">
                  <button
                    onClick={() => toggleSession(conv.session_id)}
                    className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {previewMessage.length > 100 
                            ? previewMessage.slice(0, 100) + '...' 
                            : previewMessage}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {format(new Date(conv.started_at), 'MMM d, yyyy h:mm a')} · {conv.messages.length} messages
                        </p>
                      </div>
                      <div className="text-muted-foreground">
                        {isExpanded ? '−' : '+'}
                      </div>
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="border-t bg-muted/30 p-4 space-y-3">
                      {conv.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                          }`}>
                            {msg.role === 'user' ? (
                              <User className="w-4 h-4" />
                            ) : (
                              <Bot className="w-4 h-4" />
                            )}
                          </div>
                          <div className={`flex-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                            <p className={`inline-block rounded-lg px-3 py-2 text-sm ${
                              msg.role === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}>
                              {msg.content}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {format(new Date(msg.created_at), 'h:mm a')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;