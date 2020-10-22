<template>
  <div class="zl-nav">
    <div class="nav-title">不知道是什么的管理系统</div>
    <div  class="return-login" @click="returnLogin()" ><i  class="el-icon-user-solid" ></i></div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {}
  },
  methods: {
    returnLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .zl-nav{
    width: 100%;
    height: 70px;
    background-color: #545c64;
  }
  .nav-title {
    height: auto;
    float: left;
    position: relative;
    padding: 15px 15px;
    text-align: center;
    font-size: 20px;
    color: #F3f3f3;
  }

  .return-login{
    width: 5%;
    height: 80%;
    margin: 10px 30px 0 0;
    float: right;
  }

  >>>.el-icon-user-solid{
    font-size: 50px;
    color: #ffd04b;
    cursor: pointer;
  }
</style>
