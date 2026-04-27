import { Children, createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "./AuthContext";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    const { user } = useAuth();
    const [orders, SetOrders] = useState([]);
    const [orderDraft, setOrderDraft] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        if (!user) {
            SetOrders([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        const q = query(
            collection(db, "orders"),
            where("userId", "==", user.uid)
        );

        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        SetOrders(data);
        setLoading(false);
    };

    const startOrder = (items) => {
        setOrderDraft({ items });
    }

    const createOrder = async (payload) => {
        if (!user || !orderDraft) return;

        await addDoc(collection(db, "orders"), {
            userId: user.uid,
            ...payload,
            status: "pending",
            createdAt: serverTimestamp(),
        });

        setOrderDraft(null);
        await fetchOrders();
    };

    useEffect(() => {
        fetchOrders();
    }, [user]);

    return (
        <OrderContext.Provider
            value={{
                orders,
                loading,
                orderDraft,
                startOrder,
                createOrder,
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}