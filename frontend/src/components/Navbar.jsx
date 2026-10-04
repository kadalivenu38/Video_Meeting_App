import { Link, useLocation } from 'react-router-dom'
import { AstroidIcon, HistoryIcon, LayoutDashboardIcon } from 'lucide-react'
import { dummyUser } from '../assets/asset'
import { UserButton, useUser } from '@clerk/react'

const Navbar = () => {
  const { user, isSignedIn } = useUser();
  const location = useLocation()
  const userName = user?.fullName || user?.firstName || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || "User";

  return (
    <div className='w-full max-w-305 mx-auto bg-white/90 backdrop-blur xl:rounded-b-xl sticky top-0 z-40 px-6
      py-4 flex items-center justify-between border border-slate-200'>
      {/* Brand Logo & Name*/}
      <div className='flex items-center gap-10'>
        <Link to='/dashboard' className='flex items-center gap-1'>
          <img src='/logo.svg' alt='MeetUp Logo' className='size-8' />
          <span className='text-2xl font-bold tracking-tight text-blue-900 flex items-center'>
            MeetUp<span className='text-black font-extrabold'>.</span>
          </span>
        </Link>

        {/* Navigation Links */}
        {isSignedIn && (
          <nav className='hidden md:flex items-center gap-1.5'>
            <Link to='/dashboard' className={`px-3.5 py-1 rounded-full text-sm font-medium transition-all flex items-center gap-1
              ${location.pathname === '/dashboard' ?
                "ring ring-blue-100 bg-blue-50 text-slate-800" :
                "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}
            `}>
              <LayoutDashboardIcon className='size-4' />
              Dashboard
            </Link>

            <Link to='/sessions' className={`px-3.5 py-1 rounded-full text-sm font-medium transition-all flex items-center gap-1
              ${location.pathname === '/sessions' ?
                "ring ring-blue-100 bg-blue-50 text-slate-800" :
                "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}
            `}>
              <HistoryIcon className='size-4' />
              Sessions
            </Link>

            <Link to='/pricing' className={`px-3.5 py-1 rounded-full text-sm font-medium transition-all flex items-center gap-1
              ${location.pathname === '/pricing' ?
                "ring ring-blue-100 bg-blue-50 text-slate-800" :
                "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}
            `}>
              <AstroidIcon className='size-4' />
              Pricing
            </Link>
          </nav>
        )}
      </div>

      {/* Right Profile / User Button */}
      {isSignedIn && (
        <div className='flex items-center gap-4'>
          <Link to='/sessions' className='md:hidden text-xs font-medium text-slate-600 hover:text-primary flex items-center gap-1'>
            <HistoryIcon className='size-4' />
            Sessions
          </Link>
          <span className='font-medium hidden sm:inline tracking-wide text-sm text-slate-700'>Welcome, {userName}</span>
          <UserButton afterSignOutUrl="/login" />
        </div>
      )}
    </div>
  )
}

export default Navbar