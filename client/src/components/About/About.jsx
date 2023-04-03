import Footer from "../Footer/Footer";
import SmallAbout from "./SmallAbout";

const About = ()=>{
    return(
        <div>
            <SmallAbout 
                content='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non fuga corrupti at autem sequi. Sit explicabo, natus praesentium atque consequuntur sed nisi corrupti a ut fugit obcaecati vero non quaerat. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non fuga corrupti at autem sequi. Sit explicabo, natus praesentium atque consequuntur sed nisi corrupti a ut fugit obcaecati vero non quaerat.'
                img='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
                header='Our Short Story'
            />
            <SmallAbout 
                content='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non fuga corrupti at autem sequi. Sit explicabo, natus praesentium atque consequuntur sed nisi corrupti a ut fugit obcaecati vero non quaerat. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non fuga corrupti at autem sequi. Sit explicabo, natus praesentium atque consequuntur sed nisi corrupti a ut fugit obcaecati vero non quaerat.'
                img='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
                header='Our Vision'
                left
            />
            <SmallAbout 
                content='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non fuga corrupti at autem sequi. Sit explicabo, natus praesentium atque consequuntur sed nisi corrupti a ut fugit obcaecati vero non quaerat. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non fuga corrupti at autem sequi. Sit explicabo, natus praesentium atque consequuntur sed nisi corrupti a ut fugit obcaecati vero non quaerat.'
                img='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
                header='Our Approach'
            />
            <Footer/>
        </div>
    );
}

export default About;