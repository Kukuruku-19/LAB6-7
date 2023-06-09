import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { NavLink } from "react-router-dom";

const isActiveNav = ({ isActive }) => {
    return isActive ? "active" : "default";
};

function Footer() {
    return (
        <div className="footer">
            <div className="footer__menu _container">
                <ul className="footer__list">
                    <li className="footer__list__item">
                        <NavLink to="/" className={isActiveNav}>
                            catalog
                        </NavLink>
                    </li>
                    <li className="footer__list__item">
                        <a href="#">
                            <FacebookOutlinedIcon
                                sx={{ color: "#F5FBFE", fontSize: "30px" }}
                            />
                        </a>
                    </li>
                    <li className="footer__list__item">
                        <a href="#">
                            <InstagramIcon
                                sx={{ color: "#F5FBFE", fontSize: "30px" }}
                            />
                        </a>
                    </li>
                    <li className="footer__list__item">
                        <a href="#">
                            <YouTubeIcon
                                sx={{ color: "#F5FBFE", fontSize: "30px" }}
                            />
                        </a>
                    </li>
                </ul>
                <div className="footer__description">
                    ©2023 Akai All Rights Reserved | Privacy Policy
                </div>
            </div>
        </div>
    );
}

export default Footer;
