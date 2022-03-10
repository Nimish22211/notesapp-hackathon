import React, { useEffect, useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import './TextEditor.css'
import { EditorState } from 'draft-js';
import { db } from '../firebase';
import { useSelector } from 'react-redux'
import { selectAuthState, setPageContent } from '../Redux/authState'
import { convertToRaw, convertFromRaw } from 'draft-js';
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

function TextEditor() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const currUser = useSelector(selectAuthState);
    const [index, setIndex] = useState(0);
    const dispatch = useDispatch();
    const { id } = useParams();
    const currPage = currUser.pages.find(item => item.id === id);
    useEffect(() => {
        if (currPage) {
            setEditorState(EditorState.createWithContent(convertFromRaw(currPage.content)))
            setIndex(currUser.pages.indexOf(currPage))
        }
    }, [id])
    const handleEditorStateChange = (editorState) => {
        setEditorState(editorState);
        db.collection('users').doc(currUser.email).collection('pages').doc(id).update({
            content: convertToRaw(editorState.getCurrentContent())
        })
        dispatch(setPageContent({ index, content: convertToRaw(editorState.getCurrentContent()) }))
    }
    return (
        <section className="page">
            <div className="page_heading">
                {currPage && currPage.title}
                <p>{currPage && currPage.description}</p>
            </div>
            <div className="editor">
                <Editor
                    onEditorStateChange={handleEditorStateChange}
                    editorState={editorState}
                    toolbarClassName='toolbar'
                    editorClassName='text-editor'
                />
            </div>
        </section>
    )
}

export default TextEditor