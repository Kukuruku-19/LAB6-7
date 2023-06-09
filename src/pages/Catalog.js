import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useCompanies from "../hooks/useCompanies";
import { PuffLoader } from "react-spinners";
import useCompaniesStore from "../store/companiesStore";
import CitiesFilter from "../components/CitiesFilter";
import useBasketStore from "../store/basketStore";

function Catalog() {
    const basket = useBasketStore((state) => state.basket);
    const companies = useCompaniesStore((state) => state.companies);
    const addProduct = useBasketStore((state) => state.addProduct);
    const removeProduct = useBasketStore((state) => state.removeProduct);
    const inCart = useBasketStore((state) => state.inCart);

    const setCompanies = useCompaniesStore((state) => state.setCompanies);

    const getCompanies = useCompanies();

    useEffect(() => {
        if (getCompanies.data) {
            setCompanies(getCompanies.data);
        }
    }, [getCompanies.data]);

    const allProducts = companies.map((pr) => {
        const btn = inCart(pr.id) ? (
            <button
                className="product__del"
                onClick={() => {
                    removeProduct(pr.id);
                }}
            >
                Delete
            </button>
        ) : (
            <button
                className="product__add"
                onClick={() => {
                    addProduct(pr);
                }}
            >
                Add
            </button>
        );
        return (
            <li key={pr.id} className="product__elem">
                <Link to={"/product/" + pr.id}>
                    <div>
                        <div className="product__name">{pr.name}</div>
                        <LazyLoadImage
                            className="product__img"
                            src={pr.photo}
                            placeholderSrc={pr.photo}
                            effect="blur"
                            draggable="false"
                        />
                    </div>
                </Link>
                {btn}
            </li>
        );
    });

    return (
        <div className="products _container">
            <CitiesFilter />
            <div className="products__sort__catalog"></div>
            <div className={"flex"}>
                {getCompanies.isLoading ? (
                    <div className="_container catalog__loading">
                        <PuffLoader
                            size={"350px"}
                            cssOverride={{ marginTop: "150px" }}
                        />
                    </div>
                ) : (
                    <ul className="products__list">{allProducts}</ul>
                )}
            </div>
        </div>
    );
}

export default Catalog;
