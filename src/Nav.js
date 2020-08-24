import React, { useEffect, useState } from "react";
import "./Nav.css";

const Nav = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src={require("./assets/images/netflix-logo.png")}
        alt="Netflix Logo"
      />
      <img
        className="nav__avatar"
        src={require("./assets/images/user.png")}
        alt="User Logo"
      />
    </div>
  );
};

export default Nav;
