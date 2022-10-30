import { createSlice } from '@reduxjs/toolkit'

export const runSlice = createSlice({
  name: 'run',
  initialState: {
    code: '',
    codeToBeLoaded: '',
    percentage: 0,
    url: '',
    triggerCodeLoad: false
  },
  reducers: {
    setPercentage: (state, action) => {
      state.percentage = action.payload
    },
    setCode: (state, action) => {
      state.code = action.payload
    },
    setUrl: (state, action) => {
      state.url = action.payload
    },
    setCodeToBeLoaded: (state, action) => {
      state.codeToBeLoaded = action.payload
    },
    setTriggerCodeLoad: (state, action) => {
      state.triggerCodeLoad = action.payload
    }
  }
})

export const { setPercentage, setCode, setUrl, setCodeToBeLoaded, setTriggerCodeLoad } = runSlice.actions

export default runSlice.reducer
