<template>
  <div class="blog-control">
    <blogHeader></blogHeader>
    <div class="title">
      <el-button type="primary" icon="el-icon-edit" @click="openAdd"></el-button>
      <span>分类管理</span>
    </div>
    <el-dialog
      title="添加标签信息"
      :visible.sync="dialogAdd"
      width="30%"
      center
    >
      <el-form :model="add"  label-width="80px" :rules="rules">
        <el-form-item label="标签名字" prop="name">
          <el-input v-model="add.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签描述" >
          <el-input v-model="add.con" autocomplete="off"></el-input>
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
          label="标签名"
          width="300"
          prop="name"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="标签描述"
          prop="context"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" width="200px" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="openEdit(scope.row)">编辑</el-button>
            <el-dialog
              title="修改标签信息"
              :visible.sync="dialogEdit"
              :append-to-body="true"
              width="30%"
              center
            >
              <el-form :model="edit"  label-width="80px" :rules="rules">
                <el-form-item label="标签名字" prop="name">
                  <el-input v-model="edit.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="标签描述" >
                  <el-input v-model="edit.con" autocomplete="off"></el-input>
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
  getLable,
  delLable,
  editLable,
  addLable
} from '@/api/getLable.js'
import {
  isTypeName
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
      add: {
        name: '',
        con: ''
      },
      edit: {
        id: '',
        name: '',
        con: ''
      },
      rules: {
        name: [isTypeName()]
      },
      tableData: [
        {
          name: '',
          context: ''
        }
      ]
    }
  },
  mounted () {
    this.getLableData(this.currentPage)
  },
  methods: {
    async getLableData (currentPage) {
      try {
        const res = await getLable(currentPage)
        this.tableData = res.data.lableList
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    openEdit (row) {
      this.dialogEdit = true
      this.edit.name = row.name
      this.edit.con = row.context
      this.edit.id = row.id
    },
    async handleEdit () {
      try {
        const res = await editLable(this.edit)
        this.getLableData(this.currentPage)
        console.log(res)
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
        const res = await addLable(this.add)
        this.getLableData(this.currentPage)
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
        const res = await delLable(this.delId)
        this.getLableData(this.currentPage)
        console.log(res)
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
