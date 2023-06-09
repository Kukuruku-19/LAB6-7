import React from "react";
import useBasketStore from "../store/basketStore";

export function Counter({ max, current, id }) {
    const changeCnt = useBasketStore((state) => state.changeCnt);
    return (
        <div style={{ display: "flex" }}>
            <button
                className="counter__button"
                disabled={current === 1}
                onClick={() => {
                    changeCnt(id, current - 1);
                }}
            >
                -
            </button>
            <div className="counter__counter">{current}</div>
            <button
                className="counter__button"
                disabled={max === current}
                onClick={() => {
                    changeCnt(id, current + 1);
                }}
            >
                +
            </button>
        </div>
    );
}
