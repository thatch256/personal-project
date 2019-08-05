select l.id as list_id, u.id as user_id, p.id as product_id, p.name, p.category, p.current_price, p.image_source, lp.quantity
from list_products lp
join products p on p.id = lp.product_id
join list l on l.id = lp.list_id
join users u on u.id = l.user_id
where u.id = $1;