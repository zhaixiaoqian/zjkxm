<template>
  <div class="container" ref="container" style="position: relative">
    <el-row class="topBar">
      <el-col :span="10">
        <img class="logo" src="@/assets/img/logo.png" alt />
        <p class="title">中国建设科技集团</p>
      </el-col>
      <el-col :span="4" :offset="10">
        <div class="titlename">
          <p>欢迎您 {{ name }}</p>

          <el-button class="tuichu" type="text" @click="logout()"
            >退出</el-button
          >
        </div>
      </el-col>
    </el-row>

    <el-container>
      <el-aside style="width: auto">
        <common-aside></common-aside>
      </el-aside>
      <el-main>
        <common-tab></common-tab>
        <keep-alive>
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import store from "@/store";
import { author } from "@/utils";
import CommonAside from "../components/CommonAside";
import CommonTab from "../components/CommonTab";
import CommonHeader from "../components/CommonHeader";
export default {
  components: {
    CommonAside,
    CommonHeader,
    CommonTab,
  },
  data() {
    return {
      activePath: "",
      name: "",
      levelList: [],
      menuList: [],
      dialogVisible: false,
      roleform: {
        oldKey: "",
        newKey: "",
      },
      rules: {
        oldKey: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        newKey: [{ required: true, message: "请输入新密码", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.activePath = this.$route.path;
    this.name = store.state.user.userName;
    this.roleform = store.state.user.userName;
    // this.getmenuList();
  },
  // watch: {
  //   $route() {
  //     this.getBreadcrumb();
  //   },
  // },
  methods: {
    //修改密码
    changemima() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.roleform.oldKey = "";
      this.roleform.newKey = "";
      this.dialogVisible = false;
    },
    logout() {
      setTimeout(() => {
        this.$store.commit("logout");
        // this.$store.commit("clearClients");
        this.$router.replace({ name: "login" });
      }, 100);
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    //点击首页按钮
    // goindex() {
    //   // this.$router.push({
    //   //   path: "/zeratul"
    //   // });
    // },
    // gobanck() {
    //   this.$router.go(-1);
    // },
    // getBreadcrumb() {
    //   let matched = this.$route.matched.filter((item) => item.name);
    //   const first = matched[0];
    //   if (
    //     first &&
    //     first.name.trim().toLocaleLowerCase() !== "hospital".toLocaleLowerCase()
    //   ) {
    //     matched = [{ path: "/hospital", meta: { title: "hospital" } }].concat(matched);
    //   }
    //   this.levelList = matched;
    // },
    // save() {
    //   author
    //     .post("/user/editPassword", {
    //       id: this.roleform.id,
    //       oldPassword: this.roleform.oldKey,
    //       password: this.roleform.newKey
    //     })
    //     .then(res => {
    //       if (res.data.code == 1) {
    //         console.log(res.data.result);
    //         this.logout();
    //       }
    //     })
    //     .catch(err => {
    //       this.$message.error(`${err}`);
    //     });
    // }
  },
  created() {
    // this.getBreadcrumb();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
};
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  // .main {
  //   padding: 0 20px 20px 20px;
  //   min-width: 1140px;
  //   background: #f2f2f2;
  //   height: calc(100% - 50px);
  // }
  .el-container { 
    width: 100%;
    // min-width: 1140px;
    background: #f2f2f2;
    height: calc(100% - 50px);
    .el-aside {
      background: #fff;
    }
    .el-main {
      height: 100%;
      padding: 0;
    }
  }
  .topBar {
    height: 50px;
    width: 100%;
    background: #fff;
    .logo {
      float: left;
      width: 164px;
      height: 35px;
      margin: 10px 10px 0 10px;
    }
    .title {
      float: left;
      font-weight: bold;
      margin-top: 15px;
      // line-height: 49px;
      font-size: 18px;
      color: #333;
      span {
        font-size: 14px;
        color: #989898;
      }
    }
    .titlename {
      float: right;
      line-height: 49px;
      color: #989898;
      font-size: 14px;
      p {
        display: inline;
        padding-right: 5px;
        padding-right: 10px;
        margin-right: 10px;
        border-right: 1px solid #d6d6d6;
        position: relative;
        .tuichu {
          display: none;
        }
      }
      p:hover {
        .tuichu {
          display: block;
          position: absolute;
          top: 15px;
          left: 40px;
          border-bottom: 1px solid #ffc700;
          padding: 10px;
          background: #fff;
        }
      }

      .tuichu {
        display: inline;
        color: #989898;
        margin-right: 10px;
        font-size: 14px;
      }
    }
  }
  .topdia {
    .el-dialog {
      padding: 0 20px;
      .el-button {
        width: 120px;
        height: 40px;
        padding: 0;
      }
      .el-button:hover {
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #ffc700;
      }
      .el-button--primary {
        background: #ffc700;
        color: #242424;
        border: 1px solid rgba(36, 36, 36, 1);
      }
      .el-dialog__header {
        border-bottom: 1px solid #d6d6d6;
        margin-bottom: 20px;
        padding: 20px 0 10px 0px;
      }
      .el-dialog__body {
        padding: 0;
        .el-form-item {
          margin-bottom: 15px;
          .el-form-item__label {
            line-height: 20px;
            font-size: 14px;
            color: #989898;
            font-weight: normal;
          }
          .el-input__inner {
            width: 200px;
            height: 30px;
          }
        }
        .bottomBtn {
          text-align: right;
          padding-bottom: 20px;
        }
      }
    }
  }
}
</style>
