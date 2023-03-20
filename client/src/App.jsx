import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import NavBar from './components/NavBar/Navbar';
import Home from './components/Home/Home';
import About from './components/About';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile';
import Booking from './components/Booking/Booking';
import PageNotFound from './components/PageNotFound';


function App() {
  
  return (
    <div className="App">
      <Router>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/user/login" element={<Login/>}/>
            <Route path="/user/register" element={<Register/>}/>
            <Route path="/user/:id" element={<Profile/>}/>
            <Route path="/booking" element={<Booking/>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
