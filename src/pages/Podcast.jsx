import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FaPlayCircle } from 'react-icons/fa'

function Podcast() {
  const { data: podcasts = [], isLoading } = useQuery({
    queryKey: ['podcasts'],
    queryFn: () => axios.get('/api/podcasts').then(res => res.data),
  })

  if (isLoading) return <div className="text-center py-12">Loading podcasts...</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Podcasts</h1>
      <ul className="space-y-6">
        {podcasts.map((pod, i) => (
          <li key={i} className="bg-white p-6 shadow-md rounded-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <FaPlayCircle size={48} className="text-blue-600" />
            <div>
              <h3 className="text-xl font-bold mb-2">{pod.title}</h3>
              <p className="text-gray-600 mb-2">{pod.description.substring(0, 150)}...</p>
              <a href={pod.link || pod.enclosure.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Listen Now</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Podcast