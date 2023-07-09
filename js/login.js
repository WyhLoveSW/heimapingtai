
const form = document.querySelector('.login-form')
document.querySelector('#btn-login').addEventListener('click', async () => {
  const data = serialize(form, { hash: true, empty: true })
  if (!data.username || !data.password) return Toast('请输入用户名和密码')
  if (data.username.length < 6 || data.password.length < 6) return Toast('用户名或密码长度不足6位')
  try {
    // 发送请求 获取数据 存储token到本地
    const res = await axios.post('/login', data)
    console.log(res); // 要看得把定时跳转关闭
    // 创建一个对象 把axios获取到的数据转成JSON字符串 存储用户名和token 
    const obj = {}
    obj.username = res.data.username
    obj.token = res.data.token
    localStorage.setItem('userMsg', JSON.stringify(obj))
    Toast(res.message)
    setTimeout(() => {
      location.href = './index.html'
    }, 1500)
  } catch (error) {
    return console.log(error) & Toast(error.response.data.message)
  }
})
