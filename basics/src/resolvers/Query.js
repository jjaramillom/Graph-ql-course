const Query = {
  me(parent, args, { db }, info) {
    return db.users[0];
  },
  post(parent, args, { db }, info) {
    return {
      id: '123asd123',
      title: 'Post title',
      body: 'Post body',
      published: false,
    };
  },
  users(parent, { query }, { db }, info) {
    if (!query) return db.users;

    return db.users.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()));
  },
  posts(parent, { query }, { db }, info) {
    if (!query) return db.posts;
    return db.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.body.toLowerCase().includes(query.toLowerCase())
    );
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  },
};

export default Query;
