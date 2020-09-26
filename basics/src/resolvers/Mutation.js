import { v4 } from 'uuid';

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some((user) => user.email === args.data.email);

    if (emailTaken) throw new Error('Email is already used');

    const user = { id: v4(), ...args.data };
    db.users.push(user);
    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const userIdx = db.users.findIndex((user) => user.id === args.id);
    if (userIdx < 0) throw new Error('User not found');
    // Delete user
    const deletedUser = db.users.splice(userIdx, 1)[0];
    // Delete posts
    db.posts = db.posts.filter((post) => {
      const match = post.author === deletedUser.id;
      if (!match) return true;
      // delete comments in the posts created by the user
      db.comments = db.comments.filter((comment) => comment.post !== post.id);
      // delete comments created by the user
      db.comments = db.comments.filter((comment) => comment.author !== deletedUser.id);
      return false;
    });
    return deletedUser;
  },
  updateUser(parent, args, { db }, info) {
    let user = db.users.find((user) => user.id === args.id);
    if (!user) throw new Error('User not found');
    if (db.users.some((user) => user.email === args.data.email))
      throw new Error('Email is already used');
    return Object.assign(user, args.data);
  },
  createPost(parent, args, { db }, info) {
    const userExists = db.users.some((user) => user.id === args.data.author);
    if (!userExists) throw new Error('User not found');
    const post = { id: v4(), ...args.data };
    db.posts.push(post);
    return post;
  },
  deletePost(parent, args, { db }, info) {
    const postIdx = db.posts.findIndex((post) => post.id === args.id);
    if (postIdx < 0) throw new Error('Post not found');
    // delete post
    const deletedPost = db.posts.splice(postIdx, 1)[0];
    // delete comments associated with the post
    db.comments = db.comments.filter((comment) => comment.post !== deletedPost.id);
    return deletedPost;
  },
  updatePost(parent, args, { db }, info) {
    let post = db.posts.find((post) => post.id === args.id);
    if (!post) throw new Error('Post not found');
    return Object.assign(post, args.data);
  },
  createComment(parent, args, { db }, info) {
    const userExists = db.users.some((user) => user.id === args.data.author);
    if (!userExists) throw new Error('User not found');
    const postIsValid = db.posts.some((post) => post.id === args.data.post && post.published);
    if (!postIsValid) throw new Error('Post not found');
    const comment = { id: v4(), ...args.data };
    db.comments.push(comment);
    return comment;
  },
  deleteComment(parent, args, { db }, info) {
    const commentIdx = db.comments.findIndex((comment) => comment.id === args.id);
    if (commentIdx < 0) throw new Error('Comment not found');
    return db.comments.splice(commentIdx, 1);
  },
  updateComment(parent, args, { db }, info) {
    let comment = db.comments.find((comment) => comment.id === args.id);
    if (!comment) throw new Error('Comment not found');
    return Object.assign(comment, args.data);
  },
};

export default Mutation;
