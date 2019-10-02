SELECT u.user_id, user_email, hash FROM user_info u 
join user_login ul on 
u.user_id = ul.user_id
WHERE user_email = $1;