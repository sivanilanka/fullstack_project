import axios from 'axios'

// Helper: read cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true // important to send cookie set by backend
})

// Attach JWT from cookie to Authorization header
api.interceptors.request.use((config) => {
  const token = getCookie('JWT')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
