# Library GraphQL API

A GraphQL API for a library application with user authentication.

## Project Structure

```
.
├── models/              # Mongoose models
│   ├── author.js        # Author model
│   ├── book.js          # Book model
│   └── user.js          # User model
├── src/                 # Source code
│   ├── index.js         # Entry point
│   ├── schema/          # GraphQL schema
│   │   └── typeDefs.js  # GraphQL type definitions
│   ├── resolvers/       # GraphQL resolvers
│   │   ├── index.js     # Main resolvers file
│   │   ├── queryResolvers.js    # Query resolvers
│   │   ├── mutationResolvers.js # Mutation resolvers
│   │   └── fieldResolvers.js    # Field resolvers
│   └── utils/           # Utility functions
│       ├── config.js    # Configuration
│       ├── context.js   # GraphQL context
│       └── db.js        # Database connection
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## Features

- GraphQL API for books and authors
- User authentication with JWT
- MongoDB database integration
- Error handling for validation errors

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
4. For development with auto-restart:
   ```
   npm run dev
   ```

## GraphQL API

The GraphQL API is available at http://localhost:4000.

### Queries

- `bookCount`: Get the total number of books
- `authorCount`: Get the total number of authors
- `allBooks`: Get all books with optional author and genre filters
- `allAuthors`: Get all authors
- `me`: Get the current user

### Mutations

- `addBook`: Add a new book (requires authentication)
- `editAuthor`: Edit an author's birth year (requires authentication)
- `createUser`: Create a new user
- `login`: Log in and get a JWT token 