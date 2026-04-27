import { getPaginationPages } from "../services/paginationService";

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const pages = getPaginationPages(currentPage, totalPages);

    return (
        <div className="pagination-custom text-center mt-4">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="btn border mb-2 btn-custom-hover"
            >
                Prev
            </button>

            {pages.map((page, index) =>
                page === "..." ? (
                    <span key={`dots-${index}`} className="ms-2">…</span>
                ) : (
                    <button
                        key={page}
                        className={`btn border mb-2 ms-2 ${page === currentPage ? "active bg-orange-custom" : "btn-custom-hover"}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="btn border mb-2 ms-2 btn-custom-hover"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;