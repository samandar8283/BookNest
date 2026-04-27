import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "./AuthContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const FavoriteContext = createContext();

export const useFavorite = () => useContext(FavoriteContext);

const FAVORITES_STORAGE_KEY = "booknest_favorite";

export const FavoriteProvider = ({ children }) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const prevUserRef = useRef(null);

    useEffect(() => {
        const loadFavorites = async () => {
            setLoading(true);

            if (user) {
                const docRef = doc(db, "favorites", user.uid);
                const snap = await getDoc(docRef);

                if (snap.exists()) {
                    setFavorites(snap.data().items || []);
                } else {
                    setFavorites([]);
                }
            } else {
                const localFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
                setFavorites(localFavorites ? JSON.parse(localFavorites) : []);
            }

            setLoading(false);
            prevUserRef.current = user?.uid ?? null;
        };

        loadFavorites();
    }, [user]);

    useEffect(() => {
        if (loading) return;

        const syncFavorites = async () => {
            const uid = user?.uid ?? null;

            // 🔹 user o'zgarganmi?
            if (prevUserRef.current !== uid) {
                prevUserRef.current = uid;

                // 🔹 login bo'ldi → local → firestore merge
                if (user) {
                    const localFavStr = localStorage.getItem(FAVORITES_STORAGE_KEY);
                    const localFav = localFavStr ? JSON.parse(localFavStr) : [];

                    const docRef = doc(db, "favorites", user.uid);
                    const snap = await getDoc(docRef);
                    const firestoreFav = snap.exists() ? snap.data().items || [] : [];

                    // 🔥 id bo'yicha merge (NO DUPLICATE)
                    const map = new Map();
                    [...firestoreFav, ...localFav].forEach(item => {
                        map.set(item.id, item);
                    });

                    const merged = Array.from(map.values());

                    await setDoc(docRef, { items: merged }, { merge: true });
                    localStorage.removeItem(FAVORITES_STORAGE_KEY);
                    setFavorites(merged);
                }

                return; // ⛔ shu effect shu joyda to'xtaydi
            }

            // 🔹 oddiy sync (user o'zgarmagan payt)
            if (user) {
                const docRef = doc(db, "favorites", user.uid);
                await setDoc(docRef, { items: favorites }, { merge: true });
            } else {
                localStorage.setItem(
                    FAVORITES_STORAGE_KEY,
                    JSON.stringify(favorites)
                );
            }
        };

        syncFavorites();
    }, [favorites, user, loading]);



    const addToFavorites = (book) => {
        setFavorites((prev) => {
            const exists = prev.find((i) => i.id === book.id);

            if (!exists) {
                return [
                    ...prev,
                    {
                        id: book.id,
                        title: book.title,
                        price: book.price,
                        coverImageUrl: book.coverImageUrl,
                    }
                ]
            }
            return prev;
        });
    };

    const removeFromFavorites = (id) => {
        setFavorites((prev) => prev.filter((i) => i.id !== id));
    };

    const toggleFavorite = (book) => {
        setFavorites((prev) => {
            const exists = prev.some((i) => i.id === book.id);

            if (exists) {
                return prev.filter((i) => i.id !== book.id);
            }

            return [
                ...prev,
                {
                    id: book.id,
                    title: book.title,
                    price: book.price,
                    coverImageUrl: book.coverImageUrl,
                }
            ]
        });
    };

    const isFavorite = (id) => {
        if (!Array.isArray(favorites)) return false;
        return favorites.some((item) => item.id === id);
    };

    return (
        <FavoriteContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                toggleFavorite,
                isFavorite,
                loading,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};