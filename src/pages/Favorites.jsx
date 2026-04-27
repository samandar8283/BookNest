import { useFavorite } from "../contexts/FavoriteContext";
import BookCard from "../components/books/BookCard";

function Favorites() {
    const { favorites, loading } = useFavorite();
    if (loading) {
        return (
            <div className="container py-3">
                <h3 className="mb-3 fw-bold">Sevimlilar</h3>
                <p className="text-center">Yuklanmoqda...</p>
            </div>
        )
    }
    if (favorites.length === 0) {
        return (
            <div className="container py-3">
                <h3 className="mb-3 fw-bold">Sevimlilar</h3>
                <p className="text-center">Hozircha sevimlilarga hech narsa qo'shilmagan.</p>
            </div>
        );
    }
    return <>
        <div className="container py-3">
            <h3 className="mb-3 fw-bold">Sevimlilar</h3>
            <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 row-cols-xl-5 g-3">
                {favorites.map((book) => (
                    <div key={book.id} className="col">
                        <BookCard
                            book={book}
                            id={book.id}
                            title={book.title}
                            author={book.author}
                            price={book.price}
                            coverImageUrl={book.coverImageUrl}
                            isPlaceholder={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    </>
}

export default Favorites;