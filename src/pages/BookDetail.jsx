import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useCart } from "../contexts/CartContext";
import { useAlert } from "../contexts/AlertContext";
import { useFavorite } from "../contexts/FavoriteContext";
import { BsHeart, BsHeartFill, BsBag } from "react-icons/bs";
import placeholderImage from "/images/placeholder-book-image.svg";

function BookDetail() {
    const { bookId } = useParams();
    const { addToCart, cart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorite();
    const { addAlert } = useAlert();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const handleAddToCart = () => {
        const exists = cart.find((i) => i.id === book.id);
        if (exists) {
            addAlert("Kitob savatda mavjud!", "danger");
        } else {
            addToCart(book)
            addAlert("Kitob savatga muvaffaqiyatli qo'shildi!", "success");
        }
    }
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const docRef = doc(db, "books", bookId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setBook({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("Kitob topilmadi!");
                }
            } catch (err) {
                console.error("Kitobni olishda xato:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [bookId]);
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    if (loading) return <p className="text-center mt-5">Yuklanmoqda...</p>;
    if (!book) return <p className="text-center mt-5 text-danger">Kitob topilmadi!</p>;

    return (
        <div className="container my-5">
            <div className="row g-4">
                <div className="col-md-5">
                    <div className="border rounded p-2 book-info-img-wrapper position-relative">
                        <img
                            src={book.coverImageUrl}
                            alt={book.title}
                            className="img-fluid rounded"
                            onError={(e) => {
                                e.currentTarget.src = placeholderImage;
                            }}
                        />
                        <div className="favorite-card-button position-absolute">
                            <button
                                className="btn rounded-circle bg-white p-0 smooth-transition"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(book);
                                }}
                            >
                                {isFavorite(book.id) ? <BsHeartFill size={20} color="red" /> : <BsHeart size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-7 px-4 px-md-0">
                    <h2 className="fw-bold">{book.title}</h2>
                    <p className="text-muted">by {book.author}</p>
                    <h4 className="text-orange-custom fw-bold">{book.price.toLocaleString()} UZS</h4>

                    <ul className="book-info-list">
                        <li>
                            <span className="text-secondary">ISBN</span>
                            <span className="border-secondary"></span>
                            <span>{book.isbn}</span>
                        </li>
                        <li>
                            <span className="text-secondary">Yozuvi</span>
                            <span className="border-secondary"></span>
                            <span>{book.writingSystem}</span>
                        </li>
                        <li>
                            <span className="text-secondary">Yili</span>
                            <span className="border-secondary"></span>
                            <span>{book.year}</span>
                        </li>
                        <li>
                            <span className="text-secondary">Tili</span>
                            <span className="border-secondary"></span>
                            <span>{book.language}</span>
                        </li>
                        <li>
                            <span className="text-secondary">Sahifalar soni</span>
                            <span className="border-secondary"></span>
                            <span>{book.pages}</span>
                        </li>
                        <li>
                            <span className="text-secondary">Nashriyot</span>
                            <span className="border-secondary"></span>
                            <span>{book.publisher}</span>
                        </li>
                        <li>
                            <span className="text-secondary">Muqova turi</span>
                            <span className="border-secondary"></span>
                            <span>{book.coverType}</span>
                        </li>
                        <li>
                            <span className="text-secondary">Kategoriya</span>
                            <span className="border-secondary"></span>
                            <span>{book.category}</span>
                        </li>
                        <li>
                            <span className="text-secondary">Tarjimon</span>
                            <span className="border-secondary"></span>
                            <span>{book.translator || "-"}</span>
                        </li>
                    </ul>

                    <div className="d-flex mt-3">
                        <button
                            className="btn active bg-orange-custom d-flex py-2 px-3 me-4 align-items-center gap-2"
                            onClick={() => handleAddToCart(book)}
                        >
                            <BsBag size={20} className="" />
                            <span>Savatga qo'shish</span>
                        </button>
                        <button 
                            className="btn border-orange-custom py-2 px-3"
                            onClick={() => navigate(`/cart/checkout/${book.id}`)}
                        >
                            Tezkor sotib olish
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <div className="mt-4">
                    <ul className="nav nav-pills mb-3 gap-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link border border-secondary active" id="pills-book-info" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Ma'lumot</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link border border-secondary" id="pills-book-comment" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Izohlar</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link border border-secondary" id="pills-book-quotation" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Iqtiboslar</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane p-3 rounded-4 fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-book-info" tabIndex="0">
                            <h4 className="fw-bolder">Kitob haqida</h4>
                            <p>{book.description || "Kitob haqida ma'lumot mavjud emas."}</p>
                        </div>
                        <div className="tab-pane p-3 rounded-4 fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-book-comment" tabIndex="0">
                            <h4 className="fw-bolder">Kitob haqida</h4>
                            <p>{book.description || "Kitob haqida ma'lumot mavjud emas."}</p>
                        </div>
                        <div className="tab-pane p-3 rounded-4 fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-book-quotation" tabIndex="0">
                            <h4 className="fw-bolder">Kitob haqida</h4>
                            <p>{book.description || "Kitob haqida ma'lumot mavjud emas."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetail;