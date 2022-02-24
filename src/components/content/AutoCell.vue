<template>
  <van-row style="color: #666;height: 12px;font-size: 12px" @click="selecdata(data)">
    <van-col span="11" style="text-align: right;vertical-align: middle;">
      {{ data.coding ? data.coding : data.orderhao}}{{data.order}}
    </van-col>
    <van-col span="2"></van-col>
    <van-col span="11" style="text-align: left;vertical-align: middle">
      {{data.shortname ? data.shortname : data.customer}} {{data.supplier?.shortname}}
    </van-col>
    </van-row>
    <van-row>
    <van-col span="24" style="text-align: center;vertical-align: middle;color: #c8c9cc;height: 10px;font-size: 8px">
      {{ data.name ? data.name : data.order_date ? data.order_date.split(' ')[0] : '' }}
    </van-col>
  </van-row>

<!--  <van-divider style="margin-top: 5px" :style="{ padding: '0 80px' }"></van-divider>-->
  <van-divider style="margin-top: 8px;margin-bottom: 15px" :style="{padding: '0 30px', color: 'var(--color-border)', borderColor: 'var(--color-border)'}"/>
</template>

<script>
export default {
  name: "AutoCell",
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
  },
  setup(props, { emit }){
    const selecdata = (value) => {
      const order = value.orderhao ? value.orderhao : value.order
      emit('selecdata', value.shortname ? value.shortname:order )
    }

    return {
      selecdata,
    }
  }
}
</script>

<style scoped>

</style>