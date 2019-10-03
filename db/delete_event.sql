DELETE FROM user_events 
WHERE user_id = $2 AND event_id = $1;
