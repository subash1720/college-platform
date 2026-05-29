"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalColleges: 0,
    totalUsers: 0,
  });

  const [colleges, setColleges] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const statsRes = await fetch("/api/admin/stats");
    const statsData = await statsRes.json();

    setStats(statsData);

    const collegesRes = await fetch("/api/college");
    const collegesData = await collegesRes.json();

    setColleges(collegesData);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Admin Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-blue-600">
            Total Colleges
          </h2>

          <p className="text-4xl font-bold mt-4">
            {stats.totalColleges}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-600">
            Total Users
          </h2>

          <p className="text-4xl font-bold mt-4">
            {stats.totalUsers}
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Link
          href="/admin/add-college"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg"
        >
          <h2 className="text-2xl font-bold text-green-600">
            Add College
          </h2>

          <p className="mt-2 text-gray-600">
            Create a new college record.
          </p>
        </Link>

        <Link
          href="/compare"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg"
        >
          <h2 className="text-2xl font-bold text-blue-600">
            Compare Colleges
          </h2>

          <p className="mt-2 text-gray-600">
            Compare college details.
          </p>
        </Link>
      </div>

      {/* Manage Colleges */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">
          Manage Colleges
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Location</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {colleges.map((college) => (
                <tr
                  key={college.id}
                  className="border-b"
                >
                  <td className="p-3 text-center">
                    {college.id}
                  </td>

                  <td className="p-3">
                    {college.name}
                  </td>

                  <td className="p-3">
                    {college.location}
                  </td>

                  <td className="p-3">
                    {college.rating}
                  </td>

                  <td className="p-3">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={async () => {
                          const confirmed = confirm(
                            "Are you sure you want to delete this college?"
                          );

                          if (!confirmed) return;

                          await fetch("/api/college", {
                            method: "DELETE",
                            headers: {
                              "Content-Type":
                                "application/json",
                            },
                            body: JSON.stringify({
                              id: college.id,
                            }),
                          });

                          fetchStats();
                        }}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                      <Link
                        href={`/college/${college.id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        View
                      </Link>

                      <Link
                        href={`/admin/edit-college/${college.id}`}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}