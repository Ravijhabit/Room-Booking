import {useNavigate} from 'react-router-dom';
import {IoBarbell} from 'react-icons/io5';
import {MdSpa, MdSportsBar, MdOutlineRestaurantMenu} from 'react-icons/md';
import {GiCardRandom} from 'react-icons/gi';
import {TbSwimming, TbWifi, TbAirConditioning} from 'react-icons/tb';
import css from './home.module.css';
import Facility from './Facility/Facility';
import Room from './Facility/Room';
import Footer from '../Footer/Footer';
const facilities=[
    {
        name:'Swimming',
        value:<TbSwimming style={{width:'35%', height:'35%', color:"#2B3EC5"}}/>
    },
    {
        name:'Wi-fi',
        value:<TbWifi style={{width:'35%', height:'35%', color:'#D98B03'}}/>
    },
        
    {
        name:'AC',
        value:<TbAirConditioning style={{width:'35%', height:'35%', color:'#93BB93'}}/>
    },
    {
        name:'Restaurant',
        value:<MdOutlineRestaurantMenu style={{width:'35%', height:'35%', fill:'#b9ae0a'}}/>
    },
    {
        name:'Gym',
        value:<IoBarbell style={{width:"35%", height:"35%", color:'#e52607'}}/>
    },
    {
        name:'Spa',
        value:<MdSpa style={{width:"35%", height:"35%", color:'#439545'}}/>
    },
    {
        name:'Bar',
        value:<MdSportsBar style={{width:"35%", height:"35%", color:"#465a76"}}/>
    },
    {
        name:'Casino',
        value:<GiCardRandom style={{width:"35%", height:"35%", color:"#a32453"}}/>    
    }
];
const Rooms =[
    {
        name:'Single',
        price:1000,
        src:'https://www.hotelmonterey.co.jp/upload_file/monhtyo/stay/sng_600_001.jpg',
        rating:4.3
    },{
        name:'Double',
        price:1800,
        src:'https://www.hotel7dublin.com/wp-content/uploads/Hotel-7-double-bedroom.jpg',
        rating:4.5
    },{
        name:'Suite',
        price:3000,
        src:'https://media-cdn.tripadvisor.com/media/photo-s/22/ac/7b/b8/the-amayaa.jpg',
        rating:4.8
    }
]
const Home = ()=>{
    const navigate = useNavigate();
    return(
        <>
            <div className={css.hero}>
                <section className={css.intro}>
                    <h1><span className={css.style}>Memorable</span> Hotels for moments <span className={css.style}>Rich</span> in emotions</h1>
                    <h3>Book now and get the best prices</h3>
                    <button onClick={()=>navigate('/booking')}>Book Now</button>
                </section>
                <img className={css.heroImage} src='https://images.squarespace-cdn.com/content/v1/5cf832a5ea673b0001d5ed1b/1580981955545-P3QMSW3DLF5CQBXOV2EZ/543CF377-6595-4D26-A87B-7AE78EED8ED2.JPG?format=720w' alt=''/>
                <h1>Here, local talents come together.</h1>
                <p>We let ourselves be <strong>inspired by the rich history</strong> as well as by contemporary artists of the city. For in the 21st century the city has so much more to offer than just medieval heritage.</p>
            </div>
            <div className={css.about}>
                <img className={css.heroImage} src='https://c.ndtvimg.com/2023-01/8h8sfu_restaurant_625x300_10_January_23.jpg?im=FaceCrop,algorithm=dnn' alt='' />
                <h2>The best gateway you can dream of. Culture, nature, beaches and gastronomy. Enjoy your vacation with your family or partner in a fishing village with a medieval past.</h2>
                <button onClick={()=>navigate('/about')}>Know More</button>
            </div>
            <div className={css.facility}>
                <h1>OUR FACILITIES</h1>
                <div className={css.facilityContainer}>
                    {facilities.map( facility => (
                        <Facility key={facility.name} name={facility.name} value={facility.value} color={facility.color}/>
                    ))}
                    {/* {facilities.map( facility => (
                        <Facility key={facility.name} name={facility.name} value={facility.value} color={facility.color}/>
                    ))} */}
                </div>
            </div>
            <div className={css.rooms}>
                <h1>ROOMS</h1>
                <p>Our hotel offers an array of modern and stylish rooms that cater to every traveler's needs. From cozy and comfortable standard rooms to luxurious suites with breathtaking views, our accommodations are designed to provide the perfect haven for relaxation and rejuvenation. Each room features elegant decor, plush bedding, and a range of amenities for a comfortable stay, including high-speed Wi-Fi, flat-screen TV, mini fridge, and more. Whether you're here for business or leisure, our well-appointed rooms provide a welcoming retreat for a memorable stay.</p>
                <div className={css.roomContainer}>
                    {Rooms.map(room =>(
                        <Room key={room.name} src={room.src} name={room.name} price={room.price} rating={room.rating}/>
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Home;