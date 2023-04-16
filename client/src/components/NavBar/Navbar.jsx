import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import css from './navbar.module.css';
const NavBar = ()=>{
    const { user, setUser, setReady } = useContext(UserContext);
    const [ show, setShow ] = useState(true);
    const logoutHandler = (event)=>{
        event.preventDefault();
        axios.post('/user/logout');
        setUser('');
        setReady(true);
    }
    
    return(
        <div className={css.navbar}>
            <img className={css.logo} src='/icon.png' alt=""/>
            <section className={css.hamburger} onClick={()=>setShow(!show)}>
                {show?
                    <>
                        <div></div>
                        <div></div>
                        <div></div>
                    </>:
                    <section className={css.cross}>
                        <div></div>
                        <div></div>
                    </section>
                }
            </section>
            <section className={[css.navlinkContainer, show ? css.show : css.noShow].join(' ') } onClick={()=>{
                if(!show)
                    setShow(true);
            }}>
                <Link className={css.navPills} to="/">Home</Link>
                <Link className={css.navPills} to="/about">About</Link>
                {   user ? 
                    <>
                        <Link className={css.navPills} to="/booking">Booking</Link>
                        <Link className={css.navPills} to={`/user/${user._id}`}>Profile</Link>
                        <button className={[css.navPills, css.rounded].join(' ')} style={{cursor:'pointer'}} onClick={logoutHandler}>Logout</button>
                    </>
                    :
                    <>
                        <Link className={[css.navPills, css.rounded].join(' ')} to="/user/login">Login</Link>
                        <Link className={[css.navPills, css.rounded].join(' ')} to="/user/register">Register</Link>
                    </>
                }
            </section>
        </div>
    )
}

export default NavBar;