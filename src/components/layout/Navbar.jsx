import { NavLink } from 'react-router-dom';

function Navbar() {
    return  <section className="navbar-section">
                <div className="container-xxl px-0 pb-2 border-bottom">
                    <nav className="navbar navbar-expand-lg bg-body-tertiary pb-0">
                        <div className="container-fluid">
                            <NavLink end className="navbar-brand text-dark-custom text-hoverable-custom" to="/"><img src="/images/logo.png" alt="logo" className="logo me-2" /><span className="logo-name fw-bold">BookNest</span></NavLink>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mb-2 mb-lg-0 w-100 justify-content-between">
                                    {/* <!-- <li className="nav-item">
                                        <NavLink end className="nav-link disabled" aria-disabled="true">Mutolaa book.uzdan boshlanar</NavLink>
                                    </li> --> */}
                                    <li className="nav-item d-none d-xl-block">
                                        <NavLink end className="nav-link text-dark-custom text-hoverable-custom" aria-current="page" to="/how-to-buy">Qanday xarid qilinadi?</NavLink>
                                    </li>
                                    <form className="d-flex ms-3 me-2" role="search">
                                        <input className="form-control shadow-none border-primary" type="search" placeholder="Qidirish..." aria-label="Search" />
                                    </form>
                                    <li className="nav-item dropdown">
                                        <NavLink end className="nav-link dropdown-toggle text-dark-custom text-hoverable-custom" to="/sss" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            UZ
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li><NavLink end className="dropdown-item active" to="/ssss">UZ</NavLink></li>
                                            <li className="">
                                                <hr className="dropdown-divider" />
                                            </li>
                                            <li><NavLink end className="dropdown-item" to="/sssss">RU</NavLink></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item ms-2">
                                        <div className="form-check form-switch pt-2">
                                            <input className="form-check-input shadow-none align-middle" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
                                        </div>
                                    </li>
                                    <li className="nav-item ms-2">
                                        <a className="nav-link text-dark-custom text-hoverable-custom" href="/ssssss" rel="noopener noreferrer">+998 88 165 82 83</a>
                                    </li>
                                    <li className="nav-item">
                                        <ul className="navbar-nav">
                                            <li className="nav-item social-media-link">
                                                <a className="nav-link" href="/sssssss" rel="noopener noreferrer">
                                                    <i className="fa-brands fa-facebook"></i>
                                                </a> 
                                            </li>
                                            <li className="nav-item social-media-link">
                                                <a className="nav-link" href="/ssssssss" rel="noopener noreferrer">
                                                    <i className="fa-brands fa-instagram"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item social-media-link">
                                                <a className="nav-link" href="/sssssssss" rel="noopener noreferrer">
                                                    <i className="fa-brands fa-telegram"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </section>
}

export default Navbar