SELECT i.email, e.title, e.starting, e.ending FROM user_info i
JOIN user_events e on i.user_id = e.user_id;