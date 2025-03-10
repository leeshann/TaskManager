import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import { TokenProvider } from './contexts/TokenProvider.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <PageNotFound />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/user/dashboard',
    element: <Dashboard />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenProvider>
      <RouterProvider router={router} />
    </TokenProvider>
  </StrictMode>,
)
