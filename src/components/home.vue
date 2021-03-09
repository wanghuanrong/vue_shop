<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="clear">退出</el-button>
    </el-header>


    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>

        <!-- 菜单 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened :collapse="isCollapse" :collapse-transition="false" router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.path + ''" v-for="item in menulist" :key="item.id"
         >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index=" '/'+subItem.path" v-for="subItem in item.children" :key="subItem.id"
             @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>

          </el-submenu>
        </el-menu>
      </el-aside>


      <!-- 右边内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  data(){
    return{
      // 左侧菜单数据
      menulist: [],
      iconsObj:{
        '125': 'iconfont iconusers',
        '103': 'iconfont icontijikongjian',
        '101': 'iconfont iconshangpin',
        '102': 'iconfont icondanju-tianchong',
        '145': 'iconfont iconshangpin',
      },
      isCollapse: false,

      activePath: ''
    }
  },
  created(){
    this.getMenuList();

    this.activePath = sessionStorage.getItem("activePath");
  },
  methods: {
    clear() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    toggleCollapse(){
      this.isCollapse = !this.isCollapse;
    },
    saveNavState(path){
      sessionStorage.setItem("activePath", path);
      // this.activePath = path
    },
    async getMenuList(){
      const { data: res } = await this.$http.get('menus')
      this.menulist = res.data
      console.log(res.data);
    }
  },
};
</script>

<style lang="less" >
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-header img {
  width: 40px;
  height: 40px;
  margin-top: 10px;
}

.el-aside {
  background-color: #333744;
  .el-menu{
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont{
  margin-right: 10px;
}

.toggle-button{
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>