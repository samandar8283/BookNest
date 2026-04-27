import { Link } from "react-router-dom";
import React from "react";

const Terms = () => {
    return (
        <div className="container py-3">
            <h3 className="mb-3 fw-bold">Qoidalar va Shartlar</h3>
            <p>
                Bu yerda saytdan foydalanish shartlari va qoidalar batafsil tushuntiriladi.
                Iltimos, ularni diqqat bilan o'qing.
            </p>

            <h4 className="fw-bold">1. Foydalanish shartlari</h4>
            <p>
                Saytdan foydalanish orqali siz quyidagi shartlarga rozi bo'lasiz:
            </p>
            <ul>
                <li>Shaxsiy ma’lumotlaringizni to'g'ri va aniq kiritish.</li>
                <li>Saytdagi resurslardan faqat qonuniy maqsadlarda foydalanish.</li>
                <li>Boshqalarning huquqlarini hurmat qilish.</li>
            </ul>

            <h4 className="fw-bold">2. Maxfiylik siyosati</h4>
            <p>
                Biz foydalanuvchilarning shaxsiy ma’lumotlarini himoya qilamiz va ularni uchinchi tomonlarga bermaymiz.
            </p>

            <h4 className="fw-bold">3. Javobgarlik</h4>
            <p>
                Sayt materiallaridan foydalanish natijasida yuzaga kelgan muammolar uchun sayt mas’ul emas.
            </p>

            <p className="mt-4">
                Saytdan foydalanishni davom ettirish orqali siz ushbu qoidalarga rozi bo'lasiz.
            </p>

            <Link to="/cart/checkout" className="btn bg-orange-custom">Orqaga qaytish</Link>
        </div>
    );
};

export default Terms;