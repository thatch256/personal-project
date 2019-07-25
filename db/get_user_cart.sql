select l.id as list_id, p.name, p.category, p.current_price, lp.quantity
from products p
join list_products lp on p.id = lp.product_id
join list l on l.id = lp.list_id
where l.user_id = $1;