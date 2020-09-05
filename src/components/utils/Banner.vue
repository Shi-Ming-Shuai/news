<template>
  <div class="banner-container" @mouseenter="autoStop" @mouseleave="autoStart">
    <ul
      class="images"
      :style="{
      width: banners.length * 100 + '%',
      marginLeft: -currentIndex * 100 +'%'
    }"
    >
      <li v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.url" alt />
        </a>
      </li>
    </ul>
    <ul class="dots">
      <li
        v-for="(item,i) in banners"
        :key="i"
        :class="{active: currentIndex === i }"
        @click="currentIndex = i"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    banners: {
      type: Array,
      required: true
    }
  },
  components: {},
  data() {
    return {
      //根据不同的索引  切换不同的图片
      currentIndex: 0,
      timer: null
    };
  },
  //组件创建 开始切换轮播图
  created() {
    this.autoStart();
  },
  //组件销毁  停止自动切换轮播图
  destroyed() {
    this.autoStop();
  },
  methods: {
    //轮播图自动开始
    autoStart() {
      //判断定时器是否存在
      if (this.timer) {
        return;
      }
      this.timer = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.banners.length;
      }, 2000);
    },
    //关闭轮播图自动切换
    autoStop() {
      //清除定时器
      clearInterval(this.timer);
      this.timer = null;
    }
  }
};
</script>

<style scoped>
/* 样式 */
.banner-container {
  height: 350px;
  position: relative;
  overflow: hidden;
  width: 1080px;
  margin: 0 auto;
}
.banner-container li {
  display: block;
  width: 1080px;
  height: 100%;
  float: left;
}
.images {
  height: 100%;
  transition: 0.5s;
}
.banner-container img {
  width: 1080px;
  height: 100%;
}
.dots {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
}
.dots li {
  width: 10px;
  cursor: pointer;
  height: 10px;
  margin: 0 3px;
  border-radius: 50%;
  border: 1px solid;
  color: #fff;
}
.dots li.active {
  background: #fff;
}
</style>
