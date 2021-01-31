import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Comment from './Comment';

Comment.install = (Vue) => {
  Vue.use(Antd);
  Vue.component(Comment.name, Comment);
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('Comment', Comment);
}

export default Comment;
