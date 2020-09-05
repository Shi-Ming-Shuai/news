<template>
  <Center>
    <form action class="login-container" @submit.prevent="handleSubmit">
      <div class="form-item">
        <div class="input">
          <label for>账号：</label>
          <input type="text" v-model="userInfo.loginId" @input="validateEmpty('loginId','账号不能为空')" />
        </div>
        <FromError :message="error.loginId" />
      </div>
      <div class="form-item">
        <div class="input">
          <label for>密码：</label>
          <input
            type="password"
            autocomplete="new-password"
            v-model="userInfo.loginPwd"
            @input="validateEmpty('loginPwd','密码不能为空')"
          />
        </div>
        <FromError :message="error.loginPwd" />
      </div>
      <div class="form-item">
        <div class="input">
          <label for></label>
          <button>{{$store.state.loginUser.isLoading ? 'Loading...' : '登录'}}</button>
        </div>
      </div>
    </form>
  </Center>
</template>

<script>
//1. 垂直居中组件  2. 错误消息显示组件  3.蒙层组件
import Center from "components/utils/Center";
import FromError from "components/utils/FromError";
import Modal from "components/utils/Modal";

export default {
  name: "",
  data() {
    return {
      userInfo: {
        loginId: "",
        loginPwd: "",
      },
      error: {
        loginId: "",
        loginPwd: "",
      },
    };
  },
  components: {
    Center,
    FromError,
    Modal,
  },
  methods: {
    // 处理提交数据
    async handleSubmit() {
      if (this.$store.state.loginUser.isLoading) {
        return;
      }
      // 先判断是否输入信息
      if (
        this.validateEmpty("loginId", "帐号不能为空") &
        this.validateEmpty("loginPwd", "密码不能为空")
      ) {
        // 向服务器发送数据  Vuex中 actions判断账号密码是否正确
        let res = await this.$store.dispatch("loginUser/login", this.userInfo);
        if (res) {
          // 登录成功 跳转页面
          this.$router.push({
            name: "Home",
          });
        } else {
          console.log("false");
          this.error.loginId = "账号或密码错误";
        }
      }
    },
    // 验证非空  （输入的不是空的）
    validateEmpty(field, errorMessage) {
      if (this.userInfo[field]) {
        this.error[field] = "";
        return true;
      } else {
        this.error[field] = errorMessage;
        return false;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 400px;
}
.form-item .input {
  display: flex;
}
.form-item label {
  width: 100px;
  display: inline-block;
  text-align: right;
  line-height: 41px;
}
.form-item input,
.form-item button {
  flex-grow: 1;
}
</style>
