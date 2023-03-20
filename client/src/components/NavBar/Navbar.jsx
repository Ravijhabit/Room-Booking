import { Link } from "react-router-dom";
import css from './navbar.module.css';
const NavBar = ()=>{
    return(
        <div className={css.navbar}>
            <img className={css.logo} src='/icon.png' alt=""/>
            <section className={css.navlinkContainer}>
                <Link className={`${css.navPills}`} to="/">Home</Link>
                <Link className={`${css.navPills}`} to="/about">About</Link>
                <Link className={`${css.navPills} ${css.rounded}`} to="/user/login">Login</Link>
                <Link className={`${css.navPills} ${css.rounded}`} to="/user/register">Register</Link>
                <Link className={`${css.navPills}`} to="/user/:id">Profile</Link>
                <Link className={`${css.navPills}`} to="/booking">Booking</Link>
            </section>
        </div>
    )
}

export default NavBar;