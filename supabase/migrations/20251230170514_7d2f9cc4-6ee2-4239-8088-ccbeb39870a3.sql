-- Remove the overly permissive SELECT policy
DROP POLICY IF EXISTS "Allow reading conversations for admin" ON public.chatbot_conversations;