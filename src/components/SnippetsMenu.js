/* eslint-disable */
import { setCodeToBeLoaded } from '../slices/runSlice'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'

const SNIPPETS = [
  {
    name: 'Sequence Diagram',
    icon: '🔀',
    code: '@startuml\nAlice -> Bob: Authentication Request\nBob --> Alice: Authentication Response\n\nAlice -> Bob: Another authentication Request\nAlice <-- Bob: another authentication Response\n@enduml'
  },
  {
    name: 'Use Case',
    icon: '👤',
    code: '@startuml\nleft to right direction\nactor "Food Critic" as fc\nrectangle Restaurant {\n  usecase "Eat Food" as UC1\n  usecase "Pay for Food" as UC2\n  usecase "Drink" as UC3\n}\nfc --> UC1\nfc --> UC2\nfc --> UC3\n@enduml'
  },
  {
    name: 'Class Diagram',
    icon: '📦',
    code: '@startuml\nclass Car {\n  +Engine engine\n  +start()\n}\nclass Engine {\n  +start()\n}\nCar *-- Engine\n@enduml'
  },
  {
    name: 'State Diagram',
    icon: '🔄',
    code: '@startuml\n[*] --> State1\nState1 --> [*]\nState1 : this is a string\nState1 : this is another string\n\nState1 -> State2\nState2 --> [*]\n@enduml'
  },
  {
    name: 'Activity Diagram',
    icon: '🏃',
    code: '@startuml\nstart\n:Read input;\nif (Valid?) then (yes)\n  :Process data;\n  :Save result;\nelse (no)\n  :Show error;\nendif\nstop\n@enduml'
  },
  {
    name: 'Component Diagram',
    icon: '🧱',
    code: '@startuml\npackage "Frontend" {\n  [Web App]\n  [Mobile App]\n}\n\npackage "Backend" {\n  [API Gateway]\n  [Auth Service]\n  [Data Service]\n}\n\ndatabase "DB" {\n  [PostgreSQL]\n}\n\n[Web App] --> [API Gateway]\n[Mobile App] --> [API Gateway]\n[API Gateway] --> [Auth Service]\n[API Gateway] --> [Data Service]\n[Data Service] --> [PostgreSQL]\n@enduml'
  },
  {
    name: 'ER Diagram',
    icon: '🗄️',
    code: '@startuml\nentity "User" as user {\n  *id : int <<PK>>\n  --\n  *name : varchar\n  *email : varchar\n  created_at : timestamp\n}\n\nentity "Post" as post {\n  *id : int <<PK>>\n  --\n  *title : varchar\n  *body : text\n  *user_id : int <<FK>>\n}\n\nuser ||--o{ post\n@enduml'
  },
  {
    name: 'Mind Map',
    icon: '🧠',
    code: '@startmindmap\n* Project\n** Planning\n*** Requirements\n*** Timeline\n** Development\n*** Frontend\n*** Backend\n*** Database\n** Testing\n*** Unit Tests\n*** Integration\n@endmindmap'
  },
  {
    name: 'Gantt Chart',
    icon: '📊',
    code: '@startgantt\nProject starts 2024-01-01\n[Design] lasts 10 days\n[Prototype] lasts 15 days\n[Prototype] starts at [Design]\'s end\n[Testing] lasts 5 days\n[Testing] starts at [Prototype]\'s end\n[Deployment] lasts 3 days\n[Deployment] starts at [Testing]\'s end\n@endgantt'
  }
]

const SnippetsMenu = () => {
  const dispatch = useDispatch()
  const code = useSelector(state => state.run.code)

  const onInsert = (snippetCode) => {
    if (!code || code.trim() === '') {
      dispatch(setCodeToBeLoaded(snippetCode))
    } else {
      if (window.confirm('This will replace your current code. Are you sure?')) {
        dispatch(setCodeToBeLoaded(snippetCode))
      }
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '15px', gap: '10px', overflowY: 'auto' }}>
      <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: 'var(--text-secondary)' }}>Snippets</h3>
      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', opacity: 0.6, marginBottom: '5px' }}>
        Click to insert a template
      </div>

      {SNIPPETS.map((snippet, index) => (
        <div key={index} style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--panel-border)',
          borderRadius: '8px',
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onClick={() => onInsert(snippet.code)}
        onMouseOver={e => {
          e.currentTarget.style.background = 'rgba(0, 242, 255, 0.08)'
          e.currentTarget.style.borderColor = 'rgba(0, 242, 255, 0.3)'
        }}
        onMouseOut={e => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
          e.currentTarget.style.borderColor = 'var(--panel-border)'
        }}
        >
          <span style={{ fontSize: '18px' }}>{snippet.icon}</span>
          <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>{snippet.name}</div>
        </div>
      ))}
    </div>
  )
}

export default SnippetsMenu
