-- Create exit_feedback table for anonymous feedback submissions
CREATE TABLE public.exit_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  feedback_text TEXT NOT NULL,
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  accept_language TEXT,
  timezone_offset INTEGER,
  viewport_width INTEGER,
  viewport_height INTEGER,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ip_hash TEXT,
  geo_country TEXT,
  geo_region TEXT,
  
  -- Constraints
  CONSTRAINT feedback_text_length CHECK (char_length(feedback_text) >= 5 AND char_length(feedback_text) <= 500)
);

-- Enable Row Level Security
ALTER TABLE public.exit_feedback ENABLE ROW LEVEL SECURITY;

-- Block all direct client access - only edge function with service role can insert
CREATE POLICY "Block all direct client access"
ON public.exit_feedback
AS RESTRICTIVE
FOR ALL
USING (false)
WITH CHECK (false);

-- Add comment for documentation
COMMENT ON TABLE public.exit_feedback IS 'Stores anonymous exit-intent feedback with privacy-safe metadata';