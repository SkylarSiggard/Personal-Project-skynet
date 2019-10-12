INSERT INTO user_events (title, description, starting,
ending, phonenumber, reminder, edit, user_id)
VALUES (${title}, ${description}, 
${starting}, ${ending}, ${phonenumber}, 
${reminder}, ${madeEdit}, ${userId});

-- SELECT * FROM user_events
-- WHERE user_id = $8;