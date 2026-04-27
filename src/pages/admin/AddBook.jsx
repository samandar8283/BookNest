import { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabaseClient.js";
import categories from "../../data/categories.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../../firebase/config.js";
import { useAlert } from "../../contexts/AlertContext.jsx";

function AddBook() {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [isbn, setIsbn] = useState("");
    const [writingSystem, setWritingSystem] = useState("");
    const [year, setYear] = useState("");
    const [language, setLanguage] = useState("");
    const [pages, setPages] = useState("");
    const [publisher, setPublisher] = useState("");
    const [coverType, setCoverType] = useState("");
    const [translator, setTranslator] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [carouselImage, setCarouselImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { addAlert } = useAlert();
    const db = getFirestore(app);
    
    const validate = () => {
        const newErrors = {};

        if (!title.trim()) newErrors.title = true;
        if (!author.trim()) newErrors.author = true;
        if (!price || price <= 0) newErrors.price = true;
        if (!isbn.trim()) newErrors.isbn = true;
        if (!writingSystem.trim()) newErrors.writingSystem = true;
        if (!year || year <= 0) newErrors.year = true;
        if (!language.trim()) newErrors.language = true;
        if (!pages || pages <= 0) newErrors.pages = true;
        if (!publisher.trim()) newErrors.publisher = true;
        if (!coverType) newErrors.coverType = true;
        if (!category) newErrors.category = true;
        if (!image) newErrors.image = true;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function uploadToSupabase(file, folder) {
        if (!file) return null;

        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `${folder}/${fileName}`;

        const { error } = await supabase.storage
            .from("BookNest")
            .upload(filePath, file);

        if (error) throw error;

        const { data } = supabase.storage
            .from("BookNest")
            .getPublicUrl(filePath);

        return data.publicUrl;
    }
    async function saveBook(cleanedBook) {
        try {
            const docRef = await addDoc(collection(db, "books"), {
                title: cleanedBook.title,
                author: cleanedBook.author,
                price: cleanedBook.price,
                category: cleanedBook.category,
                coverImageUrl: cleanedBook.coverImageUrl,
                carouselImageUrl: cleanedBook.carouselImageUrl || null,
                isbn: cleanedBook.isbn,
                writingSystem: cleanedBook.writingSystem,
                year: cleanedBook.year,
                language: cleanedBook.language,
                pages: cleanedBook.pages,
                publisher: cleanedBook.publisher,
                coverType: cleanedBook.coverType,
                translator: cleanedBook.translator || null,
                description: cleanedBook.description || null,
                createdAt: serverTimestamp()
            });
            return docRef;
        } catch (error) {
            console.error("Kitobni saqlashda xato:", error);
            throw error;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            addAlert("Iltimos, barcha majburiy maydonlarni to'ldiring!", "danger");
            return;
        }

        try {
            setLoading(true);
            const coverImageUrl = await uploadToSupabase(image, "book-images");
            const carouselImageUrl = carouselImage
                ? await uploadToSupabase(carouselImage, "carousel-images")
                : null;
            const cleanedBook = {
                title: title.trim(),
                author: author.trim(),
                category: category.trim(),
                isbn: isbn.trim(),
                writingSystem: writingSystem.trim(),
                language: language.trim(),
                publisher: publisher.trim(),
                coverType: coverType.trim(),
                translator: translator ? translator.trim() : null,
                description: description ? description.trim() : null,

                price: Number(price),
                year: Number(year),
                pages: Number(pages),

                coverImageUrl: coverImageUrl,
                carouselImageUrl: carouselImageUrl
            };
            console.log(cleanedBook);
            await saveBook(cleanedBook);

            setTitle("");
            setAuthor("");
            setPrice("");
            setCategory("");
            setIsbn("");
            setWritingSystem("");
            setYear("");
            setLanguage("");
            setPages("");
            setPublisher("");
            setCoverType("");
            setTranslator("");
            setDescription("");
            setImage(null);
            setCarouselImage(null);

            addAlert("Kitob muvaffaqiyatli qo'shildi!", "success");

        } catch (error) {
            addAlert("Xatolik yuz berdi! Iltimos qayta urinib ko'ring.", "danger");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container my-5 add-book">
            <h2 className="mb-4 text-center fw-bold">Kitob qo'shish</h2>
            <div className="row">
                <form onSubmit={handleSubmit} className="add-book-form col-12 col-lg-6 p-4 border rounded bg-light m-auto" noValidate>
                    <div className="mb-3">
                        <label className="form-label">Kitob nomi <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className={`form-control ${errors.title ? "border-danger" : ""}`}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Muallif <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className={`form-control ${errors.author ? "border-danger" : ""}`}
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Narxi (so'm) <span className="text-danger">*</span></label>
                        <input
                            type="number"
                            className={`form-control ${errors.price ? "border-danger" : ""}`}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">ISBN <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className={`form-control ${errors.isbn ? "border-danger" : ""}`}
                            value={isbn}
                            onChange={e => setIsbn(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Yozuvi <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className={`form-control ${errors.writingSystem ? "border-danger" : ""}`}
                            value={writingSystem}
                            onChange={e => setWritingSystem(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Yili <span className="text-danger">*</span></label>
                        <input
                            type="number"
                            className={`form-control ${errors.year ? "border-danger" : ""}`}
                            value={year}
                            onChange={e => setYear(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Tili <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className={`form-control ${errors.language ? "border-danger" : ""}`}
                            value={language}
                            onChange={e => setLanguage(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Betlar soni <span className="text-danger">*</span></label>
                        <input
                            type="number"
                            className={`form-control ${errors.pages ? "border-danger" : ""}`}
                            value={pages}
                            onChange={e => setPages(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Nashriyot <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className={`form-control ${errors.publisher ? "border-danger" : ""}`}
                            value={publisher}
                            onChange={e => setPublisher(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Muqova <span className="text-danger">*</span></label>
                        <select
                            className={`form-select ${errors.coverType ? "border-danger" : ""}`}
                            value={coverType}
                            onChange={(e) => setCoverType(e.target.value)}
                            required
                        >
                            <option value="">Tanlang...</option>
                            <option value="Qattiq">Qattiq</option>
                            <option value="Yumshoq">Yumshoq</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Tarjimon <span className="text-primary">(ixtiyoriy)</span></label>
                        <input
                            type="text"
                            className={`form-control ${errors.translator ? "border-danger" : ""}`}
                            value={translator}
                            onChange={e => setTranslator(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Kategoriya <span className="text-danger">*</span></label>
                        <select
                            className={`form-select ${errors.category ? "border-danger" : ""}`}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Tanlang...</option>

                            {categories.map((cat, i) => (
                                <option key={i} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Kitob haqida <span className="text-primary">(ixtiyoriy)</span></label>
                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Rasm yuklash <span className="text-danger">*</span></label>
                        <input
                            type="file"
                            className={`form-control ${errors.image ? "border-danger" : ""}`}
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Carousel rasm yuklash <span className="text-primary">(ixtiyoriy)</span></label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) => setCarouselImage(e.target.files[0])}
                        />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? "Yuklanmoqda..." : "Saqlash"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddBook;