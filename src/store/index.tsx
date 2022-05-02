import { configureStore } from "@reduxjs/toolkit"
import { projectListSlice } from "screen/project-list/project-list.slice"
import { authSlice } from "./auth.slice"

export const rootReducer = {
    projectModal: projectListSlice.reducer,
    auth: authSlice.reducer
}

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>