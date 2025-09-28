import { useState, useEffect } from 'react';
import { useIdentityContext } from 'react-netlify-identity';
import { Redirect } from 'react-router-dom'; // Uses Redirect for navigation

const Backstage = () => {
  const { user } = useIdentityContext();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch('/.netlify/functions/check-subscription', {
        headers: { Authorization: `Bearer ${user.token.access_token}` },
      })
        .then(res => res.json())
        .then(data => {
          setIsSubscribed(data.subscribed);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (!user || !isSubscribed) return <Redirect to="/subscription" />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Backstage</h1>
      <p>Watch live debates, comment, and contribute.</p>
      <div className="mt-6">
        <iframe src="https://example.com/live-debate" className="w-full h-96" title="Live Debate" />
        <textarea placeholder="Comment..." className="w-full p-2 mt-4 border rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">Contribute</button>
      </div>
    </div>
  );
};

export default Backstage;