DELETE FROM user_events 
WHERE event_id = $1 AND user_id = $2;
