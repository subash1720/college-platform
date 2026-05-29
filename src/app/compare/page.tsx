"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

type College = {
  id: number;
  name: string;
  location: string;
  fees: string;
  rating: number;
  description: string;
};

export default function ComparePage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [college1Id, setCollege1Id] = useState<number>(1);
  const [college2Id, setCollege2Id] = useState<number>(2);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    const res = await fetch("/api/college");
    const data = await res.json();

    setColleges(data);

    if (data.length >= 2) {
      setCollege1Id(data[0].id);
      setCollege2Id(data[1].id);
    }
  };

  const college1 = colleges.find(
    (college) => college.id === college1Id
  );

  const college2 = colleges.find(
    (college) => college.id === college2Id
  );

  if (colleges.length === 0) {
    return (
      <>
        <Navbar />
        <main className="p-10">
          <h1>Loading...</h1>
        </main>
      </>
    );
  }

  if (!college1 || !college2) {
    return (
      <>
        <Navbar />
        <main className="p-10">
          <h1>Select two colleges to compare</h1>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 p-10">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          Compare Colleges
        </h1>

        <div className="flex gap-4 mb-6">
          <select
            value={college1Id}
            onChange={(e) =>
              setCollege1Id(Number(e.target.value))
            }
            className="border p-2 rounded"
          >
            {colleges.map((college) => (
              <option
                key={college.id}
                value={college.id}
              >
                {college.name}
              </option>
            ))}
          </select>

          <select
            value={college2Id}
            onChange={(e) =>
              setCollege2Id(Number(e.target.value))
            }
            className="border p-2 rounded"
          >
            {colleges.map((college) => (
              <option
                key={college.id}
                value={college.id}
              >
                {college.name}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 bg-white shadow-md">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-4 border">Feature</th>
                <th className="p-4 border">{college1.name}</th>
                <th className="p-4 border">{college2.name}</th>
              </tr>
            </thead>

            <tbody className="text-black">
              <tr>
                <td className="p-4 border font-semibold">
                  Location
                </td>
                <td className="p-4 border">
                  {college1.location}
                </td>
                <td className="p-4 border">
                  {college2.location}
                </td>
              </tr>

              <tr>
                <td className="p-4 border font-semibold">
                  Fees
                </td>
                <td className="p-4 border">
                  {college1.fees}
                </td>
                <td className="p-4 border">
                  {college2.fees}
                </td>
              </tr>

              <tr>
                <td className="p-4 border font-semibold">
                  Rating
                </td>
                <td className="p-4 border">
                  {college1.rating}
                </td>
                <td className="p-4 border">
                  {college2.rating}
                </td>
              </tr>

              <tr>
                <td className="p-4 border font-semibold">
                  Description
                </td>
                <td className="p-4 border">
                  {college1.description}
                </td>
                <td className="p-4 border">
                  {college2.description}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}