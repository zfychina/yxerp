<template>
  <!--缺料物料详情-->
  <van-row justify="left" style="font-size: 12px" align="center">
    <van-col span="12" offset="1">
      <span style="line-height: 2; font-size: 12px; text-align: left;"><p>{{data.coding}}</p></span>
      <span style="line-height: 0.5; font-size: 8px; color: var(--color-border); text-align: left;">{{data.name}}</span>
    </van-col>
    <van-col span="6">
      <span style="line-height: 2; font-size: 12px; text-align: left;"><p>{{data.shortmoldNum}}</p></span>
      <span style="line-height: 0.5; font-size: 8px; color: var(--color-border); text-align: left;">需求数: {{data.orderNum}}</span>
    </van-col>
    <van-col span="5" style="text-align: center;">
      <span>{{data.supplier ? data.supplier : "-"}}</span><p></p>
      <van-icon v-show="!is_spread" size="15" name="arrow" color="var(--color-high-text)" @click="spread(data.id)"/>
      <van-icon v-show="is_spread" size="15" name="arrow-down" color="var(--color-high-text)" @click="spread(data.id)"/>
    </van-col>
  </van-row>


  <!--展开显示订单商品  1 -->
    <table-goods-bom v-show="is_spread" v-for="(goodsdata,index) in state.goodslist" :key="index" :goodsdata="goodsdata" @spreadbomone="spreadbomone"></table-goods-bom>

  <!--分割线-->
  <van-config-provider :theme-vars="themeVars">
    <van-divider :style="{ color: 'var(--color-border)', borderColor: 'var(--color-border)', padding: '0 16px' }"/>
  </van-config-provider>
</template>

<script>
import {reactive, ref} from "vue";
import {getbomdetail} from 'network/bom'
import {Toast} from "vant";
import TableGoodsBom from "components/common/TableGoodsBom";

export default {
  name: "TableOrder",
  components: {TableGoodsBom},
  props: {
    data: {
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
      emit('spreadbom', skuid)

      if (!is_spread.value) {
        getbomdetail(skuid).then(res=>{

          if ((res[0] ? res[0].subs.length : 0) === 0){
            Toast('没有数据')
          } else {
            console.log(res[0].subs);
            state.goodslist = res[0].subs
          }
        }).catch(err =>{console.log(err)})
        is_spread.value = !is_spread.value
      } else {
        state.goodslist = []
        is_spread.value = !is_spread.value
      }
    }

    const spreadbomone = (BOM) => {
      console.log('spreadbomone', BOM);
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
      spread,
      is_spread,
      state,
      spreadbomone,

    };
  },
}
</script>

<style scoped>

</style>