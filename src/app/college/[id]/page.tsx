import Navbar from "@/components/Navbar";
import Link from "next/link";
async function getCollege(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/college/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  return res.json();
}

export default async function CollegeDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const college = await getCollege(id);

  if (!college) {
    return (
      <h1 className="text-3xl p-10">
        College Not Found
      </h1>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 p-10">
   
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                  <Link
          href="/"
          className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          ← Back to Colleges
        </Link>
          {college.imageUrl && (
            <img
              src={college.imageUrl}
              alt={college.name}
              className="w-full h-[500px] object-cover"
            />
          )}
          
          <div className="p-8">
            <h1 className="text-4xl font-bold text-blue-600">
              {college.name}
            </h1>

            <p className="mt-4 text-lg">
              📍 Location: {college.location}
            </p>

            <p className="mt-3 text-lg">
              💰 Fees: {college.fees}
            </p>

            <p className="mt-3 text-lg text-yellow-600 font-semibold">
              ⭐ Rating: {Number(college.rating).toFixed(1)}
            </p>

            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-2">
                Description
              </h2>

              <p className="text-gray-700">
                {college.description}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}