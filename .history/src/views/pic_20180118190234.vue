<template>
    <div class="wrap">
        <ul>
            <li v-for="(item,index) in pic" @click="showTitle(item.title)" :key="index">
                <img :src="item.image">
                <p>
                    {{item.title}}
                </p>
            </li>
            <li>数据呢？出来啊</li>
        </ul>
    </div>

</template>

<script>
    import Vue from 'vue'
    import { mapGetters} from 'vuex'
    export default {
        name:'Pic',
        data() {
            return {
              pic: []
            }
        },
        mounted() {
          // 第一种：存vuex
            this.$store.dispatch('getData');
            // 获取数据
          // 第二种，直接页面获取
        //   this.api.getData().then((res) => {
        //     this.pic = res.data.data.liveWodList
        //   })
        },
        methods: {
            showTitle(title) {
                alert(title)
            }
        },
        computed:{
            pic () {
                
            }
        }
    }
</script>
<style>
    ul{
        list-style: none;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 0 auto;
        justify-content: center;
    }
    li{
        width: 380px;
        height: 270px;
        margin-right: 30px;
        background-color: #f2f2f2;
        cursor: pointer;
        margin-top: 10px;
    }

    img {
        width: 380px;
        height: 214px;
    }

    p {
        width: 380px;
        padding-left: 15px;
        font-size: 16px;
    }
</style>
