DROP TABLE IF EXISTS user_info;
DROP TABLE IF EXISTS user_events;

CREATE TABLE user_info (
	user_id SERIAL PRIMARY KEY,
	email text,
    hash TEXT
);
CREATE TABLE user_events (
	event_id SERIAL PRIMARY KEY,
	user_id INT REFERENCES user_info(user_id),
	title varchar(30),
	description varchar(300),
	startingday date,
	endingday date,
	startingtime time,
	endingtime time,
	phonenumber varchar(10)
);
select * from user_info;
select * from user_events;


INSERT INTO user_events (title, description, startingday,
endingday, startingtime, endingtime, phonenumber, user_id)
VALUES ('play', 'play game', '10-2-19', '10-3-12', '12:10pm', '12:20pm', '8015570544', 1);



select * from user_info;
select * from user_events;