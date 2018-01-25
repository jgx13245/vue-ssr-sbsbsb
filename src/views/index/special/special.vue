<template>
    <div class="special-wrap">
        <h3 class="special-word">营销特色</h3>
        <ul class="special-item">
            <li  v-for="(item,index) in icon" :key="index">
                <img :src="item.img" alt="">
                <span>{{item.title}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import Img1 from '../../../util/imgs/3.png'
import Img2 from '../../../util/imgs/4.png'
export default {
    data() {
        return {
            icon:[{id:1,img:Img1,title:"灵活活动模板"},
                  {id:1,img:Img2,title:"素材替换"},
                  {id:1,img:Img2,title:"用户画像"},
                  {id:1,img:Img2,title:"多平台传播"},
                  {id:1,img:Img2,title:"线下核销"},
                  {id:1,img:Img1,title:"一键发布"}
                 ]
        }
    }
}
</script>

<style scoped>
.special-wrap{
    width:100%; 
}
.special-word{
    width:1200px;
    text-align: center; 
    font-size:18px;
    margin: 0 auto;
    font-weight: bold;
    padding-top:186px;
}
.special-item{
    width:1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;

}
.special-item li{
    box-sizing: border-box;
    width:33.3333%;
    height:154px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    margin-top:40px;
    font-size:14px;
    font-weight:bold;
}


</style>
