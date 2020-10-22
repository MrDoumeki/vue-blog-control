<template>
  <el-container>
    <el-header>
      <zl-Nav></zl-Nav>
    </el-header>
    <el-main>
      <el-container class="main-container">
        <el-aside width="13%" >
          <zl-Menu :menuArr="menuArr"></zl-Menu>
        </el-aside>
        <el-main class="router-main">
          <transition name="el-fade-in" >
            <router-view :key="key" />
          </transition>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import zlNav from '@/components/zl-nav'
import zlMenu from '@/components/zl-menu'
export default {
  components: {
    zlNav,
    zlMenu
  },
  data () {
    return {
      menuArr: [
        {
          url: '/home/first-page',
          title: '个人信息中心',
          icon: 'el-icon-user-solid'
        },
        // {俺也一样
        //   url: '/home/send-blog',
        //   title: '发布博客',
        //   icon: 'el-icon-edit'
        // },
        {
          url: '/home/blog-control',
          title: '博客管理',
          icon: 'el-icon-s-management'
        },
        {
          url: '/home/user-control',
          title: '用户管理',
          icon: 'el-icon-info'
        },
        {
          url: '/home/type-control',
          title: '分类管理',
          icon: 'el-icon-s-order'
        },
        {
          url: '/home/test-page',
          title: '地图测试',
          icon: 'el-icon-user'
        }
      ]
    }
  },
  computed: {
    key () {
      return this.$route.path
    }
  },
  created () {
    console.log(this.key)
  }
}
</script>

<style scoped>
  .el-container {
    height: 100%;
  }

  .el-header{
    height: auto !important;
    padding: 0;
  }
  .el-main {
    padding: 0;
  }
  .router-main{
    padding: 0;
    padding-top: 10px;
    padding-left: 20px;
    background-color: #f3f3f3;
  }
  .el-aside{
    background-color: #545c64;
    border-top: 1px solid #d7d7d7;
  }
</style>
