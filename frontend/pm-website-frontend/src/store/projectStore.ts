import { configureStore } from "@reduxjs/toolkit";
import { projectSlice, topicSlice, taskSlice } from "./projectSlice";

const store = configureStore({
   reducer : {
        project : projectSlice.reducer,
        topic : topicSlice.reducer,
        task : taskSlice.reducer
   }
})