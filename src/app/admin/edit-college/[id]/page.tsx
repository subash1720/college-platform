"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditCollegePage() {
  const params = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    location: "",
    fees: "",
    rating: "",
    description: "",
    imageUrl: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCollege();
  }, []);

  const fetchCollege = async () => {
    try {
      const res = await fetch(`/api/college/${params.id}`);
      const data = await res.json();

      setForm({
        name: data.name || "",
        location: data.location || "",
        fees: data.fees || "",
        rating: String(data.rating || ""),
        description: data.description || "",
        imageUrl: data.imageUrl || "",
      });
    } catch (error) {
      console.error("Failed to fetch college", error);
    }
  };

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

    const res = await fetch(`/api/college/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage("College Updated Successfully");

      setTimeout(() => {
        router.push("/admin");
      }, 1500);
    } else {
      setMessage("Failed to update college");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-[600px]"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
          Edit College
        </h1>

        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="College"
            className="w-full h-56 object-cover rounded-lg mb-4"
          />
        )}

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
          rows={4}
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
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
        >
          Update College
        </button>

        {message && (
          <p className="mt-4 text-center font-medium text-green-600">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}