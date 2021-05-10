import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store";
Vue.use(Router);
// import abstractRoute from "@/components/abstract_route/abstract_route";
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
const Home = () => import("@/views/首页/home");

const router = new Router({
  // routes
  routes: [
    {
      path: "/",
      redirect: {
        name: "home"
      }
    },
    {
      path: "/login",
      name: "login",
      component:() => import("@/views/login"),
      meta: {
        menuName: "登录"
      }
    },
    {
      path: "/hospital",
      component: () => import("@/views/main.vue"),
      meta: { title: '首页' },
      beforeEnter(to, from, next) {
        store.state.user.token ? next() : next("/login");
      },
      children: [
        {
          path: '/home',
          name: 'home',
          meta: { title: '首页' },
          component: Home,
        },
        {
          path: '/sys',
          name: 'NPSS_SYS',
          meta: { title: '基础信息管理' },
          component: () => import("@/views/首页/rotue"),
          children: [
            {
              path: '/sys/system',
              name: 'NPSS_SYS_01',
              meta: { title: '系统管理' },
              component: () => import("@/views/基础信息管理/系统管理.vue"),
            },
            {
              path: "/sys/role-manag",
              name: "NPSS_SYS_02",
              component: () => import("@/views/基础信息管理/人员管理.vue"),
              meta: { title: '人员管理' },
            },
            {
              path: "/sys/maintain",
              name: "NPSS_SYS_03",
              component: () => import("@/views/基础信息管理/管理机构维护.vue"),
              meta: {
                title: "管理机构维护"
              }
            },
            {
              path: "/sys/transfer",
              name: "NPSS_SYS_04",
              component: () => import("@/views/基础信息管理/数据传输监控.vue"),
              meta: {
                title: "数据传输监控"
              }
            },
            {
              path: "/sys/medical",
              name: "NPSS_SYS_05",
              component: () => import("@/views/基础信息管理/医疗机构管理.vue"),
              meta: {
                title: "医疗机构管理"
              }
            },
            {
              path: "/sys/message ",
              name: "NPSS_SYS_06",
              component: () => import("@/views/基础信息管理/消息中心.vue"),
              meta: {
                title: "消息中心"
              }
            }
          ]
        }, // 基础信息管理end
        {
          path: "/bigdata",
          name: "NPSS_DATA",
          meta: {
            title: "平台大数据分析中心"
          },
          component: () => import("@/views/首页/rotue"),
          children: [
            {
              path: "/bigdata/statistics",
              name: "NPSS_DATA_01",
              component: () => import("@/views/平台大数据分析中心/医废数据统计报表.vue"),
              meta: {
                title: "医废数据统计报表"
              }
            },
            {
              path: "/bigdata/adverse",
              name: "NPSS_DATA_02",
              component: () => import("@/views/平台大数据分析中心/医废不良事件报表.vue"),
              meta: {
                title: "医废不良事件报表"
              }
            },
            {
              path: "/bigdata/waste",
              name: "NPSS_DATA_03",
              component: () => import("@/views/平台大数据分析中心/各医疗机构医废滞留报表.vue"),
              meta: {
                title: "各医疗机构医废滞留报表"
              }
            },
            {
              path: "/bigdata/comprehensive",
              name: "NPSS_DATA_04",
              component: () => import("@/views/平台大数据分析中心/综合监管分析.vue"),
              meta: {
                title: "综合监管分析"
              }
            }
          ]
        }, // 平台大数据分析中心end
      ]
    },

  ]
});
export default router;