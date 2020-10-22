<template>
    <el-menu
      :default-active="route"
      router
      class="el-menu-vertical-demo"
      background-color="#545c64"
      active-text-color="#ffd04b"
      text-color="#fff"
      >
      <div class="date-time">
        <div><i class="el-icon-date"></i></div>
        <div>{{ time }}</div>
      </div>
      <el-menu-item
        v-for="item in menuArr"
        :key="item.url"
        :index="item.url"
      >
        <template slot="title">
          <div>
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </div>
        </template>
      </el-menu-item>
    </el-menu>
</template>

<script>
import { formatFullDate } from '@/filter/time.js'
export default {
  props: {
    menuArr: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      time: formatFullDate(new Date()),
      timer: null
    }
  },
  computed: {
    route () {
      const length = this.$route.path.length
      const path =
        this.$route.path[length - 1] === '/'
          ? this.$route.path.slice(0, length - 1)
          : this.$route.path
      return this.$route.meta.activeMenu ? this.$route.meta.activeMenu : path
    }
  },
  created () {
    this.getDate()
  },
  methods: {
    getDate () {
      this.timer = setInterval(() => {
        this.time = formatFullDate(new Date())
      }, 1000)
    }
  }
}
</script>

<style scoped>
  .el-scrollbar {
    user-select: none;
    height: 100%;
  }
  .date-time {
    text-align: center;
    color: #ffd04b;
    padding: 34px 0;
    border-bottom: 1px solid #b1b1b1;
  }
  .date-time div {
     font-size: 23px;
  }
  .today{
    font-size: 20px;
  }
  /*>>>.el-menu{*/
  /*  width: 5%;*/
  /*  height: 100%;*/
  /*}*/

  .el-menu-item {
    padding: 0 30px !important;
    font-size: 12px;
    border-bottom: 1px solid #b1b1b1;
  }
</style>
