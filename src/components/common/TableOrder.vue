<template>
<!--订单详情-->
  <van-row  justify="space-between" style="vertical-align: middle;line-height: 2.5;font-size: 14px">
    <van-col span="6" offset="1">{{data.delivery.split(' ')[0].split('-')[1]+"月"+data.delivery.split(' ')[0].split('-')[2]+"日"}}</van-col>
    <van-col span="11">{{data.order}}</van-col>
    <van-col span="6" style="text-align: center;">{{data.customer}}</van-col>
  </van-row>
  <van-row  justify="space-between" style="vertical-align: middle;">
    <van-col span="6"  offset="1" style="height: 18px;vertical-align: middle;line-height: 1; font-size: 8px; color: var(--color-border); text-align: left;">{{data._date.split(' ')[0].split('-')[1]+"月"+data._date.split(' ')[0].split('-')[2]+"日"}}</van-col>
    <van-col span="10"  offset="1" style="height: 18px;vertical-align: middle;line-height: 1; font-size: 8px; color: var(--color-border); text-align: left;">{{data.user}}</van-col>
    <van-col span="6" style="text-align: center;height: 18px;vertical-align: middle;line-height: 1;">
      <van-icon v-show="!is_spread" name="arrow" color="var(--color-high-text)" @click="spread(data.order)"/>
      <van-icon v-show="is_spread" name="arrow-down" color="var(--color-high-text)" @click="spread(data.order)"/>
    </van-col>
  </van-row>

<!--展开显示订单商品-->
  <table-order-spread v-show="is_spread" v-for="(goodsdata,index) in state.goodslist" :goodsdata="goodsdata" :key="index">
    <child @foo="handleFooEvent(index)"
           @bar="handleBarEvent(index, $event)" />
  </table-order-spread>


<!--分割线-->
  <van-config-provider :theme-vars="themeVars">
    <van-divider :style="{ color: 'var(--color-border)', borderColor: 'var(--color-border)', padding: '0 16px' }"/>
  </van-config-provider>
</template>

<script>
import {reactive, ref} from "vue";
import { getOrderdetail } from "network/order";
import TableOrderSpread from "components/common/TableOrderSpread";

export default {
  name: "TableOrder",
  components: { TableOrderSpread },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },

  },
  setup(props, { emit }) {
    const checked = false
    const is_spread = ref(false)
    const state = reactive({
      goodslist: [],
    })

    const spread = (order) => {
      // console.log('tableorder', goodsitem);
      if (is_spread.value){

        state.goodslist = []
        is_spread.value = false
      } else {
      is_spread.value = true
      getOrderdetail(order).then(res=>{
        console.log('spread', order,res);
        state.goodslist = res
      })
      emit('spreadorder', order)
    }
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
      checked,
      themeVars,
      spread,
      is_spread,
      state,

    };
  },
}
</script>

<style scoped>

</style>