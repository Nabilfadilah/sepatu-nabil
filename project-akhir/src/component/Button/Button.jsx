import { useNavigate } from "react-router-dom"

export default function Button() {

    const navigate = useNavigate();

    return (
        <>
            {/* button submit */}
            <div className="text-center mt-5">
                <button
                type="submit"
                className="btn btn-success submit"
                // onClick={() => navigate('/')}
                >
                <i class="bi bi-bag-plus-fill me-2"></i>
                    Submit
                </button>
            </div>
        </>

    )
}