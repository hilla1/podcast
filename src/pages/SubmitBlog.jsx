import { useState } from 'react';
import { useIdentityContext } from 'react-netlify-identity';
import { useHistory } from 'react-router-dom'; // Use useHistory

const SubmitBlog = () => {
  const { user } = useIdentityContext();
  const history = useHistory(); // Replace useNavigate with useHistory
  const [formData, setFormData] = useState({ title: '', description: '', content: '', image: '', category: 'economy', author: '' });
  const [submitting, setSubmitting] = useState(false);

  if (!user) return <div>Please sign in to submit. <button onClick={() => history.push('/signin')}>Sign In</button></div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    formData.author = user.user_metadata.full_name || user.email;
    formData.approved = false;

    try {
      await fetch('/.netlify/functions/submit-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      alert('Submitted for approval!');
      history.push('/blog'); // Use history.push
    } catch (err) {
      alert('Error submitting');
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Submit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Full Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full p-2 border rounded h-40"
          required
        />
        <input
          type="url"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="economy">Economy</option>
          <option value="political">Political</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="tech">Tech</option>
        </select>
        <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-6 py-2 rounded">
          {submitting ? 'Submitting...' : 'Submit for Approval'}
        </button>
      </form>
    </div>
  );
};

export default SubmitBlog;