const { GraphQLError } = require("graphql");
const Book = require("../../models/book");
const Author = require("../../models/author");

const queryResolvers = {
  bookCount: async () => {
    try {
      return await Book.collection.countDocuments();
    } catch (error) {
      throw new GraphQLError("Error counting books: " + error.message, {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  },
  authorCount: async () => {
    try {
      return await Author.collection.countDocuments();
    } catch (error) {
      throw new GraphQLError("Error counting authors: " + error.message, {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  },
  allBooks: async (root, args) => {
    try {
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) return [];
        return await Book.find({ author: author._id }).populate("author");
      }

      if (args.genre) {
        return await Book.find({ genres: { $in: [args.genre] } }).populate(
          "author"
        );
      }

      return await Book.find({}).populate("author");
    } catch (error) {
      throw new GraphQLError("Error fetching books: " + error.message, {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  },
  allAuthors: async () => {
    try {
      return await Author.find({});
    } catch (error) {
      throw new GraphQLError("Error fetching authors: " + error.message, {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  },
  me: async (root, args, context) => {
    return context.currentUser;
  },
};

module.exports = queryResolvers;
