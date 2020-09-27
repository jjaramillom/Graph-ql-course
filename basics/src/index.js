import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import * as resolvers from './resolvers/index';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db,
    pubsub,
  },
});

server.start(() => console.log('listening in port 4000'));
