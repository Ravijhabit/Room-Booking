import { useState, useEffect } from "react";
import {useNavigate, Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {format, differenceInCalendarDays} from 'date-fns';
import css from './booking.module.css';
import getBookingData from "../hoc/getBookingData";
const costChart = {
    Single:100,
    Double:150,
    Sweet:250
};
const Booking = ()=>{
    const {id} = useParams();
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [price, setPrice] = useState(0);
    const [guests, setGuests] = useState(1);
    const [numberOfRooms, setNumberOfRooms] = useState(1);
    const [roomType, setRoomType] = useState('Single');
    const navigate = useNavigate();
    const differenceDate = (latter, former) =>{
        return differenceInCalendarDays(new Date(latter), new Date(former));
    }
    const handleSubmit = async(event)=>{
        event.preventDefault();
        if(differenceDate(checkIn, new Date)<=0){
            console.log('Please enter real checkIn date');
        }
        if(differenceDate(checkOut, checkIn)<=0){
            console.log('Invalid Date selection');
        }
        const newCheckIn = format(new Date(checkIn),'yyyy-MM-dd');
        const newCheckOut = format(new Date(checkOut),'yyyy-MM-dd');
        id ? 
            await axios.put(`/booking/${id}/edit`,{checkIn:newCheckIn, checkOut:newCheckOut, price, guests, numberOfRooms, roomType})
        : await axios.post('/booking/new',{checkIn:newCheckIn, checkOut:newCheckOut, price, guests, numberOfRooms, roomType});
        alert('Booking Successful')
        navigate('/');
    }
    useEffect(()=>{
        const NoOfDays = differenceDate(checkOut,checkIn);
        setPrice(costChart[roomType] * NoOfDays * numberOfRooms);
    },[checkOut, checkIn, roomType]);
        
    useEffect(()=>{
        if(id){
            const coverFunction = async()=>{
                try{
                        const bookedID = await getBookingData(id);
                        setCheckIn(bookedID.checkIn.slice(0,10));
                        setCheckOut(bookedID.checkOut.slice(0,10));
                        setPrice(bookedID.price);
                        setGuests(bookedID.guests);
                        setNumberOfRooms(bookedID.numberOfRooms);
                        setRoomType(bookedID.roomType);
                    }catch(err){
                        console.log(err);
                    }
                }
            coverFunction();
        }
    },[]);

    return(
        <div className={css.container}>
            <h1>Booking</h1>
            <form className={css.fill} onSubmit={handleSubmit}>
                <div className={css.inputContainer}>
                    <label htmlFor="checkin">CheckIn:</label>
                    <input
                        type="date" 
                        id="checkin"  
                        value={checkIn} 
                        onChange={(event)=>setCheckIn(event.target.value)}
                    />
                </div>
                <div className={css.inputContainer}>
                    <label htmlFor="checkout">CheckOut:</label>
                    <input
                        type="date" 
                        id="checkout"  
                        value={checkOut} 
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
                    <select name="roomType" id="roomType">
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Sweet">Sweet</option>
                    </select>
                </div>
                <div className={css.inputContainer}>
                    <button type="submit">Book {price? `Rs.${price}`:''}</button>
                </div>
            </form>
        </div>
    )
}

export default Booking;