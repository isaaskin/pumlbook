/* eslint-disable react/react-in-jsx-scope */
import * as PlantUmlEncoder from 'plantuml-encoder'
import { Box, Grommet } from 'grommet'
import { loadProjects, saveProject } from '../app/helpers'
import { setPercentage, setSavedData, setTriggerCodeLoad, setUrl } from '../slices/runSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import Header from './Header'
import Main from './Main'

const theme = {
  global: {
    focus: {
      outline: {
        color: 'accent-3'
      }
    }
  }
}

const PumlBook = (props) => {
  const code = useSelector(state => state.run.code)
  const isAutoModeEnabled = useSelector(state => state.main.isAutoModeEnabled)
  const triggerCodeLoad = useSelector(state => state.run.triggerCodeLoad)
  const refInterval = useRef(null)
  const dispatch = useDispatch()
  const isFirstPublished = useRef(false)
  const didLoad = useRef(false)

  const onPlayButtonClicked = () => {
    if (!isAutoModeEnabled) {
      publishUrl()
    }
  }

  const onSave = (projectName) => {
    saveProject(projectName, code)
    dispatch(setSavedData(loadProjects()))
  }

  const publishUrl = () => {
    dispatch(setUrl(`http://www.plantuml.com/plantuml/svg/${PlantUmlEncoder.encode(code)}`))
  }

  useEffect(() => {
    if (!didLoad.current) {
      didLoad.current = true
      dispatch(setSavedData(loadProjects()))
    }
  }, [])

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
    <Grommet full theme={theme}>
      <Box fill>
        <Header onPlayButtonClicked={onPlayButtonClicked}
          onSave={onSave}></Header>
        <Main></Main>
      </Box>
    </Grommet>
  )
}

export default PumlBook
