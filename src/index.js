const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./resolvers");
const connectDB = require("./utils/db");
const context = require("./utils/context");

// Connect to MongoDB
connectDB();

// Logging plugin
const loggingPlugin = {
  async requestDidStart(requestContext) {
    console.log("Request started! Query:\n" + requestContext.request.query);

    return {
      async parsingDidStart() {
        console.log("Parsing started!");
      },
      async validationDidStart() {
        console.log("Validation started!");
      },
      async executionDidStart() {
        console.log("Execution started!");
      },
      async willSendResponse(requestContext) {
        console.log("Response sent:", requestContext.response.body);
      },
      async didEncounterErrors(requestContext) {
        console.log("Errors:", requestContext.errors);
      },
    };
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [loggingPlugin],
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context,
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
