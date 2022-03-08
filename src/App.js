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
import { setCurrUser } from './Redux/authState'
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
          dispatch(setCurrUser({ name: snapshot.data().name, email: snapshot.data().email, pages: snapshot.data().pages }))
        })()
        )
      } else {
        setLogged(false);
        dispatch(setCurrUser({ name: '', email: '', pages: [] }))
      }
    })
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
            {redux.pages && redux.pages.map((item, index) => {
              let tempTitle = item.title.trim().replace(/\s+/g, '-').toLowerCase();
              // let content = markdown + '\n\n' + item.content
              return <Route path={`/${tempTitle}`} element={(<section className="page">
                <div className="page_heading">
                  {item.title}
                  <p>{item.description}</p>
                </div>
                <TextEditor index={index} />
              </section>)} />
            })}
          </Routes>
        </div>
      </Router>

    </div>
  );
}

export default App;
