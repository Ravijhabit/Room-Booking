import { useState, useContext, useEffect, useRef } from "react";
import {useNavigate,Link} from 'react-router-dom';
import axios from 'axios';
import css from './login.module.css';
import { UserContext } from "../hooks/UserContext";
import SpinnerHandler from "../hoc/SpinnerHandler";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [spinner, setSpinner] = useState(false);
    const inputRef = useRef();
    const { user, setUser, ready } = useContext(UserContext);
    const navigate = useNavigate();
    const handleSubmit = async (event)=>{
        event.preventDefault();
        setSpinner(true);
        try{
            const response = await axios.post('/user/login',{username,password});
            alert('You can surf now');
            setUser(response.data);
            setSpinner(false);
            navigate('/');
        }catch(err){
            alert('Login Failed')
        }
        inputRef.current.focus();
        setUsername('');
        setPassword('');
        setSpinner(false);  
    }
    useEffect(()=>{
        if(user && ready)
            navigate('/');
    },[user]);
    return(
        <SpinnerHandler isLoading={spinner}>
        <div className={css.container}>
            <h1>Login</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className={css.inputContainer}>
                        <label htmlFor="username">Username:</label>
                        <input 
                            ref={inputRef}
                            type="text" 
                            id="username" 
                            placeholder="John Doe"  
                            value={username} 
                            onChange={(event)=>setUsername(event.target.value)}
                        />
                    </div>
                    <div className={css.inputContainer}>
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="********" 
                            value={password}
                            onChange={(event)=>setPassword(event.target.value)}
                        />  
                    </div>
                    <div className={css.inputContainer}>
                        <button type="submit"> Submit</button>           
                    </div>
                </form>
                <p>Don't have an account? <Link to='/user/register'>Sign Up</Link></p>
            </div>
        </div>
        </SpinnerHandler>
    )
}

export default Login;