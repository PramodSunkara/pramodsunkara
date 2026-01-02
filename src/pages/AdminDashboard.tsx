import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Lock, Calendar, MessageSquare, User, Bot, ShieldAlert, MapPin, Clock, Globe } from 'lucide-react';
import { format } from 'date-fns';
import FloatingBackButton from '@/components/FloatingBackButton';
import { useToast } from '@/hooks/use-toast';

interface Conversation {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  user_agent: string | null;
  created_at: string;
  ip_address: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
}

interface GroupedConversation {
  session_id: string;
  messages: Conversation[];
  started_at: string;
  location: string | null;
  country: string | null;
}

const ADMIN_API_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-conversations`;

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [conversations, setConversations] = useState<GroupedConversation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/admin/auth');
        return;
      }

      setUserEmail(session.user.email || null);

      // Check if user has admin role
      const { data: roles, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin');

      if (error || !roles || roles.length === 0) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      setIsAdmin(true);
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/admin/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchConversations = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(ADMIN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ 
          dateFilter: dateFilter || undefined,
        }),
      });

      if (response.status === 401 || response.status === 403) {
        setIsAdmin(false);
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch');

      const { conversations: data } = await response.json();

      // Group by session_id
      const grouped = (data || []).reduce((acc: Record<string, Conversation[]>, msg: Conversation) => {
        if (!acc[msg.session_id]) {
          acc[msg.session_id] = [];
        }
        acc[msg.session_id].push({
          ...msg,
          role: msg.role as 'user' | 'assistant'
        });
        return acc;
      }, {});

      const groupedArray: GroupedConversation[] = Object.entries(grouped).map(([session_id, messages]) => {
        const sortedMessages = (messages as Conversation[]).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        const firstUserMessage = sortedMessages.find(m => m.role === 'user');
        const locationParts = [firstUserMessage?.city, firstUserMessage?.region, firstUserMessage?.country].filter(Boolean);
        
        return {
          session_id,
          messages: sortedMessages,
          started_at: sortedMessages.reduce((earliest, msg) => 
            new Date(msg.created_at) < new Date(earliest) ? msg.created_at : earliest, 
            sortedMessages[0].created_at
          ),
          location: locationParts.length > 0 ? locationParts.join(', ') : null,
          country: firstUserMessage?.country || null
        };
      }).sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime());

      setConversations(groupedArray);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load conversations',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchConversations();
    }
  }, [isAdmin, dateFilter]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/auth');
  };

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
  const uniqueCountries = [...new Set(conversations.map(c => c.country).filter(Boolean))].length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <FloatingBackButton />
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <FloatingBackButton />
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-6 h-6 text-destructive" />
            </div>
            <CardTitle>Access Denied</CardTitle>
            <p className="text-muted-foreground text-sm mt-2">
              You don't have admin permissions. Contact the site owner to request access.
            </p>
            {userEmail && (
              <p className="text-xs text-muted-foreground mt-2">
                Logged in as: {userEmail}
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              Sign Out
            </Button>
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
            <p className="text-muted-foreground">
              Logged in as {userEmail}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{uniqueCountries}</p>
                <p className="text-sm text-muted-foreground">Countries</p>
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
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {format(new Date(conv.started_at), 'MMM d, yyyy h:mm a')}
                          </span>
                          <span>·</span>
                          <span>{conv.messages.length} messages</span>
                          {conv.location && (
                            <>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {conv.location}
                              </span>
                            </>
                          )}
                        </div>
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