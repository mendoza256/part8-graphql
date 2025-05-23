const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const BOOK_ADDED = "BOOK_ADDED";

const subscriptionResolvers = {
  bookAdded: {
    subscribe: () => pubsub.asyncIterator([BOOK_ADDED]),
  },
};

module.exports = {
  subscriptionResolvers,
  pubsub,
  BOOK_ADDED,
};
