<template>
<div>
    <Vheader></Vheader>
    <Vswiper></Vswiper>
    <Vspecial></Vspecial>
    <Vexcellent></Vexcellent>
    <Vfooter></Vfooter>
</div>
</template>

<script>
import Vheader from '../../components/Header.vue'
import Vswiper from './swiper/swiper.vue'
import Vspecial from './special/special.vue'
import Vexcellent from './excellent/excellent.vue'
import Vfooter from '../../components/Footer.vue'
export default {
    components:{
        Vheader,
        Vswiper,
        Vspecial,
        Vexcellent,
        Vfooter
    }
}
</script>

<style>

</style>
