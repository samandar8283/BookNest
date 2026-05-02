import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../../contexts/BooksContext.jsx";
import placeholderCarouselImage from "/images/placeholder-carousel-image.png";

const MainCarousel = () => {
    const navigate = useNavigate();
    const { getCarouselBooks } = useBooks();
    const carouselBooks = getCarouselBooks();

    useEffect(() => {
        const bootstrap = window.bootstrap;

        if (bootstrap) {
            const element = document.querySelector("#mainCarousel");

            if (element) {
                new bootstrap.Carousel(element, {
                    interval: 6000,
                    ride: "carousel",
                    pause: false,
                    wrap: true
                });
            }
        }
    }, []);

    return (
        <div className="col-12 col-lg-9 ps-md-0 pe-sm-0">
            <div id="mainCarousel" data-bs-ride="carousel" className="carousel carousel-dark slide">
                <div className="carousel-inner">
                    {carouselBooks.map((book, index) => (
                        <div
                            key={book.id}
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                            data-bs-interval="6000"
                        >
                            <div className="carousel-image-wrapper w-100">
                                <img
                                    className={`rounded-3 w-100 h-100 ${book.isPlaceholder ? "cursor-disabled" : "cursor-pointer-custom"}`}
                                    src={book.carouselImageUrl}
                                    alt={book.title}
                                    onClick={() => {
                                        if (!book.isPlaceholder) {
                                            navigate(`/books/details/${book.id}`);
                                        }
                                    }}
                                    onError={(e) => {
                                        e.currentTarget.src = placeholderCarouselImage;
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <button className="main-carousel-control-prev carousel-control-prev carousel-btn-custom rounded-circle cursor-auto-custom" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon w-50 h-50" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="main-carousel-control-next carousel-control-next carousel-btn-custom rounded-circle cursor-auto-custom" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon w-50 h-50" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default MainCarousel;