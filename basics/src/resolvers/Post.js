const Post = {
  author(parent, args, { db }, info) {
    return db.users.filter((user) => user.id === parent.author)[0];
  },
  comments(parent, args, { db }, info) {
    return db.comments.filter((comment) => comment.post === parent.id);
  },
};

export default Post;
