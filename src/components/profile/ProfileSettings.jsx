import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile, updatePassword } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { useAlert } from "../../contexts/AlertContext";
import { useAuth } from "../../contexts/AuthContext";

const ProfileSettings = () => {
    const { addAlert } = useAlert();
    const { user } = useAuth();
    const [firstName, setFirstName] = useState(user.displayName?.split(" ")[0] || "");
    const [lastName, setLastName] = useState(
        user.displayName?.split(" ").slice(1).join(" ") || ""
    );
    const [email] = useState(user.email || "");
    const [password, setPassword] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [setPasswordMode, setSetPasswordMode] = useState(false);

    const hasPassword = user.providerData.some(
        (p) => p.providerId === "password"
    );

    const handleSave = async () => {
        setLoading(true);

        try {
            if (!firstName || !lastName) {
                addAlert("Ism va familiya majburiy!", "danger");
                setLoading(false);
                return;
            }

            if (
                (hasPassword && password && password.length < 8) ||
                (!hasPassword &&
                    setPasswordMode &&
                    password.length < 8)
            ) {
                addAlert("Parol kamida 8 belgidan iborat bo'lishi kerak!", "danger");
                setLoading(false);
                return;
            }

            // Firebase Auth
            await updateProfile(user, {
                displayName: `${firstName} ${lastName}`
            });

            // Firestore
            await updateDoc(doc(db, "users", user.uid), {
                firstName,
                lastName
            });

            // Password update
            if ((hasPassword && password) || (!hasPassword && setPasswordMode && password)) {
                await updatePassword(auth.currentUser, password);
            }

            addAlert("Profil muvaffaqiyatli yangilandi!", "success");
            setIsEditing(false);
            setSetPasswordMode(false);
            setPassword("");
        } catch (err) {
            addAlert(err.message, "danger");
        }

        setLoading(false);
    };

    return (
        <>
            <h4 className="fw-bold mb-4 mt-3 mt-lg-0">
                Profil sozlamalari
            </h4>

            <div className="mb-3">
                <label className="form-label">Ism</label>
                <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    disabled={!isEditing}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Familiya</label>
                <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    disabled={!isEditing}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                    type="email"
                    className="form-control"
                    value={email}
                    disabled 
                />
            </div>

            {(hasPassword || setPasswordMode) && (
                <div className="mb-3">
                    <label className="form-label">
                        {hasPassword ? "Parol" : "Yangi parol"}
                    </label>
                    <input
                        type="password"
                        placeholder="********"
                        className="form-control"
                        disabled={!isEditing}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            )}

            {!hasPassword && isEditing && (
                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="setPassword"
                        checked={setPasswordMode}
                        onChange={(e) => setSetPasswordMode(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="setPassword">
                        Parol o'rnatish
                    </label>
                </div>
            )}

            {isEditing ? (
                <>
                    <button
                        className="btn btn-success me-2"
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? "Saqlanmoqda..." : "Saqlash"}
                    </button>
                    <button
                        className="btn btn-warning"
                        onClick={() => {
                            setIsEditing(false);
                            setPassword("");
                            setSetPasswordMode(false);
                        }}
                    >
                        Bekor qilish
                    </button>
                </>
            ) : (
                <button
                    className="btn btn-primary"
                    onClick={() => setIsEditing(true)}
                >
                    Tahrirlash
                </button>
            )}
        </>
    );
};

export default ProfileSettings;