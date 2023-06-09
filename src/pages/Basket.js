import React, { useState } from "react";
import useBasketStore from "../store/basketStore";
import { Counter } from "../components/Counter";
import { $host } from "../api/index.js";
import { toast } from "react-toastify";
function Basket() {
    const [emailError, setEmailError] = useState("");

    const [name, setName] = useState(undefined);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const basket = useBasketStore((state) => state.basket);
    const removeProduct = useBasketStore((state) => state.removeProduct);
    const deleteAll = useBasketStore((state) => state.deleteAll);

    function checkOrder() {
        if (name === "") {
            document
                .getElementById("input1")
                .classList.add("basket__input__error");
            document
                .getElementById("error1")
                .classList.add("error__message__visible");
        }
        if (phone === "") {
            document
                .getElementById("input2")
                .classList.add("basket__input__error");
            document
                .getElementById("error2")
                .classList.add("error__message__visible");
        }
        if (email === "") {
            document
                .getElementById("input3")
                .classList.add("basket__input__error");
            document
                .getElementById("error3")
                .classList.add("error__message__visible");
        }
        if (name !== "" && phone !== "" && email !== "") {
            $host
                .post(`/order/`, {
                    name: name,
                    email: email,
                    phone: phone,
                    order_item: basket.map((elem) => {
                        return {
                            product: elem.id,
                            amount: elem.cnt,
                        };
                    }),
                })
                .then((response) => {
                    deleteAll();
                    [
                        ...document.getElementsByClassName("basket__input"),
                    ].forEach((elem) => {
                        elem.value = "";
                    });
                    setName("");
                    setPhone("");
                    setEmail("");
                    toast.success("Order created");
                })
                .catch((error) => {
                    if (error.response.data.name) {
                        toast.error(error.response.data.name[0]);
                    }
                    if (error.response.data.email) {
                        toast.error(error.response.data.email[0]);
                    }
                    if (error.response.data.phone) {
                        toast.error(error.response.data.phone[0]);
                    }
                    if (error.response.data.non_field_errors) {
                        toast.error(error.response.data.non_field_errors[0]);
                    }
                });
        }
    }
    const productsRows = basket.map((pr) => (
        <tr key={pr.id}>
            <td className="first__td">
                <img src={pr.photo} height={40}></img>
                {pr.name}
            </td>
            <td>{pr.price}</td>
            <td>
                <Counter max={pr.amount} current={pr.cnt} id={pr.id} />
            </td>
            <td>{pr.price * pr.cnt}</td>
            <td>
                <button
                    className="basket__delete"
                    onClick={() => removeProduct(pr.id)}
                >
                    <span class="material-symbols-outlined">close</span>
                </button>
            </td>
        </tr>
    ));

    return (
        <div style={{ minHeight: "80vh" }} className="_container">
            <table>
                <thead>
                    <tr>
                        <td className="first__td">Product</td>
                        <td>Price / $</td>
                        <td>Quantity</td>
                        <td>Total price / $</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>{productsRows}</tbody>
            </table>
            <div className="basket__total">
                <strong style={{ marginRight: 30 }}>Total:</strong>
                <strong>
                    {basket.reduce((summ, elem) => {
                        return summ + elem.cnt * elem.price;
                    }, 0)}
                    $
                </strong>
            </div>
            {basket.length === 0 ? (
                <h1 className="basket__empty">Cart is empty</h1>
            ) : (
                <div className="basket__inputs">
                    <input
                        id="input1"
                        className="basket__input"
                        placeholder="Enter your name"
                        type="text"
                        onChange={(e) => {
                            if (e.target.value === "") {
                                document
                                    .getElementById("input1")
                                    .classList.add("basket__input__error");
                                document
                                    .getElementById("error1")
                                    .classList.add("error__message__visible");
                            } else {
                                document
                                    .getElementById("input1")
                                    .classList.remove("basket__input__error");
                                document
                                    .getElementById("error1")
                                    .classList.remove(
                                        "error__message__visible"
                                    );
                            }
                            setName(e.target.value);
                        }}
                    />
                    <p className="error__message" id="error1">
                        Name cannot be empty
                    </p>
                    <input
                        id="input2"
                        className="basket__input"
                        placeholder="Enter your e-mail"
                        type="email"
                        onChange={(e) => {
                            if (e.target.value === "") {
                                document
                                    .getElementById("input2")
                                    .classList.add("basket__input__error");
                                document
                                    .getElementById("error2")
                                    .classList.add("error__message__visible");
                            } else {
                                document
                                    .getElementById("input2")
                                    .classList.remove("basket__input__error");
                                document
                                    .getElementById("error2")
                                    .classList.remove(
                                        "error__message__visible"
                                    );
                            }
                            setEmail(e.target.value);
                        }}
                    />
                    <p className="error__message" id="error2">
                        Email cannot be empty
                    </p>
                    {emailError ? (
                        <p className="error__message">{emailError}</p>
                    ) : null}
                    <input
                        id="input3"
                        className="basket__input"
                        placeholder="Enter phone number"
                        type="text"
                        onChange={(e) => {
                            if (e.target.value === "") {
                                document
                                    .getElementById("input3")
                                    .classList.add("basket__input__error");
                                document
                                    .getElementById("error3")
                                    .classList.add("error__message__visible");
                            } else {
                                document
                                    .getElementById("input3")
                                    .classList.remove("basket__input__error");
                                document
                                    .getElementById("error3")
                                    .classList.remove(
                                        "error__message__visible"
                                    );
                            }
                            setPhone(e.target.value);
                        }}
                    />
                    <p className="error__message" id="error3">
                        Phone cannot be empty
                    </p>
                </div>
            )}
            {basket.length ? (
                <button className="basket__makeorder" onClick={checkOrder}>
                    Make order
                </button>
            ) : null}
        </div>
    );
}

export default Basket;
