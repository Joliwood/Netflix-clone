import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll", null);
        }
    }, []);

    return (
    <div className={`nav ${show && "nav__black"}`}>
        <img
            className="nav__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix Logo"
            />
            <p>ok boomer</p>

        <img 
            className="nav__avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7e/VisualEditor_icon_profile-progressive.svg"
            alt="Netflix avatar"
        />
    </div>
  )
};

export default Nav;