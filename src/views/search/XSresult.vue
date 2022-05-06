<template>
  <van-sticky>
    <van-row>
      <van-col span="24">
        <van-nav-bar left-arrow title="搜索结果" :border='false' @click-left="onClickLeft">
        </van-nav-bar>
      </van-col>
    </van-row>
  </van-sticky>



</template>

<script>
import {onMounted, reactive} from "vue";
import {useRoute} from "vue-router";

export default {
  name: "XSresult",
  setup(){
    const state = reactive({
      data: [],
    })

    // 接收数据
    const route =useRoute();
    onMounted(() => {
      //要这样传值
      // router.push({path:'/xsresult',  query: { data: JSON.stringify(res)}})

      //才能这样接收
      state.data = JSON.parse(decodeURIComponent(route.query.data))
      console.log(state.data[0]);
    });

    // 返回按钮和搜索按钮
    const onClickLeft = () => history.back();
    return{
      onClickLeft,
      state,
    }
  }
}
</script>

<style scoped>

</style>