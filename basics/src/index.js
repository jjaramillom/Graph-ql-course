import { GraphQLServer } from 'graphql-yoga';

// Demo user data
const USERS = [
  { id: '1', name: 'Jacobo', email: 'jac@123.com', age: 28 },
  { id: '2', name: 'Manuel', email: 'man@123.com', age: 23 },
  { id: '3', name: 'Juan', email: 'jvjc@123.com' },
  { id: '4', name: 'Pedro', email: 'per@123.com' },
];

// Demo post data
const POSTS = [
  {
    id: '11',
    title: 'Post 1',
    body: 'Body from post 1 test ace',
    published: true,
    author: '1',
  },
  {
    id: '21',
    title: 'Post 2 cool title',
    body: 'Body from post 2',
    published: true,
    author: '3',
  },
  {
    id: '31',
    title: 'Post 3',
    body: 'Body from post 3 testing',
    published: false,
    author: '2',
  },
  {
    id: '41',
    title: 'Post 4 big title',
    body: 'Body from post 4',
    published: true,
    author: '4',
  },
];

// Demo comment data
const COMMENTS = [
  { id: '111', text: "Hi, I'm a comment, and this is random burger", author: '1', post: '11' },
  { id: '112', text: "Hi, I'm a comment, and this is random dog", author: '4', post: '31' },
  { id: '113', text: "Hi, I'm a comment, and this is random pizza", author: '3', post: '21' },
  { id: '114', text: "Hi, I'm a comment, and this is random cat", author: '2', post: '41' },
  { id: '115', text: "Hi, I'm a comment, and this is random Space", author: '2', post: '21' },
  { id: '116', text: "Hi, I'm a comment, and this is random comment", author: '1', post: '41' },
];

// Type definitions (schema)
const typeDefs = `
type Query {
  me: User!
  post: Post!
  users(query: String): [User!]!
  posts(query: String): [Post!]!
  comments(query: String): [Comment!]!
}

type User {
  id: ID!
  name: String!
  email: String!
  age: Int!
  posts: [Post!]!
  comments: [Comment!]!
}

type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
  author: User!
  comments: [Comment!]!
}

type Comment {
  id: ID!
  text: String!
  author: User!
  post: Post!
}

`;

// Resolvers
const resolvers = {
  Query: {
    me(parent, args, ctx, info) {
      return USERS[0];
    },
    post(parent, args, ctx, info) {
      return {
        id: '123asd123',
        title: 'Post title',
        body: 'Post body',
        published: false,
      };
    },
    users(parent, { query }, ctx, info) {
      if (!query) return USERS;

      return USERS.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()));
    },
    posts(parent, { query }, ctx, info) {
      if (!query) return POSTS;
      return POSTS.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.body.toLowerCase().includes(query.toLowerCase())
      );
    },
    comments(parent, args, ctx, info) {
      return COMMENTS;
    },
  },
  Post: {
    // Resolvers for relationalData
    author(parent, args, ctx, info) {
      return USERS.filter((user) => user.id === parent.author)[0];
    },
    comments(parent, args, ctx, info) {
      return COMMENTS.filter((comment) => comment.post === parent.id);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return POSTS.filter((post) => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return COMMENTS.filter((comment) => comment.author === parent.id);
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return USERS.filter((user) => user.id === parent.author)[0];
    },
    post(parent, args, ctx, info) {
      return POSTS.filter((post) => post.author === parent.post)[0];
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('listening'));
