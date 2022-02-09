<template>
  <van-row justify="left" style="font-size: 12px" align="center">
<!--    <van-col offset="1" span="1" style="text-align:right;vertical-align: middle;">-->
<!--      <van-checkbox v-model="checked"  icon-size="15px"></van-checkbox>-->
<!--    </van-col>-->
    <van-col span="4" offset="1">
      <span style="line-height: 3; font-size: 12px; text-align: left;"><p>{{data.order.delivery ? data.order.delivery.split(' ')[0].split('-')[1]+"月"+data.order.delivery.split(' ')[0].split('-')[2]+"日":
          data.order.update_time.split(' ')[0].split('-')[1]+"月"+data.order.update_time.split(' ')[0].split('-')[2]+"日"}}</p></span>
      <span style="line-height: 0.5; font-size: 8px; color: var(--color-border); text-align: left;">
        <p>{{data.order.user}}</p>
      <span style="color: var(--color-red);">{{data.order.order_date.split(' ')[0].split('-')[1]+"月"+data.order.order_date.split(' ')[0].split('-')[2]+"日"}}</span>
      </span>
    </van-col>
    <van-col span="13">
      <span style="line-height: 3; font-size: 12px; text-align: left;"><p>{{data.sku.sku ? data.sku.sku.coding : data.sku.coding}}</p></span>
      <span style="line-height: 0.5; font-size: 8px; color: var(--color-border); text-align: left;">
        <p>{{data.sku.sku ? data.sku.sku.name : data.sku.name}}</p>
        <span style="color: var(--color-red);">{{data.order.order}}</span>
      </span>
    </van-col>
    <van-col span="4">
      <span style="line-height: 3; font-size: 12px; text-align: left;"><p>{{data.quantity + " "}}{{data.sku.sku ? data.sku.sku.unit : data.sku.unit}}</p></span>
      <span style="line-height: 0.5; font-size: 8px; color: var(--color-border); text-align: left;">
        <p>{{data.sku.order ? data.sku.order.supplier : data.order.supplier}}</p>
        <span style="color: var(--color-red);font-size: 8px;">{{data.sku.order ? data.sku.order.order : ''}}</span>
      </span>
    </van-col>
    <van-col span="2" style="text-align: left;vertical-align: middle;">
      <van-icon name="arrow" size="20" color="var(--color-high-text)"  v-show="parseFloat(data.quantity) > parseFloat(data.quantityed ? data.quantityed : 0)" span="1"  @click="spread(data.id, data.order.orderhao, data.sku.coding)"/>
      <van-icon v-show="parseFloat(data.quantity) <= parseFloat(data.quantityed ? data.quantityed : 0)"  name="http://s.zfychina.cn/iconfinshed.svg" color="var(--color-high-text)" size="20"/>
    </van-col>
  </van-row>

  <van-row  justify="space-around" v-show="button_show">
    <van-col v-for="(name, index) in vanbutton" :key='index' span="11" style="text-align: center;vertical-align: middle;line-height: 4;">
      <van-button :to="vanbutton_url[index]" type="primary" plain hairline   color="var(--color-border)">{{ name }}</van-button>
    </van-col>
  </van-row>


  <!--分割线-->
  <van-config-provider :theme-vars="themeVars">
    <van-divider :style="{ color: 'var(--color-border)', borderColor: 'var(--color-border)', padding: '0 16px' }"/>
  </van-config-provider>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "OrderGoodsCol",
  props: {
    button_show: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
  },
  setup(props, { emit }) {
    const button_show = ref(false);

    const vanbutton = ['创建销售订单', '创建生产订单', '编辑销售订单', '编辑生产订单']
    const vanbutton_url = [
      { path: 'createorder'},
      '创建生产订单',
      { path: 'createorder', query: { order: props.data.order.orderhao}},
      '编辑生产订单'
    ]
    // "{ path: 'createorder', query: { order: order.value }}"

    const spread = (id, order, coding) => {
      // 是否显示扩展
      button_show.value = !button_show.value
      console.log('spreadorder', id, order, coding);
      console.log(props.data);
      emit('spreadorder', id, order, coding)
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

      vanbutton,
      vanbutton_url,
    };
  },

}
</script>

<style scoped>

</style>