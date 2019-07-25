insert into users (is_admin, email, password)
values($1, $2, $3)
returning *;