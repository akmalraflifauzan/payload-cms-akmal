"use client";
import Navbar from "../(component)/element/navbar/page";
import About from "../(component)/element/about/page";
import CV from "../(component)/element/CV/page";

export default function Home() {
  return (
    <div>
      <Navbar />
      <About />
      <CV />
    </div>
  );
}
