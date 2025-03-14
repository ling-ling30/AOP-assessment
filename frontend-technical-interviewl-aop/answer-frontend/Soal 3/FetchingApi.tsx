"use client";
import React, { useEffect, useState } from "react";

export default function Soal3() {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        setLoading(false);
        setError("Failed to fetch data");
        return;
      }
      const result = await response.json();
      setData(result.map((item: { name: string }) => item.name));
    } catch (error) {
      console.log(error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h3>Data List</h3>
      <button
        onClick={fetchData}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded my-2"
      >
        {loading ? "Refreshing..." : "Refresh Data"}
      </button>

      <ul>
        {loading && <li>Loading...</li>}
        {error && <li className="text-red-500">{error}</li>}
        {!loading &&
          !error &&
          data.map((item, index) => (
            <li key={index}>
              {index + 1}. {item}
            </li>
          ))}
      </ul>
    </div>
  );
}
