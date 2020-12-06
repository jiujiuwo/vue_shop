<template>
  <div class="div_users_root">
    <!-- 导航面包屑 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/users' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容显示区，采用card组件显示 -->
    <el-card class="box-card">
      <!-- 搜索区域 -->
      <el-row type="flex" :gutter="15">
        <el-col :span="10">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="8">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="tableData" border style="width: 100%" stripe>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="id" label="ID" width="80"> </el-table-column>
        <el-table-column prop="role_name" label="角色" width="120">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="120">
        </el-table-column>
        <el-table-column prop="email" label="Email" width="120">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="120">
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="scope"
            ><el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleSwitchChange(scope.row)"
            >
            </el-switch
          ></template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <el-tooltip content="编辑" placement="top" :hide-after="1000">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top" :hide-after="1000">
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </el-tooltip>
          <el-tooltip content="分配角色" placement="top" :hide-after="1000">
            <el-button type="warning" icon="el-icon-setting" circle></el-button>
          </el-tooltip>
        </el-table-column>
        <el-table-column prop="mg_state" label="作用域插槽"
          ><template slot-scope="scope">{{ scope.row }}</template>
        </el-table-column></el-table
      >
      <!-- 分页工具区 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paramForPageQuery.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="paramForPageQuery.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data() {
    return {
      tableData: [],
      totalSize: 0,
      paramForPageQuery: { query: '', pagenum: 1, pagesize: 10 }
    }
  },
  methods: {
    async queryPageData() {
      const { data: res } = await this.$http.get('/users', {
        params: this.paramForPageQuery
      })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      } else {
        this.tableData = res.data.users
        this.totalSize = res.data.total
      }
    },
    // 监听pagesize改变
    handleSizeChange(newPageSize) {
      this.paramForPageQuery.pagesize = newPageSize
      this.queryPageData()
    },
    // 监听页码值改变
    handleCurrentChange(newPageNum) {
      this.paramForPageQuery.pagenum = newPageNum
      this.queryPageData()
    },
    async handleSwitchChange(userRow) {
      const { data: res } = await this.$http.put(
        `users/${userRow.id}/state/${userRow.mg_state}`
      )
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
        this.queryPageData()
      } else {
        this.$message.success(res.meta.msg)
      }
    }
  },
  created() {
    this.queryPageData()
  }
}
</script>

<style lang="less" scoped>
.div_users_root {
  margin-left: 0px;
  height: 100%;
}
.el-breadcrumb {
  margin-bottom: 10px;
}
.box-card {
  margin-left: 0px;
  height: 98%;
}
.el-table {
  margin-top: 20px;
  font-size: 12px;
}
.el-pagination {
  margin-top: 20px;
}
</style>
