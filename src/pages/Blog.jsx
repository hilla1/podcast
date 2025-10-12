import { useState } from 'react'
import BlogCard from '../components/BlogCard'
import BlogForm from '../components/BlogForm'
import { useAuth } from '../hooks/useAuth'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

function Blog() {
  const [category, setCategory] = useState('all')
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const { data: blogs = [] } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => axios.get('/api/blogs').then(res => res.data),
  })

  const categories = ['all', 'economy', 'political', 'lifestyle', 'tech']

  const filteredBlogs = blogs.filter(blog => blog.status === 'approved' && (category === 'all' || blog.category === category))

  const mostRead = [...filteredBlogs].sort((a, b) => b.views - a.views).slice(0, 5)

  const submitMutation = useMutation({
    mutationFn: (newBlog) => axios.post('/api/blogs', newBlog),
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
      toast.success('Blog submitted for approval')
    },
    onError: () => toast.error('Error submitting blog')
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Blog</h1>
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-md ${category === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Most Read Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mostRead.map(blog => <BlogCard key={blog._id} blog={blog} />)}
        </div>
      </div>
      {user && (user.role === 'writer' || user.role === 'admin') && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-center">Submit a New Blog</h2>
          <BlogForm onSubmit={submitMutation.mutate} />
        </div>
      )}
    </div>
  )
}

export default Blog