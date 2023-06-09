import React from "react";
import { Link, NavLink } from "react-router-dom";
import useBasketStore from "../store/basketStore";
function toggleBurger() {
    document.querySelector(".header__burger").classList.toggle("active");
    document.querySelector(".header__menu").classList.toggle("active");
    document.body.classList.toggle("lock");
}
function closeBurger() {
    if (
        document.querySelector(".header__burger").classList.contains("active")
    ) {
        document.body.classList.remove("lock");
        document.querySelector(".header__burger").classList.remove("active");
        document.querySelector(".header__menu").classList.remove("active");
    }
}

const isActiveNav = ({ isActive }) => {
    return isActive ? "active" : "default";
};

function Header() {
    const basket = useBasketStore((state) => state.basket);

    return (
        <div className="header">
            <div className="header__container _container">
                <Link
                    to="/"
                    className="header__logo__link"
                    onClick={closeBurger}
                >
                    <h1 className="header__logo">Akai</h1>
                </Link>
                <div className="header__burger" onClick={toggleBurger}>
                    <span></span>
                </div>
                <div className="header__menu">
                    <ul className="menu__list">
                        <li className="menu__item">
                            <NavLink
                                to="/"
                                className={isActiveNav}
                                onClick={closeBurger}
                            >
                                Catalog
                            </NavLink>
                        </li>
                        <li className="menu__item">
                            <NavLink
                                to="/basket"
                                className={isActiveNav}
                                onClick={closeBurger}
                            >
                                <span className="circle">
                                    {basket.reduce((summ, elem) => {
                                        return summ + elem.cnt;
                                    }, 0)}
                                </span>
                                <span className="material-symbols-outlined">
                                    shopping_cart
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
