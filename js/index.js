//判断公共的 token有没有的函数
getKoken()
//回显用户名的函数
showUsername()
//退出登录的函数
logout()
//渲染统计数据 获取数据 渲染到页面上
const getData = async () => {
  // const data = localStorage.getItem('userMsg') ? localStorage.getItem('userMsg') : {}
  // const { token } = JSON.parse(data)

  try {
    const { data: { data: { overview } } } = await axios.get('/dashboard')
    renderOverview(overview)
  } catch (err) {
    console.dir(err);
    if (err.response.status === 401) {
      Toast('登陆过期')
      localStorage.removeItem('userMsg')
      setTimeout(() => {
        location.href = './login.html'
      }, 1500)
    }
  }
}
getData()

const renderOverview = (overview) => {
  // console.log(overview);
  // 检查overview对象是否为 undefined 或 null
  // if (overview !== undefined && overview !== null) {
  // 在这里使用 Object.keys() 方法
  Object.keys(overview).forEach(item => {
    // console.log(document.querySelector(`.${item}`));
    document.querySelector(`.${item}`).innerHTML = overview[item]
  })
  // }
}