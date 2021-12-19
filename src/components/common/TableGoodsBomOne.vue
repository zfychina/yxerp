<template>
  <van-config-provider :theme-vars="themeVars">
    <van-divider :style="{ padding: '0 36px' }"/>
  </van-config-provider>
  <van-row justify="left" style="font-size: 12px" align="center">
    <van-col offset="2" span="1" style="vertical-align: middle;"></van-col>
    <van-col  span="10">
      <span style="line-height: 2; font-size: 12px; text-align: left;"><p>{{goodsdata.coding.coding}}</p></span>
      <span style="line-height: 0.5; font-size: 8px; color: var(--color-border); text-align: left;">{{goodsdata.coding.name}}</span>
    </van-col>

    <van-col span="7">
      <span style="line-height: 2; font-size: 12px; text-align: left;"><p>{{goodsdata.stock}}{{goodsdata.coding.unit}}</p></span>
      <span style="line-height: 0.5; font-size: 8px; color: var(--color-border); text-align: left;">库存数: {{goodsdata.coding.stock}}</span>
    </van-col>

    <van-col span="3" style="text-align: center;">
      <span>{{goodsdata.coding.supplier ? goodsdata.coding.supplier : '-'}}</span><p></p>
      <van-icon v-show="!is_spread" size="15" name="arrow" color="var(--color-high-text)" @click="spread(goodsdata.coding.id)"/>
      <van-icon v-show="is_spread" size="15" name="arrow-down" color="var(--color-high-text)" @click="spread(goodsdata.coding.id)"/>
    </van-col>
  </van-row>

  <!--展开显示订单商品  2 -->
  <table-goods-bom-two v-show="is_spread" v-for="(goodsdata,index) in state.goodslist" :key="index" :goodsdata="goodsdata" @spreadbomone="spreadbomone"></table-goods-bom-two>


</template>

<script>
import {reactive, ref} from "vue";
import {Toast} from "vant";
import {getbomdetail} from 'network/bom'
import TableGoodsBomTwo from "components/common/TableGoodsBomTwo";

export default {
  name: "TableGoodsBomOne",
  components: {TableGoodsBomTwo},
  props: {
    goodsdata: {
      type: Array,
      default() {
        return []
      }
    },
  },

  setup(props, { emit }) {
    const is_spread = ref(false)
    const state = reactive({
      goodslist: [],
    })

    const spread = (skuid) => {
      // console.log('tableorder', goodsitem);
      emit('spreadbomone', skuid)

      if (!is_spread.value) {
        getbomdetail(skuid).then(res=>{

          if ((res[0] ? res[0].subs.length : 0) === 0){
            Toast('没有数据')
          } else {
            state.goodslist = res[0].subs
            console.log(state.goodslist);
          }
        }).catch(err =>{console.log(err)})
        is_spread.value = !is_spread.value
      } else {
        state.goodslist = []
        is_spread.value = !is_spread.value
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
      state,
      themeVars,
      spread,
      is_spread,

    };
  },
}
</script>

<style scoped>

</style>