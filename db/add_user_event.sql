INSERT INTO user_events (title, description, starting,
ending, phonenumber, reminder, user_id)
VALUES ($1, $2, $3, $4, $5, $6, $7);

-- SELECT * FROM user_events
-- WHERE user_id = $8;