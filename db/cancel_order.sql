delete from order_products
where order_id = $1;

select u.id, 
p.id, 
p.name,
op.id, 
op.product_id, 
op.price, 
op.quantity, 
op.order_id, 
o.id,
o.user_id,
o.order_date, to_char(o.order_date, 'Mon dd, yyyy') formatted_order_date
from products p
join order_products op on op.product_id = p.id
join orders o on o.id = op.order_id
join users u on u.id = o.user_id
where u.id = $2;