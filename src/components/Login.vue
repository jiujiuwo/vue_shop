<template>
  <div class="login_container">
    <div class="login_box">
      <div class="header_box">
        <img src="../assets/logo.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style lang="less" scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}

.login_box{
  background-color: #ffffff;
  width: 450px;
  height: 300px;
  position:absolute;
  top: 50%;
  left: 50%;    // 绝对位置，距离页面的上方和左边50%，只box的左上角
  transform: translate(-50%,-50%);     // 将box进行位置转换
  border-radius: 15px;    // 将div设置为圆角
  box-shadow: 0 0 10px;   //向外扩散10像素的阴影
  .header_box{    // less嵌套语法,实验放在内外效果一样
    height: 130px;
    width: 130px;
    border: 1px solid #dddddd;    //给header_box添加边框
    border-radius: 50%;     //将边框设置为圆角
    padding: 10px;    //内间距，图片和外部box的间距
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);    //将外面的div位置摆到中间
    background-color: #ffffff;
    img{
      width: 100%;  //这 里的100%是以父盒子 header_box 为参照
      height: 100%;
      border-radius: 50%;   //图片添加圆角
      background-color: #eeeeee;
    }
  }
}
</style>
