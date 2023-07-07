// 基地址
axios.defaults.baseURL = 'https://hmajax.itheima.net'

// 公共的 提示框
const Toast = (msg) => {
  const toast = new bootstrap.Toast(document.querySelector('.my-toast'))
  toast.show()
  document.querySelector('.toast-body').innerHTML = msg
}
//获取表单数据并校验发送axios请求
document.querySelector('#btn-register').addEventListener('click', async (e) => {
  const data = serialize(document.querySelector('register-form'), { hash: true, empty: true })
  if (!data.username) return Toast('请输入用户名')
  if (data.username.length < 8 || data.username.length > 30) return Toast('用户名长度为8-30位')
  if (!data.password) return Toast('请输入密码')
  if (data.password.length < 6 || data.password.length > 30) return Toast('密码长度为6-30位')
  const res = await axios.post('/api/reguser', data)
  Toast(res.data.message)
})