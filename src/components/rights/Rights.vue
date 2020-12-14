<template>
  <div class="right-content">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容区域 -->
    <el-card class="box-card"
      ><el-table :data="rightList" :border="true" :stripe="true" type="index">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="id" label="权限id" width="180">
        </el-table-column>
        <el-table-column prop="nauthName" label="权限名称" width="180">
        </el-table-column>
        <el-table-column prop="level" label="权限等级" width="180">
        </el-table-column>
        <el-table-column prop="pid" label="权限父id"> </el-table-column>
        <el-table-column prop="path" label="对应访问路径"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rightList: []
    }
  },
  methods: {
    async getRightList() {
      const { data: res } = await this.$http.get('/rights/list')
      this.rightList = res.data
    }
  },
  created() {
    this.getRightList()
  }
}
</script>
<style lang="less" scoped>
.right-content {
  width: 100%;
  height: 100%;
}
.el-breadcrumb {
  margin-bottom: 10px;
  padding: 5px;
}
.box-card {
  width: 100%;
  border-radius: 8px;
  //padding: 10px;
}
/deep/ .el-table .cell {
  text-align: center;
}
</style>
