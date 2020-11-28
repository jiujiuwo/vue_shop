<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="header_box">
        <img src="../assets/logo.png" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        class="login_login_form"
        :model="loginForm"
        :rules="loginLoginFormRules"
        ref="loginLoginFormRef"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="login_form_btn">
          <el-button type="primary" @click="validateLoginForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
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
      // 表单数据绑定对象
      loginForm: {
        username: 'admin  ',
        password: '123456'
      },
      // 表单验证规则对象
      loginLoginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 25, message: '长度在 6 到 25个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置表单数据
    resetForm() {
      this.$refs.loginLoginFormRef.resetFields()
      // console.info(this)
    },
    validateLoginForm() {
      // console.info(this)
      // 回调函数的第一个参数为数据验证是否通过，第二个参数为验证不通过的对象，也可以直接省略第二个参数
      this.$refs.loginLoginFormRef.validate(async (valid) => {
        if (valid) {
          // await用来处理返回值是Promise的方法，它最外面的函数必须加async表示是异步的
          const { data: res } = await this.$http.post('login', this.loginForm) // 大括号的作用为从返回结果中解构出data,重命名为res
          if (res.meta.status !== 200) {
            this.$message({
              showClose: true,
              message: '登录失败',
              type: 'error'
            })
            console.info('登录失败')
          } else {
            this.$message({
              showClose: true,
              message: '登录成功',
              type: 'success'
            })
            window.sessionStorage.setItem('toekn', res.data.token)
            this.$router.push('/home')
          }
        } else {
          this.$message({
            showClose: true,
            message: '表单信息有误',
            type: 'error'
          })
        }
      })
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
