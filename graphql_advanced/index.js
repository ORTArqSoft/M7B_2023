const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

// Define el esquema de los datos
const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    age: Int
    books: [Book]
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    genre: String
  }

  type Query {
    book(id: ID!): Book
    books: [Book]
    author(id: ID!): Author
    authors: [Author]
  }

  type Mutation {
    addAuthor(name: String!, age: Int): Author
    addBook(title: String!, authorId: ID!, genre: String): Book
  }
`;

// Define los resolvers para los tipos de datos
const resolvers = {
  Query: {
    book: async (_, { id }) => await Book.findById(id),
    books: async () => await Book.find(),
    author: async (_, { id }) => await Author.findById(id),
    authors: async () => await Author.find(),
  },
  Mutation: {
    addAuthor: async (_, { name, age }) => {
      const author = new Author({ name, age });
      await author.save();
      return author;
    },
    addBook: async (_, { title, authorId, genre }) => {
      const author = await Author.findById(authorId);
      if (!author) throw new Error("Autor no encontrado");
      const book = new Book({ title, author, genre });
      await book.save();
      return book;
    },
  },
  Author: {
    books: async (author) => await Book.find({ author: author.id }),
  },
  Book: {
    author: async (book) => await Author.findById(book.author),
  },
};

// Conecta a la base de datos de MongoDB
mongoose
  .connect("mongodb://localhost:27017/library", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error(error));

// Define los modelos para la base de datos
const Author = mongoose.model("Author", {
  name: String,
  age: Number,
});

const Book = mongoose.model("Book", {
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  genre: String,
});

// Crea el servidor de Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Inicia el servidor
server.listen().then(({ url }) => {
  console.log(`Servidor iniciado en ${url}`);
});
