import React, { useRef, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./Layout.css";
import useTheme from "../hooks/useTheme";

export default function Layout() {
  const location = useLocation();
  const nodeRef = useRef(null);
  let { isDark } = useTheme();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div
      className={`min-h-screen flex flex-col bg-bg text-text transition-colors duration-300`}
    >
      <Navbar />

      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          timeout={150}
          classNames="fade"
          nodeRef={nodeRef}
          unmountOnExit
        >
          <div ref={nodeRef} className="max-w-6xl mx-auto p-4">
            <Outlet />
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
