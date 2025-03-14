"use client";
import React, { useState } from "react";

export default function Soal2Backend() {
  const [isLogin, setisLogin] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const [profile, setProfile] = useState<{
    id: string;
    username: string;
  } | null>(null);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const toggleisLogin = () => {
    setisLogin(!isLogin);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError(null);
    setLoading(true);
    e.preventDefault();
    let api_link;
    if (isLogin) {
      api_link = "http://localhost:4000/api/auth/login";
    } else {
      api_link = "http://localhost:4000/api/auth/register";
    }
    const response = await fetch(api_link, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result: {
      message?: string;
      token?: string;
    } = await response.json();

    if (!response.ok) {
      if (result.message) {
        setError(result.message);
      } else {
        setError("Something went wrong");
      }
      setLoading(false);
      return;
    }

    if (result.token) {
      localStorage.setItem("token", result.token);
      setSuccess("Login Successful");
    } else {
      setSuccess("Register Successful");
    }
    setLoading(false);
  };

  const handleGetProfile = async () => {
    setError(null);
    setLoading(true);
    const response = await fetch("http://localhost:4000/api/auth/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      if (result.message) {
        setError(result.message);
      } else {
        setError("Something went wrong");
      }
      setLoading(false);
      return;
    }
    setProfile(result);
    setLoading(false);
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        <h3 className="text-2xl m-2">Login/Register/profile</h3>
        {error && (
          <div className="p-2 my-2 bg-red-800 w-fit">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-2 my-2 bg-green-800 w-fit">
            <p className="text-green-300">{success}</p>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex ">
          <label className="w-24">Username</label>
          <input
            type="text"
            placeholder="Username"
            className="border-2 border-white rounded-sm px-2"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>
        <div className="flex ">
          <label className="w-24">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="border-2 border-white rounded-sm px-2"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="bg-gray-800 text-white rounded-sm px-4 py-2 hover:bg-gray-500"
        >
          {loading ? "Loading..." : <>{isLogin ? "Login" : "Register"}</>}
        </button>
      </form>
      <button className="underline" type="button" onClick={toggleisLogin}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
      </button>

      <section className="mt-4">
        <button type="button" onClick={handleGetProfile}>
          Get Profile
        </button>
        {profile && <pre>{JSON.stringify(profile, null, 2)}</pre>}
      </section>
    </>
  );
}
