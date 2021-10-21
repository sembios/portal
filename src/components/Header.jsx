import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import './Header.css'


export default function Header() {
    const [activeTab, setActiveTab] = useState("Home")
    const location = useLocation();
    useEffect(() =>{
        if(location.pathname === "/"){
            setActiveTab("Home");
        } else if (location.pathname === "/add") {
            setActiveTab("AddProfile");
        } else if (location.pathname === "/about") {
        setActiveTab("About");
    }
    }, [location])
    return (
        <div className="header">
            <div>
            <p className="logo">Профили</p>
            </div>
            <div className="header-right">
                <Link to='/'>
                    <p 
                    className={`${activeTab === "Home" ? "active" : "" }`} 
                    onClick={() => setActiveTab("Home")}>
                        Главная
                    </p>
                </Link>
                <Link to='/add'>
                    <p 
                    className={`${activeTab === "AddProfile" ? "active" : ""}`} 
                    onClick={() => setActiveTab("AddProfile")}>
                        Добавить профиль
                    </p>
                </Link>
                <Link to='/about'>
                    <p 
                    className={`${activeTab === "About" ? "active" : ""}`} 
                    onClick={() => setActiveTab("About")}>
                        Инфо
                    </p>
                </Link>
                </div>            
        </div>
    )
}
