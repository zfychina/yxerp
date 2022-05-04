<template>
  <van-row>
    <van-col>
      <van-checkbox-group v-model="checked" ref="checkboxGroup" direction="horizontal">
        <van-checkbox shape="square" name="a">复选框 a</van-checkbox>
        <van-checkbox shape="square" name="b">复选框 b</van-checkbox>
        <van-checkbox shape="square" name="c">复选框 c</van-checkbox>
        <van-button type="primary" @click="checkAll">全选</van-button>
        <van-button type="primary" @click="toggleAll">反选</van-button>
      </van-checkbox-group>



    </van-col>
  </van-row>
</template>

<script>
import {ref} from "vue";

export default {
  name: "checkItem",
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },

  },
  setup(){
    // 复选框
    const checked = ref([]);
    const checkboxGroup = ref(null);

    const checkAll = () => {
      checkboxGroup.value.toggleAll(true);
      console.log(checked.value);
      console.log(checkboxGroup.value);
    }
    const toggleAll = () => {
      checkboxGroup.value.toggleAll();
    }
    return{
      // 复选框
      checked,
      checkAll,
      toggleAll,
      checkboxGroup,
    }
  }

}
</script>

<style scoped>

</style>