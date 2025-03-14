import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Soal3General() {
  const schema = `
CREATE TABLE "customers" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(100) NOT NULL,
  "email" VARCHAR(100) UNIQUE NOT NULL,
  "phone" VARCHAR(20),
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "products" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(100) NOT NULL,
  "description" TEXT,
  "price" DECIMAL(10,2) NOT NULL,
  "stock_quantity" INT NOT NULL,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "orders" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "customer_id" UUID NOT NULL,
  "total_price" DECIMAL(10,2) NOT NULL,
  "order_date" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  "status" VARCHAR(50) DEFAULT 'Pending'
);

CREATE TABLE "order_items" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "order_id" UUID NOT NULL,
  "product_id" UUID NOT NULL,
  "quantity" INT NOT NULL,
  "price" DECIMAL(10,2) NOT NULL
);

ALTER TABLE "orders" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id") ON DELETE CASCADE;

ALTER TABLE "order_items" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE CASCADE;

ALTER TABLE "order_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;

    `;
  return (
    <div>
      <p>Schema</p>
      <SyntaxHighlighter language="postgresql" style={atomDark}>
        {schema}
      </SyntaxHighlighter>
      <p>Query</p>
      <p>Product yang tersedia</p>
      <SyntaxHighlighter language="postgresql" style={atomDark}>
        {`SELECT * FROM products WHERE stock_quantity > 0;`}
      </SyntaxHighlighter>
      <br />
      <p>Semua Order serta Order Item yang terkait dan customer</p>
      <SyntaxHighlighter language="postgresql" style={atomDark}>
        {`SELECT 
    orders.id AS order_id,
    customers.name AS customer_name,
    customers.email AS customer_email,
    products.name AS product_name,
    order_items.quantity,
    order_items.price
FROM orders
JOIN customers ON orders.customer_id = customers.id
JOIN order_items ON orders.id = order_items.order_id
JOIN products ON order_items.product_id = products.id;`}
      </SyntaxHighlighter>
      <p>Total Customer Spent</p>
      <SyntaxHighlighter language="postgresql" style={atomDark}>
        {`SELECT 
    customers.id AS customer_id,
    customers.name AS customer_name,
    customers.email AS customer_email,
    COUNT(DISTINCT orders.id) AS total_orders,
    SUM(order_items.quantity * order_items.price) AS total_spent
FROM customers
JOIN orders ON customers.id = orders.customer_id
JOIN order_items ON orders.id = order_items.order_id
GROUP BY customers.id, customers.name, customers.email
ORDER BY total_spent DESC;`}
      </SyntaxHighlighter>
      <p>Best-seller Product</p>
      <SyntaxHighlighter language="" style={atomDark}>
        {`SELECT 
    products.id AS product_id,
    products.name AS product_name,
    products.description,
    products.price,
    SUM(order_items.quantity) AS total_quantity_sold
FROM products
JOIN order_items ON products.id = order_items.product_id
JOIN orders ON order_items.order_id = orders.id
WHERE orders.status = 'Completed'  -- Opsional: hanya menghitung pesanan yang sudah selesai
GROUP BY products.id, products.name, products.description, products.price
ORDER BY total_quantity_sold DESC;`}
      </SyntaxHighlighter>
    </div>
  );
}
