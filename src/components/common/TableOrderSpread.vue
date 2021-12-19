<template>
  <!--分割线-->
  <van-config-provider :theme-vars="themeVars">
    <van-divider :style="{ padding: '0 26px' }"/>
  </van-config-provider>
  <van-row justify="left" style="font-size: 12px" align="center">
    <van-col offset="1" span="1" style="vertical-align: middle;"></van-col>
    <van-col  span="14">
      <span style="line-height: 2; font-size: 12px; text-align: left;"><p>{{goodsdata.sku.coding}}</p></span>
      <span style="line-height: 0.5; font-size: 8px; color: var(--color-border); text-align: left;">{{goodsdata.sku.name}}</span>
    </van-col>

    <van-col span="6">
      <span style="line-height: 2; font-size: 12px; text-align: left;"><p>{{goodsdata.quantity}}{{goodsdata.sku.unit}}</p></span>
      <span style="line-height: 0.5; font-size: 8px; color: var(--color-border); text-align: left;">已完成: {{goodsdata.quantityed}}</span>
    </van-col>

    <!--订单未完成需要显示详情-->
    <van-col v-show="parseFloat(goodsdata.quantity) > parseFloat(goodsdata.quantityed)" span="1" @click="tocreateorderSC(goodsdata.order.orderhao, goodsdata.sku.coding)">
      <van-icon name="arrow" color="var(--color-high-text)"/>
    </van-col>
    <!--订单完成显示完成图标-->
    <van-col v-show="parseFloat(goodsdata.quantity) <= parseFloat(goodsdata.quantityed)" span="1">
      <van-icon name="http://s.zfychina.cn/iconfinshed.svg" color="var(--color-high-text)" size="15"/>
    </van-col>
    <van-col span="1"></van-col>
  </van-row>
</template>

<script>

export default {
  name: "TableOrderSpread",
  props: {
    goodsdata: {
      type: Array,
      default() {
        return []
      }
    },

  },
  setup() {

    // 跳转到创建生产订单
    const tocreateorderSC = (order, coding) => {
      console.log('跳转到创建生产订单',order, coding);
    }

    // VAN分割样式修改
    const themeVars = {
      dividerMargin: '1px',
      dividerTextColor:	'#969799',
      dividerFontSize: '14px',
      dividerLineHeight: '1px',
      dividerBorderColor:	'#ebedf0',
      dividerContentPadding: '16px',
      dividerContentLeftWidth: '10%',
      dividerContentRightWidth:	'10%',
    };

    return {
      themeVars,
      tocreateorderSC,
    };
  },
}
</script>

<style scoped>

</style>