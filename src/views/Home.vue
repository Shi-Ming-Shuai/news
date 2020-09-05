<template>
  <div id="Home">
    <!-- 自己封装的轮播图组件 -->
    <Banner :banners="banners" />
    <!-- 导入新闻频道 -->
    <Channels />
    <!-- 加载动画组件 -->
    <Loading v-show="isLoading" />
    <!-- 导入新闻频道内容 -->
    <news-list v-show="!isLoading" :newsList="newsList" />
  </div>
</template>

<script>
// 导入轮播图组件
import Banner from "components/utils/Banner";

// 导入新闻频道 频道内容
import Channels from "components/news/Channels";
import NewsList from "components/news/NewsList";

// 导入加载显示组件
import Loading from "components/news/Loading";

// 网络请求
import { getNews } from "@/network/NewsService";

export default {
  name: "Home",
  data() {
    return {
      //banners 轮播图数据 图片地址
      banners: [
        { url: require("assets/img/banner1.jpeg"), link: "www.baidu.com" },
        { url: require("assets/img/banner2.jpeg"), link: "www.baidu.com" },
        { url: require("assets/img/banner1.jpeg"), link: "www.baidu.com" }
      ],
      // 新闻频道内容数据
      newsList: [],
      // 判断是否显示加载动画
      isLoading: true
    };
  },
  components: {
    Banner,
    Channels,
    NewsList,
    Loading,
  },
  created() {
    // 获取新闻列表内容数据
    this.$bus.$on("switchTo", (id) => {
      this.isLoading = true;
      getNews(id).then(res => {
        this.newsList = res.contentlist;
        this.isLoading = false;
      });
    });
  },
  // 组件销毁后取消事件总线
  destroyed() {
    this.$bus.$off("switchTo");
  },
  computed:{
    channels(){
    return this.$store.state.channels
    }
  }
};
</script>

<style scoped>
</style>
