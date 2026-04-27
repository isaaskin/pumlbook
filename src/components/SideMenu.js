/* eslint-disable */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadProjects, removeProject, renameProject } from '../app/helpers'
import { setCodeToBeLoaded, setSavedData, setCurrentProjectId } from '../slices/runSlice'

const SideMenu = () => {
  const savedData = useSelector(state => state.run.savedData)
  const currentProjectId = useSelector(state => state.run.currentProjectId)
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')

  const onCardPlay = (id) => {
    const project = savedData.find(s => s.id === id)
    dispatch(setCodeToBeLoaded(project.code))
    dispatch(setCurrentProjectId(project.id))
  }

  const onCardRemove = (id) => {
    if (window.confirm('Delete this project?')) {
      removeProject(id)
      dispatch(setSavedData(loadProjects()))
      if (currentProjectId === id) dispatch(setCurrentProjectId(null))
    }
  }

  const startRename = (project) => {
    setEditingId(project.id)
    setEditName(project.name)
  }

  const saveRename = (id) => {
    if (editName.trim()) {
      renameProject(id, editName)
      dispatch(setSavedData(loadProjects()))
    }
    setEditingId(null)
  }

  const formatDate = (ts) => {
    return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const filteredData = savedData.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '15px', gap: '10px' }}>
      <h3 style={{ margin: '0', fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 600 }}>Projects</h3>
      
      <input 
        className="input-custom" 
        placeholder="Search projects..." 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)}
        style={{ width: '100%' }}
      />
      
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '5px' }}>
        {filteredData.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-secondary)', fontSize: '14px', whiteSpace: 'normal' }}>
            No projects found.
          </div>
        ) : (
          filteredData.map((project) => (
            <div key={project.id} style={{ 
              background: currentProjectId === project.id ? 'rgba(0, 242, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)', 
              border: '1px solid',
              borderColor: currentProjectId === project.id ? 'var(--accent-color)' : 'var(--panel-border)', 
              borderRadius: '8px', 
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              transition: 'all 0.2s'
            }}>
              {editingId === project.id ? (
                <input 
                  autoFocus
                  className="input-custom" 
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  onBlur={() => saveRename(project.id)}
                  onKeyDown={e => e.key === 'Enter' && saveRename(project.id)}
                  style={{ width: '100%' }}
                />
              ) : (
                <div 
                  style={{ fontWeight: 600, fontSize: '14px', cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  onDoubleClick={() => startRename(project)}
                  title="Double click to rename"
                >
                  {project.name}
                </div>
              )}
              
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                <div>Created: {formatDate(project.createdAt)}</div>
                <div>Updated: {formatDate(project.updatedAt)}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginTop: '4px' }}>
                <button 
                  className="btn-custom" 
                  style={{ flex: 1, justifyContent: 'center', padding: '6px', fontSize: '12px', color: 'var(--danger-color)', borderColor: 'rgba(255,75,75,0.3)' }}
                  onClick={() => onCardRemove(project.id)}
                >
                  Delete
                </button>
                <button 
                  className="btn-custom primary" 
                  style={{ flex: 1, justifyContent: 'center', padding: '6px', fontSize: '12px' }}
                  onClick={() => onCardPlay(project.id)}
                >
                  Load
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default SideMenu
