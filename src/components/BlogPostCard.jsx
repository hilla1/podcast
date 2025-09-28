import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

const BlogPostCard = ({ post }) => (
  <div className="bg-white p-4 mb-4 rounded-lg shadow">
    <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded mb-2" />
    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
    <p className="text-gray-600 mb-2">{post.description}</p>
    <div className="flex justify-between items-center">
      <Link to={`/author/${post.author}`} className="flex items-center text-blue-600"><FiUser className="mr-1" /> {post.author}</Link>
      <span className="flex items-center text-gray-500"><FiEye className="mr-1" /> {post.views} views</span>
    </div>
    {post.isPremium && <span className="ml-2 bg-yellow-200 px-2 py-1 rounded text-xs">Premium</span>}
    <Link to={`/blog/${post.id}`} className="block mt-2 text-blue-600">Read More</Link>
  </div>
);

export default BlogPostCard;