import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useIdentityContext } from 'react-netlify-identity';
import { useHistory } from 'react-router-dom'; 
import { useState } from 'react';

const Subscription = () => {
  const { user } = useIdentityContext();
  const history = useHistory(); // Replace useNavigate with useHistory
  const [subscribed, setSubscribed] = useState(false);

  if (!user) return <div>Please <a href="/signin">sign in</a> to subscribe.</div>;

  const createSubscription = (data, actions) => {
    return actions.subscription.create({
      plan_id: 'P-XXXXXX', // Replace with your PayPal plan ID
    });
  };

  const onApprove = (data, actions) => {
    return actions.subscription.get().then((details) => {
      fetch('/.netlify/functions/subscribe-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, subscriptionId: details.id }),
      });
      setSubscribed(true);
      alert('Subscription successful! Access premium content.');
      history.push('/backstage'); // Use history.push instead of navigate
    });
  };

  const handlePesapal = async () => {
    const res = await fetch('/.netlify/functions/pesapal-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 500, userId: user.id }),
    });
    const { url } = await res.json();
    window.location.href = url;
  };

  if (subscribed) return <div>Subscribed! <a href="/backstage">Go to Backstage</a></div>;

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Subscribe for Premium (500 KES/4 weeks)</h1>
      <p className="text-center mb-6">Access backstage lives, top articles, and more.</p>
      <div className="space-y-4">
        <PayPalScriptProvider options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
          <PayPalButtons
            createSubscription={createSubscription}
            onApprove={onApprove}
            style={{ layout: 'vertical' }}
          />
        </PayPalScriptProvider>
        <button onClick={handlePesapal} className="w-full bg-green-600 text-white py-2 rounded">
          Pay with Pesapal
        </button>
      </div>
    </div>
  );
};

export default Subscription;