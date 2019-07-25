CREATE TABLE USERS (
	id serial primary key,
	email varchar(60) NOT NULL,
	password varchar(60) NOT NULL,
	is_admin boolean
);

CREATE TABLE PRODUCTS (
	id serial primary key,
	name varchar(60) NOT NULL,
	category varchar(60) NOT NULL,
	current_price integer NOT NULL
);

CREATE TABLE ORDERS (
	id serial primary key,
	user_id integer NOT NULL unique,
	timestamp TIMESTAMP NOT NULL
);

CREATE TABLE ORDERS_PRODUCTS (
	id serial primary key,
	product_id integer NOT NULL unique,
	price integer NOT NULL,
	quantity integer NOT NULL,
	order_id integer NOT NULL unique
);

CREATE TABLE LIST (
	id serial primary key,
	user_id integer NOT NULL unique,
	type varchar(60) NOT NULL
);

CREATE TABLE LIST_PRODUCTS (
	id serial primary key,
	product_id integer NOT NULL unique,
	list_id integer NOT NULL unique,
	quantity integer NOT NULL
);


ALTER TABLE ORDERS ADD CONSTRAINT ORDERS_fk0 FOREIGN KEY (user_id) REFERENCES USERS(id);

ALTER TABLE ORDERS_PRODUCTS ADD CONSTRAINT ORDERS_PRODUCTS_fk0 FOREIGN KEY (product_id) REFERENCES PRODUCTS(id);
ALTER TABLE ORDERS_PRODUCTS ADD CONSTRAINT ORDERS_PRODUCTS_fk1 FOREIGN KEY (order_id) REFERENCES ORDERS(id);

ALTER TABLE LIST ADD CONSTRAINT LIST_fk0 FOREIGN KEY (user_id) REFERENCES USERS(id);

ALTER TABLE LIST_PRODUCTS ADD CONSTRAINT LIST_PRODUCTS_fk0 FOREIGN KEY (product_id) REFERENCES PRODUCTS(id);
ALTER TABLE LIST_PRODUCTS ADD CONSTRAINT LIST_PRODUCTS_fk1 FOREIGN KEY (list_id) REFERENCES LIST(id);