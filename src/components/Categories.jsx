import categories from "../data/categories";
function Categories() {
    return (        
        <div className="scroll-custom overflow-auto rounded-start-3">
            <ul className="list-unstyled categoryItems mb-0">
                {categories.map((cat, i) => (
                    <li key={i} className="categoryItem">
                        <button className="btn shadow-none border-0 w-100 py-3 ps-3 categoryAction text-start text-dark-custom">
                            {cat}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;