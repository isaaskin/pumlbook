/* eslint-disable react/react-in-jsx-scope */
import { Box, Grommet } from 'grommet'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUrl, setPercentage, setTriggerCodeLoad } from '../slices/runSlice'
import * as PlantUmlEncoder from 'plantuml-encoder'
import Header from './Header'
import Main from './Main'

const PumlBook = (props) => {
  const code = useSelector(state => state.run.code)
  const isAutoModeEnabled = useSelector(state => state.main.isAutoModeEnabled)
  const triggerCodeLoad = useSelector(state => state.run.triggerCodeLoad)
  const refInterval = useRef(null)
  const dispatch = useDispatch()
  const isFirstPublished = useRef(false)

  const onPlayButtonClicked = () => {
    if (!isAutoModeEnabled) {
      publishUrl()
    }
  }

  const publishUrl = () => {
    dispatch(setUrl(`http://www.plantuml.com/plantuml/svg/${PlantUmlEncoder.encode(code)}`))
  }

  useEffect(() => {
    if (triggerCodeLoad) {
      dispatch(setTriggerCodeLoad(false))
      publishUrl()
    }
    if (code === '' || isFirstPublished.current) {
      return
    }
    publishUrl()
    isFirstPublished.current = true
  }, [code])

  useEffect(() => {
    if (!isAutoModeEnabled) {
      return
    }
    let count = 0
    clearInterval(refInterval.current)

    refInterval.current = setInterval(() => {
      count++
      if (count === 100) {
        clearInterval(refInterval.current)
        publishUrl()
        count = 0
      }
      dispatch(setPercentage(count))
    }, 10)
  }, [code, dispatch, isAutoModeEnabled])

  return (
    <Grommet full>
      <Box fill>
        <Header onPlayButtonClicked={onPlayButtonClicked}></Header>
        <Main></Main>
      </Box>
    </Grommet>
  )
}

export default PumlBook
