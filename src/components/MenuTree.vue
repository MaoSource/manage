<template>
  <div>
    <template v-for="item in this.menuList">
      <el-submenu :disabled="item.disabled" :index="item.id+''" :key="item.id" v-if="item.children.length>0">
<!--        一级目录-->
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.menuName }}</span>
        </template>
<!--        子元素-->
<!--        自己调用自己-->
<!--        显示一级children-->
        <MenuTree :menu-list="item.children"></MenuTree>
      </el-submenu>
<!--      显示二级children-->
<!--      如果有子元素就展示下面的，没有就只展示上面的-->
<!--      :route="item.url+''菜单路由路劲-->
      <el-menu-item
        :key="item.children.id"
        v-else
        :disabled="item.disabled"
        :index="item.url+''"
        :route="item.url+''"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.menuName }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MenuTree',
  props: ['menuList']
}
</script>

<style scoped>
/*实现了一个溢出处理*/
.el-menu--collapse span,
.el-menu--collapse i.el-submenu__icon-arrow {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}

</style>
