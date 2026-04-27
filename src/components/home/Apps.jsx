function Apps() {
    return (
        <section className="apps">
            <div className="container">
                <div className="row rounded-5 apps-wrapper">
                    <div className="col-12 col-md-6">
                        <div className="apps-card border-0 text-center">
                            <div className="card-body">
                                <h5 className="card-title fw-bold text-uppercase text-white">Book.uz Mobil ilovamizni telefoningizga yuklab oling</h5>
                                <div className="row mt-4 mx-0">
                                    <div className="col-12 col-sm-6 apps-link apps-ios">
                                        <a href="#">
                                            <img src="/images/appstore-ios.svg" alt="ios app download" />
                                        </a>
                                    </div>
                                    <div className="col-12 col-sm-6 apps-link">
                                        <a href="#">
                                            <img src="/images/appstore-android.svg" alt="android app download" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="offset-md-1 d-none d-md-block col-md-5 position-relative">
                        <div className="phone-image position-absolute">
                            <img src="/images/app-phone-img.png" alt="Phone image" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Apps;