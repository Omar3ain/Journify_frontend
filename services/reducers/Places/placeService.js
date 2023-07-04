import axios from "axios";
import { API_BASE_URL } from "../../../baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
const URL = `${API_BASE_URL}place/`;

const getPopular = async (data) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const storedPlaces = await AsyncStorage.getItem("popularPlaces");
    let popularPlaces = storedPlaces === null ? [] : storedPlaces;
    if (popularPlaces.length) {
      popularPlaces = JSON.parse(popularPlaces);

      let obj = popularPlaces.find((p) => p.city_name === data.city_name);
      if (obj) {
        return obj["places"];
      }
    }

    const response = await axios.get(URL + "popular/", {
      params: {
        city_name: data.city_name,
        lat: data.lat,
        lon: data.lon,
      },
      ...config,
    });
    if (response.data) {
      if (response.data.length) {
        let obj = popularPlaces.find((p) => p.city_name === data.city_name);
        if (!obj) {
          popularPlaces.push({ city_name: data.city_name, places: response.data });
        }
        await AsyncStorage.setItem(
          "popularPlaces",
          JSON.stringify(popularPlaces)
        );
      }
      await AsyncStorage.setItem("city", data.city_name);
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
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
        lat: data.lat,
        lon: data.lon,
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
