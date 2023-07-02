import axios from "axios";
import { API_BASE_URL } from "../../../baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    },
    ...config,
  });

  if (response.data) {
    await AsyncStorage.setItem("city", JSON.stringify(city_name));
  }
  return response.data;
};

const SearchPlaces = async (data) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(URL + "search/", {
      params: {
        city_name: data.city_name,
        name: data.name,
      },
      ...config,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const placeService = {
  getPopular,
  SearchPlaces,
};

export default placeService;
