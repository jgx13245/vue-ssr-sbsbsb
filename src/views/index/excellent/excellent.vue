<template>
    <div class="excellent-wrap">
        <h3 class="excellent-word">优秀案例</h3>
        <ul class="excellent-item">
            <li  v-for="(item,index) in icon" :key="index">
                <img :src="item.img" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
import Img1 from '../../../util/imgs/5.png'
import Img2 from '../../../util/imgs/6.png'
export default {
    data() {
        return {
            icon:[{id:1,img:Img1},
                  {id:1,img:Img2},
                  {id:1,img:Img1},
                  {id:1,img:Img2},
                 ]
        }
    }
}
</script>

<style scoped>
.excellent-wrap{
    width:100%; 
    overflow: hidden;
}
.excellent-word{
    width:1200px;
    text-align: center; 
    font-size:18px;
    margin: 0 auto;
    font-weight: bold;
    padding-top:86px;
}
.excellent-item{
    width:1200px;
    margin: 0 auto;
    display: flex;
}
.excellent-item li{
    box-sizing: border-box;
    width:25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top:40px;
    font-weight:bold;
}


</style>
