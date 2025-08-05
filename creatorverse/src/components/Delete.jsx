import { useState } from 'react' 
import { supabase } from '../client'
import { useNavigate } from 'react-router-dom'
import './Delete.css'

function Delete( { id } ) {
    const [modal, setModal] = useState(false);

    const navigate = useNavigate();

    const handleDelete = () => {
        const fetchCreator = async () => {
            const response = await supabase
                .from('creators')
                .delete()
                .eq('id', id)
                .single()

            if (!response) {
                return (
                    <p>Something went wrong. Please try again.</p>
                )
            } else {
                navigate('/');
            }
        }

        fetchCreator();
    }

    const handleNotDelete= () => {
        setModal(false);
    }

    return (
        <div className="Delete">
            <button onClick={() => setModal(true)} className="flex-center-row">Delete</button>
            {
                modal && (
                    <div className="delete-modal">
                        <div className="modal-content background-blue">
                            <h1>Are you sure?</h1>
                            <p>This will permanately delete this user</p>
                            <div className="yes-no-buttons flex-space-even-row">
                                <button onClick={handleDelete}>yes</button>
                                <button onClick={handleNotDelete}>no</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Delete;
