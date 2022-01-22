<template>
  <table-title :title="title" @titleActive="receiveactive"></table-title>
  <div  class="orderitem">
    <field-cell-list-item v-for="(item, index) in skulist" :serial='index' :data="item" @inputvalue='inputvalue' @cleardata="cleardata" :key="index"></field-cell-list-item>
  </div>
</template>

<script>
import TableTitle from "components/common/TableTitle";
import FieldCellListItem from "components/content/FieldCellListItem";


export default {
  name: "FieldCellList",
  components: { FieldCellListItem, TableTitle },
  props: {
    skulist: {
      type: Array,
      defalut: []
    }
  },
  setup(props, { emit }) {
    // 表头及排序点击
    const title = ['物料编号', '单位', '数量']
    const title_ordering = ['coding', 'orderNum', 'shortmoldNum', 'supplier']
    const receiveactive = (number) => {
      console.log('number', number, title_ordering[number]);
    }

    const inputvalue = (value) => {
      console.log(value);
      emit('inputvalue', value)
    }

    return {
      // 表头
      title,
      receiveactive,
      inputvalue,

    }

  }
}
</script>

<style scoped>

.orderitem {
  font-size: 15px;
  color: #666;
  text-align: left;
  line-height: 2;

  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 0px;
  margin-left: 0px;

  font-weight: bloder; /*bold：加粗；bloder：深度加粗；lighter：细体；*/
  border: 1px solid;
  border-color: var(--color-border);
}

</style>