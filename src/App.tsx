import { ProtectedRoute } from 'components/ProtectedRoute'
import {
  AdminPage,
  AnalyticsPage,
  DashboardPage,
  HomePage,
  LandingPage
} from 'pages'
import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

interface Props {}

type PermissionsAllowed = 'analize'
type RolesAllowed = 'admin'

export interface UserState {
  id: string
  name: string
  permissions: PermissionsAllowed[]
  roles: RolesAllowed[]
}

export function App(props: Props) {
  const [user, setUser] = useState<UserState | null>(null)

  const login = () => {
    setUser({
      id: '1',
      name: 'Jon',
      permissions: ['analize'],
      roles: ['admin']
    })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <>
      <BrowserRouter>
        <Navigation />
        {user != null ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login</button>
        )}
        <p>{JSON.stringify(user, null, 2)}</p>

        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/landing' element={<LandingPage />} />
          <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
            <Route path='/home' element={<HomePage />} />
            <Route path='/dashboard' element={<DashboardPage />} />
          </Route>
          <Route
            path='/analytics'
            element={
              <ProtectedRoute
                isAllowed={
                  Boolean(user) &&
                  (user as UserState).permissions.includes('analize')
                }
                redirectTo='/home'
              >
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin'
            element={
              <ProtectedRoute
                isAllowed={
                  Boolean(user) && (user as UserState).roles.includes('admin')
                }
                redirectTo='/home'
              >
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

interface NavItems {
  label: string
  to: string
}

const navItems: NavItems[] = [
  { label: 'Landing', to: '/landing' },
  { label: 'Home', to: '/home' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Admin', to: '/admin' }
]

export function Navigation() {
  return (
    <nav>
      <ul>
        {navItems.map(({ label, to }) => (
          <li key={to}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
