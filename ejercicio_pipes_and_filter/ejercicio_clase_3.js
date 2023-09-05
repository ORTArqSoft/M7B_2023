const express = require("express");
const axios = require("axios");
const { Pipeline } = require("./pipeline");
const { removeOffensivePosts, addCommentsToPosts } = require("./filters");

const app = express();
const port = 3000;

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

    var pipeline = new Pipeline();
    pipeline.use(removeOffensivePosts);
    pipeline.use(addCommentsToPosts);

    const data = pipeline.run({ comments, posts });

    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
