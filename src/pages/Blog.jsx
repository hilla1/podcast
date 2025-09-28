import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBook, FiUser } from 'react-icons/fi';
import BlogPostCard from '../components/BlogPostCard';

const categories = ['all', 'economy', 'political', 'lifestyle', 'tech'];

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/blog.json') // Initial load; views updated via function
      .then(res => res.json())
      .then(data => {
        // Sort by views for most read
        const sorted = data.sort((a, b) => b.views - a.views);
        setPosts(selectedCategory === 'all' ? sorted : sorted.filter(p => p.category === selectedCategory));
        setLoading(false);
      });
  }, [selectedCategory]);

  if (loading) return <div className="text-center py-8">Loading blog...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center"><FiBook className="mr-2" /> Blog</h1>
      <div className="mb-6">
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} className={`mr-4 px-4 py-2 rounded ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            {cat.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Most Read</h2>
        {posts.slice(0, 3).map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
      <Link to="/submit-blog" className="bg-blue-600 text-white px-4 py-2 rounded">Submit Your Blog</Link>
    </div>
  );
};

export default Blog;