/* eslint-disable react/react-in-jsx-scope */
import { basicSetup, EditorView } from 'codemirror'
import { keymap } from '@codemirror/view'

import { EditorState, Compartment } from '@codemirror/state'
import { indentWithTab } from '@codemirror/commands'
import { Box } from 'grommet'
import { useEffect, useRef, useState } from 'react'
import { loadCode, saveCode } from '../app/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { setCode, setCodeToBeLoaded, setTriggerCodeLoad } from '../slices/runSlice'

const loadedCode = loadCode()

const Editor = (props) => {
  const refDivEditor = useRef()
  const refEditor = useRef()
  const dispatch = useDispatch()

  const codeToBeLoaded = useSelector(state => state.run.codeToBeLoaded)
  const code = useSelector(state => state.run.code)

  const updateEditor = (value) => {
    const state = refEditor.current.state
    refEditor.current.dispatch({ changes: { from: 0, to: state.doc.length, insert: value } })
  }

  const [codeValue, setCodeValue] = useState('')

  useEffect(() => {
    if (codeToBeLoaded === '') {
      return
    }
    updateEditor(codeToBeLoaded)
    dispatch(setTriggerCodeLoad(true))
    dispatch(setCodeToBeLoaded(''))
  }, [codeToBeLoaded])

  useEffect(() => {
    if (codeValue === '' || codeValue === code) {
      return
    }
    saveCode(codeValue)
    dispatch(setCode(codeValue))
  }, [codeValue])

  useEffect(() => {
    if (refEditor.current !== undefined) {
      return
    }

    const theme = EditorView.theme({
      '&': {
        height: '100%',
        backgroundColor: '#0C0C0C'
      },
      '&.cm-editor.cm-focused': {
        outline: 'none'
      },
      '.cm-content': {
        color: '#6FFFB0'
      },
      '&.cm-focused .cm-selectionBackground, ::selection': {
        backgroundColor: '#FFCA58',
        color: '#555555'
      },
      '.cm-gutters': {
        backgroundColor: '#81FCED',
        color: '#333333',
        border: 'none'
      }
    })

    refEditor.current = new EditorView({
      state: EditorState.create({
        doc: loadedCode,
        extensions: [
          basicSetup,
          theme,
          keymap.of([indentWithTab]),
          new Compartment().of(EditorState.tabSize.of(8)),
          EditorView.updateListener.of((v) => {
            setCodeValue(v.state.doc.toString())
          })
        ]
      }),
      parent: refDivEditor.current
    })
  }, [])

  return (
    <Box fill ref={refDivEditor}></Box>
  )
}

export default Editor
