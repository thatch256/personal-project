insert into order_products (product_id, price, quantity, order_id)
values($1, $2, $3, $4);

select * from order_products op
join products p on p.id = op.product_id
where order_id = $4;