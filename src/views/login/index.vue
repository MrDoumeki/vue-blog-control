<template>
  <div class="login-container">
    <zl-Nav></zl-Nav>
    <div class="login-box">
      <div class="icon">
        <i class="el-icon-user-solid"></i>
      </div>
      <div class="login-form" >
        <el-form  class="login_form" label-width="80px" :model="form" :rules="rules">
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="form.pwd" autocomplete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="onLogin">登陆</el-button>
            <el-button @click="openRegister">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog
      title="填写注册信息"
      :visible.sync="dialogRegister"
      width="30%"
      center
    >
      <el-form :model="register" :rules="rules">
        <el-form-item label="账号" prop="username">
          <el-input v-model="register.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="register.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="register.pwd" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="性别" >
          <el-radio v-model="register.sex" label="男">男</el-radio>
          <el-radio v-model="register.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" >
          <el-input v-model="register.age" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRegister = false">取 消</el-button>
        <el-button type="primary" @click="handleRegister">提交 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import zlNav from '@/components/zl-login-nav'
import { userRegister } from '@/api/userLogin'
import { mapMutations } from 'vuex'
import {
  isPassword,
  isNickname,
  isUsername
} from '@/filter/validate.js'
export default {
  components: {
    zlNav
  },
  data () {
    return {
      dialogRegister: false,
      userToken: '',
      form: {
        username: '',
        pwd: ''
      },
      register: {
        username: '',
        sex: '',
        pwd: '',
        age: '',
        nickname: ''
      },
      rules: {
        username: [isUsername()],
        nickname: [isNickname()],
        pwd: [isPassword()]
      }
    }
  },
  methods: {
    ...mapMutations(['setToken', 'setUser', 'setAdmin']),
    openRegister () {
      this.dialogRegister = true
    },
    async handleRegister () {
      try {
        const res = await userRegister(this.register)
        console.log(res)
        this.dialogRegister = false
        if (res.data.ok === 200) {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    async onLogin () {
      try {
        // const res = await userLogin(this.form)
        // this.userToken = res.data.ok

        // if (res.data.ok === 1) {
        //   this.$message({
        //     message: '登陆成功',
        //     type: 'success'
        //   })
        // }
        // const id = res.data.userId
        // const isAdmin = res.data.isSuperUser
        // this.setToken({ token: this.userToken })
        // this.setUser({ user: id })
        // this.setAdmin({ admin: isAdmin })
        this.$router.push('/home')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped >
  .login-container {
   height: 100%;
    background-color: #fff;
  }
  .login-box{
   width: 400px;
   height: 300px;
   background-color: #fff;
    border: 1px solid #d7d7d7;
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%,-50%);
   border-radius: initial;
  }
  .icon{
   width: 20%;
   height: 25%;
   margin: auto;
  }
  .login-form{
   margin: 20px 0 0 0;
  }
  .login_form{
   padding: 0 30px 0 10px;
   width: 100%;
   height: 100%;
   box-sizing: border-box;
  }
  .btns{
    display: flex;
    justify-content: flex-end;
  }
  >>>.el-icon-user-solid{
    font-size: 80px;
    color: #707379;
  }
  >>>.el-button{
    margin: 0 0 0 10px;
  }
</style>
