import axios from 'axios';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import css from './navbar.module.css';
const NavBar = ()=>{
    const { user, setUser, setReady } = useContext(UserContext);
    const logoutHandler = (event)=>{
        event.preventDefault();
        axios.post('/user/logout');
        setUser('');
        setReady(true);
    }
    
    return(
        <div className={css.navbar}>
            <img className={css.logo} src='/icon.png' alt=""/>
            <section className={css.navlinkContainer}>
                <Link className={`${css.navPills}`} to="/">Home</Link>
                <Link className={`${css.navPills}`} to="/about">About</Link>
                {   user ? 
                    <>
                        <Link className={`${css.navPills}`} to="/booking">Booking</Link>
                        <Link className={`${css.navPills}`} to={`/user/${user._id}`}>Profile</Link>
                        <button className={`${css.navPills} ${css.rounded}`} style={{cursor:'pointer'}} onClick={logoutHandler}>Logout</button>
                    </>
                    :
                    <>
                        <Link className={`${css.navPills} ${css.rounded}`} to="/user/login">Login</Link>
                        <Link className={`${css.navPills} ${css.rounded}`} to="/user/register">Register</Link>
                    </>
                }
            </section>
        </div>
    )
}

export default NavBar;