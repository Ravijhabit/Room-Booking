import { Link } from "react-router-dom"

const NavBar = ()=>{
    return(
        <div>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/user">Register</Link>
            <Link to="/user/login">Login</Link>
            <Link to="/booking">Booking</Link>
        </div>
    )
}

export default NavBar;