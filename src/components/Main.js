/* eslint-disable react/react-in-jsx-scope */
import { Box, Collapsible } from 'grommet'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initSavedBooks } from '../slices/mainSlice'
import Editor from './Editor'
import Output from './Output'
import SideMenu from './SideMenu'

const Main = (props) => {
  const isOpen = useSelector((state) => state.main.isSideMenuOpen)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initSavedBooks([1, 2, 3, 4]))
  }, [])

  return (
    <Box direction='row'
      fill
    >
      <Collapsible
        open={isOpen}
        direction="horizontal"
      >
        <SideMenu></SideMenu>
      </Collapsible>
      <Box
      wrap
      direction='row-responsive'
      fill>
        <Box flex fill>
          <Editor></Editor>
        </Box>
        <Box flex fill>
          <Output></Output>
        </Box>
      </Box>
    </Box>
  )
}

export default Main
