<template>
  <div>
    <div class="type-title">{{channelName}}</div>
    <Loading v-if="isLoading" />
    <news-list v-else :newsList="newsList" />
    <Pager
      :page="page"
      :total="total"
      :limit="limit"
      :panelNumber="8"
      @handleChange="handleChange"
    />
  </div>
</template>

<script>
// 导入新闻列表  展示数据
//导入分页组件   展示底部分页导航
// 导入加载动画组件
import NewsList from "components/news/NewsList";
import Pager from "components/utils/Pager";
import Loading from "components/news/Loading";

// 导入网络请求   全部导入
import * as news from "network/NewsService";

export default {
  name: "",
  data() {
    return {
      total: 0,
      limit: 15,
      panelNumber: 8,
      newsList: [],
      isLoading: true,
    };
  },
  components: {
    NewsList,
    Pager,
    Loading,
  },
  computed: {
    page() {
      return +this.$route.query.page || 1;
    },
    channelName() {
      let channels = this.$store.state.channels.channels;
      if (channels.length > 0) {
        let channel = channels.find((item) => item.channelId === this.$route.params.id );
        return channel.name;
      }
      return '等待网络加载'
    },
  },
  methods: {
    // 网络请求    请求新闻频道内容数据
    async getNews() {
      this.isLoading = true;
      let resNews = await news.getNews(
        this.$route.params.id,
        this.page,
        this.limit
      );
      this.newsList = resNews.contentlist;
      this.total = resNews.allNum;
      // 请求结束 显示新闻内容组件
      this.isLoading = false;
    },
    // 根据分页组件的点击变化 改变请求的page页面
    handleChange(current) {
      // 如何在代码中导航
      // 命令式导航
      this.$router.push("?page=" + current);
      this.getNews();
    },
  },
  watch: {
    // 监听网址的id是否变化
    "$route.params.id": {
      immediate: true,
      handler(newValue, oldValue) {
        this.getNews();
      },
    },
  },
};
</script>

<style scoped>
.type-title {
  font-size: 2em;
  color: #888;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
</style>
