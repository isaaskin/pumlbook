/* eslint-disable */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Output = () => {
  const url = useSelector(state => state.run.url)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleWheel = (e) => {
    e.preventDefault()
    const newScale = Math.max(0.1, Math.min(5, scale - e.deltaY * 0.005))
    setScale(newScale)
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div 
      style={{ 
        flex: 1, 
        overflow: 'hidden', 
        position: 'relative', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: '5px', zIndex: 100 }}>
        <button className="btn-custom" style={{ padding: '4px 8px' }} onClick={() => setScale(Math.max(0.1, scale - 0.2))}>-</button>
        <button className="btn-custom" style={{ padding: '4px 8px' }} onClick={() => { setScale(1); setPosition({x:0, y:0}) }}>Reset</button>
        <button className="btn-custom" style={{ padding: '4px 8px' }} onClick={() => setScale(scale + 0.2)}>+</button>
      </div>
      
      {!url ? (
        <div style={{ color: 'var(--text-secondary)', animation: 'pulseGlow 2s infinite' }}>
          Start typing to generate diagram...
        </div>
      ) : (
        <img 
          src={url} 
          alt="PlantUML Diagram" 
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.1s ease',
            maxWidth: 'none',
            pointerEvents: 'none',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
          }}
          draggable={false}
        />
      )}
    </div>
  )
}

export default Output
