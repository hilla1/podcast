import { Link } from 'react-router-dom'

function Support() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Support</h1>
      <p className="text-gray-700 mb-4">For access to backstage streaming and live shows, create an account and subscribe.</p>
      <p className="text-gray-700 mb-4">Subscription: 500 for 4 weeks.</p>
      <div className="text-center">
        <Link to="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">Subscribe Now</Link>
      </div>
    </div>
  )
}

export default Support