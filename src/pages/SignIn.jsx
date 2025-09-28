import { useIdentityContext } from 'react-netlify-identity'; // Corrected import
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SignIn = () => {
  const { user } = useIdentityContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
      <button onClick={() => window.netlifyIdentity.open('login')} className="w-full bg-blue-600 text-white py-2 rounded mb-4">
        Sign In
      </button>
      <p className="text-center mt-4">
        Or{' '}
        <button onClick={() => window.netlifyIdentity.open('signup')} className="text-blue-600">
          Sign Up
        </button>{' '}
        for new users.
      </p>
    </div>
  );
};

export default SignIn;