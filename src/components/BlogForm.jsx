import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'

function BlogForm({ onSubmit }) {
  const { register, handleSubmit, reset } = useForm()
  const { user } = useAuth()

  const submit = (data) => {
    if (!user) return toast.error('Login required to submit blog')
    onSubmit({ ...data, author: user.username, slug: data.title.toLowerCase().replace(/\s+/g, '-'), premium: data.premium || false })
    reset()
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4 max-w-2xl mx-auto">
      <input {...register('title', { required: true })} placeholder="Title" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <textarea {...register('description', { required: true })} placeholder="Description" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24" />
      <textarea {...register('content', { required: true })} placeholder="Full Content" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40" />
      <select {...register('category', { required: true })} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="economy">Economy</option>
        <option value="political">Political</option>
        <option value="lifestyle">Lifestyle</option>
        <option value="tech">Tech</option>
      </select>
      <input {...register('image', { required: true })} placeholder="Image URL" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <label className="flex items-center space-x-2">
        <input type="checkbox" {...register('premium')} className="form-checkbox" />
        <span>Premium Content</span>
      </label>
      <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition">Submit for Approval</button>
    </form>
  )
}

export default BlogForm