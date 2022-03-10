import React from 'react'
import './Sidebar.css'
import { AiOutlineDoubleLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { selectAuthState } from '../Redux/authState'
import { useSelector } from 'react-redux'
function Siderbar({ setOpenSide }) {
    const list = useSelector(selectAuthState)
    const handleSidebar = () => {
        setOpenSide(prev => !prev)
        document.querySelector('.sidebar').classList.toggle('hidesidebar');
    }
    return (
        <div className="sidebar">
            <AiOutlineDoubleLeft className="sideIcon" onClick={handleSidebar} />
            <br />
            <ul className="sidebar_list">
                <li><Link to="/newpage">Add new page</Link></li>
                {list.pages && list.pages.map((item, index) => {
                    let tempTitle = item.title.trim().replace(/\s+/g, '-').toLowerCase();

                    return <li key={index}><Link to={`/${item.id}`}>{item.title}</Link></li>
                })}
            </ul>
        </div>

    )
}

export default Siderbar