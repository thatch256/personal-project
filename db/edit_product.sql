update products
set name = $2, category = $3, current_price = $4
where id = $1;

select * from products