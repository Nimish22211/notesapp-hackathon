import React from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import './TextEditor.css'
import { EditorState } from 'draft-js';
import { useState } from 'react';
import { db } from '../firebase';
import { useSelector } from 'react-redux'
import { selectAuthState, setPageContent } from '../Redux/authState'
import { convertToRaw, convertFromRaw } from 'draft-js';
import { useDispatch } from 'react-redux'

function TextEditor({ index }) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const currUser = useSelector(selectAuthState);
    const dispatch = useDispatch();
    const handleEditorStateChange = async (editorState) => {
        setEditorState(editorState);
        // { console.log(snapshot.data().pages[index].content) }
        // var res = await db.collection('users').doc(currUser.email).get().then(snapshot => snapshot.data().pages[index].content)
        // console.log(res)
        // dispatch(setPageContent({ index, content: convertToRaw(editorState.getCurrentContent()).blocks[0].text }))
        console.log(currUser)
    }
    return (
        <div className="editor">
            <Editor
                onEditorStateChange={handleEditorStateChange}
                editorState={editorState}
                toolbarClassName='toolbar'
                editorClassName='text-editor'
            />
        </div>
    )
}

export default TextEditor