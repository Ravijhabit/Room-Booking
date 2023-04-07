import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import axios from 'axios';

import NavBar from './components/NavBar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import Booking from './components/Booking/Booking';
import PageNotFound from './components/PageNotFound';
import ScrollToTop from './components/hoc/ScrollToTop';
import { UserContext, UserContextProvider } from './components/hooks/UserContext';
import SingleBooking from './components/Booking/SingleBooking';
import { useContext } from 'react';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
// import { process } from 'dotenv';
// if(process.env.NODE_ENV === 'production') 
//   disableReactDevTools();
// dotenv.config();
axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.withCredentials=true;

function App() {
  const {user, setUser} = useContext(UserContext);
  return (
    <div className="App">
      <UserContextProvider>
        <Router>
            <NavBar/>
            <ScrollToTop>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/user/login" element={<Login/>}/>
                <Route path="/user/register" element={<Register/>}/>
                <Route path="/user/:id" element={<Profile/>}/>
                <Route path="/booking" element={<Booking/>}/>
                <Route path="/booking/:id" element={<SingleBooking/>}/>
                <Route path='/booking/:id/edit' element={<Booking/>}/>
                <Route path="*" element={<PageNotFound/>}/>
              </Routes>
            </ScrollToTop>
        </Router>
      </UserContextProvider>
    </div>
  )
}

export default App
