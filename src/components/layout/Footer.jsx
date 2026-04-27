import { NavLink } from "react-router-dom"

import { BsPhone, BsEnvelopeAt, BsGeoAlt, BsInstagram } from "react-icons/bs";
import { PiTelegramLogoLight } from "react-icons/pi";
import { FaFacebookF } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer bg-dark py-3 py-lg-5 mt-5 text-white">
            <div className="container">
                <div className="row footer-top mb-4 border-bottom pb-4">
                    <div className="col-6 col-lg-3 ">
                        <NavLink end className="text-white footer-logo text-decoration-none h-100 d-block d-flex flex-column justify-content-center justify-content-lg-start" to="/">
                            <img src="/images/logo.png" alt="logo" className="footer-logo d-block mx-auto" />
                            <span className="logo-name d-block fs-3 fw-bold text-center mx-auto">BookNest</span>
                        </NavLink>
                    </div>
                    <div className="col-6 col-lg-3 py-4 text-lg-start text-center">
                        <h6 className="text-uppercase mb-3 fs-5 fw-bold">Menu</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2 mb-xl-3"><a href="" className="text-white text-decoration-none">Biz haqimizda</a></li>
                            <li className="mb-2 mb-xl-3"><a href="" className="text-white text-decoration-none">Qanday xarid qilinadi?</a></li>
                            <li className="mb-2 mb-xl-3"><a href="" className="text-white text-decoration-none">Yetkazib berish</a></li>
                            <li className="mb-2 mb-xl-3"><a href="" className="text-white text-decoration-none">Filial va dilerlar</a></li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 py-4 text-lg-start text-center">
                        <h6 className="text-uppercase mb-3 fs-5 fw-bold">Kontaktlar</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2 mb-xl-3"><a href="" className="text-white text-decoration-none"><BsPhone size={20} /> +998-88-165-82-83</a></li>
                            <li className="mb-2 mb-xl-3"><a href="" className="text-white text-decoration-none"><BsEnvelopeAt size={20} /> samandar8283@gmail.com</a></li>
                            <li className="mb-2 mb-xl-3"><a href="" className="text-white text-decoration-none"><BsGeoAlt size={20} /> Olmazor, Talabalar ko'chasi 58</a></li>
                            <li className="mb-2 mb-xl-3">
                                <ul className="list-inline">
                                    <li className="list-inline-item"><a href="" className="text-white"><FaFacebookF size={24} /></a></li>
                                    <li className="list-inline-item"><a href="" className="text-white"><BsInstagram size={24} /></a></li>
                                    <li className="list-inline-item"><a href="" className="text-white"><PiTelegramLogoLight size={24} /></a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <iframe className="rounded-4" src="https://yandex.com/map-widget/v1/?um=constructor%3Af4a98abb3854c346da52bfe2cd3fb6f3f0ad2efc01154a374308ed49cb87e5c8&amp;source=constructor" width="100%" height="240" frameBorder="0"></iframe>
                    </div>
                </div>
                <div className="row footer-bottom">
                    <div className="col-12 text-center">
                        <p className="mb-0">&copy; 2025 BookNest. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;