import React, { useRef } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./Layout.css";

export default function Layout() {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <div>
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
