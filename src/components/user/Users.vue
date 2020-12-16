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
      <el-row type="flex" :gutter="5">
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            :clearable="true"
            v-model="paramForPageQuery.query"
            @clear="queryPageData()"
            ><el-button
              class="input-search-btn"
              icon="el-icon-search"
              @click="queryPageData()"
              clickable="true"
              slot="append"
            ></el-button></el-input
        ></el-col>
        <el-col :span="2">
          <el-button type="primary" @click="addUserDialogVisible = true"
            >添加用户</el-button
          >
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
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top" :hide-after="1000">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="showEditUserDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top" :hide-after="1000">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="deleteUserConfirm(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="分配角色" placement="top" :hide-after="1000">
              <el-button
                type="warning"
                icon="el-icon-setting"
                circle
              ></el-button> </el-tooltip
          ></template>
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
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addUserDialogVisible"
      width="50%"
      @closed="addUserDialogClosed()"
    >
      <el-form
        label-position="left"
        label-width="80px"
        :model="addUserFormVo"
        :rules="rules"
        ref="addUserFormRef"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserFormVo.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="addUserFormVo.password"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserFormVo.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserFormVo.mobile" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户信息对话框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editUserDialogVisible"
      @closed="editUserDialogClosed()"
      width="50%"
    >
      <el-form
        label-position="left"
        label-width="80px"
        :model="editUserFormVo"
        :rules="rules"
        ref="editUserFormRef"
      >
        <el-form-item label="用户名">
          <el-input
            v-model="editUserFormVo.username"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserFormVo.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editUserFormVo.mobile" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserConfirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data() {
    var validateEmail = (rule, value, callback) => {
      var pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (value === '') {
        callback(new Error('请输入邮箱地址'))
      } else if (pattern.test(value) <= 0) {
        callback(new Error('邮箱地址有误!'))
      } else {
        callback()
      }
    }
    var validateMobile = (rule, value, callback) => {
      var pattern = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (pattern.test(value) <= 0) {
        callback(new Error('手机号格式有误!'))
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      totalSize: 0,
      paramForPageQuery: { query: '', pagenum: 1, pagesize: 10 },
      addUserDialogVisible: false, // 添加用户的弹出框
      editUserDialogVisible: false, // 修改用户信息时的弹出框
      addUserFormVo: { username: '', password: '', email: '', mobile: '' },
      editUserFormVo: { username: '', email: '', mobile: '' },
      // 表单的验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 查询用户列表数据
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
    // 监听用户状态改变
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
    },
    // 添加用户的网络请求
    async addUser() {
      const { data: res } = await this.$http.post('users', this.addUserFormVo)
      if (res.meta.status === 201) {
        // 添加成功
        this.$message.success(res.meta.msg)
        this.addUserDialogVisible = false
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    // 添加用户二次确认
    addUserConfirm() {
      this.$refs.addUserFormRef.validate((pass, obj) => {
        if (pass) {
          this.$confirm('确认添加用户？', '添加确认', {
            confirmButtonText: '确认',
            cancleButtonText: '取消'
          })
            .then(() => {
              this.addUser()
            })
            .catch(() => {
              this.$message.info('取消添加')
            })
        } else {
          this.$message.error('表单信息有误')
        }
      })
    },
    // 修改用户的网络请求
    async editUser() {
      const { data: res } = await this.$http.put(
        'users/' + this.editUserFormVo.id,
        this.editUserFormVo
      )
      if (res.meta.status === 200) {
        this.$message.success(res.meta.msg)
      } else {
        this.$message.error(res.meta.msg)
      }
      this.editUserDialogVisible = false
    },
    // 修改用户二次确认
    editUserConfirm() {
      this.$refs.editUserFormRef.validate((pass, obj) => {
        if (pass) {
          this.$confirm('确认修改？', '修改确认', {
            confirmButtonText: '确认',
            cancleButtonText: '取消'
          })
            .then(() => {
              this.editUser()
            })
            .catch(() => {
              this.$message.info('取消修改')
            })
        } else {
          this.$message.error('表单信息有误')
        }
      })
    },
    // 关闭添加用户对话框后调用方法重置表单
    addUserDialogClosed() {
      this.$refs.addUserFormRef.resetFields()
      this.queryPageData()
    },
    // 打开修改用户信息的对话框
    async showEditUserDialog(userId) {
      const { data: res } = await this.$http.get('users/' + userId)
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      } else {
        this.editUserFormVo = res.data
        this.editUserDialogVisible = true
      }
    },
    // 关闭修改用户信息对话框后调用方法
    editUserDialogClosed() {
      this.$refs.editUserFormRef.resetFields()
      this.queryPageData()
    },
    // 删除用户确认
    async deleteUserConfirm(userId) {
      this.$confirm('确认删除用户' + userId, '删除确认', {
        confirmButtonText: '确认',
        cancleButtonText: '取消'
      })
        .then(() => {
          this.deleteUser(userId)
        })
        .catch(() => {
          this.$message.warning('取消删除')
        })
    },
    async deleteUser(userId) {
      const { data: res } = await this.$http.delete('users/' + userId)
      if (res.meta.status === 200) {
        this.$message.success(res.meta.msg)
        this.queryPageData()
      } else {
        this.$message.error(res.meta.msg)
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
  padding: 3px;
}
.box-card {
  margin-left: 0px;
  padding: 10px;
}
.el-table {
  margin-top: 20px;
  font-size: 12px;
}
.el-pagination {
  margin-top: 20px;
}
.input-search-btn:active {
  background-color: #bbbbbb;
}
</style>
