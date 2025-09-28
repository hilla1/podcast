const { Pesapal } = require('pesapaljs-v3');

exports.handler = async function (event, context) {
  const { amount, userId } = JSON.parse(event.body);

  const pesapal = new Pesapal({
    consumerKey: process.env.PESAPAL_CONSUMER_KEY,
    consumerSecret: process.env.PESAPAL_CONSUMER_SECRET,
    environment: 'sandbox', // or 'live'
  });

  try {
    const payment = await pesapal.submitOrder({
      id: `order-${userId}-${Date.now()}`,
      currency: 'KES',
      amount: amount,
      description: 'Podcast Subscription',
      callback_url: `${process.env.VITE_NETLIFY_URL}/subscription`,
      user_id: userId,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: payment.redirect_url }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Payment initiation failed' }),
    };
  }
};