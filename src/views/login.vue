<template>
  <div class="login">
    <div class="content">
      <img class="logo" src="@/assets/img/logo.png" alt />
      <p class="title">
        中 国 建 设 科 技 集 团
        <span>v 1.0</span>
      </p>
      <div class="from">
        <el-form :rules="loginRule" ref="loginForm" :model="user">
          <el-form-item prop="username" size="medium" style="margin-bottom: 20px">
            <el-input
              placeholder="请输入账号"
              prefix-icon="iconfont iconzhanghaoxinxi"
              v-model="user.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" size="medium">
            <el-input
              placeholder="请输入密码"
              type="password"
              prefix-icon="iconfont iconbaomiliulan-copy"
              v-model="user.password"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button class="dlbtn" type="primary" @click="login()" :loading="loginLoading"
          >登录</el-button
        >
        <el-button type="text" class="forget" @click="forget()">忘记密码？</el-button>
      </div>
    </div>
    <el-dialog
      class="forgetDialog"
      :visible="modelVisible"
      title="忘记密码，请电话联系系统管理员处理"
      width="530px"
      @close="Close"
      :close-on-click-modal="false"
    >
      <p>管理员：{{ administrator.name }}</p>
      <p>
        手机：{{ administrator.mobile }}，座机：{{ administrator.landline }}，短号：{{
          administrator.shortTel
        }}
      </p>
      <div class="diaBtn">
        <el-button type="text" class="forget" @click="Close()">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store";
//引入LODOP
// import { getLodop } from "../lodop/LodopFuncs";
export default {
  data() {
    return {
      modelVisible: false,
      user: {
        username: "",
        password: "",
      },
      administrator: {
        name: "",
        mobile: "",
        landline: "",
        shortTel: "",
      },
      loginRule: {
        username: [
          {
            required: true,
            message: "账号不能为空",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: ["blur", "change"],
          },
        ],
      },
      loginLoading: false,
    };
  },
  mounted() {
    localStorage.clear();
  },
  methods: {
    login() {
      if (this.user.username === "" && this.user.password === "") {
        this.$message.error(`账号密码不能为空，请输入账号密码`);
        return;
      }
      if (this.user.username === "") {
        this.$message.error(`账号不能为空，请输入账号`);
        return;
      }
      if (this.user.password === "") {
        this.$message.error(`密码不能为空，请输入密码`);
        return;
      }
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          this.loginLoading = true;
          this.$http.unauth
            .post("/user/login", {
              username: this.user.username,
              password: this.user.password,
            })
            .then(({ data }) => {
              if (data.code == 1) {
                this.loginLoading = false;
                this.$store.commit("login", {
                  token: data.result.token,
                });
                this.$store.commit("setUser", {
                  userInfo: data.result.authAdmin,
                });
                this.$store.commit("setUseName", {
                  userName: data.result.authAdmin.updatedByName,
                });
                this.$router.push("/home");
              }
              if (data.code == 40001) {
                this.loginLoading = false;
                this.user.password = "";
                this.$message.error(`系统繁忙，请稍后重试`);
              }
              if (data.code == 20002) {
                this.loginLoading = false;
                this.user.password = "";
                this.$message.error(`登陆失败，密码错误`);
              }
              if (data.code == 20004) {
                this.loginLoading = false;
                this.user.password = "";
                this.$message.error(`登陆失败，用户名错误`);
              }
            })
            .catch((err) => {
              this.user.password = "";
              this.loginLoading = false;
              this.$message.error(`登陆失败，${err}`);
            });
        }
      });
    },
    forget() {
      this.$http.unauth
        .get("/user/getAdmin")
        .then(({ data }) => {
          if (data.code == 1) {
            this.modelVisible = true;
            this.administrator.name = data.result[0].name;
            this.administrator.mobile = data.result[0].mobile;
            this.administrator.landline = data.result[0].landline;
            this.administrator.shortTel = data.result[0].shortTel;
          }
        })
        .catch((err) => {
          this.$message.error(`获取管理员信息失败${err}`);
        });
    },
    Close() {
      this.modelVisible = false;
    },
    /**
     * LODOP调用示例
     * **/
    // lodopTest() {
    //   /**
    //    * LODOP官方API地址:http://www.lodop.net/LodopDemo.html
    //    * **/
    //   let LODOP = getLodop(); //获取LODOP对象

    //   LODOP.PRINT_INIT("vue调用lodop"); //打印初始化，必须调用，文本内容自定义
    //   LODOP.SET_PRINT_STYLE("FontSize", 18);
    //   LODOP.SET_PRINT_STYLE("Bold", 1);
    //   LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印页面部分内容");
    //   LODOP.SET_PRINTER_INDEX(-1); //设置默认打印机
    //   //LODOP.PRINT(); //直接打印
    //   //LODOP.PREVIEW(); //打印预览
    //   //LODOP.PRINT_SETUP(); //打印维护
    //   LODOP.PRINT_DESIGN(); //打印设计
    // },
  },
};
</script>
<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  .content {
    width: 1090px;
    padding-top: 80px;
    height: 686px;
    position: relative;
    top: 50%;
    left: 50%;
    -moz-transform: translateY(-50%) translateX(-50%);
    -webkit-transform: translateY(-50%) translateX(-50%);
    -ms-transform: translateY(-50%) translateX(-50%);
    -o-transform: translateY(-50%) translateX(-50%);
    transform: translateY(-50%) translateX(-50%);
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 2px 40px 0px rgba(142, 22, 0, 0.05);

    .logo {
      width: 130px;
      height: 119px;
      margin: 0 auto;
      display: block;
    }

    .title {
      margin: 40px 0;
      line-height: 40px;
      text-align: center;
      font-size: 32px;
      color: #333;
      letter-spacing: 4px;

      span {
        color: #989898;
        font-size: 14px;
        letter-spacing: normal;
      }
    }

    .from {
      width: 440px;
      margin: 40px auto;
    }

    .el-input {
      width: 440px;
      height: 60px;
      margin-bottom: 20px;
    }

    .el-input--prefix .el-input__inner {
      height: 60px;
      line-height: 60px;
      padding-left: 70px;
    }

    .el-input__prefix {
      left: 20px;
    }

    .dlbtn {
      width: 440px;
      height: 66px;
      margin-top: 20px;
      background: #ffc700;
      font-size: 24px;
      color: #242424;
      border: 0;
    }

    .forget {
      width: 440px;
      margin: 20px 0 0 0;
      text-align: center;
      color: #989898;
    }
  }

  .forgetDialog {
    .el-dialog__title {
      font-size: 14px;
      color: #989898;
    }

    .el-dialog__body {
      padding: 20px;

      p {
        line-height: 35px;
        color: #242424;
        font-size: 14px;
      }

      .diaBtn {
        text-align: right;
      }
    }
  }
}
</style>
