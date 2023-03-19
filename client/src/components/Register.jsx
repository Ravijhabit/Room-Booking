import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Register = ()=>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.post('http://localhost:3000/register',{username,email,password});
        alert('Registration Complete You can login')
        navigate('/login');
    }
    return(
        <div>
            Register
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
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="test@email.com" 
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                />
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

export default Register