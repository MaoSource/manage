<template>
  <el-container class="box_container">
    <!--  头部  -->
    <el-header>
      <!--  左边Login头像  -->
      <div class="left_box">
        <img alt="logo" src="../assets/img/logo_b.png"/>
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
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle_box" @click="isCollapse = !isCollapse">|||</div>
        <el-menu
          background-color= "rgb(255,255,255)"
          active-text-color="rgb(#409EFF)"
          text-color="rgb(39,56,73)"
          style="border-right: none"
          :collapse="isCollapse"
          :unique-opened="true"
          :router="true"
          :default-active="$route.path"
        >
          <MenuTree :menuList = this.menuList></MenuTree>
        </el-menu>
      </el-aside>
      <!--      主题内容-->
      <el-main>
        <router-view/>
      </el-main>
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
      isCollapse: false,
      menuList: [
        {
          id: 1,
          parentId: 0,
          menuName: '系统管理',
          url: '',
          icon: 'el-icon-setting',
          orderNum: 1,
          open: 1,
          disabled: false,
          perms: null,
          type: 0,
          children: [
            {
              id: 253,
              parentId: 1,
              menuName: '欢迎页面',
              url: '/welcome',
              icon: 'el-icon-star-off',
              orderNum: 1,
              open: 0,
              disabled: false,
              perms: 'welcome:view',
              type: 0,
              children: []
            },
            {
              id: 226,
              parentId: 1,
              menuName: '用户管理',
              url: '/users',
              icon: 'el-icon-user',
              orderNum: 2,
              open: 0,
              disabled: false,
              perms: 'users',
              type: 0,
              children: []
            },
            {
              id: 321,
              parentId: 1,
              menuName: '附件管理',
              url: '/attachments',
              icon: 'el-icon-picture-outline',
              orderNum: 2,
              open: 1,
              disabled: false,
              perms: '',
              type: 0,
              children: []
            },
            {
              id: 4,
              parentId: 1,
              menuName: '菜单权限',
              url: '/menus',
              icon: 'el-icon-help',
              orderNum: 3,
              open: 0,
              disabled: false,
              perms: null,
              type: 0,
              children: []
            },
            {
              id: 235,
              parentId: 1,
              menuName: '角色管理',
              url: '/roles',
              icon: 'el-icon-postcard',
              orderNum: 3,
              open: 0,
              disabled: false,
              perms: '',
              type: 0,
              children: []
            },
            {
              id: 261,
              parentId: 1,
              menuName: '部门管理',
              url: '/departments',
              icon: 'el-icon-s-home',
              orderNum: 3,
              open: 0,
              disabled: false,
              perms: '',
              type: 0,
              children: []
            },
            {
              id: 319,
              parentId: 1,
              menuName: '公告管理',
              url: '/notices',
              icon: 'el-icon-s-flag',
              orderNum: 4,
              open: 0,
              disabled: true,
              perms: '',
              type: 0,
              children: []
            }
          ]
        },
        {
          id: 312,
          parentId: 0,
          menuName: '业务管理',
          url: null,
          icon: 'el-icon-s-goods',
          orderNum: 2,
          open: 0,
          disabled: false,
          perms: null,
          type: 0,
          children: [
            {
              id: 229,
              parentId: 312,
              menuName: '物资管理',
              url: '',
              icon: 'el-icon-date',
              orderNum: 1,
              open: 1,
              disabled: false,
              perms: 'el-icon-date',
              type: 0,
              children: [
                {
                  id: 230,
                  parentId: 229,
                  menuName: '物资入库',
                  url: '/inStocks',
                  icon: 'el-icon-date',
                  orderNum: 1,
                  open: 1,
                  disabled: false,
                  perms: 'el-icon-date',
                  type: 0,
                  children: []
                },
                {
                  id: 267,
                  parentId: 229,
                  menuName: '物资资料',
                  url: '/products',
                  icon: 'el-icon-goods',
                  orderNum: 2,
                  open: 0,
                  disabled: false,
                  perms: '',
                  type: 0,
                  children: []
                },
                {
                  id: 268,
                  parentId: 229,
                  menuName: '物资类别',
                  url: '/productCategorys',
                  icon: 'el-icon-star-off',
                  orderNum: 2,
                  open: 0,
                  disabled: false,
                  perms: '',
                  type: 0,
                  children: []
                },
                {
                  id: 270,
                  parentId: 229,
                  menuName: '物资发放',
                  url: '/outStocks',
                  icon: 'el-icon-goods',
                  orderNum: 5,
                  open: 1,
                  disabled: false,
                  perms: '',
                  type: 0,
                  children: []
                },
                {
                  id: 316,
                  parentId: 229,
                  menuName: '物资库存',
                  url: '/stocks',
                  icon: 'el-icon-tickets',
                  orderNum: 5,
                  open: 0,
                  disabled: false,
                  perms: '',
                  type: 0,
                  children: []
                }
              ]
            },
            {
              id: 311,
              parentId: 312,
              menuName: '物资流向',
              url: null,
              icon: 'el-icon-edit',
              orderNum: 3,
              open: 0,
              disabled: false,
              perms: null,
              type: 0,
              children: [
                {
                  id: 310,
                  parentId: 311,
                  menuName: '物资去处',
                  url: '/consumers',
                  icon: 'el-icon-edit',
                  orderNum: 1,
                  open: 0,
                  disabled: false,
                  perms: '',
                  type: 0,
                  children: []
                },
                {
                  id: 269,
                  parentId: 311,
                  menuName: '物资来源',
                  url: '/suppliers',
                  icon: 'el-icon-coordinate',
                  orderNum: 5,
                  open: 0,
                  disabled: false,
                  perms: '',
                  type: 0,
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 303,
          parentId: 0,
          menuName: '健康报备',
          url: '',
          icon: 'el-icon-platform-eleme',
          orderNum: 3,
          open: 0,
          disabled: false,
          perms: '',
          type: 0,
          children: [
            {
              id: 273,
              parentId: 303,
              menuName: '全国疫情',
              url: '/map',
              icon: 'el-icon-s-opportunity',
              orderNum: 1,
              open: 1,
              disabled: false,
              perms: 'map:view',
              type: 0,
              children: []
            },
            {
              id: 304,
              parentId: 303,
              menuName: '健康打卡',
              url: '/health',
              icon: 'el-icon-s-cooperation',
              orderNum: 1,
              open: 0,
              disabled: false,
              perms: '',
              type: 0,
              children: []
            },
            {
              id: 305,
              parentId: 303,
              menuName: '查看情况',
              url: '/situation',
              icon: 'el-icon-c-scale-to-original',
              orderNum: 2,
              open: 1,
              disabled: false,
              perms: null,
              type: 0,
              children: []
            },
            {
              id: 272,
              parentId: 303,
              menuName: '疫情辟谣',
              url: '/rumors',
              icon: 'el-icon-help',
              orderNum: 5,
              open: 0,
              disabled: false,
              perms: null,
              type: 0,
              children: []
            }
          ]
        },
        {
          id: 295,
          parentId: 0,
          menuName: '其他管理',
          url: '',
          icon: 'el-icon-s-marketing',
          orderNum: 5,
          open: 0,
          disabled: false,
          perms: '',
          type: 0,
          children: [
            {
              id: 297,
              parentId: 295,
              menuName: '监控管理',
              url: '',
              icon: 'el-icon-warning',
              orderNum: 1,
              open: 0,
              disabled: false,
              perms: '',
              type: 0,
              children: [
                {
                  id: 298,
                  parentId: 297,
                  menuName: 'SQL监控',
                  url: '/druid',
                  icon: 'el-icon-view',
                  orderNum: 1,
                  open: 0,
                  disabled: false,
                  perms: null,
                  type: 0,
                  children: []
                }
              ]
            },
            {
              id: 341,
              parentId: 295,
              menuName: '个人博客',
              url: '/blog',
              icon: 'el-icon-view',
              orderNum: 1,
              open: 0,
              disabled: false,
              perms: '',
              type: 0,
              children: []
            },
            {
              id: 296,
              parentId: 295,
              menuName: 'swagger文档',
              url: '/swagger',
              icon: 'el-icon-document',
              orderNum: 2,
              open: 0,
              disabled: false,
              perms: null,
              type: 0,
              children: []
            },
            {
              id: 318,
              parentId: 295,
              menuName: '图标管理',
              url: '/icons',
              icon: 'el-icon-star-off',
              orderNum: 2,
              open: 1,
              disabled: false,
              perms: '',
              type: 0,
              children: []
            }
          ]
        },
        {
          id: 5,
          parentId: 0,
          menuName: '日志管理',
          url: '/logs',
          icon: 'el-icon-camera',
          orderNum: 6,
          open: 0,
          disabled: false,
          perms: null,
          type: 0,
          children: [
            {
              id: 271,
              parentId: 5,
              menuName: '登入日志',
              url: '/loginLog',
              icon: 'el-icon-date',
              orderNum: 1,
              open: 0,
              disabled: false,
              perms: 'login:log',
              type: 0,
              children: []
            },
            {
              id: 307,
              parentId: 5,
              menuName: '操作日志',
              url: '/logs',
              icon: 'el-icon-edit',
              orderNum: 1,
              open: 1,
              disabled: false,
              perms: '',
              type: 0,
              children: []
            }
          ]
        }
      ]
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
  background-color: rgb(255,255,255);
  color: rgb(39,56,73);
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
  background-color: rgb(255,255,255);
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
}
</style>

<style lang="less">
//子级下拉菜单
.el-menu-item:hover{
  outline: 0 !important;
  color: #409EFF !important;
  background-color: rgb(255,255,255) !important;
}
//父级下拉菜单
.el-submenu__title:hover{
  color: #409EFF !important;
  background-color: rgb(255,255,255) !important;

}

</style>
