import Vue from 'vue'
import axios from 'axios'

//axios.defaults.baseURL = "http://172.20.10.9:8080"; // 设置axios的基础请求路径
//axios.defaults.baseURL = "http://175.178.184.40:8081"; // 服务器
axios.defaults.baseURL = "http://localhost:8081"; // 设置axios的基础请求路径
axios.defaults.timeout = 600000; // 设置axios的请求时间

// axios.interceptors.request.use(function (config) {
//   // console.log(config);
//   return config;
// })

axios.loadData = async function (url) {
    const resp = await axios.get(url);
    return resp.data;
}

Vue.prototype.$http = axios;// 将axios添加到 Vue的原型，这样一切vue实例都可以使用该对象

