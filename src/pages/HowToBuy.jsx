import { Link } from "react-router-dom";
import React from "react";

const HowToBuy = () => {
    return (
        <div className="container py-3">
            <h3 className="mb-3 fw-bold">Qanday xarid qilinadi?</h3>

            <p>
                Bu sahifada siz bizning xizmatlarimiz yoki mahsulotlarimizni qanday xarid qilishni bilib olishingiz mumkin.
            </p>

            <h4 className="fw-bold">1. Mahsulotni tanlash</h4>
            <p>
                Saytdagi mahsulotlar ro'yxatidan sizga kerakli mahsulotni tanlang va “Savatga qo'shish” tugmasini bosing.
            </p>

            <h4 className="fw-bold">2. Savatni ko'rish</h4>
            <p>
                Savatga qo'shilgan mahsulotlarni tekshiring. Agar kerak bo'lsa, miqdorini o'zgartiring yoki mahsulotni olib tashlang.
            </p>

            <h4 className="fw-bold">3. To'lovni amalga oshirish</h4>
            <p>
                “Xarid qilish” tugmasini bosing, kerakli ma’lumotlarni kiriting va to'lovni amalga oshiring. Sizga tasdiq xabari yuboriladi.
            </p>

            <h4 className="fw-bold">4. Yetkazib berish</h4>
            <p>
                To'lov amalga oshirilgandan so'ng, mahsulot siz belgilagan manzilga yetkazib beriladi.
            </p>

            <p className="mt-4">
                Agar savollaringiz bo'lsa, biz bilan bog'lanishingiz mumkin.
            </p>
            <a href="tel:+998881658283" className="btn btn-outline-dark me-3">+998 88 165 82 83</a>
            <Link to="/" className="btn bg-orange-custom">Asosiy sahifaga qaytish</Link>
        </div>
    );
};

export default HowToBuy;
