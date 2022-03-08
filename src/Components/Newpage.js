import React, { useState } from 'react'
import { db } from '../firebase';
import './Newpage.css'
import { useDispatch, useSelector } from 'react-redux'
import { addPage } from '../Redux/authState'
import { selectAuthState } from '../Redux/authState'

function Newpage() {
    const dispatch = useDispatch();
    const currUser = useSelector(selectAuthState);
    const [input, setInput] = useState('');
    const [desc, setDesc] = useState('');
    const handleCreate = (e) => {
        e.preventDefault();
        // db.collection('users').doc()
        let tempInput = input.trim().replace(/\s+/g, '-').toLowerCase();

        db.collection('users').doc(currUser.email).update({
            pages: [...currUser.pages, { title: tempInput, description: desc, content: '' }]
        })
        dispatch(addPage({ title: tempInput, description: desc, content: '' }))
        setInput('');
        setDesc('');
    }
    return (
        <div className="newpageform">
            <h1>Create A New Page</h1>
            <form >
                <input type="text" placeholder="Page Name" value={input} onChange={(e) => setInput(e.target.value)} />
                <textarea type="text" placeholder="Page Description, NOTE: This is not the actual content of the page" value={desc} onChange={(e) => setDesc(e.target.value)} />
                <button onClick={handleCreate}>Create</button>
            </form>
        </div>
    )
}

export default Newpage