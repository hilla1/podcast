import { Link } from 'react-router-dom'

function BlogCard({ blog }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
        <p className="text-gray-600 mb-2">{blog.description.substring(0, 100)}...</p>
        <p className="text-sm text-gray-500 mb-2">Views: {blog.views}</p>
        <Link to={`/blog/${blog.author}/${blog.slug}`} className="text-blue-600 hover:underline font-semibold">Read More</Link>
      </div>
    </div>
  )
}

export default BlogCard