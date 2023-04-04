import {useNavigate} from 'react-router-dom';
import css from './home.module.css';
import Facility from './Facility/Facility';
import Room from './Facility/Room';
import Footer from '../Footer/Footer';
const facilities=[
    {
        name:'Swimming',
        value:  
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />,
        color:'#67bef1'
    },
    {
        name:'Wi-fi',
        value:
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />,
        color:'#ff4e41fd'    
    },
        
    {
        name:'AC',
        value:
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />,
        color:'#3fd13f'
    },
    {
        name:'Dinner',
        value:
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />,
        color:'#f8d121'

    }
];
const Rooms =[
    {
        name:'Single',
        price:100,
        src:'https://www.hotelmonterey.co.jp/upload_file/monhtyo/stay/sng_600_001.jpg',
        rating:4.3
    },{
        name:'Double',
        price:200,
        src:'https://www.hotel7dublin.com/wp-content/uploads/Hotel-7-double-bedroom.jpg',
        rating:4.5
    },{
        name:'Suite',
        price:400,
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
                    {facilities.map( facility => (
                        <Facility key={facility.name} name={facility.name} value={facility.value} color={facility.color}/>
                    ))}
                </div>
            </div>
            <div className={css.rooms}>
                <h1>ROOMS</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut corrupti, voluptate libero explicabo officiis laboriosam modi omnis architecto necessitatibus, ea ad reprehenderit illo. Deserunt voluptates dolorem temporibus? Autem, saepe vitae?</p>
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