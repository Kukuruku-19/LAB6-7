import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spring, animated } from "react-spring";
import useCompaniesStore from "../store/companiesStore";
import useCompanies from "../hooks/useCompanies";
import { PuffLoader } from "react-spinners";
import useBasketStore from "../store/basketStore";

function Product() {
    const { id } = useParams();

    const companies = useCompaniesStore((state) => state.companies);
    const setCompanies = useCompaniesStore((state) => state.setCompanies);
    const addProduct = useBasketStore((state) => state.addProduct);
    const removeProduct = useBasketStore((state) => state.removeProduct);
    const getCompanies = useCompanies();

    useEffect(() => {
        if (getCompanies.data) {
            setCompanies(getCompanies.data);
        }
    }, [getCompanies.data]);

    const data = companies.find((elem) => elem.id === parseInt(id));

    const inCart = useBasketStore((state) => state.inCart);
    const basket = useBasketStore((state) => state.basket);

    if (!data) {
        return (
            <div className="_container catalog__loading">
                <PuffLoader
                    size={"350px"}
                    cssOverride={{ marginTop: "150px" }}
                />
            </div>
        );
    }

    return (
        <div className="product _container" id="product">
            <div className="product__content">
                <div className="product__imageblock">
                    <Image key={data.photo} photoSrc={data.photo} />
                </div>
                <div className="product__block">
                    <h1 className="product__title">{data.name}</h1>
                    {inCart(parseInt(id)) ? (
                        <button
                            className="product__del"
                            onClick={() => {
                                removeProduct(parseInt(id));
                            }}
                        >
                            Delete
                        </button>
                    ) : (
                        <button
                            className="product__add"
                            onClick={() => {
                                addProduct(data);
                            }}
                        >
                            Add
                        </button>
                    )}
                    <p className="product__description">{data.description}</p>
                </div>
            </div>
        </div>
    );
}
function Image(props) {
    const { photoSrc } = props;

    return (
        <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            config={{ duration: 1500 }}
        >
            {(props) => (
                <animated.div style={props}>
                    <div>
                        <img
                            key={photoSrc}
                            src={photoSrc}
                            alt=""
                            className="product__image"
                            draggable="false"
                        />
                    </div>
                </animated.div>
            )}
        </Spring>
    );
}

export default Product;
