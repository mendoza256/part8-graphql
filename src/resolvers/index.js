const queryResolvers = require("./queryResolvers");
const mutationResolvers = require("./mutationResolvers");
const fieldResolvers = require("./fieldResolvers");
const { subscriptionResolvers } = require("./subscriptionResolvers");

const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Subscription: subscriptionResolvers,
  ...fieldResolvers,
};

module.exports = resolvers;
