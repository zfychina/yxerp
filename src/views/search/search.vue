<template>
  <van-row>
    <van-col span="24">
      <van-config-provider :theme-vars="themeVars">
        <van-search
            v-model="value"
            show-action
            placeholder="请输入物料"
            @search="onSearch"
        >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </van-config-provider>
    </van-col>

  </van-row>

  <!--  <van-row>-->
  <!--    <van-col span="8">span: 8</van-col>-->
  <!--    <van-col span="8">span: 8</van-col>-->
  <!--    <van-col span="8">span: 8</van-col>-->
  <!--  </van-row>-->

</template>

<script>
import { ref } from 'vue';
import { Toast } from 'vant';

export default {
  name: "search",

  setup() {
    const searchvalue = ref('');
    const onSearch = (val) => Toast(val);
    const onCancel = () => Toast('取消');


    const themeVars = {
      searchActionTextColor: "#fff",
      searchActionFontSize: '18px',
      searchBackgroundColor: '#1989fa',
      searchPadding: '0.1px 5px',
      searchInputHeight: '46px',
      searchContentBackgroundColor: "#fff",
    };
    return {
      themeVars,

      searchvalue,
      onSearch,
      onCancel,
    };
  },

}

</script>

<style scoped>

</style>