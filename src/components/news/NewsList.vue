<template>
  <div id="NewsList" v-if="newsList.length > 0">
    <div class="news-item-normal" v-for="item in newsList" :key="item.id">
      <!-- 新闻标题图片 -->
      <div class="image" v-if="item.havePic">
        <a :href="item.link" target="_blank">
          <img :src="item.imageurls[0].url" alt />
        </a>
      </div>
      <!-- 新闻标题 -->
      <div class="words">
        <h2 class="title">
          <a :href="item.link" target="_blank">{{item.title}}</a>
        </h2>
        <!-- 新闻类别  来源 发布日期   -->
      <div class="aside">
        <span>{{item.channelName}}</span>
        <span>来源 : {{item.source}}</span>
        <span>发布日期 : {{item.pubDate}}</span>
      </div>
      <div class="content">
        {{item.content}}
      </div>
      </div>
    </div>
  </div>
</template>

<script>
//导入新闻列表数据的请求
import { getNews } from "@/network/NewsService";

export default {
  name: "",
  props:{
  newsList:{
    type:Array,
    required:true
  }
},
  // data() {
  //   return {
  //     获取的新闻数据
  //     newsList: [],
  //     chooseId: null
  //   };
  // },
  // components: {},
  // created() {
  //   //获取事件总线 switchTo事件传递过来的参数
  //   this.$bus.$on("switchTo", id => {
  //     this.chooseId = id;
  //     console.log(this.chooseId);
  //     //获取新闻数据  赋值给组件的 newsList
  //     getNews(this.chooseId).then(res => {
  //       this.newsList = res.contentlist;
  //     });
  //   });
  // },

};
</script>

<style scoped>

.news-item-normal {
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  padding: 20px 0;
}
.image {
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 4px;
  float: left;
  margin-right: 20px;
}
.image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.title {
  font-size: 1.5em;
}
.aside {
  font-size: 14px;
  color: #888;
}
.aside span {
  margin-right: 15px;
}

.content {
  max-height: 100px;
  overflow: hidden;
  line-height: 2;
}</style>
