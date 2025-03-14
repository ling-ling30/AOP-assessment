import Soal1Backend from "@/answer-backend/Soal1";
import Soal2Backend from "@/answer-backend/Soal2";
import Soal3Backend from "@/answer-backend/Soal3";
import Soal1 from "@/answer-frontend/Soal 1/ItemList";
import Soal2 from "@/answer-frontend/Soal 2/ContactForm";
import Soal3 from "@/answer-frontend/Soal 3/FetchingApi";
import Soal4 from "@/answer-frontend/Soal 4/Pagination";
import Soal1General from "@/answer-general/Soal1";
import Soal2General from "@/answer-general/Soal2";
import Soal3General from "@/answer-general/Soal3";
import Soal4General from "@/answer-general/Soal4";
import Soal5General from "@/answer-general/Soal5";
import Soal6General from "@/answer-general/Soal6";
import Soal7General from "@/answer-general/Soal7";
import Soal8General from "@/answer-general/Soal8";
import Wrapper from "@/components/AnswerWrapper";

export default function Home() {
  return (
    <main>
      <h2 className=" py-2 px-5 font-black text-center text-4xl">Frontend</h2>

      <Wrapper label="Soal 1">
        <Soal1 items={["Apple", "Banana", "Cherry"]} />
      </Wrapper>

      <Wrapper label="Soal 2">
        <Soal2 />
      </Wrapper>

      <Wrapper label="Soal 3">
        <Soal3 />
      </Wrapper>

      <Wrapper label="Soal 4">
        <Soal4
          items={[
            "Apple",
            "Banana",
            "Cherry",
            "Date",
            "Elderberry",
            "Fig",
            "Grape",
            "Honeydew",
            "Kiwi",
            "Lemon",
            "Mango",
            "Nectarine",
            "Orange",
            "Peach",
          ]}
        />
      </Wrapper>

      <h1 className="text-center text-4xl font-bold">Backend</h1>

      <Wrapper label="Soal 1">
        <Soal1Backend />
      </Wrapper>

      <Wrapper label="Soal 2">
        <Soal2Backend />
      </Wrapper>

      <Wrapper label="Soal 3">
        <Soal3Backend />
      </Wrapper>

      <h1 className="text-center text-4xl font-bold">Umum</h1>

      <Wrapper label="Soal 1">
        <Soal1General />
      </Wrapper>

      <Wrapper label="Soal 2">
        <Soal2General />
      </Wrapper>

      <Wrapper label="Soal 3">
        <Soal3General />
      </Wrapper>

      <Wrapper label="Soal 4">
        <Soal4General />
      </Wrapper>

      <Wrapper label="Soal 5">
        <Soal5General />
      </Wrapper>
      <Wrapper label="Soal 6">
        <Soal6General />
      </Wrapper>
      <Wrapper label="Soal 7">
        <Soal7General />
      </Wrapper>
      <Wrapper label="Soal 8">
        <Soal8General />
      </Wrapper>
    </main>
  );
}
