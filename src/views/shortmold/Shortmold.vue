<template>

  <van-sticky>
  <van-row>
    <van-col span="24">
      <van-nav-bar title="YXERP" :border='false'>
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </van-col>
  </van-row>
  </van-sticky>

<!--通知-->
  <van-row justify="center">
    <van-col span="23">
      <van-config-provider :theme-vars="themeVars">
        <van-notice-bar color="#1989fa" background="#fff" left-icon="volume-o" :scrollable="false" speed="50px">
          <van-swipe
              vertical
              class="notice-swipe"
              :autoplay="3000"
              :show-indicators="false"
          >
            <van-swipe-item @click="noticeorder">明月直入，无心可猜。</van-swipe-item>
            <van-swipe-item>仙人抚我顶，结发受长生。</van-swipe-item>
            <van-swipe-item>今人不见古时月，今月曾经照古人。</van-swipe-item>
          </van-swipe>
        </van-notice-bar>
      </van-config-provider>
    </van-col>
  </van-row>
<!--入口列表-->
  <van-row justify="center">
    <van-col span="23">
      <van-config-provider :theme-vars="themeVars">
        <van-grid :column-num="4" clickable gutter="5px" :border='false'>
          <van-grid-item v-for="(value, index) in gridvalue" :key="index" :icon="'http://s.zfychina.cn/'+ gridicon[index]" :text="value" :to="torouter[index]"/>
        </van-grid>
      </van-config-provider>
    </van-col>
  </van-row>

<!--  半圆进度条-->
  <van-row justify="center" style="margin-top: 30px;margin-bottom: 15px;">
    <van-col span="23">
      <van-circle
          v-model:current-rate="currentRate"
          :rate="state.order_num_finish"
          :speed="80"
          :text="text"
          :stroke-width="120"
          :clockwise="false"
          size="120px"

          layer-color="#ebedf0"
          color='#1989fa'

      />
    </van-col>
  </van-row>



<!--需本月完成的销售订单数据-->
  <div ref="container">
    <van-sticky :container="container" :offset-top="45">
      <van-row justify="center">
        <van-col span="23">
          <div class="textcss">-本月需完成的销售订单：{{ state.order_num - state.order_num_unfinish }}/{{ state.order_num }}</div>

        </van-col>
      </van-row>
    </van-sticky>




    <van-row justify="center">
      <van-col span="23">
        <erp-order-item @ordernum="ordernum"></erp-order-item>
      </van-col>
    </van-row>
  </div>

<!--本月缺料-->
<div ref="container">
  <van-sticky :container="container" :offset-top="90">
    <van-row justify="center">
      <van-col span="23">
        <div class="textcss">-本月缺料</div>
      </van-col>
    </van-row>
  </van-sticky>
  <van-row justify="center">
    <van-col span="23">
      <erp-goods-item></erp-goods-item>
    </van-col>
  </van-row>
</div>


  <van-divider style="margin-bottom: 60px" :style="{ padding: '0 56px' }">我是有底线的哦！！！</van-divider>

<!--  <nut-backtop  el-id="elId" ></nut-backtop>-->
</template>

<script>
import ErpOrderItem from "components/common/ErpOrderItem";
import ErpGoodsItem from "components/common/ErpGoodsItem";
import {onMounted, reactive, computed, ref } from "vue";
import {getMonthfinishinfo} from "network/order";

export default {
  name: "Shortmold",
  components: {ErpOrderItem, ErpGoodsItem, },
  setup() {

    // notice通知使用
    const noticeorder = () => {
      console.log('测试');
    }
    const state = reactive({
      order_num:0,
      order_num_unfinish:0,
      order_num_finish:0,
    })
    onMounted(() => {
// 先要获取数据
      getMonthfinishinfo().then(res=> {
        state.order_num_finish = (res.count_total - res.count_unfinish) / res.count_total * 100
      })
    })
    const ordernum = () => {
      // 当月未完成订单数量
      getMonthfinishinfo().then(res=>{
        console.log(res);
        // 未完成的数量
        state.order_num_unfinish = res.count_unfinish
        // 本月需要完成的总数
        state.order_num = res.count_total
      })
    }

    // grid使用
    const gridvalue = ['销售管理', '生产管理', '采购管理', '报表管理', '基础资料', '物料管理', '库存查询', '人员管理']
    const gridicon = ['iconxiaoshoudingdan.svg', 'iconshengchandingdan.svg', 'iconcaigoudingdan-.svg', 'iconbaobiaotongji.svg', 'iconjichu-.svg', 'iconwuliaojihua.svg', 'iconkucunchaxun.svg', 'iconrenyuanguanli.svg']
    const torouter = ['/order', '/unsettled', '/unsettled', '/statement', '/Shortmoldbackup', '/order', '/profile', '/profile']

    // VAN组件CSS样式
    const themeVars = {
      gridItemContentBackgroundColor: "#ffffff",
      gridItemContentPadding: "8px 1px",
      gridItemIconSize: "25px",
      gridItemTextColor: "#666",
      gridItemTextFontSize: "10px",
      noticeBarHeight: "50px"
    };

    // 进度条
    const currentRate = ref(0);
    const text = computed(() => '本月进度' +currentRate.value.toFixed(0) + '%');
    return {
      state,
      themeVars,
      // grid使用
      gridicon,
      gridvalue,
      noticeorder,
      torouter,
      // 本月订单总数
      ordernum,

      // 进度条
      text,
      currentRate,


    };
  },


}

</script>

<style scoped>
@import "~assets/css/homeicon/iconfont.css";

  .van-grid {
    border: 1px solid;
    border-color: var(--color-border);
  }

  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }

  .textcss {
    font-size: 15px;
    text-align: left;
    line-height: 50px;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-right: 0px;
    margin-left: 0px;
    font-weight: bold; /*bold：加粗；bloder：深度加粗；lighter：细体；*/
    /*border: 1px solid;*/
    background-color: white;
  }

</style>