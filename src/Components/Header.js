import React, { useEffect, useState } from 'react'
import './Header.css'
import { auth, db } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthState, setCurrUser } from '../Redux/authState'

function Header({ openSide, setOpenSide }) {
    const [loggedUser, setloggedUser] = useState(null);
    const currUser = useSelector(selectAuthState);

    let dispatch = useDispatch();
    let history = useNavigate();
    const [dropdown, setDropdown] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, loggedUser => {
            if (loggedUser) {
                const userDetails = db.collection('users').doc(loggedUser.email);
                userDetails.get().then(snapshot => {
                    if (snapshot.exists) {
                        dispatch(setCurrUser({ name: snapshot.data().name, email: snapshot.data().email, pages: snapshot.data().pages }))
                    } else {
                        userDetails.set({ name: loggedUser.displayName, email: loggedUser.email, pages: [] })
                        dispatch(setCurrUser({ name: loggedUser.displayName, email: loggedUser.email, pages: [] }))

                    }
                })
                history('/');
                setloggedUser(loggedUser);
            } else {
                history('/login')
                setloggedUser(null);
            }
        })
    }, [])
    const handleSignOut = () => {
        let confirm = window.confirm('Are you sure you want to sign out?');
        if (confirm) {
            setDropdown(false)

            signOut(auth);
            history('/login');
        }
    }
    const handleDropdown = () => {
        setDropdown(prev => !prev)
    }
    const handleSideOpen = () => {
        setOpenSide(prev => !prev)
        document.querySelector('.sidebar').classList.toggle('hidesidebar');
    }
    console.log(loggedUser)
    return (
        <header>
            <div className={loggedUser && 'Menu'}>{openSide && <GiHamburgerMenu onClick={handleSideOpen} />}</div>
            <h1 style={loggedUser !== null ? { flex: 0.5 } : { flex: 1, textAlign: 'center' }}><Link to="/">Store your Snippets and Notes All at one place</Link></h1>
            {loggedUser !== null && <div>
                <img src={loggedUser !== null && loggedUser.auth.currentUser.photoURL} className="user-photo" alt="user pic"
                    onClick={handleDropdown} />
                <div className={dropdown === true ? 'dropdown' : 'dropdown hidden'}>
                    {loggedUser && <button className="Signout" onClick={handleSignOut}>Sign Out</button>}
                </div>
            </div>}
        </header>
    )
}

export default Header