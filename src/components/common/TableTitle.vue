<template>
  <van-row class="ordertitle" gutter="18">
    <div>&nbsp;&nbsp;&nbsp;&nbsp;综合排序：</div>
    <van-col v-for="(title,index) in title" :key="index" @click="ordering(title, index)">{{ title }}</van-col>
  </van-row>
</template>

<script>
export default {
  name: "TableTitle",
  props: {
    title: {
      type: Array,
      default() {
        return []
      }
    },

  },

  setup(props, { emit }) {

    const ordering = (title, index)=>{
     // console.log('item', title, index);
     emit('titleActive', index)
    }
    return {
      ordering,
    };
  },
}
</script>

<style scoped>
.ordertitle {
  font-size: 10px;
  color: var(--color-border);
  text-align: left;
  line-height: 3;

  border: 1px solid;
  border-bottom:none;
  border-color: var(--color-border);
}
</style>