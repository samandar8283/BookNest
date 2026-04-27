import { useBooks } from "../../contexts/BooksContext.jsx";
import BookCard from "../books/BookCard.jsx";
import BookCardSkeleton from "../books/BookCardSkeleton.jsx";

function YangiAsrAvlodi() {
    const { books, loading } = useBooks();
    return (
        <section className="yangi-asr-avlodi bg-light-gray-custom py-5">
            <div className="container-fluid">
                <div className="container p-0">
                    <div className="yangi-asr-avlodi-title ms-2 px-3 py-3 mb-3 fs-6 fw-normal rounded-3 border-0">"Yangi asr kutubxonasi"</div>
                    <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 row-cols-xl-5 ps-2 pe-0 m-0 g-2">
                        {loading &&
                            Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} className="new-book-cards">
                                    <BookCardSkeleton />
                                </div>
                            ))
                        }
                        {!loading && books
                            .filter(book => book.publisher === "Yangi asr avlodi" || book.isPlaceholder)
                            .slice(0, 10)
                            .map(book => (
                                <div key={book.id} className="new-book-cards">
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
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default YangiAsrAvlodi;