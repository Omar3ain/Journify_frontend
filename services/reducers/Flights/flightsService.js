import axios from "axios";
import { API_BASE_URL } from "../../../baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
const URL = `${API_BASE_URL}`;

const getFlights = async (from, to, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
  };
  const response = await axios.get(
    URL + "flights/" + `?from=${from}&to=${to}`,
    config
  );

  return response.data;
};

// const reserveFlight = async (flight, number_seats, token) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `token ${token}`,
//     },
//   };
//   const response = await axios.post(
//     URL + `/${flight.id}reserve/add`,
//     { number_seats },
//     config
//   );

//   return response.data;
// };

const reserveFlight = async (flight, number_seats, action, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
  };
  const response = await axios.patch(
    URL + "flights/" + `${flight.id}/reserve/${action}`,
    { number_seats },
    config
  );

  return response.data;
};

const getReservations = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
  };
  const response = await axios.get(URL + "user/reservations/", config);

  return response.data;
};

const cancelReservation = async (reservation, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
  };
  console.log(reservation.flight.id);
  const response = await axios.delete(
    URL + "flights/" + `${reservation.flight.id}` + "/reserve/remove",
    config
  );
  console.log(response);
  return response.data;
};

const flightsService = {
  getFlights,
  reserveFlight,
  getReservations,
  cancelReservation,
};

export default flightsService;
