<template>
  <div id="app">
    <!-- 头部 -->
    <Header />
    <!-- container类 在global 全局样式设置的居中显示 -->
    <div class="container">
      <!-- 首页 会被缓存-->
      <keep-alive include="Home">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
// 导入头部
import Header from "components/utils/Header";
//导入首页
import Home from "views/Home";

export default {
  name: "App",
  components: { Home, Header }
};
</script>

<style lang="sass" scoped>
</style>>

