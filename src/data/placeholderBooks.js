export const PLACEHOLDER_BOOKS = Array.from({ length: 10 }).map((_, i) => ({
    id: `placeholder-${i}`,
    title: "Kitob yuklanmoqda...",
    author: "Muallif",
    price: 0,
    coverImageUrl: "/images/placeholder-book-image.svg",
    carouselImageUrl: "/images/placeholder-carousel-image.png",
    category: "",
    isPlaceholder: true,
}));