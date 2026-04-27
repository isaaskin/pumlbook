import { createSlice } from '@reduxjs/toolkit'

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    isSideMenuOpen: false,
    isSnippetsOpen: false,
    savedBooks: [],
    isAutoModeEnabled: true,
    isSaveDropOpen: false,
    theme: '',
    isPowerModeEnabled: false,
    isAsmrModeEnabled: false,
    isMatrixModeEnabled: false
  },
  reducers: {
    toggleAutoMode: (state) => {
      state.isAutoModeEnabled = !state.isAutoModeEnabled
    },
    toggleSideMenu: (state) => {
      state.isSideMenuOpen = !state.isSideMenuOpen
      if (state.isSideMenuOpen) state.isSnippetsOpen = false
    },
    toggleSnippets: (state) => {
      state.isSnippetsOpen = !state.isSnippetsOpen
      if (state.isSnippetsOpen) state.isSideMenuOpen = false
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
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    togglePowerMode: (state) => {
      state.isPowerModeEnabled = !state.isPowerModeEnabled
    },
    toggleAsmrMode: (state) => {
      state.isAsmrModeEnabled = !state.isAsmrModeEnabled
    },
    toggleMatrixMode: (state) => {
      state.isMatrixModeEnabled = !state.isMatrixModeEnabled
    }
  }
})

export const { toggleSideMenu, toggleSnippets, initSavedBooks, toggleAutoMode, toggleIsSaveDropOpen, setTheme, togglePowerMode, toggleAsmrMode, toggleMatrixMode } = mainSlice.actions

export default mainSlice.reducer
