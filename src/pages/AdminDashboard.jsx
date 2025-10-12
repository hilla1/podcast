import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

function AdminDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: pendingBlogs = [] } = useQuery({
    queryKey: ['pendingBlogs'],
    queryFn: () => axios.get('/api/blogs/pending').then(res => res.data),
  })

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      toast.error('Admin access required')
      navigate('/')
    }
  }, [user, navigate])

  const approveMutation = useMutation({
    mutationFn: (id) => axios.post(`/api/blogs/approve/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['pendingBlogs'])
      queryClient.invalidateQueries(['blogs'])
      toast.success('Blog approved')
    },
    onError: () => toast.error('Error approving blog')
  })

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <h2 className="text-2xl font-bold mb-4">Pending Blogs for Approval</h2>
      <ul className="space-y-6">
        {pendingBlogs.map(blog => (
          <li key={blog._id} className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
            <p className="text-gray-600 mb-2">{blog.description}</p>
            <p className="text-sm text-gray-500 mb-4">Author: {blog.author} | Category: {blog.category}</p>
            <button onClick={() => approveMutation.mutate(blog._id)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">Approve</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminDashboard