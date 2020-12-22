<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容区域 -->
    <el-card class="box-card">
      <el-row
        ><el-col :span="4">
          <el-button type="primary"> 添加分类</el-button></el-col
        ></el-row
      >
      <!-- 表格区域 -->
      <zk-table
        ref="goodCategoryTable"
        sum-text="sum"
        index-text="#"
        :data="goodCategoryData"
        :columns="columns"
        :stripe="props.stripe"
        :border="props.border"
        :show-header="props.showHeader"
        :show-summary="props.showSummary"
        :show-row-hover="props.showRowHover"
        :show-index="props.showIndex"
        :tree-type="props.treeType"
        :is-fold="props.isFold"
        :expand-type="props.expandType"
        :selection-type="props.selectionType"
      >
        <template slot="rowData" slot-scope="scope">
          {{ scope.row.cat_level }}
        </template>
      </zk-table>
      <!-- 分类区域 -->
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      props: {
        stripe: true,
        border: true,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: true,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: false
      },
      goodCategoryData: [],
      goodCategoryParam: { type: '3', pagenum: '1', pagesize: '10' },
      columns: [
        {
          label: '分类ID',
          prop: 'cat_id',
          width: '400px'
        },
        {
          label: '分类名称',
          prop: 'cat_name',
          minWidth: '50px'
        },
        {
          label: '分类父ID',
          prop: 'cat_pid'
        },
        {
          label: '分类级别',
          prop: 'cat_level',
          minWidth: '200px',
          type: 'template',
          template: 'rowData'
        }
      ]
    }
  },
  created() {
    this.getGoodCategoryData()
  },
  methods: {
    async getGoodCategoryData() {
      const { data: res } = await this.$http.get(
        'categories',
        this.goodCategoryParam
      )
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.goodCategoryData = res.data
      console.info(res.data)
    }
  }
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 10px;
}
.el-card {
  border-radius: 8px;
  padding: 0px;
}
.el-row {
  margin-bottom: 10px;
}
</style>
