import React, { useState } from "react";
import "../styles/style.scss";
import BtnSlider from "./BtnSlider";
import roses from "../img/main-image-rose.jpg";
import white from "../img/main-image-white.jpg";
import image3 from "../img/main-image3.jpg";

const dataSlider = [
    { id: 1, img: roses },
    { id: 2, img: white },
    { id: 3, img: image3 },
];
export default function Slider() {
    const [slideIndex, setSlideIndex] = useState(1);

    const nextSlide = () => {
        if (slideIndex !== dataSlider.length) {
            setSlideIndex(slideIndex + 1);
        } else if (slideIndex === dataSlider.length) {
            setSlideIndex(1);
        }
    };

    const prevSlide = () => {
        if (slideIndex !== 1) {
            setSlideIndex(slideIndex - 1);
        } else if (slideIndex === 1) {
            setSlideIndex(dataSlider.length);
        }
    };

    const moveDot = (index) => {
        setSlideIndex(index);
    };

    return (
        <div className="container-slider">
            {dataSlider.map((obj, index) => {
                return (
                    <div
                        key={obj.id}
                        className={
                            slideIndex === index + 1
                                ? "slideSlider active-anim"
                                : "slideSlider"
                        }
                    >
                        <img src={obj.img} draggable="false" />
                    </div>
                );
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"} />

            <div className="container-dots">
                {Array.from({ length: 3 }).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => moveDot(index + 1)}
                        className={
                            slideIndex === index + 1 ? "dot active" : "dot"
                        }
                    ></div>
                ))}
            </div>
        </div>
    );
}
