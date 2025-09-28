import { useIdentityContext } from 'react-netlify-identity';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Use useHistory instead of useNavigate

const SignIn = () => {
  const { user } = useIdentityContext();
  const history = useHistory(); // Replace useNavigate with useHistory

  useEffect(() => {
    if (user) history.push('/'); // Use history.push instead of navigate
  }, [user, history]);

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