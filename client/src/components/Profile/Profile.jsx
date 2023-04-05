import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../hooks/UserContext';
import axios from 'axios';
import css from './profile.module.css';
import DialogBox from '../hoc/Dialogbox';
import { useNavigate } from 'react-router-dom';
import SingleBooking from '../Booking/SingleBooking';

const Profile = ()=>{
    const [show, setShow] = useState(false);
    const {user, setUser, ready, setReady} = useContext(UserContext);
    const [password, setPassword] = useState('');
    const [allBookings, setAllBookings] = useState([]);
    const navigate = useNavigate();
    const deleteHandler = async(event)=>{
        event.preventDefault();
        setShow(true);
    }
    const submitHandler = async (event)=>{
        event.preventDefault();
        await axios({
            method:'delete',
            url:'/user/delete',  
            data:{
              password
            }
          });
        setUser('');
        setReady(true);
        navigate('/');
    }
    useEffect(() => {
        if(!user && ready){
            navigate('/user/login');
        }
        const fetchAllBookings = async ()=>{
            const allData = await axios.get('/user/allbooking'); 
            setAllBookings(allData.data);
        }
        fetchAllBookings();
    },[]);

    return(
        <div className={css.container}>
            <div className={css.contain}>
                <div className={css.profile}>
                    <section>
                        <h2>My Account</h2>
                    </section>
                    <section className={css.card}>
                        <section className={css.name}>
                            <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt=''/>
                            <h2>{user?.username}</h2>
                        </section>
                        <section className={css.intro}>
                            <div>
                                <h3>Display Name</h3>
                                <div className={css.cell}>
                                    <h5>{user?.username}</h5>
                                    {/* <button onClick={changeHandler}>Edit</button> */}
                                </div>
                            </div>
                            <div>
                                <h3>Email</h3>
                                <div className={css.cell}>
                                    <h5>{user?.email}</h5>
                                    {/* <button onClick={changeHandler}>Edit</button> */}
                                </div>
                            </div>
                            <div>
                                <h3>Password</h3> 
                                <div className={css.cell}>
                                    <h5>********</h5>
                                    {/* <button onClick={changeHandler}>Change</button> */}
                                </div>
                            </div>
                        </section>
                        <section className={css.footer}>
                            <button className={css.btn} onClick={deleteHandler}>Delete</button>
                        </section>
                    </section>
                </div>
                { show &&
                    <DialogBox changeShow={setShow} submitHandler={submitHandler} password={password} setPassword={setPassword}/>
                }
                <div className={css.booking}>
                    {allBookings.length? <h2>Booking Details</h2>:<></>}
                    {allBookings?.map((booking)=>(
                        <SingleBooking key={booking._id} passBookingInfo={booking}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;