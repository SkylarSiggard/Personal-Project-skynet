UPDATE user_events 
SET title = ${title}, 
description = ${description},
starting_day = ${startingday}, 
ending_day = ${endingday}, 
starting_time = ${startingtime}, 
ending_time = ${endingtime}, 
phone_number = ${phonenumber}
WHERE event_id = ${event_id} AND user_id = ${userId};

