<template>
  <Center>
    <h1 style="font-size:20px">登录验证中 . . .</h1>
  </Center>
</template>

<script>
// 导入map 助手
import Center from "components/utils/Center";
import { mapState } from "vuex";

export default {
  name: "",
  data() {
    return {};
  },
  components: {
    Center,
  },
  computed: {
    ...mapState("loginUser", ["data", "isLoading"]),
  },
  methods: {
    handleLogin() {
      if (this.isLoading) {
        return;
      }
      if (this.data) {
        if (this.$route.query.returnUrl) {
          this.$router.push(this.$route.query.returnUrl);
        } else {
          this.$router.push({ name: "Personal" });
        }
      } else {
        this.$router.push({ name: "Login" });
      }
    },
  },
  // 监听属性
  watch: {
    data: {
      immediate: true,
      handler() {
        this.handleLogin();
      },
    },
    isLoading: {
      immediate: true,
      handler() {
        this.handleLogin();
      },
    },
  },
};
</script>

<style scoped>
</style>
