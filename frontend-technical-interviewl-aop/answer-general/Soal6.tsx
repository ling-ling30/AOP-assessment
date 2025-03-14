import React from "react";

export default function Soal6General() {
  return (
    <div>
      <p>
        Dalam kasus apa State Management Global di React bagus digunakan dan
        dalam kasus apa State Management Global di React tidak bagus digunakan ?
      </p>
      <section className="border-2 border-white p-4">
        <pre className="w-fit">
          {`Kasus bagus digunakan:
    - Ketika state digunakan dibanyak komponen. (authentikasi, tema aplikasi)
    - Ketika data tidak banyak digunakan tetapi komponen yang berkaitan sangan berjauhan sehingga harus melakukan prop drilling
    Kasus tidak bagus digunakan:
    - Ketika state digunakan hanya di 1 komponen
    `}
        </pre>
      </section>
    </div>
  );
}
