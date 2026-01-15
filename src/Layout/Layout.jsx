import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}
