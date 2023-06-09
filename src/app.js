import React, { useEffect } from "react";
import "./styles/style.scss";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Footer from "./components/Footer";
const Catalog = React.lazy(() => import("./pages/Catalog"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const Product = React.lazy(() => import("./pages/Product"));
const Basket = React.lazy(() => import("./pages/Basket"));
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function app() {
    return (
        <>
            <BrowserRouter>
                <ScrollToTop />
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <React.Suspense>
                                <Catalog />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="/search/:keyword"
                        element={
                            <React.Suspense>
                                <Catalog />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="/filter/:cities"
                        element={
                            <React.Suspense>
                                <Catalog />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="/basket"
                        element={
                            <React.Suspense>
                                <Basket />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <React.Suspense>
                                <ErrorPage
                                    title={"Схоже такої сторінки не існує"}
                                    text={"Головне меню"}
                                    link={"/"}
                                />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="/product/:id"
                        element={
                            <React.Suspense>
                                <Product />
                            </React.Suspense>
                        }
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default app;
