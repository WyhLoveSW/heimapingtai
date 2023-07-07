// 基地址
axios.defaults.baseURL = 'https://hmajax.itheima.net'

// 公共的 提示框
const Toast = (msg) => {
  const toast = new bootstrap.Toast(document.querySelector('.my-toast'))
  toast.show()
  document.querySelector('.toast-body').innerHTML = msg
}