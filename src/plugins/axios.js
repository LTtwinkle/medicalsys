"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let ROOT;
if (process.env.NODE_ENV === 'development') {
    ROOT = "/api/api";//开发环境下的代理地址，解决本地跨域
} else {
    ROOT = 'http://10.20.176.197';    //生产环境下的地址
}
// axios.defaults.baseURL = ROOT;

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  baseURL: ROOT,
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    // console.log(response.data);
    return response.data;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    $axios: {
      get() {
        return _axios;
      },
      post(url,data) {
        return _axios({
          url,
          method: 'post',
          data,
        });
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
