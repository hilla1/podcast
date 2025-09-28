import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Home = () => (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold text-center mb-8">Welcome to Podcast Platform</h1>
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Podcasts</h2>
        <p>Listen to amazing episodes from Spotify.</p>
        <Link to="/podcast" className="flex items-center mt-4 text-blue-600"><span>Explore</span> <FiArrowRight className="ml-2" /></Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Blog</h2>
        <p>Read and write on economy, tech, and more.</p>
        <Link to="/blog" className="flex items-center mt-4 text-blue-600"><span>Read Now</span> <FiArrowRight className="ml-2" /></Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Backstage</h2>
        <p>Premium live debates and contributions.</p>
        <Link to="/subscription" className="flex items-center mt-4 text-blue-600"><span>Subscribe</span> <FiArrowRight className="ml-2" /></Link>
      </div>
    </div>
  </div>
);

export default Home;