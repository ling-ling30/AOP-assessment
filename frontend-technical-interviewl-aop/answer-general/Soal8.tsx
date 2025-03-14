import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Soal8General() {
  const code = `async function checkout(product_id, qty, price) {
    const order = await Order.query().insert({
        product_id,
        qty,
        price,
    });
    return {
        status: 200,
        message: "Order created successfully",
        order,
    };`;

  return (
    <div>
      <pre className="w-fit">
        <SyntaxHighlighter language="react" style={atomDark}>
          {code}
        </SyntaxHighlighter>
      </pre>
      <p>
        Gambar diatas adalah sebuah API sederhana untuk checkout yang akan
        digunakan di Frontend, apakah logic dari API yang dibuah sudah benar ?
      </p>
      <section className="border-2 border-white p-4">
        <pre className="w-fit">
          {`
          Belum, 
          - Tidak ada error handling yang proper.
          - tidak ada validasi.`}
        </pre>
      </section>
    </div>
  );
}
