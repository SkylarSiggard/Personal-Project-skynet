UPDATE user_events 
SET title = ${title}, 
description = ${description},
starting = ${starting}, 
ending = ${ending}, 
phonenumber = ${phonenumber}
WHERE event_id = ${event_id} AND user_id = ${userId};

