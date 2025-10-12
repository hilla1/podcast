import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'

function SignUp() {
  const { register, handleSubmit } = useForm()
  const { signup } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await signup(data)
      toast.success('Signed up successfully')
      navigate('/')
    } catch (err) {
      toast.error('Error signing up')
    }
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('username', { required: true })} placeholder="Username" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="password" {...register('password', { required: true })} placeholder="Password" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register('premium')} className="form-checkbox" />
          <span>Subscribe to Premium (500 for 4 weeks)</span>
        </label>
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp