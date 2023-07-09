//获取表单数据并校验 发送axios请求
const resBtn = document.querySelector('#btn-register')
resBtn.addEventListener('click', async (e) => {
  const data = serialize(document.querySelector('.register-form'), { hash: true, empty: true })
  //判断账号密码是否为空
  if (!data.username || !data.password) return Toast('账号密码不能为空')
  //判断账号密码的长度
  if (data.username.length < 6 || data.password.length < 6) return Toast('账号密码长度不符合要求')
  const res = await axios.post('/register', data)
  Toast(res.data.message)
})