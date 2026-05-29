"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import CollegeCard from "@/components/CollegeCard";


export default function Home() {
 const [search, setSearch] = useState("");
const [colleges, setColleges] = useState<any[]>([]);

useEffect(() => {
  fetchColleges();
}, []);

const fetchColleges = async () => {
  const res = await fetch("/api/college");
  if (!res.ok) {
  throw new Error("Failed to fetch colleges");
}

const data = await res.json();
  setColleges(data);
};

const filteredColleges = colleges.filter((college) =>
  college.name.toLowerCase().includes(search.toLowerCase())
);
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

     
        <h1 className="text-5xl font-bold text-blue-600">
          College Discovery Platform
        </h1>

        <p className="mt-4 text-lg text-gray-700 max-w-2xl">
          Find, compare, and explore top colleges with detailed
          information about fees, placements, courses, and ratings.
        </p>
         <section className="p-10">
        <div className="mt-8">
        <input
          type="text"
          placeholder="Search colleges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Explore Colleges
        </button>
      </section>

      <section className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map((college) => (
          <CollegeCard
            key={college.id}
            id={college.id}
            name={college.name}
            location={college.location}
            fees={college.fees}
            rating={college.rating}
            imageUrl={college.imageUrl}
          />
        ))}
      </section>
    </main>
  );
}