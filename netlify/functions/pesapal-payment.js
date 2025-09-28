// Requires pesapaljs-v3: npm i pesapaljs-v3
// But for now, placeholder - replace with actual API call
const Pesapal = require('pesapaljs-v3'); // Adjust import

exports.handler = async (event) => {
  const { amount, userId } = JSON.parse(event.body);
  // Pesapal setup with your keys
  const pesapal = new Pesapal({
    consumerKey: process.env.PESAPAL_CONSUMER_KEY,
    consumerSecret: process.env.PESAPAL_CONSUMER_SECRET,
  });

  try {
    const order = await pesapal.submitOrder({
      amount: amount,
      description: 'Premium Subscription',
      callback_url: `${process.env.NETLIFY_URL}/subscription/callback`,
      notification_id: 12345, // IPN
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ url: order.redirect_url }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error }) };
  }
};