"use client";

import Link from "next/link";

type CollegeCardProps = {
  id: number;
  name: string;
  location: string;
  fees: string;
  rating: string | number;
  imageUrl?: string;
  
};


export default function CollegeCard({
  id,
  name,
  location,
  fees,
  rating,
  imageUrl, 
}: CollegeCardProps) {
  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this college?"
    );

    if (!confirmDelete) return;

    const res = await fetch("/api/college", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      alert("College deleted successfully");
      window.location.reload();
    } else {
      alert("Delete failed");
    }
  };

  return (
  
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
      <h2 className="text-2xl font-bold text-blue-600">
        {name}
      </h2>

      <p className="mt-2 text-gray-600">
        📍 {location}
      </p>

      <p className="mt-2 text-gray-700">
        💰 Fees: {fees}
      </p>

      <p className="mt-2 text-yellow-600 font-semibold">
        ⭐ Rating: {rating}
      </p>

      <div className="flex gap-3 mt-4">
        <Link
          href={`/college/${id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          View Details
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}