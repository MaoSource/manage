<template>
  <el-container class="box_container">
    <!--  头部  -->
    <el-header>
      <!--  左边Login头像  -->
      <div class="left_box">
        <img alt="logo" src="../assets/img/logo.png"/>
        <div>后台管理系统</div>
      </div>
      <!--  右边用户头像  -->
      <div class="right_box">
            <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <img src="../assets/img/Icon.png" alt="icon">
      </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-house">首页</el-dropdown-item>
                <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
                <el-dropdown-item icon="el-icon-switch-button">退出</el-dropdown-item>
                <el-dropdown-item icon="el-icon-plus">加群</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <!--    侧边栏-->
      <el-aside :width="isCollapse ? '70px' : '200px'">
        <div class="toggle_box" @click="isCollapse = !isCollapse">|||</div>
        <el-menu
          default-active="defaultActive"
          class="el-menu-vertical-demo"
          background-color= "rgb(0,21,41)"
          active-text-color="rgb(255,255,255)"
          text-color="rgb(255,255,255)"
          style="border-right: none"
          @open="handleOpen"
          @close="handleClose"
          collapse-transition="true"
          :collapse="isCollapse"
          :unique-opened="true"
        >
          <MenuTree/>
        </el-menu>
      </el-aside>
      <!--      主题内容-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
// collapse 展开折叠
import MenuTree from '../components/MenuTree'
export default {
  name: 'Main',
  data () {
    return {
      isCollapse: false
    }
  },
  components: {
    MenuTree
  }
}
</script>

<style lang="less" scoped>
.box_container{
  height: 100%;
}
//头部布局
.el-header{
  background-color: rgb(0,33,64);
  color: rgb(255,255,255);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  .left_box{
    display: flex;
    align-items: center;
    img{
      width: 50px;
      height: 50px;
      margin: 0px 10px 0px 0px;
    }
  }
  .right_box{
    .el-dropdown-link>img{
      width: 40px;
      height: 40px;
      //border-radius: 50%;
      //background-color: #FFFFFF;
    }
  }
}

/*下拉*/
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

//侧边栏
.el-aside {
  background-color: rgb(0,21,41);
  color: #333;
  //text-align: center;
  //line-height: 200px;
  //展开收起
  .toggle_box{
    background-color: #FFFFFF;
    cursor: pointer;
    text-align: center;
    letter-spacing: 3px
  }
}

//内容主体
.el-main {
  background-color: rgb(240,242,245);
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>

<style lang="less">
//子级下拉菜单
.el-menu-item:hover{
  outline: 0 !important;
  color: #409EFF !important;
  background-color: rgb(0,21,51) !important;
}
//父级下拉菜单
.el-submenu__title:hover{
  color: #409EFF !important;
  background-color: rgb(3, 19, 33) !important;

}

</style>
