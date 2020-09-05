<template>
  <Center>
    <form action class="login-container" @submit.prevent="handleSubmit">
      <div class="form-item">
        <div class="input">
          <label for>昵称：</label>
          <input
            type="text"
            v-model="userInfo.nickname"
            @input="validateEmpty('nickname','昵称不能为空')"
          />
        </div>
        <FromError :message="error.nickname" />
      </div>
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
          <label for>确认密码：</label>
          <input
            type="password"
            autocomplete="new-password"
            @input="validatePwdAgain"
            v-model="userInfo.pwdAgain"
          />
        </div>
        <FromError :message="error.pwdAgain" />
      </div>
      <div class="form-item">
        <div class="input">
          <label for></label>
          <button>注册</button>
        </div>
      </div>
    </form>
  </Center>
</template>

<script>
// 导入注册的 网络请求、
import { loginReg } from "network/userService";

//导入垂直居中组件
import Center from "components/utils/Center";
// 导入错误消息显示  组件
import FromError from "components/utils/FromError";
export default {
  name: "",
  data() {
    return {
      userInfo: {
        nickname: "",
        loginId: "",
        loginPwd: "",
        pwdAgain: "",
      },
      error: {
        nickname: "",
        loginId: "",
        loginPwd: "",
        pwdAgain: "",
      },
    };
  },
  components: {
    Center,
    FromError,
  },
  methods: {
    // 处理提交数据
    async handleSubmit() {
      // 先判断是否输入信息
      if (
        this.validateEmpty("nickname", "昵称不能为空") &
        this.validateEmpty("loginId", "帐号不能为空") &
        this.validateEmpty("loginPwd", "密码不能为空") &
        this.validatePwdAgain()
      ) {
        // 提交数据 到服务器 （将申请的用户信息提交到服务器）
        let resolve = await loginReg(this.userInfo);
        // 判断服务器是否已经存在相同用户名  注册成功 跳转登录页面
        if (resolve.data) {
          alert("注册成功");
          this.$router.push({
            name: "Login",
          });
        } else {
          this.error.loginId = resolve.msg;
          alert("注册失败，请检查用户名");
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
    // 验证 两次密码是否输入一致
    validatePwdAgain() {
      let onePassword = this.validateEmpty("pwdAgain", "重复密码不能为空");
      if (onePassword) {
        if (this.userInfo.pwdAgain === this.userInfo.loginPwd) {
          return true;
        } else {
          return false;
        }
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
