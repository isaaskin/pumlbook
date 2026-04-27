/* eslint-disable */
import * as PlantUmlEncoder from 'plantuml-encoder'
import { loadProjects, saveProject } from '../app/helpers'
import { setPercentage, setSavedData, setTriggerCodeLoad, setUrl, setCurrentProjectId } from '../slices/runSlice'
import { toggleIsSaveDropOpen } from '../slices/mainSlice'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header'
import Main from './Main'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ShortcutsModal from './ShortcutsModal'

const PumlBook = (props) => {
  const code = useSelector(state => state.run.code)
  const isAutoModeEnabled = useSelector(state => state.main.isAutoModeEnabled)
  const triggerCodeLoad = useSelector(state => state.run.triggerCodeLoad)
  const theme = useSelector(state => state.main.theme)
  const currentProjectId = useSelector(state => state.run.currentProjectId)
  const savedData = useSelector(state => state.run.savedData)
  const refInterval = useRef(null)
  const dispatch = useDispatch()
  const isFirstPublished = useRef(false)
  const didLoad = useRef(false)

  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false)

  const onPlayButtonClicked = () => {
    if (!isAutoModeEnabled) {
      publishUrl()
    }
  }

  const onSave = useCallback((projectName) => {
    let savedP;
    const existingProjects = loadProjects()
    const currentP = existingProjects.find(p => p.id === currentProjectId)

    if (currentP && currentP.name === projectName) {
      savedP = saveProject(currentProjectId, projectName, code)
    } else {
      savedP = saveProject(null, projectName, code)
    }

    dispatch(setSavedData(loadProjects()))
    dispatch(setCurrentProjectId(savedP.id))
  }, [code, currentProjectId, dispatch])

  const publishUrl = () => {
    let finalCode = code
    if (theme && finalCode && !finalCode.includes('!theme')) {
      finalCode = finalCode.replace('@startuml', `@startuml\n!theme ${theme}`)
    }
    const generatedUrl = `https://www.plantuml.com/plantuml/svg/${PlantUmlEncoder.encode(finalCode)}`
    dispatch(setUrl(generatedUrl))
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMod = e.metaKey || e.ctrlKey

      // Ctrl+S / Cmd+S → Quick Save
      if (isMod && e.key === 's' && !e.shiftKey) {
        e.preventDefault()
        const currentProject = savedData.find(p => p.id === currentProjectId)
        if (currentProject) {
          onSave(currentProject.name)
        } else {
          dispatch(toggleIsSaveDropOpen(true))
        }
      }

      // Ctrl+Shift+S / Cmd+Shift+S → Save As
      if (isMod && e.key === 's' && e.shiftKey) {
        e.preventDefault()
        dispatch(toggleIsSaveDropOpen(true))
      }

      // Ctrl+Enter / Cmd+Enter → Run
      if (isMod && e.key === 'Enter') {
        e.preventDefault()
        if (!isAutoModeEnabled) {
          publishUrl()
        }
      }

      // ? → Toggle shortcuts modal (only when not typing in an input)
      if (e.key === '?' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        setIsShortcutsOpen(prev => !prev)
      }

      // Esc → Close modals
      if (e.key === 'Escape') {
        setIsShortcutsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [code, currentProjectId, savedData, isAutoModeEnabled, onSave, dispatch])

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
  }, [code, theme])

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
  }, [code, theme, dispatch, isAutoModeEnabled])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
      <Header onPlayButtonClicked={onPlayButtonClicked} onSave={onSave} onShowShortcuts={() => setIsShortcutsOpen(true)} />
      <Main />
      <ShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
    </div>
  )
}

export default PumlBook
