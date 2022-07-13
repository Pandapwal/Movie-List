import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import MovieType from '../types/movie'
import type { RootState } from '../store'

interface MovieState {
    list: MovieType[]
    selected: MovieType | undefined
}

const initialState: MovieState = {
    list: [],
    selected: undefined,
}

export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        get: (state, action: PayloadAction<string | undefined>) => {
            if (action.payload) {
                const item = [...state.list].find((item: MovieType) => item.id === action.payload)
                if (item) {
                    state.selected = item
                }
            }
            
        },
        set: (state, action: PayloadAction<MovieType[]>) => {
            if (!state.list || state.list.length === 0) {
                state.list = action.payload
            }
        },
        add: (state, action: PayloadAction<MovieType>) => {
            if (!state.list.indexOf(action.payload)) {
                state.list.push(action.payload)
            }
        },
        edit: (state, action: PayloadAction<MovieType[]>) => {
            // payload[0] is the original Item, payload[1] is the edited version
            if (state.list.indexOf(action.payload[0])) {
                state.list.splice(state.list.indexOf(action.payload[0]), 1)
                state.list.push(action.payload[1])
            }
        },
        remove: (state, action: PayloadAction<string>) => {
            // can't name the reducer 'delete'
            [...state.list].filter((item: MovieType) => item.id !== action.payload)
        },
        clear: (state) => {
            state.list = []
        },
    },
})

export const { get, set, add, edit, remove, clear } = movieSlice.actions

export const movieList = (state: RootState) => state.items.list
export const movieSelected = (state: RootState) => state.items.selected
export default movieSlice.reducer
