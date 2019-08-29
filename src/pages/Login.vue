<template>
  <div class="login">
    <div class="logo"></div>
    <el-card class="login-panel">
      <div slot="header" class="login-header">
        <div class="header-1">Sign in</div>
        <div class="header-2">用户登录</div>
      </div>
      <div class="login-body">
        <div class="form">
          <form>
            <div class="login-form-item clearfix">
              <div class="login-icon">
                <i class="iconfont icon-user-login"></i>
              </div>
              <div class="username">
                <input type="text" v-model="username">
              </div>
            </div>
            <div class="login-form-item clearfix">
              <div class="login-icon">
                <i class="iconfont icon-password login-icon"></i>
              </div>
              <div class="password">
                <input type="password" v-model="password">
                <input type="submit" v-show="false" @click="login">
              </div>
            </div>
          </form>
        </div>
        <div class="login-keep">
          <span @click="rememberId = !rememberId">
            <i
              :class="['iconfont',  { 'icon-check-checked' :rememberId, 'icon-check-unchecked':!rememberId }]"
            ></i>
            <span>记住用户名</span>
          </span>
        </div>
        <div>
          <div class="login-btn" @click="login">登录</div>
        </div>
        <div class="tech-support">技术支持 贝辰信科技</div>
      </div>
    </el-card>
    <el-carousel :interval="5000" height="100%" class="carousel">
      <el-carousel-item v-for="index of 3" :key="index" class="background">
        <img :src="'/static/background-' + index + '.jpg'" style="height: 100%; width: 100%">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      rememberId: false
    };
  },
  mounted() {
    this.username = localStorage.getItem("username");
    this.rememberId = !!this.username;
  },
  methods: {
    login(e) {
      if (this.username && this.password) {
        if (this.rememberId) localStorage.setItem("username", this.username);
        this.$api
          .login({ userName: this.username, password: this.password })
          .then(username => {
            this.$store.commit("setUserName", username);
            this.$router.push("/modules/all");
          });
      }
      return e.preventDefault();
    }
  }
};
</script>

<style scoped>
.login {
  height: 100%;
  min-height: 700px;
  position: relative;
}
.tech-support {
  width: 100%;
  text-align: right;
  color: #9c9cab;
  font-size: 12px;
}
.logo {
  position: absolute;
  top: 17%;
  left: 10%;
  white-space: nowrap;
  z-index: 10;
  font-size: 60px;
  font-weight: bold;
  color: #393857;
}
.carousel {
  height: 100%;
}
.background {
  height: 100%;
}
.login-panel {
  position: absolute;
  top: 17%;
  right: 10%;
  height: 66%;
  width: 24%;
  min-height: 600px;
  min-width: 400px;
  z-index: 10;
  opacity: 0.9;
  box-shadow: 0 6px 21px 9px rgba(37, 37, 56, 0.06);
  border-radius: 10px;
}
.login-header {
  margin: 20px;
  font-size: 50px;
  font-weight: bold;
  color: #393857;
  height: 150px;
}
.login-body {
  margin: 20px;
}
.login-form-item {
  line-height: 60px;
  height: 60px;
  margin: 20px 0;
  border: 1px solid #9c9cab;
}
.username input,
.password input {
  outline: 0;
  border: 0;
  color: #2a2a44;
  font-size: 18px;
  height: 40px;
  width: calc(100% - 60px);
}

.header-1 {
  font-size: 50px;
  height: 63px;
}
.header-2 {
  height: 38px;
  font-size: 28px;
}
.login-btn {
  height: 36px;
  line-height: 36px;
  background-color: #615f99;
  margin: 20px 0px;
  text-align: center;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
.login-icon {
  color: #393857;
  float: left;
  width: 36px;
  text-align: center;
}
.login-keep {
  line-height: 60px;
  height: 60px;
  color: #9c9cab;
  font-size: 12px;
  cursor: pointer;
}
.login-panel-1 {
  opacity: 0.9;
}
.login-panel-2 {
  background-color: #fff;
}
.login-panel-3 {
  background-color: #fff;
}
</style>