import axios from 'axios';
import { useState, useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import { useNavigate } from 'react-router-dom';

import css from './dialogbox.module.css';

const DialogBox = ({changeShow, submitHandler, password, setPassword}) =>{
    
    const cancelHandler = (event) =>{
        event.preventDefault();
        changeShow(false);
        setPassword('');
    } 
    return(
        <div className={css.holder}>
            <section className={css.header}>
                <svg onClick={cancelHandler} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <p>Enter Password to Continue</p>
            </section>
            <form className={css.modal} onSubmit={submitHandler}>
                <label name="Password"> 
                    Password :
                </label>
                <input 
                    type="password" 
                    value={password}
                    placeholder="*********"
                    onChange = {(event)=>setPassword(event.target.value)}    
                />
                <button className={css.btn} type="submit">Submit</button>
            </form>
        </div>
    );
}

export default DialogBox;