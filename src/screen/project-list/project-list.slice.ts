import { RootState } from 'store/index';
import { createSlice } from "@reduxjs/toolkit"

interface State {
    projectModalOpen: boolean
}

const initialState: State = {
    projectModalOpen: false
}

export const projectListSlice = createSlice({
    name: 'projectModalOpen',
    initialState,
    reducers: {
        // redux使用immer，创建state副本，在副本上操作
        openProjectModal(state){
            state.projectModalOpen = true
        },
        closeProjectModal(state){
            state.projectModalOpen = false
        }
    }
})

export const projectListActions = projectListSlice.actions

export const selectProjectModalOpen = (state: RootState) => state.projectModal.projectModalOpen