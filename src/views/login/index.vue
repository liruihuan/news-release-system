<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="icon-container">
        <img src="@/assets/images/LOGO.png" alt>
      </div>
      <div class="title-container">
        <h1 class="title">欢迎使用新闻发布系统</h1>
      </div>

      <el-form-item prop="account" ref="accountBox" :style="border">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          ref="account"
          v-model="loginForm.account"
          name="account"
          type="text"
          auto-complete="on"
          @focus="border={border:'1px solid #0284FF'}"
        />
      </el-form-item>

      <!-- <el-tooltip v-model="capsTooltip" content="大写锁定已开启" placement="right" manual> -->
      <el-form-item prop="password" ref="passwordBox" :style="border1">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          name="password"
          auto-complete="on"
          @keyup.native="checkCapslock"
          @blur="capsTooltip = false"
          @focus="border1={border:'1px solid #0284FF'}"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>

      <!-- </el-tooltip> -->

     

      <el-button
        :loading="loading"
        type="primary"
        class="btn-login"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
import {setToken}  from "@/utils/auth"
export default {
  name: "Login",

  data() {
    var account = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
        this.border = { border: "1px solid red" };
      } else if (value.length < 5 || value.length > 18) {
        callback(new Error("长度在 5 到 18 个字符"));
        this.border = { border: "1px solid red" };
      } else {
        callback();
        this.border = { border: "1px solid  rgba(255, 255, 255, 0.1)" };
      }
    };
    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/;
    var password = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
        this.border1 = { border: "1px solid red" };
      } else if (!reg.test(value)) {
        callback(new Error("密码格式应为6到32位数字和字母的组合"));
        this.border1 = { border: "1px solid red" };
      } else {
        callback();
        this.border1 = { border: "1px solid  rgba(255, 255, 255, 0.1)" };
      }
    };
    return {
      border: { border: "1px solid rgba(255, 255, 255, 0.1)" },
      border1: { border: "1px solid rgba(255, 255, 255, 0.1)" },
      loginForm: {
        account: "admin",
        password: "qianyi123",
      },
      loginRules: {
        account: [{ validator: account, trigger: "blur" }],
        password: [{ validator: password, trigger: "blur" }]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined
    };
  },

  created() {
   
  },
  mounted() {
    if (this.loginForm.account === "") {
      this.$refs.account.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  computed: {},
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && (key >= "a" && key <= "z")) ||
          (!shiftKey && (key >= "A" && key <= "Z"))
        ) {
          this.capsTooltip = true;
          this.$message({
            message: "大写锁定已开启",
            type: "warning"
          });
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === "CapsLock" && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
         this.loading = true;
        if (valid) {
          this.loading = false;
          setToken("测试")
           this.$router.push({ path: "/" });
         
        } else {
           this.loading = false;
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  background: url(../../assets/images/bg.gif) repeat;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,50%);
    overflow: hidden;
    .btn-login {
      width: 100%;
      margin: 30px 0;
      font-size: 14px;
      height: 35px;
      letter-spacing: 2px;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .icon-container {
    text-align: center;
  }
  .title-container {
    position: relative;

    .title {
      color: $light_gray;
      margin: 0px auto 20px auto;
      text-align: center;
      font-weight: 500;
      letter-spacing: 2px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }


}
</style>
