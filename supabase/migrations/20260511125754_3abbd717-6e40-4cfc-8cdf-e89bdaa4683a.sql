
SELECT cron.unschedule('weekly-newsletter');

SELECT cron.schedule(
  'weekly-newsletter',
  '0 13 * * 2',
  $$
  SELECT net.http_post(
    url := 'https://moneymoodboard.com/api/public/newsletter/cron',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpaGN5ZHl4YWNtc2x6am5ibHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0NDE4MTgsImV4cCI6MjA5NDAxNzgxOH0.duCtgjIYxYRsopQwtW2Q60Db2yrTDcDMiyT-33XZv6Y'
    ),
    body := '{}'::jsonb
  ) AS request_id;
  $$
);
