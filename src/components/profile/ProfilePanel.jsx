import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import { supabase } from "../../supabase/supabaseClient";
import { useAlert } from "../../contexts/AlertContext";
import { BsPersonCircle, BsCart4, BsGear, BsBoxArrowRight, BsColumnsGap, BsBell } from "react-icons/bs";

const ProfilePanel = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { addAlert } = useAlert();
    const [imageError, setImageError] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            addAlert("Tizimdan chiqdingiz!", "success");
            navigate("/");
        } catch (err) {
            addAlert(err.message, "danger");
        }
    };

    const fileInputRef = useRef(null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const filePath = `profile-images/${user.uid}`;
            const { error: uploadError } = await supabase
                .storage
                .from("BookNest")
                .upload(filePath, file, { upsert: true, contentType: file.type });

            if (uploadError) throw uploadError;

            const { data } = supabase
                .storage
                .from("BookNest")
                .getPublicUrl(filePath);

            const photoURLWithTS = data.publicUrl + `?t=${Date.now()}`;

            await updateProfile(user, { photoURL: photoURLWithTS });

            setImageError(false);
            addAlert("Profil rasmi yangilandi!", "success");
        } catch (err) {
            console.error(err);
            addAlert("Rasm yuklashda xatolik!", "danger");
        }
    };


    if (!user) return null;

    return (
        <div className="container">
            <div className="row">
                <div className="profile-card bg-light-gray-custom px-4 py-3 rounded-3">
                    <div className="row align-items-center">
                        <div className="col-12 col-sm-6 col-lg-12 text-center">
                            <div className="profile-image mb-2 position-relative d-inline-block" style={{ height: 96 }}>
                                <img
                                    src={user.photoURL}
                                    alt="user"
                                    className={`rounded-circle ${imageError ? "d-none" : ""}`}
                                    style={{ width: 96 }}
                                    onError={() => setImageError(true)}
                                />

                                {imageError && <BsPersonCircle size={96} color="grey" />}
                                <button
                                    className="btn btn-sm btn-light position-absolute bottom-0 end-0 rounded-circle shadow"
                                    style={{ transform: "translate(5%, 25%)" }}
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    ✎
                                </button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    className="d-none"
                                    onChange={handleImageChange}
                                />
                            </div>

                            <h5 className="profile-name fw-bold">{user.displayName}</h5>
                            <h6 className="profile-email text-break">{user.email}</h6>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-12 profile-buttons">
                            <hr className="mt-2 mb-3 d-block d-sm-none d-lg-block" />

                            <NavLink
                                className={({ isActive }) =>
                                    `btn d-flex gap-2 border-0 w-100 mb-2 ${isActive ? "active bg-orange-custom" : ""}`
                                }
                                to="/profile/notifications"
                            >
                                <BsBell size={20} />
                                <span>Bildirishnomalar</span>
                            </NavLink>

                            <NavLink
                                className={({ isActive }) =>
                                    `btn d-flex gap-2 border-0 w-100 mb-2 ${isActive ? "active bg-orange-custom" : ""}`
                                }
                                to="/profile/orders"
                            >
                                <BsCart4 size={20} />
                                <span>Mening buyurtmalarim</span>
                            </NavLink>

                            <NavLink
                                className={({ isActive }) =>
                                    `btn d-flex gap-2 border-0 w-100 mb-2 ${isActive ? "active bg-orange-custom" : ""}`
                                }
                                to="/profile/settings"
                            >
                                <BsGear size={20} />
                                <span>Profil sozlamalari</span>
                            </NavLink>

                            <hr className="mt-2 mb-3 d-block d-sm-none d-lg-block" />

                            <button className="btn d-flex gap-2 border-0" onClick={handleLogout}>
                                <BsBoxArrowRight size={20} />
                                <span>Chiqish</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePanel;