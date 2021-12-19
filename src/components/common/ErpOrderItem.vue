<template>
 <table-title :title="title" @titleActive="receiveactive"></table-title>

  <div  class="orderitem">
    <table-order v-for="(data, index) in state.tabledata" :data="data" :key="index" @spreadorder="spreadorder"></table-order>
  </div>

</template>

<script>
import TableTitle from "components/common/TableTitle";
import TableOrder from "components/common/TableOrder";
import {onMounted, reactive} from "vue";
import {getMonthOrderinfo} from "network/order";

export default {
  name: "ErpOrderItem",
  components: { TableOrder, TableTitle},
  setup(props, { emit }) {
    // 表头及排序点击
    const title = ['下单日期', '销售订单', '交货日期', '客户']
    const title_ordering = ['order_date', 'orderhao', 'delivery', 'customer']
    const state = reactive({
      title_by: [true, true, true, true],
      tabledata: []
    })

    onMounted(()=>{
      getdata('create_time')
    })

    // 排序
    const receiveactive = (number) => {
      console.log('number', number, state.title_by[number], title_ordering[number]);
      if (state.title_by[number]){
        state.title_by[number] = !state.title_by[number]
        getdata(title_ordering[number])
      } else {
        state.title_by[number] = !state.title_by[number]
        getdata('-' + title_ordering[number])

      }
    }

    // 表数据及展开点击
    const getdata = (ordering) => {
      getMonthOrderinfo(ordering).then(res=>{
        state.tabledata = res
        ordernum()
        console.log('++++++++++++++++++++++++++++', state.tabledata);
      })
    }


    const spreadorder = (order) => {
      console.log('order', order);
    }

    // 传递数据到父组件
    const ordernum = ()=>{
      emit('ordernum', state.tabledata.length)
    }

    return {
      state,
      // 表数据
      spreadorder,

      // 表头
      title,
      receiveactive,
    };
  },
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