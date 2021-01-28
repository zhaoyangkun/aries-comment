import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';
import axios from 'axios';
import Comment from './plugin/index';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(Comment);

Vue.prototype.$axios = axios;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.baseURL = '/api';

new Vue({
  el: '#app',
  components: {App},
  template: '<App/>',
});
