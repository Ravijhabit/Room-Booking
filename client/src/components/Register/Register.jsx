import { useState } from "react";
import {useNavigate,Link} from 'react-router-dom';
import axios from 'axios';
import css from './register.module.css';

const Register = ()=>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.post('http://localhost:3000/register',{username,email,password});
        alert('Registration Complete You can login')
        navigate('/user/login');
    }
    return(
        <div className={css.container}>
            <h1>Register</h1>
            <div>
                <form className={css.fill} onSubmit={handleSubmit}>
                    <div className={css.inputContainer}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text" 
                            id="username" 
                            placeholder="John Doe"  
                            value={username} 
                            onChange={(event)=>setUsername(event.target.value)}
                        />
                    </div>
                    <div className={css.inputContainer}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email" 
                            id="email" 
                            placeholder="test@email.com" 
                            value={email}
                            onChange={(event)=>setEmail(event.target.value)}
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
                <p>Already have an account? 
                    <Link to='/user/login'>Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register