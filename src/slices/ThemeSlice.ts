import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

enum ThemeEnum {
    LIGHT,
    DARK,
}

interface ThemeState {
    value: ThemeEnum.LIGHT
}

const initialState: ThemeState = {
    value: 0,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        change: (state, action: PayloadAction<number>) => {
            if (ThemeEnum[action.payload]) {
                state.value = action.payload
            }
        },
    },
})

export const { change } = themeSlice.actions

export const activeTheme = (state: RootState) => state.theme.value
export default themeSlice.reducer
