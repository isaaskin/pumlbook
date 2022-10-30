const saveCode = (value) => {
  localStorage.setItem('code', value)
}

const loadCode = () => {
  return localStorage.getItem('code')
}

const loadProjects = () => {
  if (localStorage.getItem('projects') === '') {
    return []
  }
  return JSON.parse(localStorage.getItem('projects'))
}

const saveProject = (name, code) => {
  localStorage.setItem('projects', JSON.stringify([
    ...loadProjects(),
    { name, code }
  ]))
}

export { saveCode, loadCode, loadProjects, saveProject }
