import { configureStore } from "@reduxjs/toolkit";

import mainPageSlice from "../components/pages/mainPageSlice";
import pagesPanelSlice from "../components/common/paginationPanel/pagesPanelSlice";

export const store = configureStore({
    reducer: {
        mainPageSlice,
        pagesPanelSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
});
