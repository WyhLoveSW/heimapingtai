
const form = document.querySelector('.login-form')
document.querySelector('#btn-login').addEventListener('click', async () => {
  const data = serialize(form, { hash: true, empty: true })
  if (!data.username || !data.password) return Toast('请输入用户名和密码')
  if (data.username.length < 6 || data.password.length < 6) return Toast('用户名或密码长度不足6位')
  try {
    const res = await axios.post('/login', data)

    const obj = {}
    obj.username = res.data.data.username
    obj.token = res.data.data.token
    localStorage.setItem('userMsg', JSON.stringify(obj))
    Toast(res.data.message)
    setTimeout(() => {
      location.href = './index.html'
    }, 1500)
  } catch (error) {
    return console.log(error) & Toast(error.response.data.message)
  }
})
