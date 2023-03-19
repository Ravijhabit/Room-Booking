import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import NavBar from './components/Navbar';
import Home from './components/Home/Home';
import About from './components/About';
import Login from './components/Login/Login';
import Register from './components/Register';
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
            <Route path="/user" element={<Register/>}/>
            <Route path="/user/login" element={<Login/>}/>
            <Route path="/booking" element={<Booking/>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
