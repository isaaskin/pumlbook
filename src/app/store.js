import { configureStore } from '@reduxjs/toolkit'
import mainReducer from '../slices/mainSlice'
import runReducer from '../slices/runSlice'

export default configureStore({
  reducer: {
    main: mainReducer,
    run: runReducer
  }
})
