import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import lightIcon from "../assets/Icons/lightmode.svg";
import darkIcon from "../assets/Icons/darkmode.svg";
import useSignOut from "../hooks/useSignOut";

export default function Navbar() {
  let { changeTheme, isDark } = useTheme();
  let [search, setSearch] = useState("");
  let navigate = useNavigate();
  let handleSearch = () => {
    navigate(`/?search=${search}`);
  };

  let { logout } = useSignOut();
  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <div>
      <nav className={`bg-bg border-border shadow-lg`}>
        <ul className="flex justify-between p-4  max-w-6xl mx-auto items-center">
          {/* Search Box */}
          <li className="flex items-center gap-2 p-2 rounded">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full
                        sm:w-65
                        md:w-90
                        lg:w-100
                        px-3
                        py-2
                        text-sm
                        md:text-base
                        border
                        rounded
                       ${
                         isDark
                           ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-primary focus:border-primary"
                           : "border-gray-400 bg-white text-black placeholder-gray-500 focus:outline-primary focus:border-primary"
                       }`}
              placeholder="Search"
            />
            <button
              onClick={handleSearch}
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </li>
          {/* LogoSection */}
          <Link
            to="/"
            className="flex items-center gap-2 border border-primary p-2 rounded md:-ml-50"
          >
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
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
              />
            </svg>

            <span className="font-bold text-lg text-primary hidden md:block">
              LMS
            </span>
          </Link>

          {/* Profile and Add */}
          <li className=" flex md:gap-3 items-center">
            <Link
              to="/create"
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
            </Link>

            {/* profile */}
            <div className="w-10 h-10">
              <img
                src="https://lh3.googleusercontent.com/a/ACg8ocKhLm_BGPuQWHk9yTA_LlJ71ULC2sYNqKJGKrjg0BrywXUmlVE=s96-c"
                alt=""
                className="w-full rounded-full border border-primary"
              />
            </div>
            {/* Theme Toggler */}
            <div className="w-6 h-6 ml-3 cursor-pointer">
              {!isDark && (
                <img
                  src={darkIcon}
                  alt=""
                  className="color-dark"
                  onClick={() => changeTheme("dark")}
                />
              )}
              {isDark && (
                <img
                  src={lightIcon}
                  alt=""
                  onClick={() => changeTheme("light")}
                />
              )}
            </div>
            {/* Logout Button */}
            <div>
              <button
                onClick={signOut}
                className="border border-danger text-danger hover:bg-danger hover:text-white transition text-sm px-3 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
