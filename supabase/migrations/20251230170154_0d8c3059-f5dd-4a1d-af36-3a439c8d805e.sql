-- Remove the public INSERT policy
DROP POLICY IF EXISTS "Anyone can insert messages" ON public.chatbot_conversations;