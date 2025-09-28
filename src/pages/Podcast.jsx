import { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';

const Podcast = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/.netlify/functions/podcast-feed')
      .then(res => res.json())
      .then(data => {
        setEpisodes(data.items || []);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <div className="text-center py-8">Loading podcasts...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Podcast Episodes</h1>
      <div className="space-y-4">
        {episodes.map((episode, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{episode.title}</h2>
            <p className="text-gray-600 mb-2">{episode.contentSnippet}</p>
            <audio controls src={episode.enclosure?.url} className="w-full mb-2">
              Your browser does not support the audio element.
            </audio>
            <a href={episode.link} target="_blank" rel="noopener noreferrer" className="text-blue-600">Listen on Spotify</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podcast;