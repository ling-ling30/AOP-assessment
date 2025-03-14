"use client";

import React from "react";

export default function Soal2() {
  const [error, setError] = React.useState<undefined | string>(undefined);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [IsSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const [form, setForm] = React.useState({
    name: "",
    email: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(undefined);
    setSuccess(false);

    const { name, email } = form;

    if (!name) {
      setError("Nama tidak boleh kosong!");
      setIsSubmitting(false);
      return;
    }

    if (!email) {
      setError("Email tidak boleh kosong!");
      setIsSubmitting(false);
      return;
    }

    const validateEmail = (email: string) =>
      /^[^\s@]+@[^\s]+\.[^\s]+$/.test(email);
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
    setSuccess(true);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="flex gap-2 my-2">
        <label className="w-32" htmlFor="name">
          Name
        </label>
        <input
          className="border-2 border-white rounded-sm"
          type="text"
          id="name"
          name="name"
          onChange={handleOnChange}
        />
      </div>
      <div className="flex gap-2 my-2">
        <label className="w-32" htmlFor="email">
          Email
        </label>
        <input
          className="border-2 border-white rounded-sm"
          id="email"
          name="email"
          onChange={handleOnChange}
        />
      </div>

      {error && (
        <div className="p-2 my-2 bg-red-800 w-fit">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-2 my-2 bg-green-800 w-fit">
          <p className="text-green-300">
            Thank you for your submission! We will get back to you soon.
          </p>
        </div>
      )}

      <button
        disabled={IsSubmitting}
        className="bg-gray-800 text-white rounded-sm px-4 py-2 hover:bg-gray-500"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
