<template>
  <div class="news-types" v-if="channels.length > 0">
    <div
      class="item"
      v-for="item in showChannels"
      :key="item.channelId"
      :class="{active : item.channelId === chooseId}"
      @click="switchTo(item.channelId)"
    >
      <span class="name">{{item.name}}</span>
    </div>
    <a href @click.prevent="isCollapse = !isCollapse">{{isCollapse? '展示' : '收起'}}</a>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Channels",
  data() {
    return {
      //判断折叠，展开（默认折叠）
      isCollapse: true,
      //判断当前选中的哪个 频道（根据频道id显示频道的背景色）
      chooseId: null,
    };
  },
  computed: {
    ...mapState("channels", ["channels"]),
    //判断是折叠 还是展示
    showChannels() {
      if (this.isCollapse) {
        return this.channels.slice(0, 8);
      } else {
        return this.channels;
      }
    },
  },
  watch: {
    // 监听channels的状态  如有有数据 默认请求第一个频道的数据 进行展示
    channels:{
     immediate: true,
     handler(){
        if (this.channels.length > 0) {
        this.switchTo(this.channels[0].channelId);
      }
     }
    },
  },
  methods: {
    //根据点击切换频道id（修改对应id 的背景颜色）
    switchTo(id) {
      console.log(id);
      this.chooseId = id;
      //发射事件总线   切换频道 使其页面内容跟着变化
      this.$bus.$emit("switchTo", this.chooseId);
    },
  },
};
</script>

<style scoped>
.news-types {
  margin: 30px 0;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  padding-bottom: 15px;
}
.item {
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 15px;
  margin: 7px 15px 7px 0;
  cursor: pointer;
  position: relative;
}
.item:hover {
  background: #ccc;
}
.item.active {
  background: #000;
  color: #fff;
}
.news-types a {
  align-self: flex-end;
  margin-bottom: 20px;
  color: #409eff;
}
</style>
