import React from "react";
import { navlinks } from "../constants/navlinks";
import "../styles/header.css";
import { useNavigate } from "react-router-dom";

export default function Navbar({setShow, selectedLink, setSelectedLink}){
    const navigate = useNavigate();

    return(
        <div className="links-container">
            {navlinks.map((navlink) => (
              <div
                key={navlink.name}
                className= {selectedLink === navlink.link ? "selected-link" : "links-style"}
                onClick={() => {
                  setShow(false)
                  setSelectedLink(navlink.link)
                  navigate(navlink.link);
                }}
              >
                <p>{navlink.name}</p>
              </div>
            ))}
          </div>
    )
}
