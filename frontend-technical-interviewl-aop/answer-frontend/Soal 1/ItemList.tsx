"use client";
import React from "react";

type Props = {
  items: string[];
};

export default function Soal1({ items }: Props) {
  const [list, setList] = React.useState<string[]>(items);
  const handleDelete = (index: number) => {
    setList(list.filter((_, i) => i !== index));
  };
  return (
    <>
      {list.length > 0 ? (
        <ul className="">
          {list.map((item, index) => (
            <li key={index} className=" flex gap-2 decoration-1">
              <p className="w-96">- {item}</p>
              <button type="button" onClick={() => handleDelete(index)}>
                ❌
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items</p>
      )}
    </>
  );
}
