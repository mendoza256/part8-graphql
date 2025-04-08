const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');
const connectDB = require('./utils/db');
const context = require('./utils/context');

// Connect to MongoDB
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
}); 