/* eslint-disable */
import React from 'react'

const isMac = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform)
const modKey = isMac ? '⌘' : 'Ctrl'

const SHORTCUTS = [
  { keys: [modKey, 'S'], action: 'Quick Save' },
  { keys: [modKey, 'Enter'], action: 'Run Diagram' },
  { keys: [modKey, 'Shift', 'S'], action: 'Save As...' },
  { keys: ['?'], action: 'Toggle this help' }
]

const ShortcutsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          padding: '30px',
          minWidth: '360px',
          maxWidth: '460px',
          animation: 'fadeIn 0.2s ease'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', color: 'var(--accent-color)', fontFamily: 'var(--pixel-font)' }}>
            ⌨️ Keyboard Shortcuts
          </h2>
          <button
            className="btn-custom"
            style={{ padding: '4px 10px', fontSize: '16px' }}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {SHORTCUTS.map((shortcut, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 12px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                border: '1px solid var(--panel-border)'
              }}
            >
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                {shortcut.action}
              </span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {shortcut.keys.map((key, j) => (
                  <kbd
                    key={j}
                    style={{
                      background: 'rgba(0, 242, 255, 0.1)',
                      border: '1px solid rgba(0, 242, 255, 0.3)',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '12px',
                      fontFamily: 'var(--pixel-font)',
                      color: 'var(--accent-color)',
                      minWidth: '28px',
                      textAlign: 'center'
                    }}
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: 'var(--text-secondary)', opacity: 0.6 }}>
          Press <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: '3px', fontSize: '11px' }}>Esc</kbd> or click outside to close
        </div>
      </div>
    </div>
  )
}

export default ShortcutsModal
