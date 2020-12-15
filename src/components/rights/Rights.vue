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
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag v-else-if="scope.row.level === '1'" type="success"
              >二级</el-tag
            >
            <el-tag v-else type="warning">三级</el-tag>
          </template>
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
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.rightList = res.data
    }
  },
  created() {
    this.getRightList()
  }
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 10px;
  padding: 5px;
}
.box-card {
  border-radius: 8px;
  padding: 5px;
}
/deep/ .el-table .cell {
  text-align: center;
}
</style>
