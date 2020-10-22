<template>
  <div class="blog-control">
    <blogHeader></blogHeader>
    <div class="title">
      <el-button type="primary" icon="el-icon-edit" @click="openAdd"></el-button>
      <span>用户管理</span>
    </div>
    <el-dialog
      title="添加个人信息"
      :visible.sync="dialogAdd"
      width="30%"
      center
    >
      <el-form :model="add"  label-width="80px"  :rules="rules">
        <el-form-item label="账号" prop="username">
          <el-input v-model="add.username" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="add.nickname" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="add.pwd" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="性别" >
          <el-radio v-model="add.gender" label="男">男</el-radio>
          <el-radio v-model="add.gender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" >
          <el-input v-model="add.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份"  v-if="isSuperAdmin">
          <el-radio v-model="add.isSuperuser" label="0">普通管理员</el-radio>
          <el-radio v-model="add.isSuperuser" label="1">超级管理员</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">提交 </el-button>
      </div>
    </el-dialog>
    <div class="blog-container">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="账号" align="center" width="300" prop="username">
        </el-table-column>
        <el-table-column
          label="昵称" align="center"  prop="nickname">
        </el-table-column>
        <el-table-column
          label="密码" align="center"  prop="password">
        </el-table-column>
        <el-table-column
          label="姓别" align="center" prop="gender">
        </el-table-column>
        <el-table-column
          label="年龄" align="center"  prop="age">
        </el-table-column>
        <el-table-column
          label="身份" align="center"  prop="isSuperuser">
        </el-table-column>
        <el-table-column label="操作" width="200px" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="openEdit(scope.row)">编辑</el-button>
            <el-dialog
              title="修改用户信息"
              :visible.sync="dialogEdit"
              :append-to-body="true"
              width="30%"
              center
            >
              <el-form :model="edit"  label-width="80px" :rules="rules">
                <el-form-item label="账号" prop="username">
                  <el-input v-model="edit.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                  <el-input v-model="edit.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" >
                  <el-radio v-model="edit.gender" label="男">男</el-radio>
                  <el-radio v-model="edit.gender" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="年龄" >
                  <el-input v-model="edit.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份" v-if="isSuperAdmin">
                  <el-radio v-model="edit.isSuperuser" label="1">超级管理员</el-radio>
                  <el-radio v-model="edit.isSuperuser" label="0">普通管理员</el-radio>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEdit = false">取 消</el-button>
                <el-button type="primary" @click="handleEdit">提交 </el-button>
              </div>
            </el-dialog>
            <el-button
              size="mini"
              type="danger"
              @click="openDel(scope.row)">删除</el-button>
            <el-dialog
              title="提示"
              :visible.sync="dialogDel"
              :append-to-body="true"
              width="30%">
              <span>是否删除该信息</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogDel = false">取 消</el-button>
                <el-button type="primary" @click="handleDel ">确 定</el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        align="center"
        :page-count="totalPage"
        :current-page="currentPage"
        @current-change="handleCurrent"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import blogHeader from '@/views/components/blog-header'
import {
  getAllUser,
  updUser,
  addUser,
  delUser
} from '@/api/getUser.js'
import {
  isPassword,
  isNickname,
  isUsername
} from '@/filter/validate.js'
export default {
  components: {
    blogHeader
  },
  data () {
    return {
      dialogAdd: false,
      dialogEdit: false,
      dialogDel: false,
      currentPage: 1,
      totalPage: 0,
      delId: '',
      isSuperAdmin: false,
      add: {
        id: '',
        username: '',
        nickname: '',
        gender: '',
        age: '',
        isSuperuser: '',
        pwd: ''
      },
      edit: {
        id: '',
        username: '',
        nickname: '',
        gender: '',
        age: '',
        isSuperuser: '',
        pwd: ''
      },
      rules: {
        username: [isUsername()],
        nickname: [isNickname()],
        pwd: [isPassword()]
      },
      tableData: []
    }
  },
  mounted () {
    this.getUserList(this.currentPage)
  },
  methods: {
    async getUserList (currentPage) {
      try {
        const res = await getAllUser(this.$store.state.user.user, currentPage)
        this.tableData = res.data.userList
        this.tableData.forEach(item => {
          if (item.isSuperuser === 0) {
            item.isSuperuser = '普通管理员'
            item.isAdmin = '0'
          } else {
            item.isSuperuser = '超级管理员'
            item.isAdmin = '1'
          }
        })
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    openEdit (row) {
      this.dialogEdit = true
      this.edit.id = row.id
      this.edit.username = row.username
      this.edit.nickname = row.nickname
      this.edit.gender = row.gender
      this.edit.age = row.age
      this.edit.isSuperuser = row.isAdmin
      if (this.$store.state.admin.admin === 1) {
        this.isSuperAdmin = true
      }
    },
    async handleEdit () {
      try {
        const res = await updUser(this.edit)
        console.log(res)
        this.getUserList(this.currentPage)
        this.dialogEdit = false
      } catch (e) {
        console.log(e)
      }
    },
    openAdd () {
      this.dialogAdd = true
    },
    async handleAdd () {
      try {
        const res = await addUser(this.add)
        console.log(res)
        this.getUserList(this.currentPage)
        this.dialogAdd = false
      } catch (e) {
        console.log(e)
      }
    },
    openDel (row) {
      this.dialogDel = true
      this.delId = row.id
    },
    async handleDel () {
      try {
        const res = await delUser(this.delId)
        console.log(res)
        this.getUserList(this.currentPage)
        this.dialogDel = false
      } catch (e) {
        console.log(e)
      }
    },
    handleCurrent (val) {
      this.currentPage = val
      this.getData(this.currentPage)
    }
  }
}
</script>

<style scoped>
  .blog-control{
    width: 100%;
  }
  .title{
    margin: 0 0 10px 10px;
    color: #707379;
  }

  .blog-container{
    width: 100%;
    background-color: #fff;
    float: left;
  }
  .el-button{
    margin: 0 10px 0 0;
  }
  .title span{
    font-size: 20px;
  }
</style>
