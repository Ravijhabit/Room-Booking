import { useState } from "react";
import {useNavigate, Link, useParams} from 'react-router-dom';
import axios from 'axios';
import css from './register.module.css';

const Register = ({name='Register', edit})=>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();
    const handleSubmit = async (event)=>{
        event.preventDefault();
        await axios.post('/user/register',{username,email,password});
        alert('Registration Complete You can login')
        navigate('/user/login');
    }
    // useEffect(()=>{
    //     setUsername();
    //     setEmail();
    //     setPassword();
    // },[]);
    return(
        <div className={css.container}>
            <h1>{name}</h1>
            <div>
                <form onSubmit={handleSubmit}>
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