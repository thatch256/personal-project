insert into list (user_id, type)
values ($1, $2);

select list.id as list_id from list
where user_id = $1;