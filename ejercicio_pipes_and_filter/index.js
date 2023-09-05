const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.json());

/*Filtros*/
const getPosts = async (req, res, next) => {
  try {
    const postsResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    req.posts = postsResponse.data;
    next();
  } catch (error) {
    res.status(500).json({ error: "Error al obtener datos de la API externa" });
  }
};

const filterPosts = (req, res, next) => {
  const filteredPosts = req.posts.filter((post) => !post.body.includes("odio"));
  req.filteredPosts = filteredPosts;
  next();
};

const getComments = async (req, res, next) => {
  const comments = [];
  for (const post of req.filteredPosts) {
    const commentsResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
    );
    const postComments = commentsResponse.data;
    comments.push(...postComments);
  }
  req.comments = comments;
  next();
};

const addCommentsToPosts = (req, res) => {
  const postsWithComments = req.filteredPosts.map((post) => ({
    ...post,
    comments: req.comments.filter((comment) => comment.postId === post.id),
  }));
  res.json(postsWithComments);
};

/*Filtros*/

// Definir la ruta con los filtros
app.get("/api/posts", getPosts, filterPosts, getComments, addCommentsToPosts);

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
