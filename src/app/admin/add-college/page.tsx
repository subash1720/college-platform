"use client";

import { useState } from "react";

export default function AddCollegePage() {
 const [form, setForm] = useState({
  name: "",
  location: "",
  fees: "",
  rating: "",
  description: "",
  imageUrl: "",
});

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const res = await fetch("/api/college", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage("College Added Successfully");

      setForm({
        name: "",
        location: "",
        fees: "",
        rating: "",
        description: "",
        imageUrl: "",
      });
    } else {
      setMessage("Failed to add college");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-[500px]"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Add College
        </h1>

        <input
          name="name"
          placeholder="College Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          name="fees"
          placeholder="Fees"
          value={form.fees}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          name="rating"
          placeholder="Rating"
          value={form.rating}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />
            <input
            name="imageUrl"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
            />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Add College
        </button>

        {message && (
          <p className="mt-4 text-center">{message}</p>
        )}
      </form>
    </main>
  );
}