import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAlert } from "../../contexts/AlertContext";
import OrderStatusTimeline from "./OrderStatusTimeline";

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
        case "paid": return "To‘langan";
        case "processing": return "Qayta ishlanmoqda";
        case "shipped": return "Yetkazilmoqda";
        case "delivered": return "Yetkazildi";
        case "cancelled": return "Bekor qilindi";
        default: return "Noma’lum";
    }
};

const OrderDetails = () => {
    const { orderId } = useParams();
    const { addAlert } = useAlert();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paying, setPaying] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "orders", orderId);
                const snap = await getDoc(docRef);

                if (snap.exists()) {
                    setOrder({ id: snap.id, ...snap.data() });
                } else {
                    setOrder(null);
                }
            } catch (err) {
                console.error(err);
                setOrder(null);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    const handleFakePayment = async () => {
        try {
            setPaying(true);
            const docRef = doc(db, "orders", orderId);

            await updateDoc(docRef, {
                status: "paid",
                paidAt: serverTimestamp(),
            });

            setOrder(prev => ({ ...prev, status: "paid" }));
            addAlert("To‘lov muvaffaqiyatli amalga oshirildi!", "success");
        } catch (err) {
            console.error(err);
            addAlert("To‘lovda xatolik yuz berdi!", "danger");
        } finally {
            setPaying(false);
        }
    };

    if (loading) return <div className="container">
        <h4 className="fw-bold mt-3 mt-lg-0">
            Buyurtma #{orderId}
        </h4>
        <p>Yuklanmoqda...</p>
    </div>;
    if (!order) return <p>Buyurtma topilmadi</p>;

    return (
        <div className="container">
            {/* HEADER */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mt-3 mt-lg-0">
                        Buyurtma #{order.id}
                    </h4>
                    <span className={`badge bg-${statusColor(order.status)}`}>
                        {statusText(order.status)}
                    </span>
                </div>

                <div className="text-end">
                    <div className="text-muted">
                        {new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}
                    </div>
                    <div className="fw-bold fs-5">
                        {order.prices?.total} so‘m
                    </div>
                </div>
            </div>
            {/* STATUS TIMELINE */}
            <OrderStatusTimeline status={order.status} />
            <div className="row g-4">
                {/* LEFT */}
                <div className="col-12 col-lg-8">

                    {/* ITEMS */}
                    <div className="card mb-4">
                        <div className="card-header fw-bold">
                            Buyurtmadagi mahsulotlar
                        </div>
                        <div className="card-body">
                            {order.items.map(item => (
                                <div
                                    key={item.id}
                                    className="d-flex align-items-center mb-3"
                                >
                                    <img
                                        src={item.coverImageUrl}
                                        alt={item.title}
                                        style={{ width: 60, height: 80, objectFit: "cover", objectPosition: "top" }}
                                        className="rounded me-3"
                                        onError={(e) => {
                                            e.currentTarget.src = "/images/placeholder-book-image.svg";
                                        }}
                                    />

                                    <div className="flex-grow-1">
                                        <div className="fw-semibold">
                                            {item.title}
                                        </div>
                                        <div className="text-muted">
                                            {item.price} so‘m × {item.qty}
                                        </div>
                                    </div>

                                    <div className="fw-bold">
                                        {item.price * item.qty} so‘m
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CUSTOMER */}
                    <div className="card mb-4">
                        <div className="card-header fw-bold">
                            Mijoz ma’lumotlari
                        </div>
                        <div className="card-body">
                            <div>
                                {order.customer.firstName} {order.customer.lastName}
                            </div>
                            <div className="text-muted">
                                {order.customer.phone}
                            </div>
                        </div>
                    </div>

                    {/* ADDRESS */}
                    <div className="card mb-4">
                        <div className="card-header fw-bold">
                            Yetkazib berish manzili
                        </div>
                        <div className="card-body">
                            <div>{order.address.region}</div>
                            <div>{order.address.district}</div>
                            <div className="text-muted">
                                {order.address.address}
                            </div>
                        </div>
                    </div>

                    {/* NOTE */}
                    {order.note && (
                        <div className="card">
                            <div className="card-header fw-bold">
                                Izoh
                            </div>
                            <div className="card-body">
                                {order.note}
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT */}
                <div className="col-12 col-lg-4">
                    <div className="card mb-4">
                        <div className="card-header fw-bold">
                            Buyurtma xulosasi
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-2">
                                <span>Mahsulotlar</span>
                                <span>{order.prices.subtotal} so‘m</span>
                            </div>

                            {order.promo && (
                                <div className="d-flex justify-content-between mb-2 text-success">
                                    <span>Promo ({order.promo.code})</span>
                                    <span>-{order.promo.discount} so‘m</span>
                                </div>
                            )}

                            <div className="d-flex justify-content-between mb-2">
                                <span>Yetkazib berish</span>
                                <span>{order.prices.delivery} so‘m</span>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between fw-bold fs-5">
                                <span>Jami</span>
                                <span>{order.prices.total} so‘m</span>
                            </div>
                        </div>
                    </div>

                    {/* FAKE PAYMENT */}
                    {order.status === "pending" && (
                        <div className="card">
                            <div className="card-header fw-bold text-center">
                                Fake to‘lov
                            </div>
                            <div className="card-body text-center">
                                <button
                                    className="btn btn-success w-100"
                                    onClick={handleFakePayment}
                                    disabled={paying}
                                >
                                    {paying ? "To‘lanmoqda..." : "To‘lovni tasdiqlash"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;