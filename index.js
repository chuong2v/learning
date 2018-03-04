const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

let typeDefs = [`
type Query {
  hello: String
}

schema {
  query: Query
}`]

let resolvers = {
  Query: {
    hello(root) {
      return 'world';
    }
  }
};

const PORT = 4000;
let schema = makeExecutableSchema({typeDefs, resolvers});
let app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(PORT, () => console.log(`Now browse to localhost:${PORT}/graphiql`));