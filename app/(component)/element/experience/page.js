"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

function Experience({}) {
  return (
    <div className="min-h-screen bg-[#FF9844] w-full pt-[90px] pb-[60px] px-4 sm:px-6 lg:px-8">
      <div className="relative">
        <h1 className="text-4xl font-bold text-white mb-8">My Experience</h1>

        {/* Experience List */}
        <div className="space-y-8">
          {/* Experience Item 1 */}
          <section className="bg-white rounded-2xl shadow-md px-4 py-6 sm:p-7">
            <div className="justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Curriculum Vitae (CV)
              </h3>

              <div className="flex gap-3">
                <Link
                  href="/CV_Akmal1.pdf" // ganti sesuai file PDF kamu di /public
                  className="text-[#FF9844] hover:text-[#ffb173] font-medium"
                  target="_blank"
                >
                  View PDF →
                </Link>
                <a
                  href="/CV_Akmal1.pdf"
                  download
                  className="text-gray-600 hover:text-gray-800 font-medium"
                >
                  Download
                </a>
              </div>
            </div>

            <p className="mt-4 text-gray-700">
              Latest CV version. Open the PDF above to see my CV.
            </p>
          </section>
          <Achievements />
        </div>
      </div>
    </div>
  );
}

function Achievements({}) {
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/achivement");
        setAchievements(response.data.docs);
        setError(null);
      } catch (error) {
        console.error("Error fetching achievements:", error);
        setError("Failed to load achievements");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-md px-4 py-6 sm:p-7 text-center text-gray-500">
        Loading achievements...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md px-4 py-6 sm:p-7 text-center text-red-500">
        {error}
      </div>
    );
  }

  // helper to resolve image URL from payload upload entry
  const getImageSrc = (item) => {
    if (!item) return "/achievements.jpg";
    // payload upload entries commonly expose `url`
    if (item.url) return item.url;
    // sometimes filename is returned as a string
    if (item.filename && typeof item.filename === "string")
      return `/uploads/${item.filename}`;
    // sizes object (if present)
    if (item.sizes) {
      const first = Object.values(item.sizes)[0];
      if (first && first.url) return first.url;
    }
    // fallback to placeholder in public
    return "/achievements.jpg";
  };

  return (
    <div className="space-y-6">
      {achievements.map((achievement) => (
        <div
          key={achievement.id}
          className="bg-white rounded-2xl shadow-md px-4 py-6 sm:p-7 flex flex-col sm:flex-row items-start gap-6"
        >
          <img
            src={getImageSrc(achievement)}
            alt={achievement.title}
            className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl border border-gray-200 flex-shrink-0"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {achievement.title}
            </h3>

            <p className="text-gray-700 mb-4">{achievement["sub-title"]}</p>

            <div className="text-gray-700">{achievement.description}</div>
          </div>
        </div>
      ))}

      {!achievements?.length && (
        <div className="bg-white rounded-2xl shadow-md px-4 py-6 sm:p-7 text-center text-gray-500">
          No achievements found
        </div>
      )}
    </div>
  );
}

export default Experience;
