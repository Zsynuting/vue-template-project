<template>
  <div class="page-header">
    <div class="user-profile">
      <el-button @click="gotoModules" class="header-btn">
        <i class="iconfont icon-module"></i>
      </el-button>
      <el-dropdown @command="handleCommand">
        <span :title="userName">
          <i class="iconfont icon-user"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="viewPersonal">个人信息</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog
        :visible.sync="personalDialogVisible"
        :close-on-click-modal="false"
        title="个人信息"
        :append-to-body="true"
      >
        <el-row class="user-info-row">
          <el-col :span="4" class="user-info-title">用户名：</el-col>
          <el-col :span="20" class="user-info-detail">{{ currentUser.username }}</el-col>
        </el-row>
        <el-row class="user-info-row">
          <el-col :span="4" class="user-info-title">管辖小区：</el-col>
          <el-col :span="20" class="user-info-detail">{{ currentUser.administrativeDivisionNames }}</el-col>
        </el-row>
        <el-row class="user-info-row">
          <el-col :span="4" class="user-info-title">管辖单位：</el-col>
          <el-col :span="20" class="user-info-detail">{{ currentUser.organizationNames }}</el-col>
        </el-row>
        <el-row class="user-info-row">
          <el-col :span="4" class="user-info-title">密码：</el-col>
          <el-col :span="20" class="user-info-detail">
            <a href="####" @click="changePwdDialogVisible = true">修改密码</a>
          </el-col>
        </el-row>
      </el-dialog>
      <el-dialog
        :visible.sync="changePwdDialogVisible"
        :close-on-click-modal="false"
        title="修改密码"
        custom-class="change-pwd"
        :append-to-body="true"
      >
        <el-form label-width="200px">
          <el-form-item label="旧密码:">
            <el-input type="password" v-model="oldPwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码:">
            <el-input type="password" v-model="newPwd"></el-input>
          </el-form-item>
          <el-form-item label="密码确认:">
            <el-input type="password" v-model="confirmNewPwd"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="changePwdDialogVisible = false">取消</el-button>
          <el-button @click="changePwd">确认</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PageHeader",
  data() {
    return {
      currentUser: {},
      personalDialogVisible: false,
      changePwdDialogVisible: false,
      oldPwd: "",
      newPwd: "",
      confirmNewPwd: ""
    };
  },
  computed: {
    ...mapGetters({
      userName: "getUserName"
    })
  },
  methods: {
    gotoModules() {
      this.$router.push("/modules/all");
    },
    handleCommand(command) {
      switch (command) {
        case "logout":
          this.logout();
          break;
        case "viewPersonal":
          this.viewPersonal();
          break;
      }
    },
    logout() {
      localStorage.removeItem("access-token");
      this.$router.push("/login");
      this.$store.commit("clearVuex");
    },
    viewPersonal() {
      this.$api.account.default
        .get({
          username: this.userName
        })
        .then(({ data }) => {
          this.personalDialogVisible = true;
          this.currentUser = data.content[0];
        });
    },
    changePwd() {
      if (this.newPwd === this.oldPwd) {
        this.$message("新密码不能与旧密码相同");
      } else if (this.newPwd != this.confirmNewPwd) {
        this.$message("新密码需要与确认密码相同");
      } else {
        this.$api.account.password
          .put({
            password: this.oldPwd,
            newPassword: this.newPwd,
            id: this.currentUser.id
          })
          .then(
            ({ data }) => {
              this.$message("修改成功!");
              this.cancelChangePwd();
            },
            ({ data }) => {
              this.$message({
                type: "warning",
                message: data.msg
              });
            }
          );
      }
    },
    cancelChangePwd() {
      this.changePwdDialogVisible = false;
      this.oldPwd = this.newPwd = this.confirmNewPwd = "";
    }
  }
};
</script>

<style scoped>
.page-header {
  padding: 0 20px;
  height: 84px;
  line-height: 84px;
  position: relative;
  color: #fff;
  font-size: 20px;
  background-image: url("/static/page-header.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.user-profile {
  position: absolute;
  right: 0;
  top: 0;
  width: 120px;
  text-align: center;
}
.el-dropdown {
  cursor: pointer;
  color: #fff;
  height: 40px;
}
.icon-user {
  font-size: 24px;
}
.header-btn {
  background-color: transparent;
  border: 0;
  color: #fff;
}
.icon-module {
  font-size: 24px;
}
.user-info-row {
  font-size: 16px;
  line-height: 40px;
}
.user-info-title {
  text-align: right;
}
.user-info-detail {
  text-align: left;
}
</style>