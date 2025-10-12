import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FaBars, FaTimes } from 'react-icons/fa'

function Header() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/')
  }

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">PodcastBlog</Link>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <ul className={`md:flex md:space-x-6 ${isOpen ? 'block' : 'hidden'} absolute md:relative bg-blue-600 md:bg-transparent w-full md:w-auto left-0 top-16 md:top-0 p-4 md:p-0 space-y-4 md:space-y-0`}>
          <li><Link to="/" onClick={toggleMenu} className="block">Home</Link></li>
          <li><Link to="/podcast" onClick={toggleMenu} className="block">Podcast</Link></li>
          <li><Link to="/blog" onClick={toggleMenu} className="block">Blog</Link></li>
          <li><Link to="/support" onClick={toggleMenu} className="block">Support</Link></li>
          <li><Link to="/about" onClick={toggleMenu} className="block">About</Link></li>
          {user ? (
            <>
              <li><Link to="/backstage" onClick={toggleMenu} className="block">Backstage</Link></li>
              {user.role === 'admin' && <li><Link to="/admin" onClick={toggleMenu} className="block">Admin</Link></li>}
              <li><button onClick={handleLogout} className="block">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/signin" onClick={toggleMenu} className="block">Sign In</Link></li>
              <li><Link to="/signup" onClick={toggleMenu} className="block">Sign Up</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header