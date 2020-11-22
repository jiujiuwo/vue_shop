<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="header_box">
        <img src="../assets/logo.png" />
      </div>
      <!-- 登录表单区域 -->
      <el-form class="login_login_form" v-model="loginForm">
        <el-form-item>
          <el-input
            prefix-icon="el-icon-user-solid"
            placeholder="请输入密码"
            v-model="loginForm.userName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="login_form_btn">
          <el-button type="primary">提交</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        userName: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

// 登录框布局设置
.login_box {
  background-color: #ffffff;
  width: 450px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%; // 绝对位置，距离页面的上方和左边50%，只box的左上角
  transform: translate(-50%, -50%); // 将box进行位置转换
  border-radius: 15px; // 将div设置为圆角
  box-shadow: 0 0 10px; //向外扩散10像素的阴影
  .header_box {
    // less嵌套语法,实验放在内外效果一样
    height: 130px;
    width: 130px;
    border: 1px solid #dddddd; //给header_box添加边框
    border-radius: 50%; //将边框设置为圆角
    padding: 10px; //内间距，图片和外部box的间距
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%); //将外面的div位置摆到中间
    background-color: #ffffff;
    img {
      width: 100%; //这 里的100%是以父盒子 header_box 为参照
      height: 100%;
      border-radius: 50%; //图片添加圆角
      background-color: #eeeeee;
    }
  }
}

// 表单按钮样式及位置设置
.login_form_btn {
  display: flex; // 使用弹性布局
  justify-content: flex-end; //水平居右对其
}

// 表单整体的样式和布局
.login_login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px; // 内部间距，上下为0，左右12px
  box-sizing: border-box; // box-sizing 默认为 content
}
</style>
