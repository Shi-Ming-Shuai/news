<template>
  <div
    class="error"
    :style="{ visibility: message ? 'visible':'hidden'}"
  >
  {{message}}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      default: "",
      type: String,
    },
    isCenter: {
      default: false,
      type: Boolean,
    },
  },
};
</script>

<style scoped>

.form-item .error {
  font-size: 14px;
  color: #a44242;
  padding-left: 100px;
  height: 30px;
  line-height: 30px;
}
</style>
