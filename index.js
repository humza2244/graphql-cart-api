const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolver');

// Start the Apollo GraphQL server
const server = new ApolloServer({
  typeDefs,       // your schema (the menu)
  resolvers,      // your logic (the kitchen)
  context: ({ req }) => {
    // this runs on every request and gives you the token
    const auth = req.headers.authorization || '';
    const token = auth.replace('Bearer ', '');

    if (!token) throw new Error('Unauthorized');
    return { userToken: token }; // sent to every resolver
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
