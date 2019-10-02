UPDATE user_events 
SET title = ${title}, 
description = ${description},
starting_day = ${starting_day}, 
ending_day = ${ending_day}, 
starting_time = ${starting_time}, 
ending_time = ${ending_time}, 
phone_number = ${phone_number}
WHERE event_id = ${event_id} AND user_id = ${userId};

