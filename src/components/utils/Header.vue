<template>
  <div class="header">
    <div class="header-container">
      <div class="container">
        <div class="logo">
          <a href>
            <img src="~assets/img/logo.png" alt />
          </a>
        </div>
        <ul class="nav" >
          <li>
            <router-link :to="{name :'Home'}">首页</router-link>
          </li>
          <!-- slice 5条数据   用于展示到导航栏 -->
          <li v-for="item in channels.slice(0,5)" :key="item.channelId">
            <router-link :to="{name: 'ChannelNews',params:{ id: item.channelId}}">{{item.name}}</router-link>
          </li>
        </ul>
        <div class="user">
          <!-- 情况一： 没有登录  情况二：正在登录  情况三：已经登录 -->
          <template v-if="!userInfo && isLoginIng === false">
            <router-link :to="{name: 'Login'}">登录</router-link>
            <router-link :to="{name :'Reg'}">注册</router-link>
          </template>
          <span v-else-if="isLoginIng">loading...</span>
          <template v-else>
            <router-link :to="{ name: 'Personal'}">{{userInfo.nickname}}</router-link>
            <a href @click.prevent="handleLoginOut">退出登录</a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    //使用展开运算符
    ...mapState("channels", ["channels", "isLoading"]),
    ...mapState("loginUser", {
      userInfo: "data",
      isLoginIng: "isLoading",
    }),
  },
  methods: {
    handleLoginOut() {
      this.$store.dispatch("loginUser/loginOut");
      // 退出登录就会显示登录页面
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
.header {
  height: 60px;
  margin-bottom: 50px;
}
.header-container {
  height: 60px;
  background: #000;
  color: #fff;
  line-height: 60px;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
}
.container {
  display: flex;
}
.logo a {
  display: flex;
  align-items: center;
  height: 100%;
}
.logo img {
  width: 42px;
  height: 42px;
}
.nav {
  margin: 0 60px;
  display: flex;
  flex-grow: 1;
}
.nav a {
  display: block;
  padding: 0 30px;
}
.nav .router-link-exact-active {
  color: #fcb85f;
}
.user {
  font-size: 14px;
}
.user * {
  margin-left: 10px;
}
.header a {
  color: #fff;
}
</style>
