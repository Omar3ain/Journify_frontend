import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from './reducers/auth/authSlice';
import RecommendationsReducer from './reducers/Expert_Advice/Recommendations/RecommendationSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,

        // Expert Advisor
        recommendations: RecommendationsReducer,
    },
});

export default store;