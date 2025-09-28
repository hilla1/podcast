const Parser = require('rss-parser');
const parser = new Parser();

const RSS_URL = 'https://feeds.simplecast.com/8cY5V7qK'; // Replace with your Spotify RSS (e.g., from Anchor.fm)

exports.handler = async (event, context) => {
  try {
    const feed = await parser.parseURL(RSS_URL);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(feed),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch podcast' }),
    };
  }
};