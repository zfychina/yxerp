<template>
  <van-row style="color: #666;height: 14px;font-size: 12px" @click="selecdata(data)">
    <van-col span="24" style="text-align: center;vertical-align: middle;">
      {{ data.coding }}
    </van-col>
    </van-row>
    <van-row>
    <van-col span="24" style="text-align: center;vertical-align: middle;color: rgba(2,81,158,0.55);height: 12px;font-size: 10px">
      {{data.name}}
    </van-col>
  </van-row>

<!--  <van-divider style="margin-top: 5px" :style="{ padding: '0 80px' }"></van-divider>-->
  <van-divider style="margin-top: 8px;margin-bottom: 15px" :style="{padding: '0 30px', color: 'var(--color-border)', borderColor: 'var(--color-border)'}"/>
</template>

<script>
export default {
  name: "AutoCellGood",
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
      console.log('selecdata', value);
      emit('selecdata', value )
    }

    return {
      selecdata,
    }
  }
}
</script>

<style scoped>

</style>