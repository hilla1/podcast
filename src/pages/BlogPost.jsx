import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AudioPlayer from '../components/AudioPlayer'
import { useAuth } from '../hooks/useAuth'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

function BlogPost() {
  const { author, slug } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [scrollCount, setScrollCount] = useState(0)
  const [comment, setComment] = useState('')

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', author, slug],
    queryFn: () => axios.get(`/api/blogs/${author}/${slug}`).then(res => res.data),
  })

  useEffect(() => {
    if (blog) {
      axios.post(`/api/blogs/view/${blog._id}`)
    }
  }, [blog])

  useEffect(() => {
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollCount(prev => prev + 1)
      }
      lastScrollY = window.scrollY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (scrollCount >= 2 && !user) {
      navigate('/signup')
    }
  }, [scrollCount, user, navigate])

  const commentMutation = useMutation({
    mutationFn: (newComment) => axios.post(`/api/blogs/${blog._id}/comment`, newComment),
    onSuccess: () => {
      queryClient.invalidateQueries(['blog', author, slug])
      setComment('')
      toast.success('Comment added')
    },
    onError: () => toast.error('Error adding comment')
  })

  const handleAddComment = () => {
    if (!user) return toast.error('Login required to comment')
    if (!comment.trim()) return toast.error('Comment cannot be empty')
    commentMutation.mutate({ text: comment })
  }

  if (isLoading) return <div className="text-center py-12">Loading blog...</div>
  if (!blog) return <div className="text-center py-12">Blog not found</div>

  const isPremium = blog.premium
  if (isPremium && (!user || !user.premium)) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Premium Content</h2>
        <p>Please subscribe to access this content.</p>
        <Link to="/signup" className="text-blue-600 hover:underline font-semibold">Subscribe Now</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <img src={blog.image} alt={blog.title} className="w-full h-96 object-cover rounded-lg mb-6" />
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-4 text-lg">{blog.description}</p>
      <p className="text-gray-800 mb-6 whitespace-pre-wrap">{blog.content}</p>
      <AudioPlayer text={blog.content} />
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <ul className="space-y-4">
          {blog.comments.map((c, i) => (
            <li key={i} className="bg-gray-100 p-4 rounded-lg">
              <p className="font-bold text-blue-600">{c.user}</p>
              <p className="text-gray-700">{c.text}</p>
            </li>
          ))}
        </ul>
        {user && (
          <div className="mt-6">
            <textarea 
              value={comment} 
              onChange={e => setComment(e.target.value)} 
              placeholder="Add your comment..." 
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 mb-4" 
            />
            <button onClick={handleAddComment} className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition">Submit Comment</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPost