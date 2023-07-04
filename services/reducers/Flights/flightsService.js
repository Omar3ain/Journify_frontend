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

const reserveFlight = async (flight, number_seats, action, flightClass, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
  };
  const response = await axios.post(
    URL + "flights/" + `${flight.id}/reserve/${action}/`,
    { number_seats, flightClass },
    config
  );

  return response.data;
};

const reserveUpdate = async (flight, action, status, paymentId, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
  };
  const response = await axios.patch(
    URL + "flights/" + `${flight.id}/reserve/${action}/`,
    { status, paymentId },
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
  const response = await axios.delete(
    URL + "flights/" + `${reservation.flight.id}` + "/reserve/remove",
    config
  );
  return response.data;
};

const flightsService = {
  getFlights,
  reserveFlight,
  getReservations,
  cancelReservation,
  reserveUpdate
};

export default flightsService;
