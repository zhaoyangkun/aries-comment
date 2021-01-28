import Comment from './Comment';

Comment.install = function (Vue) {
  Vue.component(Comment.name, Comment);
};

export default Comment;
