import { NavLink, useNavigate } from "react-router-dom";
import { BsBag, BsHeart, BsPerson } from "react-icons/bs";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useFavorite } from "../../contexts/FavoriteContext";

function Links({ onLogin }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isProfileActive = location.pathname.startsWith("/profile");
    const { user } = useAuth();
    const handleProfileClick = () => {
        if (user) {
            navigate("/profile/orders");
        } else {
            onLogin();
        }
    }
    const { cart } = useCart();
    const { favorites } = useFavorite();
    return <section className="links">
        <div className="container px-0 ps-xxl-0">
            <div className="row mt-2 mx-0 px-0">
                <div className="col-12 col-md-4 col-xl-3 text-start px-0">
                    <ul className="list-group list-group-horizontal justify-content-around justify-content-md-between">
                        <li className="list-group-item border-0 px-2 px-lg-4">
                            <NavLink end className="text-decoration-none text-dark-custom text-hoverable-custom" to="/books?page=1&limit=24">Kitoblar</NavLink>
                        </li>
                        <li className="list-group-item border-0 px-2 px-lg-4 d-none">
                            <NavLink end className="text-decoration-none text-dark-custom text-hoverable-custom" to="/packages">To'plamlar</NavLink>
                        </li>
                        <li className="list-group-item border-0 px-2 px-lg-4">
                            <NavLink end className="text-decoration-none text-dark-custom text-hoverable-custom" to="/authors">Mualliflar</NavLink>
                        </li>
                        <li className="list-group-item border-0 px-2 px-lg-4">
                            <NavLink end className="text-decoration-none text-dark-custom text-hoverable-custom" to="/discounts">Chegirmalar</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="offset-0 col-12 offset-md-2 col-md-6 offset-xl-5 col-xl-4 mt-2 px-0">
                    <ul className="list-inline justify-content-around justify-content-md-between d-flex">
                        <li className="list-inline-item">
                            <NavLink end className="text-decoration-none text-dark-custom links-action-parent text-hoverable-custom" to="/cart">
                                <button className="shadow-none links-action btn  bg-light-gray-custom rounded-3 fs-custom-14 px-3 px-lg-4 pt-2 pb-2 border-0 smooth-transition position-relative">
                                    <BsBag size={20} />
                                    <span className="ms-1 align-middle">Savatcha</span>
                                    <span className="position-absolute bg-orange-custom rounded-pill px-2 stat-number">{cart.length !== 0 ? cart.length : ""}</span>
                                </button>
                            </NavLink>
                        </li>
                        <li className="list-inline-item">
                            <NavLink end className="text-decoration-none text-dark-custom links-action-parent text-hoverable-custom" to="/favorites">
                                <button className="shadow-none links-action btn  bg-light-gray-custom rounded-3 fs-custom-14 px-3 px-lg-4 pt-2 pb-2 border-0 smooth-transition position-relative">
                                    <BsHeart size={20} />
                                    <span className="ms-1 align-middle">Sevimlilar</span>
                                    <span className="position-absolute bg-orange-custom rounded-pill px-2 stat-number">{favorites.length !== 0 ? favorites.length : ""}</span>
                                </button>
                            </NavLink>
                        </li>
                        <li className="list-inline-item">
                            <div className={`text-decoration-none text-dark-custom links-action-parent text-hoverable-custom ${isProfileActive ? "active" : ""}`}>
                                <button className="shadow-none links-action btn bg-light-gray-custom rounded-3 fs-custom-14 px-3 px-lg-4 pt-2 pb-2 border-0 smooth-transition" onClick={handleProfileClick}>
                                    <BsPerson size={20} />
                                    <span className="ms-1 align-middle">Profil</span>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
}

export default Links;