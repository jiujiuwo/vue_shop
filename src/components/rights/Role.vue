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
              @click="editRole(scope.row.id)"
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
    <!-- 编辑角色对话框 -->
    <el-dialog
      title="编辑角色"
      :visible.sync="editRoleDialogVisible"
      width="50%"
      @closed="editRoleDialogClosed()"
    >
      <el-form
        label-position="left"
        label-width="80px"
        :model="editRoleFormVo"
        :rules="editRoleFormRules"
        ref="editRoleFormRef"
      >
        <el-form-item label="角色id">
          <el-input v-model="editRoleFormVo.roleId" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRoleFormVo.roleName" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRoleFormVo.roleDesc" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleConfirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Role',
  data() {
    return {
      roleList: [],
      editRoleDialogVisible: false,
      editRoleFormVo: {},
      editRoleFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getRolesData() {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.roleList = res.data
    },
    async editRole(roleId) {
      const { data: res } = await this.$http.get('roles/' + roleId)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.editRoleFormVo = res.data
      this.editRoleDialogVisible = true
    },
    editRoleDialogClosed() {
      this.editRoleFormVo = {}
    },
    editRoleConfirm() {
      this.$refs.editRoleFormRef.validate((pass, object) => {
        if (!pass) {
          return this.$message.error('表单信息有误')
        }
        this.$confirm('确认修改角色信息？', '修改确认', {
          conformButtonText: '确认',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.editRoleRequest()
          })
          .catch(() => {
            this.$message.info('取消修改')
          })
      })
    },
    async editRoleRequest() {
      const { data: res } = await this.$http.put(
        'roles/' + this.editRoleFormVo.roleId,
        this.editRoleFormVo
      )
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.editRoleDialogVisible = false
      this.getRolesData()
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
