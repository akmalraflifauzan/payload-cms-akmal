"use client";
import Navbar from "../../(component)/element/navbar/page";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Achivement() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/achievements");
        setData(res.data?.docs || []);
      } catch (err) {
        console.error("fetch error:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getImageSrc = (item) => {
    const field = item["foto sertif"];
    if (!field) return null;
    const url = field?.url || "";
    try {
      const u = new URL(url);
      return u.pathname; // ubah ke path relatif
    } catch {
      return url;
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );

  return (
    <main className="min-h-screen bg-[#e79b59]">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="max-w-6xl mx-auto py-10 px-4">
        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-8">
          My Achievements
        </h1>

        {/* List achievements */}
        <div className="space-y-8">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-sm ring-1 ring-black/5 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6"
            >
              {/* Foto sertifikat */}
              {getImageSrc(item) ? (
                <Image
                  src={getImageSrc(item)}
                  alt={item.title || "Sertifikat"}
                  width={250}
                  height={250}
                  className="rounded-xl object-contain w-[250px] h-auto"
                  unoptimized
                />
              ) : (
                <div className="w-[250px] h-[250px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* Teks deskripsi */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {item.title}
                </h2>
                {item["sub-title"] && (
                  <p className="text-lg font-medium text-gray-700 mt-1">
                    {item["sub-title"]}
                  </p>
                )}
                {item.description && (
                  <p className="text-gray-600 mt-3 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
