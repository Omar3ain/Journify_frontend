import axios from "axios";
import { API_BASE_URL } from "../../../baseUrl";
const URL = `${API_BASE_URL}place/`;

const getPopular = async (city_name) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(URL + "popular/", {
    params: {
      city_name: city_name,
      kinds: "foods,restaurants",
    },
    ...config,
  });

  return response.data;
};

const restaurantService = {
  getPopular,
};

export default restaurantService;
