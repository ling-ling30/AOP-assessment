import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Soal5General() {
  const code = `fuction sum(a:any, b:any) {
  return a + b;
}`;
  return (
    <div>
      <pre className="w-fit">
        <SyntaxHighlighter language="javascript" style={atomOneDark}>
          {code}
        </SyntaxHighlighter>
      </pre>
      <p>
        Apakah code typescript di atas sudah baik dan benar dalam penulisannya ?
      </p>
      <section className="border-2 border-white p-4">
        <pre className="w-fit whitespace-break-spaces">{`Menggunakan any dalam TypeScript bukan praktik yang baik karena menghilangkan fitur utama TypeScript, yaitu type safety. Dengan any, TypeScript tidak akan memberikan peringatan jika terjadi kesalahan tipe, sehingga memungkinkan bug seperti operasi yang tidak valid (5 +hello menghasilkan 5hello daripada error). Selain itu, any membuat kode sulit dimengerti, menghilangkan manfaatautocomplete, dan menyulitkan refactoring. Sebagai gantinya, gunakantipe eksplisit seperti number atau string, atau gunakan union type(number | string) jika ingin mendukung beberapa tipe data dengan aturan yang jelas.`}</pre>
      </section>
    </div>
  );
}
