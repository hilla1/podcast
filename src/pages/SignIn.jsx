import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'

function SignIn() {
  const { register, handleSubmit } = useForm()
  const { login } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await login(data)
      toast.success('Logged in successfully')
      navigate('/')
    } catch (err) {
      toast.error('Invalid credentials')
    }
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('username', { required: true })} placeholder="Username" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="password" {...register('password', { required: true })} placeholder="Password" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition">Sign In</button>
      </form>
    </div>
  )
}

export default SignIn