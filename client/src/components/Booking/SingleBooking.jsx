import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format, differenceInCalendarDays, parseISO } from 'date-fns';
import axios from 'axios';
import css from './singleBooking.module.css';
import getBookingData from "../hoc/getBookingData";

const SingleBooking = () =>{
    const [bookingInfo, setBookingInfo] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        const getData = async() => {
            try{
                const response = await getBookingData(id);
                setBookingInfo(response);
            }catch(err){
                console.log(err);
            }
        }
        getData();
    },[id]);
    const updateHandler = (event)=>{
        event.preventDefault();
        if(differenceInCalendarDays(new Date(format(parseISO(bookingInfo.checkIn),'yyyy-MM-dd')),new Date(format(Date.now(), 'yyyy-MM-dd')))>0){
            navigate(`/booking/${id}/edit`);
        }
        else{
            console.log('Not possible');
        }
    }
    const deleteHandler = async (event) =>{
        event.preventDefault();
        if(differenceInCalendarDays(new Date(format(parseISO(bookingInfo.checkIn),'yyyy-MM-dd')),new Date(format(Date.now(), 'yyyy-MM-dd')))>0){
            try{
                const response = await axios.delete(`/booking/${id}/delete`);
            }catch(err){
                console.log(err);
            }
            navigate('/');
        }
        else{
            console.log('Not possible');
        }
    }
    return(
        <div>
            {!bookingInfo ? 
                <p>Loading...</p>:
                <div className={css.container}>
                    <div className={css.first}>
                        <p>{bookingInfo.roomType} </p>
                    </div>
                    <div className={css.middle}>
                        <div className={css.date}>
                            <div className={css.close}>
                                <h6>CheckIn</h6>
                                <p>{bookingInfo.checkIn.slice(0,10)}</p>
                            </div>
                            <div className={css.close}>
                                <h6>CheckOut</h6>
                                <p>{bookingInfo.checkOut.slice(0,10)}</p>
                            </div>
                        </div>   
                        <div className={css.content}>
                            <div>
                                <p className={css.bigger}>{bookingInfo.guests}</p>
                                <p className={css.big}>Guests</p>
                            </div>
                            <div className={`${css.line}`}>
                            </div>
                            <div>
                                <p className={css.bigger}>{bookingInfo.numberOfRooms}</p>
                                <p className={css.big}>Number<br/> of rooms</p>
                            </div>
                        </div>
                    </div>
                    <div className={css.last}>
                        <p>{bookingInfo.price}</p>
                    </div>
                    <div className={css.btnContainer}>
                        <button onClick={updateHandler}>Update</button>
                        <button onClick={deleteHandler}>Delete</button>
                    </div>
                </div>    
            }
            {/* update */}
            {/* delete */}
            {/* read */}
        </div>
    );
}

export default SingleBooking;