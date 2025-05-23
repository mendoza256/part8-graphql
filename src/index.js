const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const express = require("express");
const http = require("http");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./resolvers");
const connectDB = require("./utils/db");
const context = require("./utils/context");
const cors = require("cors");

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

const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  // Create WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  // Use the WebSocket server with GraphQL
  useServer({ schema: server.schema }, wsServer);

  // Start Apollo Server
  await server.start();

  // Root route handler
  app.get("/", (req, res) => {
    res.redirect("/graphql");
  });

  // Apply middleware
  app.use(express.json());
  app.use(cors());

  // Apply Apollo middleware
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => context({ req }),
    })
  );

  // Start HTTP server
  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
    console.log(`Subscriptions ready at ws://localhost:${PORT}/graphql`);
  });
};

startServer();
