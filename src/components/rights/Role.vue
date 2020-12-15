<template>
  <div class="right-content">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容区域 -->
    <el-card class="box-card">
      <el-button type="primary">添加角色</el-button>
      <el-table
        :data="roleList"
        style="width: 100%"
        :border="true"
        :stripe="true"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['border_bottom', index1 === 0 ? 'border_top' : '']"
              v-for="(child, index1) in scope.row.children"
              :key="child.id"
              type="flex"
              align="middle"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="4"
                ><el-tag type="primary" closable="true">{{
                  child.authName
                }}</el-tag
                ><i class="el-icon-caret-right"></i
              ></el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="20">
                <!-- 这里有新的row,则将18再次等分为24份 -->
                <el-row
                  :class="[index2 === 0 ? '' : 'border_top']"
                  v-for="(child1, index2) in child.children"
                  :key="child1.id"
                  type="flex"
                  align="middle"
                >
                  <!-- 二级权限 -->
                  <el-col :span="6"
                    ><el-tag type="warning" closable="true">{{
                      child1.authName
                    }}</el-tag
                    ><i class="el-icon-caret-right"></i></el-col
                  ><el-col :span="18"
                    ><el-row
                      :class="[index3 === 0 ? '' : 'border_top']"
                      v-for="(child2, index3) in child1.children"
                      :key="child2.id"
                      type="flex"
                      align="middle"
                    >
                      <!-- 三级权限 -->
                      <el-col :span="18"
                        ><el-tag type="success" closable="true">{{
                          child2.authName
                        }}</el-tag></el-col
                      ></el-row
                    ></el-col
                  ></el-row
                >
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="角色id" width="180">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="180">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作"
          ><template slot-scope="scope"
            ><el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editRoleAuth(scope.row.id)"
              >编辑</el-button
            ><el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            ><el-button type="warning" icon="el-icon-setting" size="mini"
              >分配权限</el-button
            ></template
          >
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'Role',
  data() {
    return { roleList: [] }
  },
  methods: {
    async getRolesData() {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.roleList = res.data
    }
  },
  created() {
    this.getRolesData()
  }
}
</script>
<style lang="less" scoped>
.el-button {
  margin-bottom: 10px;
}
.el-breadcrumb {
  margin-bottom: 10px;
  padding: 5px;
}
.right-content .el-card {
  border-radius: 8px;
  padding: 5px;
}
/deep/ .el-table .cell {
  text-align: center;
}

.border_top {
  border-top: 1px solid #ddd;
}

.border_bottom {
  border-bottom: 1px solid #ddd;
}
.el-tag {
  margin: 7px;
}
</style>
