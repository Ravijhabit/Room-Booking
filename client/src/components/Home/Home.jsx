import Facility from "../Facility/Facility";
import css from './home.module.css';

const facility=[
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
const images =[
    'https://ihplb.b-cdn.net/wp-content/uploads/2013/11/Taj-Palace-Hotel-in-new-delhi.jpg',
    'https://www.hotelitist.com/wp-content/uploads/2019/01/Hotels-and-Resorts.jpg',
    'https://www.fivestaralliance.com/files/fivestaralliance.com/home_page_hero_image/SIG%20Ciragan%20Palace%20Hotel%20Kempinski%20Istanbul%205.jpg',
    'https://www.holidify.com/images/cmsuploads/compressed/103705059_20221124193502.jpg',
    'https://r1imghtlak.mmtcdn.com/7ecgob5fmt0g93aitug3fut6001l.jpg?&output-quality=75&downsize=583:388&output-format=jpg'
]
const Home = ()=>{
    return(
        <div >
            <section className={css.intro}>
                <div className={css.introText}>
                    <h1>Enjoy Your Dream Vacation</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio officia odio ducimus nobis aspernatur ea fugiat, voluptatum est maxime</p>
                </div>
            </section>
            <section className={css.overview}>
                <section>
                    <h1>Facilities</h1>
                    <div className={css.allFacility}>
                        {facility.map( fac => (
                            <Facility key={fac.name} name={fac.name} value={fac.value} color={fac.color}/>
                        ))}
                    </div>
                </section>
                <section>
                    <h1>Hotels For You</h1>
                    <p>5 Days 6 Nights</p>
                    <div className={css.cost}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#67bef1" style={{width:'2rem', height:'2rem'}}>
                            <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        <p>USD $506.00</p>
                    </div>
                </section>
                <section>
                    <p>150 results</p>
                    <div className={css.imageContainer}>
                        {images.map( (image,index) => (
                            <img key={index} className={css.preview} src={image} alt=""/>
                        ))}
                    </div>
                </section>
            </section>
        </div>
    )
}

export default Home;