UPDATE user_events 
SET title = ${title}, 
description = ${description},
starting_day = ${startingDay}, 
ending_day = ${endingDay}, 
starting_time = ${startingTime}, 
ending_time = ${endingTime}, 
phone_number = ${phoneNumber}
WHERE event_id = ${event_id} AND user_id = ${userId};

