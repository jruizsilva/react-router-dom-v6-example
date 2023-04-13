import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  isAllowed: boolean
  redirectTo?: string
  children?: JSX.Element
}

export function ProtectedRoute({
  isAllowed,
  redirectTo = '/landing',
  children
}: Props) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />
  }
  return children != null ? children : <Outlet />
}
