import { useAuth } from '@clerk/react'
import Loader from './Loader.jsx';
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { isLoaded, isSignedIn } = useAuth();
  if(!isLoaded){
    return <Loader text="Authenticating..."/>
  }
  if(!isSignedIn){
    return <Navigate to="/login" replace/>
  }

  return <Outlet />
}

export default ProtectedRoute