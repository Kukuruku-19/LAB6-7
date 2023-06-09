import { create } from "zustand";

const useBasketStore = create((set, get) => ({
    basket: [],
    inCart: (id) => {
        const { basket } = get();
        return basket.some((pr) => pr.id === id);
    },
    addProduct: (newProduct) => {
        const { inCart } = get();
        if (!inCart(newProduct.id)) {
            set((state) => ({
                basket: [...state.basket, { ...newProduct, cnt: 1 }],
            }));
        }
    },
    removeProduct: (productId) =>
        set((state) => {
            const newBasket = state.basket.filter((elem) => {
                return productId !== elem.id;
            });
            return {
                basket: newBasket,
            };
        }),
    changeCnt: (itemId, cnt) =>
        set((state) => ({
            basket: state.basket.map((item) =>
                item.id === itemId ? { ...item, cnt: cnt } : item
            ),
        })),
    deleteAll: () => {
        set({
            basket: [],
        });
    },
}));

export default useBasketStore;
