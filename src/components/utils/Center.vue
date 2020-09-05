<template>
  <div class="center">
    <slot>请添加要垂直居中的组件</slot>
  </div>
</template>


<style scoped>
.center {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
