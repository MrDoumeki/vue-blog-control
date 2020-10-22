<template>
    <div class="send-page">
      <div class="info-container">
        <div class="person-info">
          <div class="info-profile">

          </div>
          <div class="fans-num">
            <div class="numbers"></div>
            <div class="numbers"></div>
            <div class="numbers"></div>
          </div>
        </div>
      </div>
      <div class="send-container"></div>
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
  .send-page{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }
  .info-container{
    width: 20%;
    background-color: #fff;
  }
  .person-info{
    width: 100%;
    height: 30%;
    border-bottom: 1px solid #b1b1b1;
  }
  .info-profile{
    width: 100%;
    height: 45%;
    border-bottom: 1px solid #b1b1b1;
  }
  .fans-num{
    width: 100%;
    height: 55%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .numbers{
    width: 25%;
    height: 50%;
    margin-top: 10%;
    background-color: #fff;
  }
  .send-container{
    width: 79%;
    margin: 0 0 0 5px;
    background-color: #fff;
  }
</style>
