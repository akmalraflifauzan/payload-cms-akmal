"use client";
import Link from "next/link";

function Navbar({}) {
  return (
    <div className="w-full h-[32px] relative">
      {/* Desktop / larger screens - fixed to top */}
      <div className="bg-white w-full h-[70px] flex items-center justify-center shadow-xl fixed top-0 z-50">
        <ul className="flex items-center font-medium text-lg gap-10">
          <li className="text-[#FF9844] text-[23px] font-bold">
            Akmal Profile
          </li>
          <li className="max-md:hidden hover:text-[#FFB173] duration-300">
            <Link href="/">About</Link>
          </li>
          <li className="max-md:hidden hover:text-[#FFB173] duration-300">
            <Link href="/experience">Experiences</Link>
          </li>
          <li className="max-md:hidden hover:text-[#FFB173] duration-300">
            Contact
          </li>
        </ul>
      </div>

      {/* Mobile - fixed to bottom */}
      <div className="min-md:hidden w-full h-[60px] bg-white fixed bottom-0 flex items-center justify-center border-1 border-[grey] z-50">
        <ul className="flex items-center text-sm font-medium gap-10">
          <li className="hover:text-[#FFB173] duration-300">
            <Link href="/">About</Link>
          </li>
          <li className="hover:text-[#FFB173] duration-300">
            <Link href="/experience">Experiences</Link>
          </li>
          <li className="hover:text-[#FFB173] duration-300">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
