<!-- 分页组件 -->
<template>
  <div class="pager">
    <!-- 点击首页 阻止a标签的默认事件  将父组件的page数据修改成 1
    （响应式的原理 这里使用的传递过来的page也就变成了1）-->
    <a href class="pager-item" :class="{disabled:page === 1}" @click.prevent="handleChange(1)">首页</a>
    <!-- 点击上一页 取消a标签默认事件 ， 让page -1 -->
    <a
      href
      class="pager-item"
      :class="{disabled:page === 1}"
      @click.prevent="handleChange(page -1)"
    >上一页</a>
    <a
      href
      class="pager-item"
      :class="{active:item === page}"
      v-for="item in numbers"
      @click.prevent="handleChange(item)"
      :key="item"
    >{{item}}</a>
    <a
      href
      class="pager-item"
      :class="{disabled:page === pageNumber }"
      @click.prevent="handleChange(page +1)"
    >下一页</a>

    <a
      href
      class="pager-item"
      :class="{disabled:page ===pageNumber }"
      @click.prevent="handleChange(pageNumber)"
    >尾页</a>
    <span class="pager-text">
      <i>{{page}}</i>/
      <i>{{pageNumber}}</i>
    </span>
  </div>
</template>

<script>
export default {
  name: "Pager",
  props: {
    //当前分页 页码
    page: {
      type: Number,
      default: 1
    },
    // 总数据量
    total: {
      type: Number,
      default: 0
    },
    // 页容量
    limit: {
      type: Number,
      default: 10
    },
    // 显示多少个分页导航按钮
    panelNumber: {
      type: Number,
      default: 10
    }
  },
  computed: {
    // 计算总页数  总数据 / 页容量
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    // 根据传入的显示页码按钮数据 和当前所在页码数 算出展示的页码
    minNumber() {
      // 计算最小值
      let min = this.page - this.panelNumber / 2;
      if (min < 1) {
        min = 1;
      }
      return min;
    },
    maxNumber() {
      // 最小的加上展示的数 -1 就是最大的数值
      let max = this.minNumber + this.panelNumber - 1;
      if (max > this.pageNumber) {
        max = this.pageNumber;
      }
      return max;
    },
    // 模拟页码数组   要展示的页码（动态改变）
    numbers() {
      let num = [];
      for (let i = this.minNumber; i <= this.maxNumber; i++) {
        num.push(i);
      }
      return num;
    }
  },
  methods: {
    handleChange(current) {
      // 小于1 或者大于 尾页 直接等于1 或尾页（这样还可以变化）
      if (current < 1) {
        current = 1;
      } else if (current > this.pageNumber) {
        current = this.pageNumber;
      }
      if (current === this.page) {
        // 如果页码没有变化  直接退出函数
        return;
      }
      this.$emit("handleChange", current);
    }
  }
};
</script>

<style scoped>
.pager {
  text-align: center;
  margin: 20px 0;
}

.pager .pager-item {
  display: inline-block;
  padding: 5px 7px;
  border: 1px solid #ccc;
  margin: 8px;
  cursor: pointer;
  color: rgb(96, 96, 224);
}

.pager .pager-item.disabled {
  color: #ccc;
  cursor: not-allowed;
}

.pager .pager-item.active {
  color: #f40;
  border: none;
  cursor: auto;
}
</style>
