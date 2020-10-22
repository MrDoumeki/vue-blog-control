<template>
  <div class="test-page">
<!--    <div class="flex-container">-->
<!--      <div class="single"></div>-->
<!--      <div class="single"></div>-->
<!--      <div class="single"></div>-->
<!--      <div class="single"></div>-->
<!--      <div class="single"></div>-->
<!--    </div>-->
    <div class="map-container">
      <baidu-map
        id="allmap"
        @ready="mapReady"
        :scroll-wheel-zoom="true">
      </baidu-map>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      point: ''
    }
  },
  mounted () {},
  methods: {
    mapReady ({ BMap, map }) {
      this.point = new BMap.Point(113.27, 23.13)
      map.centerAndZoom(this.point, 12)
    }
  }
}
</script>

<style scoped>
  .test-page{
    width: 100%;
  }
  .flex-container{
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .single{
    width: 200px;
    height: 200px;
    margin: 0 30px 0 10px;
    background-color: cornflowerblue;
    display: flex;
    flex-direction: row;
  }
  .map-container{
    width: 100%;
    height: 1000px;
  }
  #allmap{
    width: 100%;
    height: 100%;
  }
</style>
