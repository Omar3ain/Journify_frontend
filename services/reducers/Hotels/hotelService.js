import axios from "axios";
import { API_BASE_URL } from "../../../baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
const URL = `${API_BASE_URL}`;

const createReviews = async (createData, token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };
    const response = await axios.post(
      URL + "hotel-review/create/",
      createData,
      config,
    );
  
    return response.data;
  };
  
  const hotelService = {
    createReviews
  };
  
  export default hotelService;