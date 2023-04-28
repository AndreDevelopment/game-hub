import axios from 'axios';

export default axios.create({

    baseURL: "https://api.rawg.io/api",
    params: {
 
    key: 'f18c9a50474a4be3bb5551f15be58bd7'

    }
});