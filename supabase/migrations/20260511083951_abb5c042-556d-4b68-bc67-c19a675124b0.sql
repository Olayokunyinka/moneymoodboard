-- Enable scheduling extensions for the weekly newsletter cron
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Remove any prior version of the job, then re-schedule.
DO $$
BEGIN
  PERFORM cron.unschedule('weekly-newsletter');
EXCEPTION WHEN OTHERS THEN
  -- job didn't exist; ignore
  NULL;
END $$;

-- Tuesday 13:00 UTC = 08:00 America/New_York during EST (09:00 during EDT).
SELECT cron.schedule(
  'weekly-newsletter',
  '0 13 * * 2',
  $$
  SELECT net.http_post(
    url := 'https://project--d55eebbe-2799-412a-948c-14ad97a5697e.lovable.app/api/public/newsletter/cron',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpaGN5ZHl4YWNtc2x6am5ibHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0NDE4MTgsImV4cCI6MjA5NDAxNzgxOH0.duCtgjIYxYRsopQwtW2Q60Db2yrTDcDMiyT-33XZv6Y'
    ),
    body := '{}'::jsonb
  ) AS request_id;
  $$
);