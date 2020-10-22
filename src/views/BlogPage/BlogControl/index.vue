<template>
    <div class="blog-control">
       <blogHeader></blogHeader>
      <div class="title">
        <el-button type="primary" icon="el-icon-edit" @click="openAdd"></el-button>
        <span>博客管理</span>
      </div>
      <el-dialog
        title="添加博客信息"
        :visible.sync="dialogAdd"
        width="30%"
        center
      >
        <el-form :model="add"  label-width="80px" :rules="rules">
          <el-form-item label="标题" >
            <el-input v-model="add.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input v-model="add.content" autocomplete="off" type="textarea"
                      :rows="2"></el-input>
          </el-form-item>
          <el-form-item label="选择分类" >
            <el-select v-model="addvalue" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
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
            label="日期"
            width="300"
            prop="datetime"
            align="center"
          >
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.datetime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="标题"
            prop="title"
            align="center"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="分类"
            prop="type"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="内容" align="center" prop="content">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.content }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px" >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="openEdit(scope.row)">编辑</el-button>
              <el-dialog
                title="修改博客内容"
                :visible.sync="dialogEdit"
                :append-to-body="true"
                width="30%"
                center
              >
                <el-form :model="edit"  label-width="80px" :rules="rules">
                  <el-form-item label="标题" >
                    <el-input v-model="edit.title" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="内容"  prop="content">
                    <el-input v-model="edit.content" autocomplete="off" type="textarea"
                              :rows="2"></el-input>
                  </el-form-item>
                  <el-form-item label="选择分类" >
                    <el-select v-model="editvalue" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
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
                <el-button type="primary" @click="handleDel">确 定</el-button>
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
  getBlog,
  delBlog,
  editBlog,
  addBlog,
  getBlogType
} from '@/api/getBlog.js'
import {
  isContent
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
      addvalue: '',
      editvalue: '',
      add: {
        uid: '',
        title: '',
        content: '',
        labelid: ''
      },
      edit: {
        bid: '',
        uid: '',
        title: '',
        content: '',
        labelid: ''
      },
      rules: {
        content: [isContent()]
      },
      tableData: [],
      options: []
    }
  },
  mounted () {
    this.getAllBlog(this.currentPage)
  },
  methods: {
    async getAllBlog (currentPage) {
      try {
        const res = await getBlog(this.$store.state.user.user, currentPage)
        this.tableData = res.data.blogList
        this.totalPage = res.data.total
        const optionRes = await getBlogType()
        this.options = optionRes.data.lableList

        this.options.forEach(item => {
          this.tableData.forEach(oItem => {
            if (item.id === oItem.labelid) {
              oItem.type = item.name
            }
          })
        })
        console.log(optionRes)
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    openEdit (row) {
      this.dialogEdit = true
      this.edit.title = row.title
      this.edit.content = row.content
      this.edit.bid = row.id
      this.edit.uid = this.$store.state.user.user
      this.editvalue = row.labelid
    },
    async handleEdit () {
      try {
        this.edit.labelid = this.editvalue
        const res = await editBlog(this.edit)
        console.log(res)
        this.getAllBlog(this.currentPage)
        this.dialogEdit = false
      } catch (e) {
        console.log(e)
      }
    },
    openAdd () {
      this.dialogAdd = true
      this.add.uid = this.$store.state.user.user
    },
    async handleAdd () {
      try {
        this.add.labelid = this.addvalue
        const res = await addBlog(this.add)
        this.getAllBlog(this.currentPage)
        console.log(res)
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
        const res = await delBlog(this.delId)
        console.log(res)
        this.getAllBlog(this.currentPage)
        this.dialogDel = false
      } catch (e) {
        console.log(e)
      }
    },
    handleCurrent (val) {
      this.currentPage = val
      this.getAllBlog(this.currentPage)
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
