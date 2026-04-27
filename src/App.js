/* eslint-disable react/react-in-jsx-scope */
import { Provider } from 'react-redux'
import PumlBook from './components/PumlBook'
import store from './app/store'

function App () {
  return (
    <Provider store={store}>
      <PumlBook />
    </Provider>
  )
}

export default App
