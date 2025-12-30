-- Create RLS policy for admin read access (password-protected in app)
CREATE POLICY "Allow reading conversations for admin"
  ON public.chatbot_conversations
  FOR SELECT
  USING (true);