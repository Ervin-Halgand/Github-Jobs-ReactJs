import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    filterTitle: '',
    filterLocation: '',
    filterType: false,
    isLastActionQuery: false,
    searchQueryToggle: 0
};

const LandingPageManager = createSlice({
    name: 'LandingPageManager',
    initialState,
    reducers: {
        handleTitle: (state, action) => {
            state.filterTitle = action.payload;
        },
        handleLocation: (state, action) => {
            state.filterLocation = action.payload;
        },
        handleType: (state, action) => {
            state.filterType = action.payload;
        },
        reloadSearchQueryNumber: (state) => {
            state.searchQueryToggle = 0;
        },
        toggleSearchQuery: (state) => {
            state.searchQueryToggle += 1;
            if (state.filterTitle.length || state.filterLocation.length || state.filterType)
                state.isLastActionQuery = true;
            else
                state.isLastActionQuery = true;
        },
    }
});
export const { handleTitle, handleLocation, handleType, toggleSearchQuery, reloadSearchQueryNumber } = LandingPageManager.actions;
export const searchQueryToggle = (state: any) => state.LandingPageManager.searchQueryToggle;
export const LandingManager = (state: any) => state.LandingPageManager;
export default LandingPageManager.reducer;