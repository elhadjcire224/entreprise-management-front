// src/lib/api.ts
import axios from 'axios'
import { toast } from 'react-hot-toast'

const api = axios.create({
  baseURL: 'http://localhost:3333/api/v1', // Ajustez ceci selon votre configuration
  headers: {
    'Content-Type': 'application/json',
  },
})

// Function to handle logout
const handleLogout = () => {
  localStorage.removeItem('auth_state')
  delete api.defaults.headers.common['Authorization']
  window.dispatchEvent(new Event('logout'))
  // Rediriger vers la page de connexion
  window.location.replace( '/login' )
  console.log('logout force')
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem('auth_state')
    try {
      const { token } = JSON.parse(authData)
      if (token) {
        config.headers['Authorization'] = `Bearer ${token.token}`
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du token:', error)
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.error("Votre session a expiré. Veuillez vous reconnecter.")
      console.log('declanchement de logout')
      handleLogout()
    }
    return Promise.reject(error)
  }
)

export default api
