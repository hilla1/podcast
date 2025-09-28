const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../public/data/blog.json');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405 };
  }

  try {
    const { id } = JSON.parse(event.body);
    const posts = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    const post = posts.find(p => p.id === id);
    if (post) {
      post.views += 1;
      fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2));
    }
    return { statusCode: 200 };
  } catch (error) {
    return { statusCode: 500 };
  }
};