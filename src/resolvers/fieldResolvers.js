const { GraphQLError } = require('graphql');
const Book = require('../../models/book');
const Author = require('../../models/author');

const fieldResolvers = {
  Author: {
    bookCount: async (root) => {
      try {
        return await Book.collection.countDocuments({ author: root._id });
      } catch (error) {
        throw new GraphQLError('Error counting author books: ' + error.message, {
          extensions: { code: 'INTERNAL_SERVER_ERROR' }
        });
      }
    }
  },
  Book: {
    author: async (root) => {
      try {
        return await Author.findById(root.author);
      } catch (error) {
        throw new GraphQLError('Error fetching book author: ' + error.message, {
          extensions: { code: 'INTERNAL_SERVER_ERROR' }
        });
      }
    }
  }
};

module.exports = fieldResolvers; 