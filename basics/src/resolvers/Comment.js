const Comment = {
  author(parent, args, { db }, info) {
    return db.users.filter((user) => user.id === parent.author)[0];
  },
  post(parent, args, { db }, info) {
    return db.posts.filter((post) => post.author === parent.post)[0];
  },
};

export default Comment;
