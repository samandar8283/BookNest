import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useFavorite } from "../../contexts/FavoriteContext";
import { useAlert } from "../../contexts/AlertContext";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import placeholderImage from "/images/placeholder-book-image.svg";

function BookCard({ book, id, title, author, price, coverImageUrl, isPlaceholder }) {
    const navigate = useNavigate();
    const { addToCart, cart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorite();
    const { addAlert } = useAlert();
    const handleAddToCart = () => {
        const exists = cart.find((i) => i.id === book.id);
        if (exists) {
            addAlert("Kitob savatda mavjud!", "danger");
        } else {
            addToCart(book)
            addAlert("Kitob savatga muvaffaqiyatli qo'shildi!", "success");
        }
    }
    return (
        <div
            className={`book-card card ${isPlaceholder ? "cursor-disabled" : "cursor-pointer-custom"} p-2 h-100`}
            onClick={() => {
                if (!isPlaceholder) {
                    navigate(`/books/details/${id}`);
                }
            }}
        >
            <img
                src={coverImageUrl}
                className="card-img-top rounded-2"
                alt={title}
                onError={(e) => {
                    e.currentTarget.src = placeholderImage;
                }}
            />

            <div className="card-body d-flex flex-column">
                <h6 className="card-title fs-5 fw-bold mb-1 text-truncate">{title}</h6>
                <p className="text-muted small mb-2 text-truncate">{author}</p>

                <div className="mt-auto fw-bold text-orange-custom mb-2">
                    {price.toLocaleString()} UZS
                </div>
                <div className="row align-items-center g-3">
                    <div className="col-9 ps-0 p-xxl-0">
                        <button
                            type="button"
                            className="btn bg-orange-custom px-3 py-2 fs-custom-14 smooth-transition"
                            onClick={e => {
                                e.stopPropagation();
                                navigate(`/cart/checkout/${id}`);
                            }}
                        >
                            Tezkor sotib olish
                        </button>
                    </div>
                    <div className="col-3 px-0 text-end">
                        <button type="button"
                            className="btn shopping-card-button pt-1 pb-2 px-2 align-top rounded-circle smooth-transition"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(book);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-bag" viewBox="0 0 16 16">
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                            </svg>
                        </button>
                    </div>
                </div>
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
    );
}

export default BookCard;