<template>
  <div class="loading">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<style scoped>
.loading {
  height: 40px;
  margin: 100px auto;
  display: flex;
  justify-content: center;

}
.loading span {
  width: 8px;
  height: 100%;
  background-color: lightgreen;
  animation: load 1s ease infinite;
  margin: 0px 2px;
  border-radius: 5px;
}

/* 定义的动画效果 */
@keyframes load {
  0%,
  100% {
    transform: scaleY(1.5);
    background-color: lightgreen;
  }
  50% {
    transform: scaleY(1);
    background-color: lightblue;
  }
}

/* 给每个span定义延迟时间 */
.loading span:nth-child(2){
  animation-delay: 0.2s;
}
.loading span:nth-child(3){
  animation-delay: 0.4s;
}
.loading span:nth-child(4){
  animation-delay: 0.6s;
}
</style>
