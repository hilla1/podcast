import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useIdentityContext } from 'react-netlify-identity';
import { useEffect } from 'react';
import Home from './pages/Home';
import Podcast from './pages/Podcast';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AuthorPage from './pages/AuthorPage';
import Support from './pages/Support';
import About from './pages/About';
import SignIn from './pages/SignIn';
import Subscription from './pages/Subscription';
import Backstage from './pages/Backstage';
import SubmitBlog from './pages/SubmitBlog';
import { FiHome, FiMic, FiEdit3, FiHeadphones, FiInfo, FiUser } from 'react-icons/fi';

function App() {
  const { user } = useIdentityContext();

  useEffect(() => {
    window.netlifyIdentity.init({ fallback: true }); // Initialize Netlify Identity widget
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-bold text-blue-600">Podcast Platform</Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center space-x-1 hover:text-blue-600"><FiHome /> <span>Home</span></Link>
                <Link to="/podcast" className="flex items-center space-x-1 hover:text-blue-600"><FiMic /> <span>Podcast</span></Link>
                <Link to="/blog" className="flex items-center space-x-1 hover:text-blue-600"><FiEdit3 /> <span>Blog</span></Link>
                <Link to="/support" className="flex items-center space-x-1 hover:text-blue-600"><FiHeadphones /> <span>Support</span></Link>
                <Link to="/about" className="flex items-center space-x-1 hover:text-blue-600"><FiInfo /> <span>About</span></Link>
                {user ? (
                  <span>Welcome, {user.user_metadata.full_name || user.email} <button onClick={() => window.netlifyIdentity.logout()}>Logout</button></span>
                ) : (
                  <Link to="/signin" className="flex items-center space-x-1 hover:text-blue-600"><FiUser /> <span>Sign In</span></Link>
                )}
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/author/:name" element={<AuthorPage />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/backstage" element={<Backstage />} />
          <Route path="/submit-blog" element={<SubmitBlog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;