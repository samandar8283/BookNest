import { createContext, useContext, useEffect, useState } from "react";
import { getAllBooks } from "../services/bookService";
import { PLACEHOLDER_BOOKS } from "../data/placeholderBooks";

const BooksContext = createContext();

export function BooksProvider({ children }) {
    const [books, setBooks] = useState(PLACEHOLDER_BOOKS);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getAllBooks()
            .then(data => {
                setBooks(data.length ? data : PLACEHOLDER_BOOKS);
            })
            .catch(() => {
                setBooks(PLACEHOLDER_BOOKS);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, []);

    const getCarouselBooks = () =>
        books.filter(b => b.carouselImageUrl);

    return (
        <BooksContext.Provider
            value={{
                books,
                loading,
                error,
                getCarouselBooks,
            }}
        >
            {children}
        </BooksContext.Provider>
    );
}

export const useBooks = () => useContext(BooksContext);