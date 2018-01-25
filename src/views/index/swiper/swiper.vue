<template>
<div>
  <el-carousel  class="swiper" trigger="click">
    <el-carousel-item v-for="(item,type) in pic" :key="type" >
      <img  class="swiperImg" :src="item.img" alt="">
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
import Img from "../../../util/imgs/2.png"
export default {
    data() {
        return {
            pic:[{type:1,
                  img:Img
                 },
                 {type:2,
                  img:Img
                 },{type:3,
                  img:Img
                 }
            ]
        }
    }
}
</script>

<style>
   .swiper{
     width:100%;
     overflow: hidden;
   }
   .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .swiperImg{
      width: 100%;
  }
  
</style>