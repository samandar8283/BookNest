import { useEffect } from "react";

function SecondaryCarousel() {

    useEffect(() => {
        const bootstrap = window.bootstrap;

        if (bootstrap) {
            const element = document.querySelector("#secondaryCarousel");

            if (element) {
                new bootstrap.Carousel(element, {
                    interval: 6000,
                    ride: "carousel",
                    pause: false,
                    wrap: true
                });
            }
        }
    }, []);
    return (
        <div className="row mt-3 mt-md-5">
            <div className="col-12">
                <div id="secondaryCarousel" data-bs-ride="carousel" className="secondary-carousel carousel carousel-dark slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#secondaryCarousel" data-bs-slide-to="0" className="active bestseller-indicator-button rounded-circle" aria-current="true" aria-label="Slide 1">
                            <span className="position-absolute rounded-circle"></span>
                        </button>
                        <button type="button" data-bs-target="#secondaryCarousel" data-bs-slide-to="1" className="bestseller-indicator-button rounded-circle" aria-label="Slide 2">
                            <span className="position-absolute rounded-circle"></span>
                        </button>
                        <button type="button" data-bs-target="#secondaryCarousel" data-bs-slide-to="2" className="bestseller-indicator-button rounded-circle" aria-label="Slide 3">
                            <span className="position-absolute rounded-circle"></span>
                        </button>
                        <button type="button" data-bs-target="#secondaryCarousel" data-bs-slide-to="3" className="bestseller-indicator-button rounded-circle" aria-label="Slide 4">
                            <span className="position-absolute rounded-circle"></span>
                        </button>
                        <button type="button" data-bs-target="#secondaryCarousel" data-bs-slide-to="4" className="bestseller-indicator-button rounded-circle" aria-label="Slide 5">
                            <span className="position-absolute rounded-circle"></span>
                        </button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="6000">
                            <img src="/images/sec-carousel-img-1.png" className="border border-secondary d-block w-100 rounded-4 secondary-carousel-img" alt="carousel image" />
                        </div>
                        <div className="carousel-item" data-bs-interval="6000">
                            <img src="/images/sec-carousel-img-2.png" className="border border-secondary d-block w-100 rounded-4 secondary-carousel-img" alt="carousel image" />
                        </div>
                        <div className="carousel-item" data-bs-interval="6000">
                            <img src="/images/sec-carousel-img-3.png" className="border border-secondary d-block w-100 rounded-4 secondary-carousel-img" alt="carousel image" />
                        </div>
                        <div className="carousel-item" data-bs-interval="6000">
                            <img src="/images/sec-carousel-img-4.png" className="border border-secondary d-block w-100 rounded-4 secondary-carousel-img" alt="carousel image" />
                        </div>
                        <div className="carousel-item" data-bs-interval="6000">
                            <img src="/images/sec-carousel-img-5.png" className="border border-secondary d-block w-100 rounded-4 secondary-carousel-img" alt="carousel image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SecondaryCarousel;