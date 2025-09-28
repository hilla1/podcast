import { Link } from 'react-router-dom';

const Support = () => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">Support & Backstage Streaming</h1>
    <p className="mb-4">Access live shows and backstage for 500 KES/month.</p>
    <Link to="/subscription" className="bg-green-600 text-white px-4 py-2 rounded">Subscribe Now</Link>
    <p className="mt-8">For issues, email support@podcast.com</p>
  </div>
);

export default Support;