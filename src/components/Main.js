/* eslint-disable */
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useRef, useState } from 'react'
import Editor from './Editor'
import Output from './Output'
import SideMenu from './SideMenu'
import SnippetsMenu from './SnippetsMenu'

const MatrixRain = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*'.split('')
    const fontSize = 14
    const columns = w / fontSize
    const drops = []
    for (let x = 0; x < columns; x++) drops[x] = 1

    const draw = () => {
      ctx.fillStyle = 'rgba(11, 12, 16, 0.1)'
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = '#0f0'
      ctx.font = fontSize + 'px monospace'
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
    }
    
    const handleResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)
    const interval = setInterval(draw, 33)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, opacity: 0.3, pointerEvents: 'none' }} />
}


const Main = () => {
  const isSideMenuOpen = useSelector((state) => state.main.isSideMenuOpen)
  const isSnippetsOpen = useSelector((state) => state.main.isSnippetsOpen)
  const isMatrixModeEnabled = useSelector((state) => state.main.isMatrixModeEnabled)
  
  const [editorWidth, setEditorWidth] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const newWidth = (e.clientX / window.innerWidth) * 100
    if (newWidth > 10 && newWidth < 90) setEditorWidth(newWidth)
  }

  const handleMouseUp = () => setIsDragging(false)

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '0 10px 10px 10px', gap: '10px', overflow: 'hidden' }}>
      
      {isMatrixModeEnabled && <MatrixRain />}
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        <div className="glass-panel" style={{ 
          width: isSideMenuOpen ? '300px' : '0px', 
          marginRight: isSideMenuOpen ? '10px' : '0px',
          display: 'flex', 
          flexDirection: 'column', 
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }}>
          <SideMenu />
        </div>

        <div className="glass-panel" style={{ 
          width: isSnippetsOpen ? '250px' : '0px', 
          marginRight: isSnippetsOpen ? '10px' : '0px',
          display: 'flex', 
          flexDirection: 'column', 
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }}>
          <SnippetsMenu />
        </div>

        <div className="glass-panel" style={{ width: `${editorWidth}%`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Editor />
        </div>
        
        <div className={`resizer ${isDragging ? 'dragging' : ''}`} onMouseDown={() => setIsDragging(true)} />

        <div className="glass-panel" style={{ width: `${100 - editorWidth}%`, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
          <Output />
        </div>
      </div>
    </div>
  )
}

export default Main
