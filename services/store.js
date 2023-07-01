import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from "./reducers/auth/authSlice";
import RecommendationsReducer from "./reducers/Expert_Advice/Recommendations/RecommendationSlice";
import customReducer from "./reducers/Expert_Advice/Recommendations/CustomRec";
import journeyPlansReducer from "./reducers/Expert_Advice/JourneyPlans/JourneyPlans";
import flightsReducers from "./reducers/Flights/availableSlice";
import reservationReducers from "./reducers/Flights/reservationsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    flights: flightsReducers,
    reservations: reservationReducers,

    // Expert Advisor
    recommendations: RecommendationsReducer,
    customReducer: customReducer,
    journeyPlans: journeyPlansReducer,
  },
});

export default store;
