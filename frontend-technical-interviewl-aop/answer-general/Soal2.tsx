import React from "react";

export default function Soal2General() {
  return (
    <div>
      <p> Penggunaan console.log dalam production?</p>
      <pre className="w-fit whitespace-break-spaces">{`
    Penggunaan console.log dalam production tidak dianjurkan, berikut beberapa alasannya:
    - console.log memerlukan computing power, sehingga dapat memperlambat kerja aplikasi.
    - Dapat menyebarkan debugging leak, yang akan mempengaruhi keamaan aplikasi.
    - Dapat menyebarkan data yang tidak diinginkan.
    `}</pre>
    </div>
  );
}
