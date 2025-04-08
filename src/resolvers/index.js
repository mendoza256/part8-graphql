const queryResolvers = require('./queryResolvers');
const mutationResolvers = require('./mutationResolvers');
const fieldResolvers = require('./fieldResolvers');

const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  ...fieldResolvers
};

module.exports = resolvers; 