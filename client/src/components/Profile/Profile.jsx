import { useState, useContext } from 'react';
import { UserContext } from '../hooks/UserContext';

import css from './profile.module.css';
import DialogBox from '../hoc/Dialogbox';

const Profile = ()=>{
    const [show, setShow] = useState(false);
    const {user} = useContext(UserContext);
    const deleteHandler = async(event)=>{
        event.preventDefault();
        setShow(true);
    }

    return(
        <div className={css.container}>
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
                                <button>Edit</button>
                            </div>
                        </div>
                        <div>
                            <h3>Email</h3>
                            <div className={css.cell}>
                                <h5>{user?.email}</h5>
                                <button>Edit</button>
                            </div>
                        </div>
                        <div>
                            <h3>Password</h3>
                            <div className={css.cell}>
                                <h5>********</h5>
                                <button>Change</button>
                            </div>
                        </div>
                    </section>
                </section>
                <section className={css.footer}>
                    <button className={css.btn} onClick={deleteHandler}>Delete</button>
                </section>
            </div>
            { show ? 
                <DialogBox changeShow={setShow}/>
                : ''
            }
        </div>
    );
}

export default Profile;