import axios from "axios";
import store from "@/store";
import router from "@/router";
import config from '../config/index'
// import NProgress from "nprogress";
import Message from "element-ui/lib/message";
var $http = axios
const publicPath = config.baseUrl.dev;
console.log(publicPath, "publicPath")
axios.defaults.withCredentials = true;
const unauth = axios.create({
    baseURL: publicPath,
});
const author = axios.create({
    baseURL: publicPath,
});

author.interceptors.request.use(
    config => {
        // NProgress.start();
        const token = store.state.user.token;
        if (!token) {
            router.replace({
                name: "login"
            });
            Message.error("未登录！");
            return Promise.reject("unauthorization");
        }
        if (!config.data) {
            config.data = {};
        }
        config.headers["X-AUTH-TOKEN"] = `${token}`;
        if (router.app._route.meta.menuCode) {
            config.headers["menuCode"] = router.app._route.meta.menuCode;
        }
        return config;
    },
    error => {
        // NProgress.done();
        return Promise.reject(error);
    }
);
author.interceptors.response.use(
    response => {
        var data = response.data;
        if (!data.code) {
            let err = new Error("模块异常或未返回正确的格式！");
            err.code = 404;
            Message.warning("模块异常，已登出");
            store.commit("logout");
            router.replace({
                name: "login"
            });
            throw err;
        }
        switch (String(data.code)) {
            case 1:
                break;
            case 20004:
                Message.warning("用户名不存在");
                break;
            case 20002:
                Message.warning("用户名/密码错误");
                break;
            case -1:
                Message.warning("用户名/密码错误");
                break;
            default:
                // Message.warning(data.meta.message);
                break;
        }
        if (data.code !== 1) {
            let err = new Error(data.errorMsg);
            err.code = data.code;
            throw err;
        } else {
            return response;
        }
    },
    error => {
        // NProgress.done();
        !error.response && router.replace({
            name: "login"
        });
        if (
            Number(error.response.status) > 1 ||
            Number(error.response.status) < 1
        ) {
            router.replace({
                name: "login"
            });
        }
        throw error;
    }
);
let nub1 = publicPath.indexOf("/");
const assetsURL = publicPath.slice(0, nub1) + "/assets";
console.log(assetsURL)
export {
    $http,
    author,
    unauth,
    publicPath,
    // assetsURL
};