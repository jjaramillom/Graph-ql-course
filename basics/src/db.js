const users = [
  { id: '1', name: 'Jacobo', email: 'jac@123.com', age: 28 },
  { id: '2', name: 'Manuel', email: 'man@123.com', age: 23 },
  { id: '3', name: 'Juan', email: 'jvjc@123.com' },
  { id: '4', name: 'Pedro', email: 'per@123.com' },
];

// Demo post data
const posts = [
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
const comments = [
  { id: '111', text: "Hi, I'm a comment, this is random burger", author: '1', post: '11' },
  { id: '112', text: "Hi, I'm a comment, this is random dog", author: '4', post: '31' },
  { id: '113', text: "Hi, I'm a comment, this is random pizza", author: '3', post: '21' },
  { id: '114', text: "Hi, I'm a comment, this is random cat", author: '2', post: '41' },
  { id: '115', text: "Hi, I'm a comment, this is random Space", author: '2', post: '21' },
  { id: '116', text: "Hi, I'm a comment, this is random comment", author: '1', post: '41' },
];

const db = {
  users,
  posts,
  comments,
};

export { db as default };
