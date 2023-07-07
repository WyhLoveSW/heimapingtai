// 基地址
axios.defaults.baseURL = 'https://hmajax.itheima.net'

// 公共的 提示框
const Toast = (msg) => {
  const toast = new bootstrap.Toast(document.querySelector('.my-toast'))
  toast.show()
  document.querySelector('.toast-body').innerHTML = msg
}
//获取表单数据并校验 发送axios请求
document.querySelector('#btn-register').addEventListener('click', async (e) => {
  const data = serialize(document.querySelector('.register-form'), { hash: true, empty: true })
  //判断账号密码是否为空
  if (!data.username || !data.password) return Toast('账号密码不能为空')
  //判断账号密码的长度
  if (data.username.length < 6 || data.password.length < 8) return Toast('账号密码长度不符合要求')
  const res = await axios.post('/api/reguser', data)
  Toast(res.data.message)
})