/* eslint-disable react/react-in-jsx-scope */
import './App.css'
import { Provider } from 'react-redux'
import store from './app/store'
import PumlBook from './components/PumlBook'

function App () {
  return (
    <Provider store={store}>
      <PumlBook />
    </Provider>
  )
}

export default App
