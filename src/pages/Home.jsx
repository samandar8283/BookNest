import { useEffect } from "react";
import MainCarousel from "../components/home/MainCarousel.jsx";
import SecondaryCarousel from "../components/home/SecondaryCarousel.jsx";
import Categories from "../components/Categories.jsx";
import Advantages from "../components/home/Advantages.jsx";
import YangiAsrAvlodi from "../components/home/YangiAsrAvlodi.jsx";
import NewReleases from "../components/home/NewReleases.jsx";
import Apps from "../components/home/Apps.jsx";
import BookMessage from "../components/home/BookMessage.jsx";

function Home() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);
    return <>
        {/* <!-- Main --> */}
        <section className="main-section">
            <div className="container px-0">
                <div className="row px-0 mx-0 align-items-stretch">
                    <div className="d-none d-lg-block col-3 pe-2 h-100">
                        <Categories />
                    </div>
                    <MainCarousel />
                </div>
            </div>
        </section>
        {/* <!-- /Main --> */}

        {/* <!-- Advantages section --> */}
        <Advantages />
        {/* <!-- /Advantages section --> */}

        {/* <!-- Yangi-asr-avlodi section --> */}
        <YangiAsrAvlodi />
        {/* <!-- /Yangi-asr-avlodi section --> */}

        {/* <!-- Bestseller section --> */}
        <section className="bestseller py-5">
            <div className="container">
                <h4 className="fw-bolder bestseller-title">Oyning eng ko'p sotilgan kitoblari</h4>
                {/* <div className="row justify-content-between">
                    <div className="col-auto literature-cards">
                        <div id="literatureCarouselLeft" data-bs-ride="carousel" className="carousel carousel-dark slide carousel-fade">
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="10000">
                                    <div className="row align-items-center rounded-4 w-100 bg-light-gray-custom literature-card mx-0">
                                        <div className="col-4 text-end offset-1">
                                            <img className="position-relative w-100" src="./src/assets/images/book-images/yuqotganlarim-va-topganlarim.jpg" alt="uzbek-literature-1" />
                                        </div>
                                        <div className="col-5 offset-1">
                                            <h5 className="card-title fw-bold text-dark-blue-custom fs-3">Yo'qotganlarim va topganlarim</h5>
                                            <div className="row book-rate mt-0 mb-1 align-items-center">
                                                <div className="col-1">
                                                    <span className="book-rate text-dark-custom fw-medium text-start align-bottom">5.0</span>
                                                </div>
                                                <div className="col-8">
                                                    <span className="book-rate text-dark-custom fw-medium text-start">(0 odam)</span>
                                                </div>
                                            </div>
                                            <h4 className="book-price fw-bold fs-4 mb-0 text-dark-custom">85,000 UZS</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item" data-bs-interval="10000">
                                    <div className="row align-items-center rounded-4 w-100 bg-light-gray-custom literature-card mx-0">
                                        <div className="col-4 text-end offset-1">
                                            <img className="position-relative w-100" src="./src/assets/images/book-images/ufq.jpg" alt="uzbek-literature-1" />
                                        </div>
                                        <div className="col-5 offset-1">
                                            <h5 className="card-title fw-bold text-dark-blue-custom fs-3">UFQ</h5>
                                            <div className="row book-rate mt-0 mb-1 align-items-center">
                                                <div className="col-1">
                                                    <span className="book-rate text-dark-custom fw-medium text-start align-bottom">5.0</span>
                                                </div>
                                                <div className="col-8">
                                                    <span className="book-rate text-dark-custom fw-medium text-start">(0 odam)</span>
                                                </div>
                                            </div>
                                            <h4 className="book-price fw-bold fs-4 mb-0 text-dark-custom">85,000 UZS</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="literature-carousel-control-prev carousel-control-prev carousel-btn-custom rounded-circle cursor-auto-custom" type="button" data-bs-target="#literatureCarouselLeft" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon w-50 h-50" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="literature-carousel-control-next carousel-control-next carousel-btn-custom rounded-circle cursor-auto-custom" type="button" data-bs-target="#literatureCarouselLeft" data-bs-slide="next">
                                <span className="carousel-control-next-icon w-50 h-50" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-auto literature-cards">
                        <div id="literatureCarouselRight" data-bs-ride="carousel" className="carousel carousel-dark slide">
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="10000">
                                    <div className="row align-items-center rounded-4 w-100 bg-light-gray-custom literature-card mx-0">
                                        <div className="col-4 text-end offset-1">
                                            <img className="position-relative w-100" src="./src/assets/images/book-images/yuqotganlarim-va-topganlarim.jpg" alt="uzbek-literature-1" />
                                        </div>
                                        <div className="col-5 offset-1">
                                            <h5 className="card-title fw-bold text-dark-blue-custom fs-3">Yo'qotganlarim va topganlarim</h5>
                                            <div className="row book-rate mt-0 mb-1 align-items-center">
                                                <div className="col-1">
                                                    <span className="book-rate text-dark-custom fw-medium text-start align-bottom">5.0</span>
                                                </div>
                                                <div className="col-8">
                                                    <span className="book-rate text-dark-custom fw-medium text-start">(0 odam)</span>
                                                </div>
                                            </div>
                                            <h4 className="book-price fw-bold fs-4 mb-0 text-dark-custom">85,000 UZS</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item" data-bs-interval="10000">
                                    <div className="row align-items-center rounded-4 w-100 bg-light-gray-custom literature-card mx-0">
                                        <div className="col-4 text-end offset-1">
                                            <img className="position-relative w-100" src="./src/assets/images/book-images/ufq.jpg" alt="uzbek-literature-1" />
                                        </div>
                                        <div className="col-5 offset-1">
                                            <h5 className="card-title fw-bold text-dark-blue-custom fs-3">UFQ</h5>
                                            <div className="row book-rate mt-0 mb-1 align-items-center">
                                                <div className="col-1">
                                                    <span className="book-rate text-dark-custom fw-medium text-start align-bottom">5.0</span>
                                                </div>
                                                <div className="col-8">
                                                    <span className="book-rate text-dark-custom fw-medium text-start">(0 odam)</span>
                                                </div>
                                            </div>
                                            <h4 className="book-price fw-bold fs-4 mb-0 text-dark-custom">85,000 UZS</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="literature-carousel-control-prev carousel-control-prev carousel-btn-custom rounded-circle cursor-auto-custom" type="button" data-bs-target="#literatureCarouselRight" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon w-50 h-50" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="literature-carousel-control-next carousel-control-next carousel-btn-custom rounded-circle cursor-auto-custom" type="button" data-bs-target="#literatureCarouselRight" data-bs-slide="next">
                                <span className="carousel-control-next-icon w-50 h-50" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div> */}

                <SecondaryCarousel />
            </div>
        </section>  
        {/* <!-- /Bestseller section --> */}

        <NewReleases />

        {/* <!-- Apps section --> */}
        <Apps />
        {/* <!-- /Apps section --> */}

        {/* <!-- Book Message section --> */}
        <BookMessage />
        {/* <!-- /Book Message section --> */}

        {/* <!-- News section --> */}
        <section className="news py-5 d-none">
            <div className="container">
                <h4 className="fw-bolder news-title mb-4">So'nggi yangiliklar</h4>
                <div className="row justify-content-between news-cards">
                    <div className="col-3">
                        <div className="card news-card border-0">
                            <img src="./src/assets/images/general/news-1.png" className="card-img-top rounded-4" alt="news-1" />
                            <div className="card-body p-0 mt-3 position-absolute">
                                <p className="card-text news-text text-light mb-0">03.12.2025</p>
                                <h5 className="card-title fw-bold text-white fs-6">Book.uz sayti yangi dizaynda!</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card news-card border-0">
                            <img src="./src/assets/images/general/news-1.png" className="card-img-top rounded-4" alt="news-1" />
                            <div className="card-body p-0 mt-3 position-absolute">
                                <p className="card-text news-text text-light mb-0">03.12.2025</p>
                                <h5 className="card-title fw-bold text-white fs-6">Book.uz sayti yangi dizaynda!</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card news-card border-0">
                            <img src="./src/assets/images/general/news-1.png" className="card-img-top rounded-4" alt="news-1" />
                            <div className="card-body p-0 mt-3 position-absolute">
                                <p className="card-text news-text text-light mb-0">03.12.2025</p>
                                <h5 className="card-title fw-bold text-white fs-6">Book.uz sayti yangi dizaynda!</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card news-card border-0">
                            <img src="./src/assets/images/general/news-1.png" className="card-img-top rounded-4" alt="news-1" />
                            <div className="card-body p-0 mt-3 position-absolute">
                                <p className="card-text news-text text-light mb-0">03.12.2025</p>
                                <h5 className="card-title fw-bold text-white fs-6">Book.uz sayti yangi dizaynda!</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- /News section --> */}
    </>
}

export default Home;