import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIdentityContext } from 'react-netlify-identity'; // Corrected import
import { FiVolume2, FiAlertTriangle } from 'react-icons/fi';
import BlogPostCard from '../components/BlogPostCard';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useIdentityContext();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollCount, setScrollCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollRef = useRef(0);
  const contentRef = useRef(null);
  const utteranceRef = useRef(null);

  useEffect(() => {
    fetch(`/data/blog.json`)
      .then(res => res.json())
      .then(data => {
        const foundPost = data.find(p => p.id === parseInt(id));
        if (foundPost) {
          setPost(foundPost);
          fetch('/.netlify/functions/update-view', {
            method: 'POST',
            body: JSON.stringify({ id: foundPost.id }),
          });
        }
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > scrollRef.current + window.innerHeight) {
        setScrollCount(prev => {
          const newCount = prev + 1;
          if (newCount >= 2 && (!user || post?.isPremium)) {
            navigate('/signin');
          }
          return newCount;
        });
        scrollRef.current = scrollTop;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [user, post, navigate]);

  const toggleAudiobook = () => {
    if (!post) return;
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(post.content);
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
      utteranceRef.current = utterance;
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!post) return <div>Post not found</div>;

  const isPremiumLocked = post.isPremium && !user;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BlogPostCard post={post} />
      <div ref={contentRef} className="prose max-w-none bg-white p-6 rounded-lg shadow">
        {isPremiumLocked ? (
          <div className="text-center py-8">
            <FiAlertTriangle className="mx-auto text-4xl text-yellow-600 mb-4" />
            <p>Premium content. <button onClick={() => navigate('/subscription')} className="text-blue-600">Subscribe now</button></p>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <button onClick={toggleAudiobook} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded">
                <FiVolume2 className="mr-2" /> {isPlaying ? 'Stop Audiobook' : 'Play Audiobook'}
              </button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPost;