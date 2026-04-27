import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useOrder } from "../contexts/OrderContext";
import { useCart } from "../contexts/CartContext";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAlert } from "../contexts/AlertContext";

    const regions = {
        Toshkent: [
            "Yunusobod",
            "Chilonzor",
            "Mirzo Ulug'bek",
            "Yakkasaroy",
        ],
        Samarqand: [
            "Samarqand sh.",
            "Urgut",
            "Kattaqo'rg'on",
        ],
        Andijon: [
            "Andijon sh.",
            "Asaka",
            "Marhamat",
        ],
        Namangan: [
            "Namangan sh.",
            "Chortoq",
            "Pop",
        ],
    };

const Checkout = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [orderInitiated, setOrderInitiated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [appliedPromoCode, setAppliedPromoCode] = useState(null);
    const { user } = useAuth();
    const { startOrder, orderDraft, loading: orderLoading, createOrder } = useOrder();
    const { addAlert } = useAlert();
    const { cart, loading: cartLoading, clearCart } = useCart();
    const items = orderDraft?.items || [];
    const [form, setForm] = useState({
        firstName: user?.displayName?.split(" ")[0] || "",
        lastName: user?.displayName?.split(" ")[1] || "",
        phone: user?.phoneNumber || "",
        region: "",
        district: "",
        address: "",
        deliveryMethod: "post",
        paymentMethod: "payme",
        promoCode: "",
        note: "",
    });

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        if (!user?.displayName) return;

        const parts = user.displayName.split(" ");

        setForm(prev => ({
            ...prev,
            firstName: parts[0] || "",
            lastName: parts.slice(1).join(" ") || "",
            phone: user.phoneNumber || "",
        }));
    }, [user]);


    const summary = useMemo(() => {
        const subtotal = items.reduce(
            (sum, item) => sum + item.price * item.qty,
            0
        );
        const totalQty = items.reduce(
            (sum, item) => sum + item.qty,
            0
        );

        // Delivery price
        let delivery = 0;
        if (form.deliveryMethod === "courier") delivery = 40000;
        if (form.deliveryMethod === "post") delivery = 20000;
        if (form.deliveryMethod === "pickup") delivery = 0;

        // Discount (hozircha oddiy)
        const discount = 0;

        // Promocode discount
        let promocodeDiscount = 0;
        if (appliedPromoCode) {
            promocodeDiscount = Math.min(
                appliedPromoCode.discountPercent / 100 * subtotal,
                appliedPromoCode.maxDiscount
            );
        }

        const total = subtotal - discount - promocodeDiscount + delivery;

        return {
            subtotal,
            totalQty,
            discount,
            promocodeDiscount,
            delivery,
            total,
        };
    }, [items, form.deliveryMethod, appliedPromoCode]);

    const orderPayload = useMemo(() => {
        return {
            items: items.map(item => ({
                id: item.id,
                title: item.title,
                price: item.price,
                qty: item.qty,
                coverImageUrl: item.coverImageUrl,
            })),

            customer: {
                firstName: form.firstName,
                lastName: form.lastName,
                phone: form.phone,
            },

            address: {
                region: form.region,
                district: form.district,
                address: form.address,
            },

            deliveryMethod: form.deliveryMethod,
            paymentMethod: form.paymentMethod,

            promo: appliedPromoCode
                ? {
                    code: appliedPromoCode.code,
                    discount: summary.promoDiscount,
                }
                : null,

            prices: summary,
            note: form.note || null,
        };
    }, [items, form, appliedPromoCode, summary]);

    useEffect(() => {
        const initiateOrder = async () => {
            try {
                if (cartLoading || orderInitiated) return;
                setOrderInitiated(true);

                if (bookId) {
                    const docRef = doc(db, "books", bookId);
                    const snap = await getDoc(docRef);

                    if (!snap.exists()) {
                        addAlert("Kitob topilmadi!", "danger");
                        navigate("/cart", { replace: true });
                        return;
                    }

                    const book = snap.data();

                    startOrder([
                        {
                            id: bookId,
                            title: book.title,
                            price: book.price,
                            qty: 1,
                            coverImageUrl: book.coverImageUrl,
                        },
                    ]);
                    return;
                } else {
                    if (cart.length === 0) {
                        addAlert("Savatcha bo'sh!", "danger");
                        navigate("/cart", { replace: true });
                    } else {
                        startOrder(cart);
                    }
                }
            } catch (error) {
                console.error("Checkout init error:", error);
                addAlert("Buyurtma yaratishda xatolik yuz berdi!", "danger");
                navigate("/cart", { replace: true });
            }
        };
        initiateOrder();
    }, [bookId, cart]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formEl = e.currentTarget;

        if (!formEl.checkValidity()) {
            setValidated(true);
            return;
        }

        try {
            setLoading(true);
            await createOrder(orderPayload);
            clearCart();
            addAlert("Buyurtma muvaffaqiyatli yaratildi!", "success");
            navigate("/profile/orders", { replace: true });
            return;
        } catch (err) {
            console.error(err);
            addAlert("Buyurtma yaratishda xatolik yuz berdi!", "danger");
            return;
        } finally {
            setLoading(false);
        }
    };

    const handleCheckPromoCode = () => {
        if (!form.promoCode) {
            addAlert("Iltimos promokodni kiriting!", "danger");
            return;
        } else if (form.promoCode.toLowerCase() === "promo10") {
            addAlert("Promokod muvaffiyatli qo'llanildi!", "success");
            setAppliedPromoCode({
                code: form.promoCode,
                discountPercent: 10,
                maxDiscount: 50000,
            });
            return;
        }
        addAlert("Promokod topilmadi!", "danger");
        return;
    };
    const updateForm = (key, value) => {
        setForm(prev => {
            if (key === "region") {
                return {
                    ...prev,
                    region: value,
                    district: "",
                };
            }

            return {
                ...prev,
                [key]: value,
            };
        });
    };

    return (
        <div className="container py-3">
            <div className="row">
                <div className="col-12 col-lg-8 col-xl-9 px-2 px-sm-4">
                    <div className="mb-4 row">
                        <div className="col d-flex justify-content-between mx-2 mx-sm-0">
                            <span className="fs-2 fw-bold">Xarid qilish</span>
                        </div>
                        {loading && <div className="text-center mt-4">Buyurtma yaratilmoqda...</div>}
                    </div>
                </div>
            </div>
            <form className={`row needs-validation ${validated ? "was-validated" : ""}`} noValidate onSubmit={handleSubmit}>
                <div className="col-12 col-lg-8 col-xl-9 px-2 px-sm-4">
                    <div className="border border-secondary-subtle rounded-4 px-4 pt-4 pb-5 mb-3">
                        <h5 className="fw-bold mb-3">Shaxsiy ma'lumotlar</h5>

                        <div className="row g-3">
                            <div className="col-12 col-sm-6 col-md-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ismingiz"
                                    value={form.firstName}
                                    onChange={e => updateForm("firstName", e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Iltimos ismingizni kiriting.
                                </div>
                            </div>

                            <div className="col-12 col-sm-6 col-md-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Familiyangiz"
                                    value={form.lastName}
                                    onChange={e => updateForm("lastName", e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Iltimos familiyangizni kiriting.
                                </div>
                            </div>

                            <div className="col-12 col-md-4">
                                <input
                                    type="tel"
                                    pattern="^\+998\d{9}$"
                                    className="form-control"
                                    placeholder="Telefon raqamingiz"
                                    value={form.phone}
                                    onChange={e => updateForm("phone", e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Telefon raqam +998XXXXXXXXX formatida bo'lishi kerak.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border border-secondary-subtle rounded-4 px-4 pt-4 pb-5 mb-3">
                        <h5 className="fw-bold mb-3">Manzilingiz</h5>

                        <div className="row g-3">
                            <div className="col-12 col-sm-6 col-md-4">
                                <select
                                    className="form-select"
                                    value={form.region}
                                    onChange={e => updateForm("region", e.target.value)}
                                    required
                                >
                                    <option value="">Hududni tanlang</option>
                                    {Object.keys(regions).map(region => (
                                        <option key={region} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                                <div className="invalid-feedback">
                                    Iltimos hududingizni tanlang.
                                </div>
                            </div>


                            <div className="col-12 col-sm-6 col-md-4">
                                <select
                                    className="form-select"
                                    value={form.district}
                                    onChange={e => updateForm("district", e.target.value)}
                                    required
                                    disabled={!form.region}
                                >
                                    <option value="">
                                        {form.region ? "Tumanni tanlang" : "Avval hududni tanlang"}
                                    </option>

                                    {form.region &&
                                        regions[form.region].map(district => (
                                            <option key={district} value={district}>
                                                {district}
                                            </option>
                                        ))}
                                </select>

                                <div className="invalid-feedback">
                                    Iltimos tumanni tanlang.
                                </div>
                            </div>


                            <div className="col-12 col-md-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ko'cha, uy raqami"
                                    value={form.address}
                                    onChange={e => updateForm("address", e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Iltimos to'liq manzilingizni kiriting.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border border-secondary-subtle rounded-4 px-4 pt-4 pb-5 mb-3">
                        <h5 className="fw-bold mb-3">Yetkazish usuli</h5>

                        <div className="row g-3">
                            {[
                                { id: "post", label: "Pochta orqali", icon: "📦" },
                                { id: "pickup", label: "Borib olish", icon: "🏬" },
                                { id: "courier", label: "Kuryer orqali", icon: "🚚" },
                            ].map(item => (
                                <div key={item.id} className="col-12 col-sm-6 col-md-4 g-4">
                                    <div
                                        className={`border h-100 rounded-3 px-2 py-3 text-center cursor-pointer ${form.deliveryMethod === item.id ? "border-info bg-info-subtle" : "border-secondary-subtle"
                                            }`}
                                        onClick={() => updateForm("deliveryMethod", item.id)}
                                    >
                                        <div className="d-flex align-items-center justify-content-center">
                                            <span className="fs-2">{item.icon}</span>
                                            <span className="ms-2 fs-5">{item.label}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border border-secondary-subtle rounded-4 px-4 pt-4 pb-5 mb-3">
                        <h5 className="fw-bold mb-3">To'lov usuli</h5>

                        <div className="row g-4">
                            {[
                                { id: "payme", label: "Payme" },
                                { id: "click", label: "Click" },
                                { id: "uzum", label: "Uzum" },
                            ].map(item => (
                                <div key={item.id} className="col-12 col-sm-6 col-md-4">
                                    <div
                                        className={`border rounded-3 px-3 py-4 text-center cursor-pointer ${form.paymentMethod === item.id ? "border-info bg-info-subtle" : "border-secondary-subtle"
                                            }`}
                                        onClick={() => updateForm("paymentMethod", item.id)}
                                    >
                                        <div className="fw-bold">
                                            <span className="fs-2">💳</span>
                                            <span className="ms-2 fs-5">{item.label}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border border-secondary-subtle rounded-4 px-4 pt-4 pb-5 mb-3">
                        <h5 className="fw-bold mb-3">Promokod</h5>

                        <div className="d-flex gap-2">
                            <input
                                type="text"
                                className={`form-control ${validated ? "no-validation" : ""}`}
                                placeholder=""
                                value={form.promoCode}
                                style={{ maxWidth: 400 }}
                                onChange={e => updateForm("promoCode", e.target.value)}
                            />
                            <button
                                className="btn bg-orange-custom"
                                type="button"
                                onClick={handleCheckPromoCode}
                            >Tekshirish</button>
                        </div>
                    </div>
                    <div className="border border-secondary-subtle rounded-4 px-4 pt-4 pb-5 mb-3">
                        <h5 className="fw-bold mb-3">Qo'shimcha izoh</h5>

                        <textarea
                            className="form-control no-validation"
                            rows={6}
                            placeholder="Buyurtma bo'yicha izoh..."
                            value={form.note}
                            onChange={e => updateForm("note", e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-4 col-xl-3 mt-4 mt-sm-0">
                    <div className="bg-light-gray-custom px-3 py-4 rounded-3">
                        <h5 className="fw-bold mb-4">Sizning buyurtmangiz</h5>

                        <div className="d-flex justify-content-between text-muted mb-2">
                            <span>Kitoblar ({summary.totalQty})</span>
                            <span>{summary.subtotal.toLocaleString()} UZS</span>
                        </div>

                        <div className="d-flex justify-content-between text-muted mb-2">
                            <span>Yetkazib berish</span>
                            <span>{summary.delivery.toLocaleString()} UZS</span>
                        </div>
                        <div className="d-flex justify-content-between text-muted mb-2">
                            <span>Chegirma</span>
                            <span>- {summary.discount.toLocaleString()} UZS</span>
                        </div>

                        <div className="d-flex justify-content-between text-muted mb-3">
                            <span>Promokod</span>
                            <span>- {summary.promocodeDiscount.toLocaleString()} UZS</span>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between mb-3">
                            <span className="fw-bold">Jami</span>
                            <span className="fw-bold fs-5">
                                {summary.total.toLocaleString()} UZS
                            </span>
                        </div>

                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" value="" id="checkDefault" checked={acceptTerms} onChange={() => setAcceptTerms(!acceptTerms)} />
                                <label className="form-check-label" htmlFor="checkDefault">
                                    <Link className="text-dark" to="/terms">Qoidalarga</Link> roziman
                                </label>
                        </div>

                        <button className="btn bg-orange-custom w-100 py-2 fw-bold"
                            type="submit"
                            disabled={!acceptTerms}
                            onClick={() => navigate("/cart/checkout")}
                        >
                            Xarid qilish
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Checkout;