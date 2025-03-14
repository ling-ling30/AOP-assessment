"use client";
import React, { useEffect, useState } from "react";

type Props = {
  items: string[];
};

export default function Soal4({ items }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState<string[]>([]);

  useEffect(() => {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    setTotalPages(totalPages);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentItems = items.slice(startIndex, endIndex);
    setCurrentItems(currentItems);
  }, [currentPage, pageSize, items]);

  return (
    <>
      <p>Current Page: {currentPage}</p>
      <ul>
        {currentItems.map((item, index) => (
          <li key={index}>- {item}</li>
        ))}
      </ul>

      {/* Pagination Button */}
      <div className="space-x-4">
        <button
          onClick={() => {
            if (currentPage === 1) return;
            setCurrentPage(currentPage - 1);
          }}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={
              currentPage === index + 1
                ? "bg-blue-500 text-white size-6"
                : "size-6"
            }
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => {
            if (currentPage === totalPages) return;
            setCurrentPage(currentPage + 1);
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}
