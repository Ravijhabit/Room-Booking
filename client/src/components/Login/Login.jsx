import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = ()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.post('http://localhost:3000/login',{username,password});
        alert('You can surf now')
        navigate('/');
    }
    return(
        <div>
            Login
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="John Doe"  
                    value={username} 
                    onChange={(event)=>setUsername(event.target.value)}
                />
                <br/>
                <br/>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="********" 
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}
                />  
                <br/>   
                <button 
                    type="submit"> Submit</button>           
            </form>
        </div>
    )
}

export default Login