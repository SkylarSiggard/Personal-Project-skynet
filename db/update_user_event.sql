UPDATE user_events 
SET title = ${title}, 
description = ${description},
startingday = ${startingday}, 
endingday = ${endingday}, 
startingtime = ${startingtime}, 
endingtime = ${endingtime}, 
phonenumber = ${phonenumber}
WHERE event_id = ${event_id} AND user_id = ${userId};

