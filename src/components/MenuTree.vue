<template>
  <div>
    <template>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项2</el-menu-item>
          <el-menu-item index="1-4">选项2</el-menu-item>
          <el-menu-item index="1-5">选项2</el-menu-item>
          <el-menu-item index="1-6">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航二</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项2</el-menu-item>
          <el-menu-item index="2-4">选项2</el-menu-item>
          <el-menu-item index="2-5">选项2</el-menu-item>
          <el-menu-item index="2-6">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MenuTree'
}
</script>

<style scoped>

</style>
