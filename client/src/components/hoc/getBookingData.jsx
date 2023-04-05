import axios from 'axios';
const getBookingData = async (id) =>{
    try{
        const response = await axios.get(`/booking/${id}`);
        return response.data;
    }catch(err){
        throw err;
    }
}

export default getBookingData;