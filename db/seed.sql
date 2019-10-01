DROP TABLE IF EXISTS user_info;
DROP TABLE IF EXISTS user_events;
DROP TABLE IF EXISTS user_login_info;

CREATE TABLE user_info (
	user_id SERIAL PRIMARY KEY,
	user_email text
);
CREATE TABLE user_login_info (
    user_login_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_info(user_id),
    hash TEXT
);
CREATE TABLE user_events (
	event_id SERIAL PRIMARY KEY,
	user_id INT REFERENCES user_info(user_id),
	title varchar(30),
	description varchar(300),
	starting_day date,
	ending_day date,
	starting_time time,
	ending_time time,
	phone_number varchar(10)
);
select * from user_info;
select * from user_events;
select * from user_login_info;