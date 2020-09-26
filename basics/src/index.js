import { GraphQLServer } from 'graphql-yoga';
import db from './db';
import * as resolvers from './resolvers/index';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db,
  },
});

server.start(() => console.log('listening in port 4000'));
