import React from "react";
import heroImg from "../assets/images/hero.svg";

export default function Hero() {
  return (
    <>
      <section className="bg-linear-to-br from-indigo-200/50 to-purple-300/80 md:py-20 py-8 rounded-3xl">
        <div className="max-w-6xl mx-auto px-3 md:px-6  text-center md:text-left md:flex md:items-center gap-5 justify-content-center items-center">
          <div className="flex-1">
            <h1 className="text-2xl md:text-5xl font-bold text-slate-900">
              Library Management Made Simple
            </h1>
            <p className="md:mt-4 mt-2 text-slate-600 md:text-lg">
              Manage books, members, and borrowing records in one place.
            </p>
            <button className="md:mt-6 mt-3 md:text-lg bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
              Get Started
            </button>
          </div>

          <div className="flex-1 items-center justify-center mt-10 md:mt-0 hidden md:flex">
            <img
              src={heroImg}
              alt="Hero illustration"
              className="w-85 max-w-md"
            />
          </div>
        </div>
      </section>
    </>
  );
}
