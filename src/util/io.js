import axios from 'axios';
import { message, notification } from 'antd';

const onRequestSuccess = (config) => {
  config.timeout = 100000;
  config.withCredentials = true;
  if (config.method == 'get') {
    config.params = config.params || {};
    config.params.t = +new Date();
  }
  const _token = localStorage.getItem('token') || '';
  if (_token) {
    config.headers.common['amulong-token'] = _token;
  }
  config.headers['content-type'] = 'application/json;charset=UTF-8'
  // if(config.url.indexOf('http') == -1) {
  //     config.url = Util.getHost() + config.url;
  // }
  return config;
};
const onResponseSuccess = (res) => {
  let path =
    location.host.indexOf('dev') > -1 ? '//dailyka.xianqu.cn/kaweb/login' : '';
  if (res.headers['content-type'] == 'application/octet-stream;charset=UTF-8') {
    return res.data;
  }
  if (res.config.url == '/admin/login' && res.data.code == 200) {
    const _token = res.headers['amulong-token'];
    axios.defaults.headers.common['amulong-token'] = _token;
    localStorage.setItem('token', _token);
  }
  if (res.data.responseCode === 10212 && res.data.status === false) {
    location.href = `${path}/kaweb/login.html?redirectUrl=${location.href}`;
  } else {
    if (res.data.status === false) {
      notification['error']({
        message: '操作失败',
        description: res.data.message || '',
      });
      return res.data;
    } else {
      return res.data;
    }
  }
};
const onResponseError = (error) => {
  message.error(error.message || '网络异常');
  return Promise.reject(error);
};
axios.interceptors.request.use(onRequestSuccess);
axios.interceptors.response.use(onResponseSuccess, onResponseError);

export default axios;
