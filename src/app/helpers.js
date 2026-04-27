const saveCode = (value) => {
  localStorage.setItem('code', value)
}

const loadCode = () => {
  return localStorage.getItem('code') || ''
}

const loadProjects = () => {
  const data = localStorage.getItem('projects')
  if (!data) return []
  let projects = JSON.parse(data)
  // Migrate old projects
  projects = projects.map(p => ({
    id: p.id || p.name + Date.now().toString(),
    name: p.name,
    code: p.code,
    createdAt: p.createdAt || Date.now(),
    updatedAt: p.updatedAt || Date.now()
  }))
  return projects.sort((a, b) => b.updatedAt - a.updatedAt)
}

const saveProject = (id, name, code) => {
  const existing = loadProjects()
  let project = existing.find(p => p.id === id || p.name === name)
  if (project) {
    project.name = name
    project.code = code
    project.updatedAt = Date.now()
  } else {
    project = {
      id: id || Date.now().toString(),
      name,
      code,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    existing.push(project)
  }
  localStorage.setItem('projects', JSON.stringify(existing))
  return project
}

const renameProject = (id, newName) => {
  const existing = loadProjects()
  const project = existing.find(p => p.id === id)
  if (project) {
    project.name = newName
    project.updatedAt = Date.now()
    localStorage.setItem('projects', JSON.stringify(existing))
  }
}

const removeProject = (id) => {
  localStorage.setItem('projects', JSON.stringify(loadProjects().filter(p => p.id !== id)))
}

export { saveCode, loadCode, loadProjects, saveProject, renameProject, removeProject }
