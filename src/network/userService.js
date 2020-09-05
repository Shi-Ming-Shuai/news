
/*导航栏   登录页面 网络请求
// 第一步 导入axios
// 第二步 使用post请求 请求对应的用户信息  参数1：请求地址 参数2：请求参数
 post : http://http://study.yuanjin.tech/api/user/login
*/
import axios from 'axios'

// 延迟加载
function delay(duration){
  return new Promise(resolve => {
    setTimeout(()=>{
    resolve()
    },duration)
  })
}

// 请求登录信息    登录
// post  http://study.yuanjin.tech/api/user/login
export async function login(loginInfo) {
  await delay(1000)
  let res = await axios.post("/api/user/login", loginInfo);
  let token = res.headers.authorization; //拿到服务器的令牌 
  if (token) {
    // 判断是否有令牌  有的话将令牌保存到服务器
    localStorage.setItem('token', token)
  }
  return res.data;
}

// 根据令牌 请求保存的用户信息  使用上次登录的账户密码登录
// get http://study.yuanjin.tech/api/user/whoAmI
// headers authorization `barer ${token}`
export async function whoAmI() {
  // 访问本地存储  是否存储了用户信息（令牌）如果没有直接返回
  let token = localStorage.getItem('token')

  // 如果令牌存在 直接访问令牌中的数据
  if (token) {
    let res = await axios.get("/api/user/whoAmI", {
      headers: {
        authorization: `bearer ${token}`,
      },
    })
    return res.data.data
  }

  // 如果令牌不存在 返回null
  return null
}
// 删除本地服务器 用户账号密码 （删除令牌）   注销账号
export function loginOut() {
  localStorage.removeItem("token")
}

// 注册账号
// post http://study.yuanjin.tech/api/user/reg
export async function loginReg(userInfo) {
  // 参数 loginId     loginPwd    nickname
  let res = await axios.post("/api/user/reg", userInfo)
  return res.data
}
