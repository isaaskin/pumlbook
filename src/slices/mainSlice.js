import { createSlice } from '@reduxjs/toolkit'

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    isSideMenuOpen: false,
    savedBooks: [],
    isAutoModeEnabled: false,
    isSaveDropOpen: false
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
    },
    toggleIsSaveDropOpen: (state, action) => {
      if (action.payload !== undefined) {
        state.isSaveDropOpen = action.payload
        return
      }
      state.isSaveDropOpen = !state.isSaveDropOpen
    }
  }
})

export const { toggleSideMenu, initSavedBooks, toggleAutoMode, toggleIsSaveDropOpen } = mainSlice.actions

export default mainSlice.reducer
