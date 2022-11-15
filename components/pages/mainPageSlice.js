import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobsList: [],
};

const mainPageSlice = createSlice({
    name: "mainPage",
    initialState,
    reducers: {
        mainPage_getJobsList: (state, action) => {
            state.jobsList = action.payload;
        },
    },
});

const { actions, reducer } = mainPageSlice;

export default reducer;

export const { mainPage_getJobsList } = actions;
