import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import echarts from 'echarts';
import VCharts from 'v-charts'
import moment from "moment";
import 'moment/locale/zh-cn'
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/iconfont/iconfont.js"
import "@/assets/iconfont/iconfont.css"
import "./assets/styles/index.css";
// http utils
import {
    $http,
    author,
    unauth,
} from "@/utils";
Vue.prototype.$moment = moment;
Vue.prototype.$http = $http;
Vue.prototype.$http.author = author;
Vue.prototype.$http.unauth = unauth;
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
import NProgress from "nprogress";
import "nprogress/nprogress.css";
Vue.prototype.$progress = NProgress;
Vue.use(VCharts);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')