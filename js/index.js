//判断公共的 token有没有的函数
getKoken()
//回显用户名的函数
showUsername()
//退出登录的函数
logout()
//渲染统计数据 获取数据 渲染到页面上
const getData = async () => {
  const { data: { overview } } = await axios.get('/dashboard')
  renderOverview(overview)
}
getData()

const renderOverview = (overview) => {
  // 在这里使用 Object.keys() 方法
  Object.keys(overview).forEach(item => {
    document.querySelector(`.${item}`).innerHTML = overview[item]
  })
}