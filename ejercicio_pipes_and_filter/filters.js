const removeOffensivePosts = (input) => {
  input.posts.filter((post) => !post.body.includes("odio"));
  return input;
};

const addCommentsToPosts = (input) => {
  input.posts.map((post) => {
    post.comments = input.comments.filter(
      (comment) => comment.postId === post.id
    );
    return post;
  });
  return input;
};

module.exports = { removeOffensivePosts, addCommentsToPosts };
