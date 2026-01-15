import React from "react";

export default function Navbar() {
  return (
    <div>
      <nav className="bg-gray-200 shadow-md border-b border-gray-300">
        <ul className="flex justify-between p-4  max-w-6xl mx-auto items-center">
          <li className="flex items-center gap-2 p-2 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <input
              type="text"
              className=" w-full
                        sm:w-65
                        md:w-90
                        lg:w-[400px]
                        px-3
                        py-2
                        text-sm
                        md:text-base
                        border
                        border-slate-300
                        rounded-lg
                        focus:outline-none
                        focus:ring-2
                        focus:ring-indigo-500
                        focus:border-transparent"
              placeholder="Search"
            />
          </li>

          <li className="flex items-center gap-2 border border-indigo-600 p-2 rounded md:-ml-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-indigo-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
              />
            </svg>

            <span className="font-bold text-lg text-primary hidden md:block">
              LMS
            </span>
          </li>
          <li className=" flex md:gap-3 items-center">
            <button
              type="button"
              className="md:border border-primary text-primary px-3 py-2 rounded hover:bg-primary hover:text-white transition duration-300 flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>

              <span className="hidden md:block">Add Book</span>
            </button>
            <div className="w-10 h-10">
              <img
                src="https://lh3.googleusercontent.com/a/ACg8ocKhLm_BGPuQWHk9yTA_LlJ71ULC2sYNqKJGKrjg0BrywXUmlVE=s96-c"
                alt=""
                className="w-full rounded-full border border-primary"
              />
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
