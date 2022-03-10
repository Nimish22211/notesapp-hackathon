import './App.css';
import Header from './Components/Header';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Siderbar from './Components/Siderbar';
import { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Newpage from './Components/Newpage';
import { useSelector } from 'react-redux'
import { selectAuthState } from './Redux/authState'
import { useDispatch } from 'react-redux'
import { setCurrUser, setPages } from './Redux/authState'
import TextEditor from './Components/TextEditor';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


function App() {
  const [openSide, setOpenSide] = useState(false);
  const [logged, setLogged] = useState(false);
  let redux = useSelector(selectAuthState);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, loggedUser => {
      if (loggedUser) {
        setLogged(true);
        db.collection('users').doc(loggedUser.email).get().then(snapshot => (() => {
          dispatch(setCurrUser({ name: snapshot.data().name, email: snapshot.data().email }))
        })())
        db.collection('users').doc(loggedUser.email).collection('pages').get().then(snapshot =>
          // dispatch(setPages(snapshot.docs.map(doc => doc.data()))))
          dispatch(setPages(snapshot.docs.map(doc => { return { title: doc.data().title, content: doc.data().content, id: doc.id, description: doc.data().description } }))))
      } else {
        setLogged(false);
        dispatch(setCurrUser({ name: '', email: '' }))
        dispatch(setPages([]))
      }
    })
    console.log('render')
  }, [])
  return (
    <div className="App">
      <Router >
        <Header openSide={openSide} setOpenSide={setOpenSide} />
        <div className="app_container">
          {logged === true && <Siderbar setOpenSide={setOpenSide} />}
          <Routes >
            <Route path="/" element={(
              <div className="home">
                <main>
                  <h1>Welcome to the Snippets and Notes App</h1>
                  <h2>
                    Get Started, Create a <Link to="/newpage">New Page</Link>
                  </h2>
                </main>
              </div>
            )} />
            <Route path="/login" element={<Login />} />
            <Route path="/newpage" element={<Newpage />} />
            <Route path="/:id" element={<TextEditor />} />
          </Routes>
        </div>
      </Router>

    </div>
  );
}

export default App;
