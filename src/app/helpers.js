const saveCode = (value) => {
  localStorage.setItem('code', value)
}

const loadCode = () => {
  return localStorage.getItem('code')
}

const loadProjects = () => {
  const projectName = localStorage.getItem('projects')
  if (projectName === '' || projectName === null) {
    return []
  }
  return JSON.parse(localStorage.getItem('projects'))
}

const saveProject = (name, code) => {
  localStorage.setItem('projects', JSON.stringify([
    { name, code },
    ...loadProjects()
  ]))
}

const removeProject = (name) => {
  localStorage.setItem('projects', JSON.stringify(loadProjects().filter(p => p.name !== name)))
}

export { saveCode, loadCode, loadProjects, saveProject, removeProject }
