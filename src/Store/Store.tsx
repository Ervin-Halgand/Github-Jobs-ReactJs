import { configureStore } from "@reduxjs/toolkit";
import LandingPageManager from './Reducer/LandingPage'

export default configureStore({
    reducer: {
        LandingPageManager: LandingPageManager
    }
});