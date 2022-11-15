import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pageStart: 0,
};

const pagesPanelSlice = createSlice({
    name: "pagesPanel",
    initialState,
    reducers: {
        pagesPanel_plusPageStart: (state, action) => {
            state.pageStart = state.pageStart + action.payload;
        },
        pagesPanel_minusPageStart: (state, action) => {
            state.pageStart = state.pageStart - action.payload;
        },
        pagesPanel_showChosenPageStart: (state, action) => {
            state.pageStart = action.payload;
        },
    },
});

const { actions, reducer } = pagesPanelSlice;

export default reducer;

export const { pagesPanel_plusPageStart, pagesPanel_minusPageStart, pagesPanel_showChosenPageStart } = actions;
