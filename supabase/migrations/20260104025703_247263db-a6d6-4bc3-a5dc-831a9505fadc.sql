-- Block all direct client access to chatbot_conversations
-- Only service role (Edge Functions) can access this table
-- This protects user conversations, IP addresses, and location data

CREATE POLICY "Block all direct client access"
  ON public.chatbot_conversations
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);