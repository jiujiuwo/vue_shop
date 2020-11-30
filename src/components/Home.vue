<template>
  <el-container class="el_container_outest">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img class="img" src="../assets/logo.png" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="warning" @click="logout"> 登出 </el-button></el-header
    >
    <!-- 页面主题区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isMenuCollapse ? '65px' : '200px'">
        <!-- 侧边栏菜单区域 -->
        <div class="div_collapse" @click="collapseMenu">|||</div>
        <el-menu
          background-color="#545c64"
          text-color="#ffffff"
          unique-opened="true"
          :collapse="isMenuCollapse"
          :collapse-transition="false"
          :router="true"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <!-- 一级菜单模板区，制定图标和文本 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconForMenu[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容，页面主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      menuList: [],
      iconForMenu: {
        // 一级菜单的图标
        125: 'el-icon-user-solid',
        101: 'el-icon-goods',
        102: 'el-icon-s-order',
        103: 'el-icon-lock',
        145: 'el-icon-data-line'
      },
      isMenuCollapse: false // 菜单是否折叠
    }
  },
  methods: {
    // 登出函数
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取菜单数据
    async getMenuList() {
      const { data: result } = await this.$http.get('/menus')
      if (result.meta.status !== 200) {
        this.$message({
          message: result.meta.msg,
          showClose: true,
          type: 'error'
        })
      } else {
        this.menuList = result.data
        this.$message({
          type: 'success',
          message: '获取菜单数据成功',
          showClose: true
        })
      }
    },
    // 折叠与展开菜单
    collapseMenu() {
      this.isMenuCollapse = !this.isMenuCollapse
    }
  },
  created() {
    this.getMenuList()
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: deepskyblue;
  // 使用flex布局
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  align-items: center;
  color: #ffffff; // 字体颜色，白色
  font-size: 30px;
  img {
    width: 50px;
    height: 50px;
  }
  > div {
    display: flex;
    align-items: center; //居中对齐
    .span {
      margin-left: 10px; //文本与图片之间的间距
    }
  }
}
.el-aside {
  background-color: #545c64;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: aliceblue;
}

.el_container_outest {
  height: 100%;
  width: 100%;
}

.div_collapse {
  background-color: #545c64;
  font-size: 10px; // 文字大小
  line-height: 20px; // 行高
  color: #ffffff; // 文字颜色
  text-align: center; // 文字居中
  letter-spacing: 0.2em; //文字间距
  cursor: pointer;
}
</style>
