

DROP TABLE IF EXISTS items;

CREATE TABLE items(
  id varchar(30) PRIMARY KEY,
  item_name varchar(50),
  item_number integer
);

INSERT INTO items (id, item_name, item_number) VALUES 
  ('item-1596392194764', 'thing', 0),
  ('item-1596392202230', 'oranges', 1);

INSERT INTO items (id, item_name, item_number)
VALUES (001, 'oranges', 0);


UPDATE items
SET item_name = 'raisins' 
WHERE id = 001;

DELETE FROM items
WHERE id = 001;

SELECT * FROM items;