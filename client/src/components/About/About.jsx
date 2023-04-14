import Footer from "../Footer/Footer";
import SmallAbout from "./SmallAbout";

const About = ()=>{
    return(
        <div>
            <SmallAbout 
                content='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non fuga corrupti at autem sequi. Sit explicabo, natus praesentium atque consequuntur sed nisi corrupti a ut fugit obcaecati vero non quaerat. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non fuga corrupti at autem sequi. Sit explicabo, natus praesentium atque consequuntur sed nisi corrupti a ut fugit obcaecati vero non quaerat.'
                img='https://media.architecturaldigest.com/photos/5c798a2d22644c2d41b67dfa/master/w_800%2Cc_limit/Fairmont%2520San%2520Fransico.jpg'
                header='Our Short Story'
            />
            <hr/>
            <SmallAbout 
                content='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non fuga corrupti at autem sequi. Sit explicabo, natus praesentium atque consequuntur sed nisi corrupti a ut fugit obcaecati vero non quaerat. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non fuga corrupti at autem sequi. Sit explicabo, natus praesentium atque consequuntur sed nisi corrupti a ut fugit obcaecati vero non quaerat.'
                img='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Front_Desk%2C_Paradise_Pier_Hotel_2014.jpg/800px-Front_Desk%2C_Paradise_Pier_Hotel_2014.jpg?20140824015807'
                header='Our Vision'
                left
            />
            <hr/>
            <SmallAbout 
                content='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non fuga corrupti at autem sequi. Sit explicabo, natus praesentium atque consequuntur sed nisi corrupti a ut fugit obcaecati vero non quaerat. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non fuga corrupti at autem sequi. Sit explicabo, natus praesentium atque consequuntur sed nisi corrupti a ut fugit obcaecati vero non quaerat.'
                img='https://www.visitarizona.com/imager/s3_us-west-1_amazonaws_com/aot-2020/images/Well-Being-Spa-Pool_bd09986aed1ba9b4b01bef1efd4b55c0.jpg'
                header='Our Approach'
            />
            <Footer/>
        </div>
    );
}

export default About;