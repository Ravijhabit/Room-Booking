import { useState, useEffect, useContext } from "react";
import {useNavigate, Link, useParams, useLocation} from 'react-router-dom';
import axios from 'axios';
import {format, differenceInCalendarDays} from 'date-fns';
import css from './booking.module.css';
import getBookingData from "../hoc/getBookingData";
import { UserContext } from "../hooks/UserContext";
import SpinnerHandler from "../hoc/SpinnerHandler";
const costChart = {
    Single:1000,
    Double:1800,
    Suite:3000
};
const Booking = ()=>{
    const { user, ready } = useContext(UserContext);
    const room = useLocation().state;
    const {id} = useParams();
    const [spinner, setSpinner] = useState(false);
    const [dateToday, setDateToday] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [price, setPrice] = useState(0);
    const [guests, setGuests] = useState(1);
    const [numberOfRooms, setNumberOfRooms] = useState(1);
    const [roomType, setRoomType] = useState('Single');
    const [oldCheckIn, setOldCheckIn] = useState();
    const navigate = useNavigate();
    const differenceDate = (latter, former) =>{
        return differenceInCalendarDays(new Date(latter), new Date(former));
    }
    const handleSubmit = async(event)=>{
        event.preventDefault();
        setSpinner(true);
        const newCheckIn = format(new Date(checkIn),'yyyy-MM-dd');
        const newCheckOut = format(new Date(checkOut),'yyyy-MM-dd');
        if(id){
            await axios.put(`/booking/${id}/edit`,{checkIn:newCheckIn, checkOut:newCheckOut, price, guests, numberOfRooms, roomType, oldCheckIn})
            alert('Booking Edited');
            setSpinner(false);
            navigate(`/Booking/${id}`);
        }else{
            const response = await axios.post('/booking/new',{checkIn:newCheckIn, checkOut:newCheckOut, price, guests, numberOfRooms, roomType});
            if(response.data){
                alert('Booking Successful');
            }else{
                alert('Booking Unsuccessful');
            }
            setSpinner(false);
            navigate('/');
        } 
    }
    useEffect(()=>{
        const NoOfDays = Math.max(differenceDate(checkOut,checkIn),1);
        setPrice(costChart[roomType] * NoOfDays * numberOfRooms);
    },[checkOut, checkIn, roomType, numberOfRooms]);
        
    useEffect(()=>{
        setDateToday(format(new Date(),'yyyy-MM-dd'));
        if(id){
            const coverFunction = async()=>{
                try{
                        const bookedID = await getBookingData(id);
                        setOldCheckIn(bookedID.checkIn);
                        setCheckIn(bookedID.checkIn.slice(0,10));
                        setCheckOut(bookedID.checkOut.slice(0,10));
                        setPrice(bookedID.price);
                        setGuests(bookedID.guests);
                        setNumberOfRooms(bookedID.numberOfRooms);
                        setRoomType(bookedID.room.roomType[0].toUpperCase() + bookedID.room.roomType.slice(1));
                    }catch(err){
                        alert(err);
                    }
                }
            coverFunction();
        }else if(room){
            setRoomType(room.roomType);
        }
        if(ready && !user){
            navigate('/user/login');
        }
    },[user, ready, id]);


    return(
        <SpinnerHandler isLoading={spinner}>
            <div className={css.container}>
                <h1>Booking</h1>
                <form className={css.fill} onSubmit={handleSubmit}>
                    <div className={css.inputContainer}>
                        <label htmlFor="checkin">CheckIn:</label>
                        <input
                            type="date" 
                            id="checkin"  
                            value={checkIn}  
                            min={dateToday}
                            onChange={(event)=>setCheckIn(event.target.value)}
                        />
                    </div>
                    <div className={css.inputContainer}>
                        <label htmlFor="checkout">CheckOut:</label>
                        <input
                            type="date" 
                            id="checkout"  
                            value={checkOut}
                            min={checkIn}
                            onChange={(event)=>setCheckOut(event.target.value)}
                        />
                    </div>
                    <div className={css.inputContainer}>
                        <label htmlFor="guests">Guests:</label>
                        <input
                            type="number" 
                            id="guests" 
                            value={guests}
                            onChange={(event)=>setGuests(event.target.value)}
                        />
                    </div>
                    <div className={css.inputContainer}>
                        <label htmlFor="numberOfRooms">Number of Rooms:</label>
                        <input
                            type="number" 
                            id="numberOfRooms"  
                            value={numberOfRooms}
                            onChange={(event)=>setNumberOfRooms(event.target.value)}
                        />
                    </div>
                    <div className={css.inputContainer}>
                        <label htmlFor="roomType">RoomType:</label>
                        <select name="roomType" id="roomType" value={roomType} onChange={(event)=>setRoomType(event.target.value)}>
                            <option value="Single">Single</option>
                            <option value="Double">Double</option>
                            <option value="Suite">Suite</option>
                        </select>
                    </div>
                    <div className={css.inputContainer}>
                        <button type="submit">Book {price? `Rs.${price}`:''}</button>
                    </div>
                </form>
            </div>
        </SpinnerHandler>
    )
}

export default Booking;