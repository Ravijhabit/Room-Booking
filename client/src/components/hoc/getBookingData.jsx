import axios from 'axios';
const getBookingData = async (id) =>{
    try{
        const response = await axios.get(`/booking/${id}`);
        return response.data;
    }catch(err){
        console.log(err);
    }
}

export default getBookingData;