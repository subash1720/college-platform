"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
          CollegeFinder
        </h1>
      </Link>

      <div className="flex gap-6 items-center">
        <Link
          href="/"
          className="text-gray-700 hover:text-blue-600"
        >
          Home
        </Link>

        <Link
          href="/"
          className="text-gray-700 hover:text-blue-600"
        >
          Colleges
        </Link>

        <Link
          href="/compare"
          className="text-gray-700 hover:text-blue-600"
        >
          Compare
        </Link>

        {user ? (
          <>
            <span className="text-blue-600 font-semibold">
              Hello, {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700"
            >
              Logout
            </button>
            <a
            href="/admin"
            className="text-gray-700 hover:text-blue-600"
          >
            Admin
          </a>
          </>
        ) : (
          <Link
            href="/login"
            className="text-gray-700 hover:text-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}