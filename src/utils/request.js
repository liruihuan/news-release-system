import axios from 'axios'
import { Message } from 'element-ui'



const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 5000
})

// 请求拦截
service.interceptors.request.use(config => {

  return config

},
  error => {
    console.log('请求出错', error) // 
    return Promise.reject(error)
  }
)

//响应拦截
service.interceptors.response.use(response => {

  const res = response.data;
  if (res.status !== 200) {
    Message({
      message: res.data.errorMessage || 'error',
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(res.data.errorMessage || 'error')

  } else {
    return res
  }

},
  error => {

    if (error.response) {
      switch (error.response.status) {
        case 404: Message({
          message: "请求路径错误",
          type: 'error',
          duration: 2 * 1000
        })
          break
        default: Message({
          message: "网络异常,请重试",
          type: 'error',
          duration: 2 * 1000
        })
          break
      }
    } else {
      Message({
        message: "请求超时,无响应",
        type: 'error',
        duration: 2 * 1000
      })
    }
    return Promise.reject(error)
  }

)

export default service
