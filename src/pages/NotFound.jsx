import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="mt-5 d-flex flex-column justify-content-center align-items-center text-center">
            <img
                src="/images/page-not-found.svg"
                alt="404 illustration"
                className="mb-5 img-fluid"
                style={{ maxWidth: "300px" }}
            />

            <p className="fs-3 mb-2">
                <span className="text-danger">Oops!</span> Sahifa topilmadi.
            </p>
            <p className="lead mb-4">
                Siz qidirayotgan sahifa mavjud emas.
            </p>

            <button
                onClick={() => navigate("/")}
                className="btn bg-orange-custom btn-lg shadow-lg"
            >
                Bosh sahifaga qaytish
            </button>


        </div>
    );
}

export default NotFound;