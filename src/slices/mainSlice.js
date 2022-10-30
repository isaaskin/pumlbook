import { createSlice } from '@reduxjs/toolkit'

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    isSideMenuOpen: false,
    savedBooks: [],
    isAutoModeEnabled: false
  },
  reducers: {
    toggleAutoMode: (state) => {
      state.isAutoModeEnabled = !state.isAutoModeEnabled
    },
    toggleSideMenu: (state) => {
      state.isSideMenuOpen = !state.isSideMenuOpen
    },
    initSavedBooks: (state, action) => {
      state.savedBooks = action.payload
    }
  }
})

export const { toggleSideMenu, initSavedBooks, toggleAutoMode } = mainSlice.actions

export default mainSlice.reducer
