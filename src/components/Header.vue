<template>
    <div class="header">
        <div class="Header-wrap">
            <ul>
                <li class="wrap-left">
                    <ul class="left-word">
                        <li><img src="../util/imgs/1.png"></li>
                        <li>营销</li>
                    </ul>
                </li>
                <li class="wrap-center">
                   <dl class="center-word" @click="handleChangeColor">
                       <dd firstPage="true" :class="{changecolor:change}" >首页</dd>
                       <dd  :class="{changecolor:!change}">模板库</dd>
                   </dl>
                </li>
                <li class="wrap-right">
                    <el-button>登录</el-button>
                     <el-button type="primary" class="register">注册</el-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return{
                change:true
            }
        },
        methods:{
			handleChangeColor:function(e) {
				//获取元素内的属性
                const firstPage = e.target.getAttribute("firstPage");
				if(firstPage){
                     this.$router.push('/')
                    this.change= true;
				}else{
                    this.change= false;
                    this.$router.push('/template')
				}
				//this.$emit("changeTypeList",this.change)
        },       
    }
}
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 75px;
        font-size: 20px;
        line-height: 75px;
        color: #0091db  ;
    }
   .Header-wrap{
       width:1200px;
       height:75px;
       margin:0 auto;
      
   }
   .Header-wrap ul>li{
       float:left;
   }
   .wrap-left{
       width:212px;
       height:39px;
       line-height: 35px;
       margin-top:22px;
   }
    .wrap-center{
       width:800px;
       height:75px;
       line-height: 35px;
       margin-top:0px;
   }
   .wrap-right{
       width:170px;
       height:39px;
       line-height: 35px;
       margin-top:14px;
   }
   .left-word li{
       margin-left:3px;
       border: 0px;
   }
   .register{
       background: #1eb9ee;
   }
   .center-word dd{
       width:100px;
       height:54px;
       text-align: center;
       line-height: 46px;
       margin-left:50px;
       border:none;
       margin-top:19px;
       color: black;
       float: left;
       cursor: pointer;
   }
   .center-word .changecolor{
       width:100px;
       height:54px;
       text-align: center;
       line-height: 46px;
       margin-left:50px;
       border:none;
       margin-top:19px; 
       border-bottom:2px solid #0091db;
       color: #0091db;
       
   }
    
 
  </style>
