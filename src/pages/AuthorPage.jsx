import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BlogPostCard from '../components/BlogPostCard';

const AuthorPage = () => {
  const { name } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/blog.json')
      .then(res => res.json())
      .then(data => {
        const authorPosts = data.filter(p => p.author.toLowerCase() === name.toLowerCase());
        setPosts(authorPosts);
        setLoading(false);
      });
  }, [name]);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Posts by {name}</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default AuthorPage;