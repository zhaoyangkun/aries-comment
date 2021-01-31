import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';
import Comment from './plugin/index';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(Comment);

new Vue({
  el: '#app',
  components: {App},
  template: '<App/>',
});
