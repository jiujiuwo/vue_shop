<template>
  <div>
    Home 页面
    <el-button type="warning" @click="logout"> 登出 </el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
