CREATE TABLE public.chatbot_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chatbot_conversations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public chatbot)
CREATE POLICY "Anyone can insert messages"
  ON public.chatbot_conversations
  FOR INSERT
  WITH CHECK (true);

-- Index for querying by session
CREATE INDEX idx_chatbot_conversations_session_id ON public.chatbot_conversations(session_id);
CREATE INDEX idx_chatbot_conversations_created_at ON public.chatbot_conversations(created_at DESC);