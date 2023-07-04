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

  const createHotelReservation = async (createData, token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };
    const response = await axios.post(
      URL + "stayreservation/create/",
      createData,
      config,
    );
  console.log(response.data);
  
    return response.data;
  };

  const getReservations = async (token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };
    const response = await axios.get(
      URL + "stayreservation/",
      config
    );
  console.log(response.data);
    return response.data;
  };
  
  const hotelService = {
    createReviews,
    createHotelReservation,
    getReservations
  };


  
  export default hotelService;