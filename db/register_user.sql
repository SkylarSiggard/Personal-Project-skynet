INSERT INTO user_info (email, hash) 
VALUES ($1, $2)
returning user_id, email;

