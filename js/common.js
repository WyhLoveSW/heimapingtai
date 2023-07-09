// 基地址
axios.defaults.baseURL = 'https://hmajax.itheima.net'


// 公共的 提示框
const Toast = (msg) => {
  const toast = new bootstrap.Toast(document.querySelector('.my-toast'))
  toast.show()
  document.querySelector('.toast-body').innerHTML = msg
}


//公共的token数据
const data = localStorage.getItem('userMsg') ? JSON.parse(localStorage.getItem('userMsg')) : {}


// 判断公共的 token有没有 如果存在就转化为josn字符串
const getKoken = () => {
  const { token } = data
  if (!token) return Toast('请先登录') & setTimeout(() => { location.href = './login.html' }, 1500)
}


// 封装 回显用户名的函数
const showUsername = () => {
  const { username } = data
  if (username) return document.querySelector('.username').innerHTML = username
}


// 封装 退出登录的函数
const logout = () => {
  document.querySelector('#logout').onclick = () => {
    localStorage.removeItem('userMsg')
    Toast('退出成功')
    setTimeout(() => {
      location.href = './login.html'
    }, 1500)
  }
}


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log('经过了');
  // console.log(config);
  // console.log(config.headers.Authorization);
  const { token } = data
  config.headers['Authorization'] = token
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
});



// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么

  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  if (error.response.status === 401) {
    Toast('登陆过期')
    localStorage.removeItem('userMsg')
    setTimeout(() => {
      location.href = './login.html'
    }, 1500)
  }
  return Promise.reject(error)
});