"use client";
import Link from "next/link";
function CV() {
  return (
    <div className="min-h-screen bg-[#FF9844] w-full pt-[90px] pb-[60px] px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          My CV & Achievements
        </h1>

        <div className="space-y-8">
          {/* CV Section */}
          <section className="bg-white rounded-2xl shadow-md px-4 py-6 sm:p-7">
            <div className="flex flex-col sm:flex-row justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">
                Curriculum Vitae (CV)
              </h3>

              <div className="flex gap-3">
                <Link
                  href="/CV_Akmal1.pdf"
                  className="text-[#FF9844] hover:text-[#ffb173] font-medium transition-colors"
                  target="_blank"
                >
                  View PDF →
                </Link>
                <a
                  href="/CV_Akmal1.pdf"
                  download
                  className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Download
                </a>
              </div>
            </div>

            <p className="text-gray-700">
              Latest CV version. Open the PDF above to see my CV.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CV;
