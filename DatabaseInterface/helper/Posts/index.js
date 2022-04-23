const { readPost } = require('./readPost');
const { readPosts } = require('./readPosts');
const { createPost } = require('./createPost');
const { deletePost } = require('./deletePost');
const { updatePost } = require('./updatePost');

module.exports = {
  readPost,
  readPosts,
  createPost,
  deletePost,
  updatePost
};