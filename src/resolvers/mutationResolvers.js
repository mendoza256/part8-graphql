const { GraphQLError } = require("graphql");
const Book = require("../../models/book");
const Author = require("../../models/author");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const mutationResolvers = {
  addBook: async (root, args, context) => {
    if (!context.currentUser) {
      throw new GraphQLError("Not authenticated", {
        extensions: { code: "NOT_AUTHENTICATED" },
      });
    }

    try {
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError("Invalid author name: " + error.message, {
            extensions: { code: "BAD_USER_INPUT" },
          });
        }
      }

      const book = new Book({ ...args, author: author._id });
      try {
        await book.save();
        return Book.findById(book._id).populate("author");
      } catch (error) {
        throw new GraphQLError("Invalid book data: " + error.message, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }
      throw new GraphQLError("Error adding book: " + error.message, {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  },
  editAuthor: async (root, args, context) => {
    if (!context.currentUser) {
      throw new GraphQLError("Not authenticated", {
        extensions: { code: "NOT_AUTHENTICATED" },
      });
    }

    try {
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }

      author.born = args.setBornTo;
      try {
        return await author.save();
      } catch (error) {
        throw new GraphQLError("Invalid author data: " + error.message, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }
      throw new GraphQLError("Error editing author: " + error.message, {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  },
  createUser: async (root, args) => {
    try {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save();
    } catch (error) {
      throw new GraphQLError("Error creating user: " + error.message, {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }
  },
  login: async (root, args) => {
    try {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("Wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }
      throw new GraphQLError("Error logging in: " + error.message, {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  },
};

module.exports = mutationResolvers;
