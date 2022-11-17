import { configureStore } from "@reduxjs/toolkit";

import mainPageSlice from "../components/pages/mainPageSlice";
import pagesPanelSlice from "../components/common/paginationPanel/pagesPanelSlice";

// вирішив використати редакс для зручності використання стейтів у різних компонентах. Зараз це не настільки важливо, але при розширенні може знадобитися.
export const store = configureStore({
    reducer: {
        mainPageSlice,
        pagesPanelSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
});
