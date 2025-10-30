"use client";
function About({}) {
  return (
    <div className="pb-[60px] md:pb-0">
      <div className="relative ">
        <img
          src="/akmal2.jpg"
          alt="akmal"
          className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover opacity-50"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-[8%]">
          <div>
            <h1 className="font-extrabold text-white text-[50px] text-shadow-md leading-tight">
              Akmal <span className="block sm:inline">Rafli</span>
            </h1>
            <p className="bg-[#FF9844] flex justify-center w-[150px] text-white p-1 mt-2 rounded-[15px] font-medium">
              I&apos;m Developer
            </p>
          </div>
        </div>
      </div>
      {/* About Me */}
      <div className="px-10 py-10">
        <h1 className="text-[30px] font-bold">About Me</h1>
        <p className="mb-6">
          Hello, my name is Akmal. Im currently 20 years old and studying
          Information Engineering at Gadjah Mada University. I live in
          Indonesia, originally from Depok, West Java. I have an interest in
          sport, playing games, design and web development, and I continue to
          develop my skills by practicing continuously, working on various
          projects, and participating in competitions.
        </p>
        <a
          href="/experience"
          className="inline-block bg-[#FF9844] text-white px-6 py-2 rounded-[15px] hover:bg-[#e88835] transition-colors"
        >
          View My Experience
        </a>
      </div>
    </div>
  );
}

export default About;
