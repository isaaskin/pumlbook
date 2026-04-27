/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import { EditorView, basicSetup } from 'codemirror'
import { keymap } from '@codemirror/view'
import { Compartment, EditorState } from '@codemirror/state'
import { indentWithTab } from '@codemirror/commands'
import { loadCode, saveCode } from '../app/helpers'
import { pumlLanguage, pumlHighlighting } from '../app/pumlLanguage'
import { setCode, setCodeToBeLoaded, setTriggerCodeLoad } from '../slices/runSlice'
import { useDispatch, useSelector } from 'react-redux'

const loadedCode = loadCode() || '@startuml\n\n@enduml'

// --- FUN STUFF ---
const spawnParticle = (x, y) => {
  const particle = document.createElement('div')
  document.body.appendChild(particle)
  const size = Math.random() * 5 + 3
  particle.style.width = `${size}px`
  particle.style.height = `${size}px`
  particle.style.background = ['#66fcf1', '#45a29e', '#ff007f', '#ffea00'][Math.floor(Math.random() * 4)]
  particle.style.position = 'absolute'
  particle.style.left = `${x}px`
  particle.style.top = `${y}px`
  particle.style.borderRadius = '50%'
  particle.style.pointerEvents = 'none'
  particle.style.zIndex = 9999

  const angle = Math.random() * Math.PI * 2
  const velocity = Math.random() * 60 + 20
  const tx = Math.cos(angle) * velocity
  const ty = Math.sin(angle) * velocity - 30

  particle.animate([
    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
    { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
  ], {
    duration: 600 + Math.random() * 400,
    easing: 'cubic-bezier(0, .9, .57, 1)'
  }).onfinish = () => particle.remove()
}

const playTypeSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(400 + Math.random() * 200, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05)
    gain.gain.setValueAtTime(0.1, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.05)
  } catch (e) { }
}
// -----------------

const Editor = () => {
  const refDivEditor = useRef()
  const refEditor = useRef()
  const dispatch = useDispatch()

  const codeToBeLoaded = useSelector(state => state.run.codeToBeLoaded)
  const code = useSelector(state => state.run.code)

  const isPowerModeEnabled = useSelector(state => state.main.isPowerModeEnabled)
  const isAsmrModeEnabled = useSelector(state => state.main.isAsmrModeEnabled)
  const powerModeRef = useRef(isPowerModeEnabled)
  const asmrModeRef = useRef(isAsmrModeEnabled)

  useEffect(() => { powerModeRef.current = isPowerModeEnabled }, [isPowerModeEnabled])
  useEffect(() => { asmrModeRef.current = isAsmrModeEnabled }, [isAsmrModeEnabled])

  const updateEditor = (value) => {
    if (!refEditor.current) return
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
  }, [codeToBeLoaded, dispatch])

  useEffect(() => {
    if (codeValue === '' || codeValue === code) {
      return
    }
    saveCode(codeValue)
    dispatch(setCode(codeValue))
  }, [codeValue, code, dispatch])

  useEffect(() => {
    if (refEditor.current !== undefined) {
      return
    }

    const theme = EditorView.theme({
      '&': {
        height: '100%',
        backgroundColor: 'transparent'
      },
      '&.cm-editor.cm-focused': {
        outline: 'none'
      },
      '.cm-content': {
        color: '#e0e6ed',
        caretColor: '#66fcf1'
      },
      '&.cm-focused .cm-selectionBackground, ::selection': {
        backgroundColor: 'rgba(102, 252, 241, 0.2)',
      },
      '.cm-gutters': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        color: '#6272a4',
        border: 'none',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)'
      },
      '.cm-activeLine': {
        backgroundColor: 'rgba(255, 255, 255, 0.03)'
      },
      '.cm-activeLineGutter': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        color: '#f8f8f2'
      }
    })

    refEditor.current = new EditorView({
      state: EditorState.create({
        doc: loadedCode,
        extensions: [
          basicSetup,
          theme,
          pumlLanguage,
          pumlHighlighting,
          keymap.of([indentWithTab]),
          new Compartment().of(EditorState.tabSize.of(2)),
          EditorView.updateListener.of((update) => {
            setCodeValue(update.state.doc.toString())
            if (update.docChanged) {
              if (asmrModeRef.current) playTypeSound()
              if (powerModeRef.current && update.view) {
                // Spawn particles at cursor
                const pos = update.state.selection.main.head
                const coords = update.view.coordsAtPos(pos)
                if (coords) {
                  for (let i = 0; i < 5; i++) spawnParticle(coords.left, coords.top)
                }
              }
            }
          })
        ]
      }),
      parent: refDivEditor.current
    })

    dispatch(setCode(loadedCode))

  }, [dispatch])

  return (
    <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div
        ref={refDivEditor}
        style={{ flex: 1, overflow: 'auto' }}
      />
    </div>
  )
}

export default Editor
