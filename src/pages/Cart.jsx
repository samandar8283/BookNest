import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";
import AuthModal from "../components/auth/AuthModal";
import { useFavorite } from "../contexts/FavoriteContext";
import { BsTrash, BsHeart, BsDash, BsPlus, BsXLg } from "react-icons/bs";

function CartPage() {
    const { cart, removeFromCart, clearCart, updateQty, totalQty, totalPrice, loading } = useCart();
    const { user } = useAuth();
    const { addAlert } = useAlert();
    const { toggleFavorite, isFavorite } = useFavorite();
    const [authOpen, setAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState("");
    const navigate = useNavigate();
    const deliveryPrice = 20000;
    const discount = 0;
    const payment = totalPrice + deliveryPrice - discount;
    if (loading) {
        return (
            <div className="container py-3">
                <div className="row">
                    <div className="col-12 col-lg-8 col-xl-9 px-2 px-sm-4">
                        <div className="mb-4 row">
                            <div className="col d-flex justify-content-between mx-2 mx-sm-0">
                                <span className="fs-2 fw-bold">Savatcha</span>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-center">Yuklanmoqda...</p>
            </div>
        )
    }
    if (cart.length === 0) {
        return (
            <div className="container py-3">
                <div className="row">
                    <div className="col-12 col-lg-8 col-xl-9 px-2 px-sm-4">
                        <div className="mb-4 row">
                            <div className="col d-flex justify-content-between mx-2 mx-sm-0">
                                <span className="fs-2 fw-bold">Savatcha</span>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-center">Hozircha savatga hech narsa qo'shilmagan.</p>
            </div>
        );
    }

    return (
        <div className="container py-3">
            <div className="row">
                <div className="col-12 col-lg-8 col-xl-9 px-2 px-sm-4">
                    <div className="mb-4 row">
                        <div className="col d-flex justify-content-between mx-2 mx-sm-0">
                            <span className="fs-2 fw-bold">Savatcha</span>
                            <button
                                className="btn btn-danger w-auto px-3"
                                onClick={clearCart}
                            >
                                Savatni tozalash
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-8 col-xl-9 px-2 px-sm-4">
                    <div className="row row-cols-2 row-cols-sm-1 g-3">
                        {cart.map((book) => (
                            <div key={book.id} className="col mb-0 mb-sm-3">
                                <div className="cart-card bg-light-gray-custom rounded rounded-3 h-100 px-3 py-3 ps-sm-3 pe-sm-2 position-relative">
                                    <div className="row h-100 flex-column flex-sm-row">
                                        <div className="col-9 mx-auto col-sm-2 px-0 px-md-3 px-lg-2 px-xl-3 px-xxl-4 mb-3 mb-sm-0">
                                            <img
                                                src={book.coverImageUrl}
                                                alt={book.title}
                                                onError={(e) => {
                                                    e.currentTarget.src = "/images/placeholder-book-image.svg";
                                                }}
                                                className="img-fluid rounded"
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-7 mb-3 mb-sm-0 flex-grow-1 d-flex flex-column justify-content-between">
                                            <div>
                                                <h4 className="mb-1 fw-bold">{book.title}</h4>
                                                <p className="text-muted m-0">Narx: {book.price.toLocaleString()} UZS</p>
                                            </div>
                                            <div className="d-none d-sm-block">
                                                <button
                                                    className={`btn border-orange-custom bg-orange-hover-custom btn-sm px-3 py-2 me-3 ${isFavorite(book.id) ? "bg-orange-custom" : "text-dark"}`}
                                                    onClick={() => toggleFavorite(book)}
                                                >
                                                    <BsHeart size={20} />
                                                    <span className="ms-2 d-none d-md-inline-block">Sevimlilarga</span>
                                                </button>
                                                <button
                                                    className="btn btn-outline-danger btn-sm px-3 py-2"
                                                    onClick={() => removeFromCart(book.id)}
                                                >
                                                    <BsTrash />
                                                    <span className="ms-2">O'chirish</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4 col-md-3 d-flex flex-column justify-content-between text-center text-sm-end">
                                            <h4 className="fw-bold">{(book.price * book.qty).toLocaleString()} UZS</h4>
                                            <div className="align-self-center align-self-sm-end d-flex align-items-center justify-content-between bg-light px-2 py-1 rounded" style={{ width: 150 }}>
                                                <button
                                                    className="btn p-0 bg-info rounded-circle"
                                                    onClick={() => updateQty(book.id, book.qty - 1)}
                                                >
                                                    <BsDash size={24} />
                                                </button>
                                                <span className="fs-5 fw-bold">{book.qty}</span>
                                                <button
                                                    className="btn p-0 bg-info rounded-circle"
                                                    onClick={() => updateQty(book.id, book.qty + 1)}
                                                >
                                                    <BsPlus size={24} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cart-remove-button position-absolute d-block d-sm-none">
                                        <button
                                            className="btn px-2 rounded-circle bg-white"
                                            onClick={() => removeFromCart(book.id)}
                                        >
                                            <BsXLg size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-12 col-lg-4 col-xl-3 mt-4 mt-sm-0">
                    <div className="bg-light-gray-custom px-3 py-4 rounded-3">
                        <h5 className="fw-bold mb-4">Sizning buyurtmangiz</h5>

                        <div className="d-flex justify-content-between text-muted mb-2">
                            <span>Kitoblar ({totalQty})</span>
                            <span>{totalPrice.toLocaleString()} UZS</span>
                        </div>

                        <div className="d-flex justify-content-between text-muted mb-2">
                            <span>Yetkazib berish</span>
                            <span>{deliveryPrice.toLocaleString()} UZS</span>
                        </div>

                        <div className="d-flex justify-content-between text-muted mb-3">
                            <span>Chegirma</span>
                            <span>- {discount.toLocaleString()} UZS</span>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between mb-4">
                            <span className="fw-bold">Jami</span>
                            <span className="fw-bold fs-5">
                                {payment.toLocaleString()} UZS
                            </span>
                        </div>

                        <button className="btn bg-orange-custom w-100 py-2 fw-bold"
                            onClick={() => {
                                if (!user) {
                                    setAuthMode("login");
                                    setAuthOpen(true);
                                    addAlert("Iltimos, buyurtma berish uchun tizimga kiring yoki ro'yxatdan o'ting.", "danger");
                                    return;
                                }
                                navigate("/cart/checkout");
                                return;
                            }}
                        >
                            Buyurtma berish
                        </button>
                    </div>
                </div>
            </div>
            <AuthModal
                open={authOpen}
                mode={authMode}
                onClose={() => setAuthOpen(false)}
            />
        </div>
    );
}

export default CartPage;