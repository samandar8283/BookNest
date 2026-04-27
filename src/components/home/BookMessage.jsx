function BookMessage() {
    return (
        <section className="book-message">
            <div className="container">
                <div className="row g-3">
                    <div className="col-12 col-sm-4">
                        <div className="h-100 bg-light-red-custom border-0 rounded-4">
                            <div className="row px-2 py-3 g-1 align-items-center text-start text-sm-center text-lg-start">
                                <div className="col-3 col-sm-12 col-lg-4 text-center">
                                    <div className="book-warning-image rounded-circle bg-white mx-auto">
                                        <img src="/images/BookWarningIcon.svg" alt="book warning icon" />
                                    </div>
                                </div>
                                <div className="col-8 col-sm-12 col-lg-8 ms-2 ms-sm-0 mt-0 mt-sm-3 mt-lg-0">
                                    <div className="">
                                        <h5 className="book-amount fw-bold fs-4">5 000</h5>
                                        <p className="book-message m-0">Nomdagi kitoblar sotuvda mavjud</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-4">
                        <div className="h-100 bg-light-red-custom border-0 rounded-4">
                            <div className="row px-2 py-3 g-1 align-items-center text-start text-sm-center text-lg-start">
                                <div className="col-3 col-sm-12 col-lg-4 text-center">
                                    <div className="book-warning-image rounded-circle bg-white mx-auto">
                                        <img src="/images/BookWarningIcon.svg" alt="book warning icon" />
                                    </div>
                                </div>
                                <div className="col-8 col-sm-12 col-lg-8 ms-2 ms-sm-0 mt-0 mt-sm-3 mt-lg-0">
                                    <div className="">
                                        <h5 className="book-amount fw-bold fs-4">30 000</h5>
                                        <p className="book-message m-0">Kitoblar sotuvda mavjud</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-4">
                        <div className="h-100 bg-light-red-custom border-0 rounded-4">
                            <div className="row px-2 py-3 g-1 align-items-center text-start text-sm-center text-lg-start">
                                <div className="col-3 col-sm-12 col-lg-4 text-center">
                                    <div className="book-warning-image rounded-circle bg-white mx-auto">
                                        <img src="/images/BookWarningIcon.svg" alt="book warning icon" />
                                    </div>
                                </div>
                                <div className="col-8 col-sm-12 col-lg-8 ms-2 ms-sm-0 mt-0 mt-sm-3 mt-lg-0">
                                    <div className="">
                                        <h5 className="book-amount fw-bold fs-4">7</h5>
                                        <p className="book-message m-0">Filial va dilerlar soni</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookMessage;