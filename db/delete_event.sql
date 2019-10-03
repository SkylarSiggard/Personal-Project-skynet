DELETE FROM user_events 
WHERE user_id = $1 AND event_id = $2;
