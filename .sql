DROP TABLE IF EXISTS items;

CREATE TABLE items(
  id BIGSERIAL PRIMARY KEY,
  item_name TEXT,
  item_number INT
);

INSERT INTO items (id, item_name, item_number)
VALUES (001, 'oranges', 0);

INSERT INTO items (id, item_name, item_number)
VALUES 
  (001, 'oranges', 0),
  (002, 'crackers', 1),
  (003, 'seltzer water', 2);

UPDATE items
SET item_name = 'raisins' 
WHERE id = 001;

DELETE FROM items
WHERE id = 001;

SELECT * FROM items;