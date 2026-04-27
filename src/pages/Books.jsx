import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useBooks } from "../contexts/BooksContext.jsx";
import BookCard from "../components/books/BookCard.jsx";
import BookCardSkeleton from "../components/books/BookCardSkeleton.jsx";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination.jsx";

function Books() {
    const { books, loading, error } = useBooks();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const booksPerPage = Number(searchParams.get("limit")) || 12;
    const totalBooks = books.length;
    const totalPages = Math.ceil(totalBooks / booksPerPage);
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const paginatedBooks = books.slice(startIndex, endIndex);
    const perPageOptions = [12, 24, 36];

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [currentPage, booksPerPage]);

    const updateParams = (page, limit = booksPerPage) => {
        setSearchParams({
            page,
            limit,
        });
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-3 pe-2 h-100 d-none d-md-block">
                    <Categories />
                </div>
                <div className="col-12 col-md-9">
                    <h3 className="fw-bolder mb-2 mb-md-4">Kitoblar</h3>
                    <div className="per-page-buttons mb-4 text-end">
                        <span className="d-inline-block">Ko'rsatish</span>
                        {perPageOptions.map((count) => (
                            <button
                                key={count}
                                onClick={() => {
                                    updateParams(1, count)
                                }}
                                className={`btn border ms-2 ${count === booksPerPage ? "active bg-orange-custom" : "btn-custom-hover"}`}
                            >
                                {count}
                            </button>
                        ))}
                    </div>
                    {loading && (
                        <div className="skeleton-wrapper position-relative">
                            <p className="text-muted mb-2 position-absolute books-loading-text">Kitoblar yuklanmoqda...</p>
                            <div className="row row-cols-2 row-cols-sm-3 row-cols-xl-4 align-items-stretch g-2 g-sm-3">
                                {Array.from({ length: booksPerPage }).map((_, i) => (
                                    <div key={i} className="col">
                                        <BookCardSkeleton />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {error && (
                        <p>Kitoblarni yuklashda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.</p>
                    )}
                    <div className="row row-cols-2 row-cols-sm-3 row-cols-xl-4 align-items-stretch g-2 g-sm-3">
                        {!loading && !error && (
                            paginatedBooks.map(book => (
                                <div key={book.id} className="col">
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
                            ))
                        )}
                    </div>
                    {!loading && !error && totalPages > 1 && <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={updateParams}
                    />}
                </div>
            </div>
        </div>
    );
}

export default Books;