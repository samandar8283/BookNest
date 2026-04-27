import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

const statusColor = (status) => {
    switch (status) {
        case "pending": return "secondary";
        case "paid": return "primary";
        case "processing": return "warning";
        case "shipped": return "info";
        case "delivered": return "success";
        case "cancelled": return "danger";
        default: return "secondary";
    }
};
const statusText = (status) => {
    switch (status) {
        case "pending": return "Kutilmoqda";
        case "paid": return "To'langan";
        case "processing": return "Qayta ishlanmoqda";
        case "shipped": return "Yetkazilmoqda";
        case "delivered": return "Yetkazildi";
        case "cancelled": return "Bekor qilindi";
        default: return "Noma'lum";
    }
};
const statusTabs = [
    { key: "all", label: "Barchasi" },
    { key: "pending", label: "Kutilmoqda" },
    { key: "paid", label: "To'langan" },
    { key: "processing", label: "Qayta ishlanmoqda" },
    { key: "shipped", label: "Yetkazilmoqda" },
    { key: "delivered", label: "Yetkazildi" },
    { key: "cancelled", label: "Bekor qilindi" },
];

const OrdersList = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeStatus, setActiveStatus] = useState("all");

    useEffect(() => {
        if (!user) return;

        const fetchOrders = async () => {
            setLoading(true);

            const q = query(
                collection(db, "orders"),
                where("userId", "==", user.uid),
                orderBy("createdAt", "desc")
            );

            const snap = await getDocs(q);

            const list = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setOrders(list);
            setLoading(false);
        };

        fetchOrders();
    }, [user]);

    const filteredOrders = activeStatus === "all"
        ? orders
        : orders.filter(order => order.status === activeStatus);

    if (loading) return <div>
        <h4 className="fw-bold mb-4 mt-3 mt-lg-0">
            Mening buyurtmalarim
        </h4>
        <div className="mb-3 d-flex flex-wrap gap-2">
            {statusTabs.map(tab => (
                <button
                    key={tab.key}
                    className={`btn btn-sm ${activeStatus === tab.key ? "bg-orange-custom" : "btn-outline-secondary"
                        }`}
                    onClick={() => setActiveStatus(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
        <p className="text-center">Yuklanmoqda...</p>
    </div>;

    if (!orders.length) {
        return <div>
            <h4 className="fw-bold mb-4 mt-3 mt-lg-0">
                Mening buyurtmalarim
            </h4>
            <div className="mb-3 d-flex flex-wrap gap-2">
                {statusTabs.map(tab => (
                    <button
                        key={tab.key}
                        className={`btn btn-sm ${activeStatus === tab.key ? "bg-orange-custom" : "btn-outline-secondary"
                            }`}
                        onClick={() => setActiveStatus(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <p className="text-center">Hali buyurtmalar yo'q</p>
        </div>;
    }

    return (
        <div>
            <h4 className="fw-bold mb-4 mt-3 mt-lg-0">
                Mening buyurtmalarim
            </h4>
            <div className="mb-3 d-flex gap-2 overflow-auto pb-3 pe-3">
                {statusTabs.map(tab => (
                    <button
                        key={tab.key}
                        className={`btn btn-sm text-nowrap ${activeStatus === tab.key ? "bg-orange-custom" : "btn-outline-secondary"
                            }`}
                        onClick={() => setActiveStatus(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="row row-cols-1 row-cols-md-2 g-3">
                {filteredOrders.map(order => (
                    <div key={order.id} className="col">
                        <div
                            className={`h-100 order-card d-flex justify-content-between px-3 py-4 border rounded-3 cursor-pointer-custom bg-${statusColor(order.status)}-subtle border-${statusColor(order.status)}`}
                            onClick={() => navigate(`/profile/orders/${order.id}`)}
                        >
                            <div className="flex-grow-1 order-id">
                                <div className="fw-bold fs-5 text-truncate">
                                    #{order.id}
                                </div>
                                <div>
                                    {new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="text-end">
                                <div className="fw-bold fs-5">{order.prices.total} so'm</div>
                                <span className={`badge bg-${statusColor(order.status)}`}>
                                    {statusText(order.status)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersList;