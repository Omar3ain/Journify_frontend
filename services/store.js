import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from './reducers/auth/authSlice';
import RecommendationsReducer from './reducers/Expert_Advice/Recommendations/RecommendationSlice'
import customReducer from './reducers/Expert_Advice/Recommendations/CustomRec'
import journeyPlansReducer from './reducers/Expert_Advice/JourneyPlans/JourneyPlans'


const store = configureStore({
    reducer: {
        auth: authReducer,

        // Expert Advisor
        recommendations: RecommendationsReducer,
        customReducer: customReducer,
        journeyPlans: journeyPlansReducer,

    },
});

export default store;