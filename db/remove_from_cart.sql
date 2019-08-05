delete from list_products
where product_id = $1;

select l.id as list_id, u.id, p.id, p.name, p.category, p.current_price, p.image_source, lp.quantity
from products p
join list_products lp on p.id = lp.product_id
join list l on l.id = lp.list_id
join users u on u.id = l.user_id
where u.id = $2;