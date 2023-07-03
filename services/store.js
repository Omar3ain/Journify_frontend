import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from "./reducers/auth/authSlice";
import RecommendationsReducer from "./reducers/Expert_Advice/Recommendations/RecommendationSlice";
import customReducer from "./reducers/Expert_Advice/Recommendations/CustomRec";
import journeyPlansReducer from "./reducers/Expert_Advice/JourneyPlans/JourneyPlans";
import flightsReducers from "./reducers/Flights/availableSlice";
import reservationReducers from "./reducers/Flights/reservationsSlice";
import hotelReviewsReducer from "./reducers/Hotels/Reviews";
import hotelReservReducer from "./reducers/Hotels/HotelReservation";
import placeReducer from "./reducers/Places/placeSlice";
// import restaurantReducer from "./reducers/Restaurants/restaurantSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    flights: flightsReducers,
    reservations: reservationReducers,

    // Hotels
    hotels: hotelReviewsReducer,
    hotelsReservations: hotelReservReducer,
    // Expert Advisor
    recommendations: RecommendationsReducer,
    customReducer: customReducer,
    journeyPlans: journeyPlansReducer,

    // Places
    homePlaces: placeReducer,

    // Restaurants
    // restaurants: restaurantReducer,
  },
});

export default store;
