<template>
    <div class="page">
      <blogHeader></blogHeader>
      <div class="info-box">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content ">
              <div class="edit-profile">
                <div class="user-solid"></div>
                <el-button type="primary" @click="openEdit">修改信息</el-button>
              </div>
              <el-dialog
                title="修改个人信息"
                :visible.sync="dialogEdit"
                width="30%"
                center
              >
                <el-form :model="form"  label-width="80px">
                  <el-form-item label="用户名" >
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="昵称" >
                    <el-input v-model="form.nickname" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" >
                    <el-input v-model="form.pwd" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="性别" >
                    <el-input v-model="form.sex" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="年龄" >
                    <el-input v-model="form.age" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogEdit = false">取 消</el-button>
                  <el-button type="primary" @click="handleEdit">提交 </el-button>
                </div>
              </el-dialog>
              <div class="user-info">
                <el-row :gutter="20">
                  <el-col :span="12"><div class="line-info">
                    <div>账号：{{infoList.name}}</div>
                    <div>昵称：{{infoList.nickname}}</div>
                    <div>密码：{{infoList.pwd}}</div>
                  </div ></el-col>
                  <el-col :span="12">
                    <div class="line-info">
                      <div>性别：{{infoList.sex}}</div>
                      <div>年龄：{{infoList.age}}</div>
                      <div>用户身份：{{infoList.isAdmin}}</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="12" >
            <div class="grid-content ">
            <div class="chart-box">
              <div class="show-title">博客数量统计</div>
              <chart class="charts" :options="BlogCount" :autoresize="true"></chart>
            </div>
             <div class="chart-box">
                <div class="show-title">博客类型统计</div>
                <chart class="charts" :options="BlogType" :autoresize="true"></chart>
             </div>
          </div></el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
import blogHeader from '@/views/components/blog-header'
import {
  getUserInfo,
  updUserInfo,
  getPie,
  getLine
} from '@/api/userLogin'
export default {
  components: {
    blogHeader
  },
  data () {
    return {
      dialogEdit: false,
      form: {
        id: '',
        name: '',
        pwd: '',
        sex: '',
        age: '',
        nickname: ''
      },
      infoList: {},
      BlogCount: {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          axisLabel: {
            fontSize: 15
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            fontSize: 15
          },
          name: '数量'
        },
        series: [
          {
            type: 'line',
            data: []
          }
        ]
      },
      BlogType: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '博客分类',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [

            ].sort(function (a, b) { return a.value - b.value }),
            roseType: 'radius',
            labelLine: {
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            // itemStyle: {
            //   shadowBlur: 200
            // },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.getInfo()
    this.getBlogType()
    this.getBlogCount()
  },
  methods: {
    async getInfo () {
      try {
        const id = this.$store.state.user
        const res = await getUserInfo(id.user)
        this.infoList = res.data
        if (this.infoList.isAdmin) {
          this.infoList.isAdmin = '超级管理员'
        } else {
          this.infoList.isAdmin = '普通管理员'
        }
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    openEdit () {
      this.dialogEdit = true
      this.form = this.infoList
      console.log(this.form)
    },
    async handleEdit () {
      try {
        this.form.id = this.$store.state.user.user
        const res = await updUserInfo(this.form)
        console.log(res)
        this.getInfo()
        this.dialogEdit = false
      } catch (e) {
        console.log(e)
      }
    },
    async getBlogType () {
      try {
        const res = await getPie()
        console.log(res)
        this.BlogType.series[0].data = res.data.countList
      } catch (e) {
        console.log(e)
      }
    },
    async getBlogCount () {
      try {
        const res = await getLine()
        console.log(res)
        this.BlogCount.xAxis.data = res.data.X
        this.BlogCount.series[0].data = res.data.Y
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
.page{
  width: 100%;
}
.info-box{
  width: 100%;
  height: 100%;
}
.grid-content{
  height: 600px;
  background-color: #fff;
}
.edit-profile{
  width: 100%;
  height: 20%;
}
.user-solid{
  width: 20%;
  height: 80%;
  margin: 20px 0 0 50px;
  border: 1px solid #cbcbcb;
  background-image: url(https://wx1.sinaimg.cn/mw690/005INlGtly1geujavkqvfj31550frb29.jpg);
  float: left;
}
.edit-profile .el-button{
  margin: 50px 50px 0 0;
  float: right;
}
.user-info{
  width: 100%;
  height: 75%;
  margin-top:4%;
}
.line-info{
  width:100%;
}
.line-info div{
  width:70%;
  height: 50px;
  margin: 80px 0 0 50px;
  font-size: 20px;
  color: #707379;
}
.chart-box {
  width: 100%;
  height: 50%;
  border-bottom: 1px solid #f3f3f3;
}
.charts {
  width: 100%;
  height: 80%;
}
.show-title{
  width: 20%;
  height: 10%;
  padding: 20px 0 0 20px;
  font-weight: bold;
  font-size: 15px;
  color: #ffd04b;
}

</style>
