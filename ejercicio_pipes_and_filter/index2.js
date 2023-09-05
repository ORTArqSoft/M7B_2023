const express = require("express");
const axios = require("axios");
const Pipeline = require("pipes-and-filters");
const pipeline = Pipeline.create("Filtrado de posts");

const app = express();
const port = 3000;

const removeOffensivePosts = (input, next) => {
  input.posts.filter((post) => !post.body.includes("odio"));
  next(null, input);
};

const addCommentsToPosts = (input, next) => {
  input.posts.map((post) => {
    post.comments = input.comments.filter(
      (comment) => comment.postId === post.id
    );
    return post;
  });
  next(null, input);
};

pipeline.use(removeOffensivePosts);
pipeline.use(addCommentsToPosts);

app.get("/api/posts", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const posts = response.data;

    const commentsResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    const comments = commentsResponse.data;

    pipeline.execute({ posts, comments });

    // error handler, si hay error se corta la canalización.
    pipeline.once("error", function (err) {
      res.send({ error: err.toString() });
    });

    // end handler, para recibir una notificación cuando se complete la canalización.
    pipeline.once("end", function (result) {
      res.json(result);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
