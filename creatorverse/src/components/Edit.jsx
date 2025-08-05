import { useNavigate } from 'react-router-dom'
import './Edit.css'

function Edit( { id } ) {
    const navigate = useNavigate();

    return (
        <div className="Edit" onClick={() => navigate(`/edit-creator/${id}`)}>
            <button>Edit</button>
        </div>
    )
}

export default Edit;
