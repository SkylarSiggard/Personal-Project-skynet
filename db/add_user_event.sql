INSERT INTO user_events (title, description, starting_day,
ending_day, starting_time, ending_time, phone_number, user_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8);

-- SELECT * FROM user_events
-- WHERE user_id = $8;