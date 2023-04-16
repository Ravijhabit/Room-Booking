import Footer from "../Footer/Footer";
import SmallAbout from "./SmallAbout";

const About = ()=>{
    return(
        <div>
            <SmallAbout 
                content='The Ravi Ravali Hotel nestled on a pristine beach. Sun, sand, and sea. Guests basked in the warm glow of the sunset, sipping cocktails by the pool. A treasure hunt was announced - clues hidden throughout the hotel. Excitement filled the air as guests raced to uncover the prize. Laughter and camaraderie made memories to last a lifetime at The Silver Lagoon.'
                img='https://media.architecturaldigest.com/photos/5c798a2d22644c2d41b67dfa/master/w_800%2Cc_limit/Fairmont%2520San%2520Fransico.jpg'
                header='Our Short Story'
            />
            <hr/>
            <SmallAbout 
                content="Our vision for our hotel is to create a haven of hospitality that exceeds our guest's expectations. We aspire to be the epitome of luxury, providing impeccable service, top-notch amenities, and an unforgettable experience. We aim to be a beacon of excellence in the hospitality industry, offering a warm and welcoming atmosphere where guests feel valued and cared for. Our vision is to become the preferred choice for discerning travelers, providing them with a memorable stay that leaves a lasting impression."
                img='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Front_Desk%2C_Paradise_Pier_Hotel_2014.jpg/800px-Front_Desk%2C_Paradise_Pier_Hotel_2014.jpg?20140824015807'
                header='Our Vision'
                left
            />
            <hr/>
            <SmallAbout 
                content='Our approach at our hotel is centered around guest satisfaction and personalized service. We believe in going the extra mile to ensure that every guest feels valued and appreciated. Our dedicated team of hospitality professionals is committed to anticipating and fulfilling the unique needs and preferences of each guest, delivering a bespoke experience. From seamless check-ins to personalized recommendations and attentive service throughout your stay, our approach is focused on providing exceptional hospitality that exceeds expectations and creates lasting memories.'
                img='https://www.visitarizona.com/imager/s3_us-west-1_amazonaws_com/aot-2020/images/Well-Being-Spa-Pool_bd09986aed1ba9b4b01bef1efd4b55c0.jpg'
                header='Our Approach'
            />
            <Footer/>
        </div>
    );
}

export default About;