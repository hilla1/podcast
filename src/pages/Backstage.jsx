import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Backstage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (!user || !user.premium) {
      toast.error('Premium subscription required')
      navigate('/signup')
    }
  }, [user, navigate])

  const addComment = () => {
    if (!comment.trim()) return
    setComments([...comments, { user: user.username, text: comment }])
    setComment('')
    toast.success('Comment added')
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Backstage (Premium)</h1>
      <p className="text-center mb-6">Watch live debates, comment, and contribute.</p>
      {/* Mock live video */}
      <div className="aspect-w-16 aspect-h-9 mb-6">
        <iframe 
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Mock video, replace with real live stream
          title="Live Debate"
          className="w-full h-full rounded-lg"
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Comments & Contributions</h2>
        <ul className="space-y-4 mb-6">
          {comments.map((c, i) => (
            <li key={i} className="bg-gray-100 p-4 rounded-lg">
              <p className="font-bold text-blue-600">{c.user}</p>
              <p className="text-gray-700">{c.text}</p>
            </li>
          ))}
        </ul>
        <textarea 
          value={comment} 
          onChange={e => setComment(e.target.value)} 
          placeholder="Add your comment or contribution..." 
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 mb-4" 
        />
        <button onClick={addComment} className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition">Submit</button>
      </div>
    </div>
  )
}

export default Backstage