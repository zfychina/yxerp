<template>
<!--  <van-nav-bar title="缺料表" left-arrow>-->
<!--    <template #right>-->
<!--      <van-icon name="search" size="18" />-->
<!--    </template>-->
<!--  </van-nav-bar>-->

  <van-dropdown-menu active-color="#1989fa">
    <van-dropdown-item v-model="state.value1" :options="option1" />
    <van-dropdown-item v-model="state.value2" :options="option2" />
  </van-dropdown-menu>
</template>

<script>
import { reactive } from 'vue';

export default {

  name: "Shortmold",
  setup() {
    const state = reactive({
      value1: 0,
      value2: 'a',
    });
    const option1 = [
      { text: '7月份缺料', value: 0 },
      { text: 'AMIG缺料', value: 1 },
      { text: 'APECS缺料', value: 2 },
    ];
    const option2 = [
      { text: '默认排序', value: 'a' },
      { text: '物料编号排序', value: 'b' },
      { text: '缺料数排序', value: 'c' },
    ];

    return {
      state,
      option1,
      option2,
    };

  },
}
</script>

<style scoped>

</style>