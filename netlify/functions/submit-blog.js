const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../public/data/blog.json'); // Adjust for Netlify path

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const posts = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    const newPost = { ...data, id: posts.length + 1, views: 0 };
    posts.push(newPost);
    fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2));

    // In prod, email for approval or use queue
    console.log('Submitted for approval:', newPost.title);

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to submit' }),
    };
  }
};