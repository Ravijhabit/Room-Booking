import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format, differenceInCalendarDays, parseISO } from 'date-fns';
import axios from 'axios';
import css from './singleBooking.module.css';
import getBookingData from "../hoc/getBookingData";
import DialogBox from "../hoc/Dialogbox";
import { UserContext } from "../hooks/UserContext";
import SpinnerHandler from "../hoc/SpinnerHandler";

const SingleBooking = ({passBookingInfo}) =>{
    const {user, ready} = useContext(UserContext);
    const [bookingInfo, setBookingInfo] = useState(null);
    const [password, setPassword] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [show, setShow] = useState(false);
    let {id} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{ 
        if(!passBookingInfo){
            setSpinner(true);
            const getData = async() => {
                try{    
                    const response = await getBookingData(id);
                    setBookingInfo(response);
                }catch(err){
                    if(err.response.status===404){  
                        setSpinner(false);
                        navigate('/notFound');
                    }
                }
            }
            setSpinner(false);
            getData();
        }else{
            setBookingInfo(passBookingInfo);
        }
        if(ready && !user){
            navigate('/user/login');
        }
    },[passBookingInfo, id, user, ready]);
    const updateHandler = (event)=>{
        event.preventDefault();
        if(differenceInCalendarDays(new Date(format(parseISO(bookingInfo.checkIn),'yyyy-MM-dd')),new Date(format(Date.now(), 'yyyy-MM-dd')))>0){
            navigate(`/booking/${id}/edit`);
        }
        else{
            alert('Not possible because your checkIn date has crossed');
        }
    }
    const deleteHandler = async (event) =>{
        event.preventDefault();
        if(differenceInCalendarDays(new Date(format(parseISO(bookingInfo.checkIn),'yyyy-MM-dd')),new Date(format(Date.now(), 'yyyy-MM-dd')))>0){
            setShow(true);
        }
        else{
            alert('Not possible because your checkIn date has crossed');
        }
    }
    const submitHandler = async (event) =>{
        event.preventDefault();
        setShow(false);
        setSpinner(true);
        try{
            await axios.delete(`booking/${id}/delete`,{data:{ password}});
            alert('booking deleted');
            setSpinner(false);
            navigate('/');
        }catch(err){
            alert('Wrong Password');
            setPassword('');
        }
        setSpinner(false);
    }
    if(passBookingInfo){
        id=passBookingInfo._id;
    }
    return(
        <SpinnerHandler isLoading={spinner}>
            {/* {(!bookingInfo && !ready) ? 
                <p>Loading...</p>: */}
                <div className={css.container}>
                    <div className={css.first}>
                        <p>{bookingInfo?.room?.roomType.toUpperCase()} </p>
                        <p>Room No: {bookingInfo?.room?.roomNo} </p>
                    </div>
                    <div className={css.middle}>
                        <div className={css.date}>
                            <div className={css.close}>
                                <h6>CheckIn</h6>
                                <p>{bookingInfo?.checkIn.slice(0,10)}</p>
                            </div>
                            <div className={css.close}>
                                <h6>CheckOut</h6>
                                <p>{bookingInfo?.checkOut.slice(0,10)}</p>
                            </div>
                        </div>   
                        <div className={css.content}>
                            <div>
                                <p className={css.bigger}>{bookingInfo?.guests}</p>
                                <p className={css.big}>Guests</p>
                            </div>
                            <div className={`${css.line}`}>
                            </div>
                            <div>
                                <p className={css.bigger}>{bookingInfo?.numberOfRooms}</p>
                                <p className={css.big}>Number<br/> of rooms</p>
                            </div>
                        </div>
                    </div>
                    <div className={css.last}>
                        <p>Rs.{bookingInfo?.price}</p>
                    </div>
                    <div className={css.btnContainer}>
                        <button onClick={updateHandler}>Update</button>
                        <button onClick={deleteHandler}>Delete</button>
                    </div>
                    {
                        show?
                        <DialogBox changeShow={setShow} submitHandler={submitHandler} password={password} setPassword={setPassword}/>
                        :''
                    }
                </div>    
            {/* } */}
            {/* update */}
            {/* delete */}
            {/* read */}
        </SpinnerHandler>
    );
}

export default SingleBooking;