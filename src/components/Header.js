/* eslint-disable */
import { saveAs } from 'file-saver'
import { setTheme, toggleAutoMode, toggleIsSaveDropOpen, toggleSideMenu, toggleSnippets, togglePowerMode, toggleAsmrMode, toggleMatrixMode } from '../slices/mainSlice'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Logo from './Logo'
import packageJson from '../../package.json'

const THEMES = ['default', 'cerulean', 'mars', 'hacker', 'blueprint', 'sketchy', 'materia', 'superhero']

const shootConfetti = () => {
  const colors = ['#66fcf1', '#ff007f', '#ffea00', '#45a29e']
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div')
    document.body.appendChild(confetti)
    confetti.style.position = 'fixed'
    confetti.style.left = '50%'
    confetti.style.top = '50%'
    confetti.style.width = '8px'
    confetti.style.height = '8px'
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.zIndex = 10000
    confetti.style.pointerEvents = 'none'
    const angle = Math.random() * Math.PI * 2
    const velocity = Math.random() * 20 + 10
    const tx = Math.cos(angle) * velocity * 10
    const ty = Math.sin(angle) * velocity * 10 - 100
    confetti.animate([
      { transform: 'translate(0, 0) scale(1) rotate(0)', opacity: 1 },
      { transform: `translate(${tx}px, ${ty}px) scale(0) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], { duration: 1000 + Math.random() * 500, easing: 'steps(8)' }).onfinish = () => confetti.remove()
  }
}

const Header = ({ onPlayButtonClicked, onSave, onShowShortcuts }) => {
  const isSideMenuOpen = useSelector(state => state.main.isSideMenuOpen)
  const isSnippetsOpen = useSelector(state => state.main.isSnippetsOpen)
  const isAutoModeEnabled = useSelector(state => state.main.isAutoModeEnabled)
  const isSaveDropOpen = useSelector(state => state.main.isSaveDropOpen)
  const percentage = useSelector(state => state.run.percentage)
  const url = useSelector(state => state.run.url)
  const code = useSelector(state => state.run.code)
  const theme = useSelector(state => state.main.theme)
  const currentProjectId = useSelector(state => state.run.currentProjectId)
  const savedData = useSelector(state => state.run.savedData)

  const isPowerModeEnabled = useSelector(state => state.main.isPowerModeEnabled)
  const isAsmrModeEnabled = useSelector(state => state.main.isAsmrModeEnabled)
  const isMatrixModeEnabled = useSelector(state => state.main.isMatrixModeEnabled)

  const currentProject = savedData.find(p => p.id === currentProjectId)
  const currentProjectName = currentProject ? currentProject.name : 'Unnamed Project'

  const [projectName, setProjectName] = useState('')
  const [isFunDropOpen, setIsFunDropOpen] = useState(false)
  const [isDownloadDropOpen, setIsDownloadDropOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [copyStatus, setCopyStatus] = useState('Copy Hash')
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentProject) setProjectName(currentProject.name)
  }, [currentProject])

  const onSaveButtonClicked = () => {
    if (!projectName.trim()) return
    onSave(projectName)
    dispatch(toggleIsSaveDropOpen(false))
    shootConfetti()
  }

  const handleQuickSave = () => {
    if (currentProjectId) {
      onSave(currentProject.name)
      shootConfetti()
    } else {
      dispatch(toggleIsSaveDropOpen(true))
    }
  }

  const handlePngExport = () => {
    const pngUrl = url.replace('/plantuml/svg/', '/plantuml/png/')
    fetch(pngUrl)
      .then(r => r.blob())
      .then(blob => saveAs(blob, 'diagram.png'))
      .catch(() => window.open(pngUrl, '_blank'))
  }

  const handleCopyHash = () => {
    const hash = url.split('/svg/')[1]
    if (hash) {
      navigator.clipboard.writeText(hash)
      setCopyStatus('Copied!')
      setTimeout(() => setCopyStatus('Copy Hash'), 2000)
    }
  }

  const saveAsDropdownUI = isSaveDropOpen && (
    <div className="glass-panel dropdown-menu" style={{ left: 0, right: 'auto', minWidth: '200px', padding: '15px' }}>
      <input
        autoFocus
        className="input-custom"
        placeholder="Project name"
        value={projectName}
        onChange={e => setProjectName(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onSaveButtonClicked()}
      />
      <button className="btn-custom primary" onClick={onSaveButtonClicked}>Save As</button>
    </div>
  )

  const funDropdownUI = isFunDropOpen && (
    <div className="glass-panel dropdown-menu">
      <button className={`btn-custom ${isPowerModeEnabled ? 'active' : ''}`} onClick={() => dispatch(togglePowerMode())}>💥 Power Mode</button>
      <button className={`btn-custom ${isAsmrModeEnabled ? 'active' : ''}`} onClick={() => dispatch(toggleAsmrMode())}>🎹 ASMR Typing</button>
      <button className={`btn-custom ${isMatrixModeEnabled ? 'active' : ''}`} onClick={() => dispatch(toggleMatrixMode())}>👾 Matrix Rain</button>
    </div>
  )

  const downloadDropdownUI = isDownloadDropOpen && (
    <div className="glass-panel dropdown-menu">
      <button className="btn-custom" onClick={() => saveAs(new Blob([code], { type: 'text/plain;charset=utf-8' }), 'code.puml')}>📄 Download .puml</button>
      <button className="btn-custom" onClick={() => fetch(url).then(r => r.text()).then(t => saveAs(new Blob([t], { type: 'image/svg+xml' }), 'chart.svg'))}>🖼️ Download .svg</button>
      <button className="btn-custom" onClick={handlePngExport}>🖼️ Download .png</button>
      <div className="header-menu-divider" />
      <button className="btn-custom" onClick={handleCopyHash}>🔗 {copyStatus}</button>
    </div>
  )

  const mobileDownloadDropdownUI = isDownloadDropOpen && (
    <div className="glass-panel dropdown-menu" style={{ bottom: '110%', top: 'auto', right: 0 }}>
      <button className="btn-custom" onClick={() => saveAs(new Blob([code], { type: 'text/plain;charset=utf-8' }), 'code.puml')}>📄 .puml</button>
      <button className="btn-custom" onClick={() => fetch(url).then(r => r.text()).then(t => saveAs(new Blob([t], { type: 'image/svg+xml' }), 'chart.svg'))}>🖼️ .svg</button>
      <button className="btn-custom" onClick={handlePngExport}>🖼️ .png</button>
      <div className="header-menu-divider" />
      <button className="btn-custom" onClick={handleCopyHash}>🔗 {copyStatus}</button>
    </div>
  )

  return (
    <header className="glass-panel header-bar">

      <div className="header-brand">
        <Logo size={26} />
        <span className="header-brand-name">PumlBook</span>
        <span className="header-brand-version">v{packageJson.version}</span>
      </div>

      <div className="header-actions">
        <button className={`btn-custom ${isSideMenuOpen ? 'active' : ''}`} onClick={() => dispatch(toggleSideMenu())}>
          📂 <span className="btn-text">Projects</span>
        </button>
        <button className={`btn-custom ${isSnippetsOpen ? 'active' : ''}`} onClick={() => dispatch(toggleSnippets())}>
          🧩 <span className="btn-text">Snippets</span>
        </button>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button className="btn-custom" onClick={handleQuickSave} title="Quick Save">
            💾 <span className="btn-text">Save</span>
          </button>
          <button className="btn-icon" onClick={() => dispatch(toggleIsSaveDropOpen())} title="Save As...">▼</button>
          <span className="header-project-name">{currentProjectName}</span>
          {saveAsDropdownUI}
        </div>

        <select
          className="input-custom"
          value={theme}
          onChange={(e) => dispatch(setTheme(e.target.value))}
          style={{ cursor: 'pointer', appearance: 'none', width: '90px', flexShrink: 0 }}
        >
          <option value="">Default</option>
          {THEMES.map(t => t !== 'default' && (
            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>

        <div style={{ position: 'relative' }}>
          <button className={`btn-custom ${isFunDropOpen ? 'active' : ''}`} onClick={() => { setIsFunDropOpen(!isFunDropOpen); setIsDownloadDropOpen(false); }}>
            🔥 <span className="btn-text">Fun</span>
          </button>
          {funDropdownUI}
        </div>
      </div>

      <div className="header-right">
        <button
          className={`btn-custom ${isAutoModeEnabled ? 'active' : ''}`}
          onClick={() => dispatch(toggleAutoMode())}
          title="Auto-Render"
        >
          ⚡ <span className="btn-text">Auto</span>
          {isAutoModeEnabled && (
            <span style={{ width: '30px', height: '3px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${percentage}%`, height: '100%', background: 'var(--accent-color)' }} />
            </span>
          )}
        </button>

        {!isAutoModeEnabled && (
          <button className="btn-custom primary" onClick={onPlayButtonClicked}>▶ <span className="btn-text">Run</span></button>
        )}

        <div style={{ position: 'relative' }}>
          <button className={`btn-custom ${isDownloadDropOpen ? 'active' : ''}`} onClick={() => { setIsDownloadDropOpen(!isDownloadDropOpen); setIsFunDropOpen(false); }}>
            📥 <span className="btn-text">Download</span>
          </button>
          {downloadDropdownUI}
        </div>

        {onShowShortcuts && (
          <button className="btn-icon" onClick={onShowShortcuts} title="Keyboard Shortcuts">⌨️</button>
        )}
      </div>

      <button className="btn-icon header-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      {isMobileMenuOpen && (
        <div className="header-mobile-menu">
          <div className="header-menu-row">
            <button className={`btn-custom ${isSideMenuOpen ? 'active' : ''}`} onClick={() => dispatch(toggleSideMenu())}>
              📂 <span className="btn-text">Projects</span>
            </button>
            <button className={`btn-custom ${isSnippetsOpen ? 'active' : ''}`} onClick={() => dispatch(toggleSnippets())}>
              🧩 <span className="btn-text">Snippets</span>
            </button>
          </div>

          <div className="header-menu-row" style={{ position: 'relative' }}>
            <button className="btn-custom" onClick={handleQuickSave} title="Quick Save" style={{ flex: 2 }}>
              💾 <span className="btn-text">Save</span>
            </button>
            <button className="btn-custom" onClick={() => dispatch(toggleIsSaveDropOpen())} title="Save As..." style={{ flex: 1 }}>
              ▼ <span className="btn-text">Save As</span>
            </button>
            {saveAsDropdownUI}
          </div>

          <div className="header-menu-divider" />

          <div className="header-menu-row">
            <select
              className="input-custom"
              value={theme}
              onChange={(e) => dispatch(setTheme(e.target.value))}
              style={{ cursor: 'pointer', appearance: 'none', flex: 1 }}
            >
              <option value="">Default</option>
              {THEMES.map(t => t !== 'default' && (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
            <div style={{ position: 'relative' }}>
              <button className={`btn-custom ${isFunDropOpen ? 'active' : ''}`} onClick={() => { setIsFunDropOpen(!isFunDropOpen); setIsDownloadDropOpen(false); }}>
                🔥 <span className="btn-text">Fun</span>
              </button>
              {funDropdownUI}
            </div>
          </div>

          <div className="header-menu-divider" />

          <div className="header-menu-row">
            <button
              className={`btn-custom ${isAutoModeEnabled ? 'active' : ''}`}
              onClick={() => dispatch(toggleAutoMode())}
              style={{ flex: 1 }}
            >
              ⚡ <span className="btn-text">Auto</span>
            </button>
            {!isAutoModeEnabled && (
              <button className="btn-custom primary" onClick={onPlayButtonClicked} style={{ flex: 1 }}>▶ <span className="btn-text">Run</span></button>
            )}
            <div style={{ position: 'relative', flex: 1 }}>
              <button className={`btn-custom ${isDownloadDropOpen ? 'active' : ''}`} onClick={() => { setIsDownloadDropOpen(!isDownloadDropOpen); setIsFunDropOpen(false); }} style={{ width: '100%' }}>
                📥 <span className="btn-text">Get</span>
              </button>
              {mobileDownloadDropdownUI}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

Header.propTypes = {
  onPlayButtonClicked: PropTypes.func,
  onSave: PropTypes.func,
  onShowShortcuts: PropTypes.func
}

export default Header
