

// 路由的配置

// 导入组件  使用常量名 懒加载导入组件
const Home = () => import('views/Home')
const Login = () => import('views/Login')
const Register = () => import('views/Register')
const ChannelNews = () => import('views/ChannelNews')
const NotFound = () => import('views/NotFound')
const Personal = () => import('views/Personal')
const Auth = () => import('views/Auth')
const Project = () => import('views/Project')

export default {
  routes: [
    {
      path: '*', //匹配所有路径 如果路径都不符合（
      //匹配不到输入的路径） 则显示NotFoud页面
      component: NotFound
    },
    { path: '/project', name:'Project', component: Project ,meta:{
      auth: true
    }},
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Reg', component: Register },
    { path: '/channel/:id', name: 'ChannelNews', component: ChannelNews },
    { path: '/NotFound', name: 'NotFound', component: NotFound },
    {
      path: '/personal', name: 'Personal', component: Personal,
      meta: {
        auth: true
      }
    },
    { path: '/auth', name: 'Auth', component: Auth }
  ],
  mode: "history"
}