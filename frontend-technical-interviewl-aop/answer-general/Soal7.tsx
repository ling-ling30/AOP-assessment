"use client";
import React, { useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Soal7General() {
  const code = `useEffect(() => {
    const handleResize = () => console.log('resized');
    window.addEventListener('resize', handleResize);
    }, [])`;

  useEffect(() => {
    const handleResize = () => console.log("resized");
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <pre className="w-fit">
        <SyntaxHighlighter language="javascript" style={atomDark}>
          {code}
        </SyntaxHighlighter>
      </pre>
      <p>Apakah pengguna useEffect diatas sudah baik dan benar ?</p>
      <section className="border-2 border-white p-4">
        <pre className="w-fit">
          {`Tidak benar.
Penjelasan: Beberapa fungsi yang bersifat berketerusan dapat running di background yang menyebabkan peforma turun dan terjadi memory leak.
contoh fungsi fungsi yang berkelanjutan umumnya adalah Event Listener atau setInterval. Ada pula beberapa contoh yang lebih kompleks seperti: Fetching API pada kasus tertentu, dan thirdparty library.`}
        </pre>
      </section>
    </div>
  );
}
