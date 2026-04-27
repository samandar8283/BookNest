import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "./AuthContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useOrder } from "./OrderContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CART_STORAGE_KEY = "booknest_cart";

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const prevUserRef = useRef(null);

    /* ----------------- LOAD CART ----------------- */
    useEffect(() => {
        const loadCart = async () => {
            setLoading(true);

            if (user) {
                const docRef = doc(db, "carts", user.uid);
                const snap = await getDoc(docRef);

                if (snap.exists()) {
                    setCart(snap.data().items || []);
                } else {
                    setCart([]);
                }
            } else {
                const localCart = localStorage.getItem(CART_STORAGE_KEY);
                setCart(localCart ? JSON.parse(localCart) : []);
            }

            setLoading(false);
            prevUserRef.current = user?.uid ?? null;
        };

        loadCart();
    }, [user]);

    /* ----------------- SAVE CART ----------------- */
    useEffect(() => {
        if (loading) return;

        const prevUid = prevUserRef.current;
        const currentUid = user?.uid ?? null;

        if (prevUid !== currentUid && user) {
            const docRef = doc(db, "carts", user.uid);
            setDoc(docRef, { items: cart });
            localStorage.removeItem(CART_STORAGE_KEY);
            prevUserRef.current = currentUid;
            return;
        }

        if (user) {
            const docRef = doc(db, "carts", user.uid);
            setDoc(docRef, { items: cart }, { merge: true });
        } else {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        }
    }, [cart, user, loading]);

    /* ----------------- ACTIONS ----------------- */

    const addToCart = (book) => {
        setCart((prev) => {
            const exists = prev.find((i) => i.id === book.id);

            if (!exists) {
                return [
                    ...prev,
                    {
                        id: book.id,
                        title: book.title,
                        price: book.price,
                        coverImageUrl: book.coverImageUrl,
                        qty: 1,
                    },
                ];
            }
            return prev;
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((i) => i.id !== id));
    };

    const updateQty = (id, qty) => {
        if (qty <= 0) return removeFromCart(id);

        setCart((prev) =>
            prev.map((i) => (i.id === id ? { ...i, qty } : i))
        );
    };

    const clearCart = () => setCart([]);

    /* ----------------- HELPERS ----------------- */

    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                addToCart,
                removeFromCart,
                updateQty,
                clearCart,
                totalQty,
                totalPrice,
                loading
            }}
        >
            {children}
        </CartContext.Provider>
    );
};