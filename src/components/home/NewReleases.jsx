import { useBooks } from "../../contexts/BooksContext.jsx";
import BookCard from "../books/BookCard.jsx";
import BookCardSkeleton from "../books/BookCardSkeleton.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function NewReleases() {
    const { books, loading } = useBooks();
    return (
        <section className="new-releases bg-light-gray-custom py-5">
            <div className="container p-0">
                <div className="new-releases-title ms-2 px-3 py-3 mb-3 fs-6 fw-normal rounded-3 border-0">Yangi nashrlar</div>
                <div className="row ps-2 pe-0 m-0 g-2 position-relative">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={16}
                        speed={800}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={books.length > 5}
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        992: {
                            slidesPerView: 4,
                        },
                        1200: {
                            slidesPerView: 5,
                        },
                    }}
                    >
                    {loading &&
                        Array.from({ length: 10 }).map((_, i) => (
                            <SwiperSlide key={i}>
                                <div className="new-releases-cards">
                                    <BookCardSkeleton />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                    {!loading && books
                        .filter(book => book.year === 2025 || book.year === 2024 || book.isPlaceholder)
                        .slice(0, 20)
                        .map(book => (
                            <SwiperSlide key={book.id}>
                                <div
                                    key={book.id}
                                    className="new-releases-cards"
                                    onClick={() => navigate(`/books/details/${book.id}`)}
                                >
                                    <BookCard
                                        book={book}
                                        id={book.id}
                                        title={book.title}
                                        author={book.author}
                                        price={book.price}
                                        coverImageUrl={book.coverImageUrl}
                                        isPlaceholder={book.isPlaceholder}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
                <div className="swiper-buttons">
                    <div className="swiper-button-prev">
                        <svg className="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path></svg>
                    </div>
                    <div className="swiper-button-next">
                        <svg className="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path></svg>
                    </div>
                </div>
            </div>
        </div>
        </section >
    );
}

export default NewReleases;