<template>
  <table-title :title="title" @titleActive="receiveactive"></table-title>

  <div  class="orderitem">
    <table-goods v-for="(data, index) in state.tabledata" :data="data" :key="index" @spreadbom="spreadbom"></table-goods>
  </div>
</template>

<script>
import TableGoods from "components/common/TableGoods";
import TableTitle from "components/common/TableTitle";
import {onMounted, reactive} from "vue";
import {shortmoldDate} from 'network/shortmold'

export default {
  name: "ErpGoodsItem",
  components: { TableGoods, TableTitle},
  setup() {
    // 表头及排序点击
    const title = ['物料编号', '需求数', '缺料数', '供应商']
    const title_ordering = ['coding', 'orderNum', 'shortmoldNum', 'supplier']


    // 根据数组中对象为数字情况进行排序
    // 升序
    const upsortList = (attr)=>{
      return function(a,b){
        let val1 = a[attr];
        let val2 = b[attr];
        return val1 - val2;
      }
    }
    // 降序
    const downsortList = (attr)=>{
      return function(a,b){
        let val1 = a[attr];
        let val2 = b[attr];
        return val2 - val1;
      }
    }
    // 排序
    const receiveactive = (number) => {
      console.log('number', number);
      if (state.title_by[number]){
        state.title_by[number] = !state.title_by[number]
        if (title_ordering[number] === 'shortmoldNum' | title_ordering[number] === 'orderNum'){
          state.sortType = title_ordering[number]
          state.tabledata.sort(upsortList(state.sortType))
        }else {
          shortmolddate(title_ordering[number])
        }

      } else {
        state.title_by[number] = !state.title_by[number]
        if (title_ordering[number] === 'shortmoldNum' | title_ordering[number] === 'orderNum'){
          state.sortType = title_ordering[number]
          state.tabledata.sort(downsortList(state.sortType))
        }else {
          shortmolddate('-' + title_ordering[number])
        }
      }

    }
    const state = reactive({
      title_by: [true, true, true, true],
      tabledata: [],
    })

    //数据
    onMounted(()=>{
      shortmolddate('coding')
    })

    const shortmolddate = (ordering) => {
      shortmoldDate({ordering:ordering}).then(res=>{
        state.tabledata = res
        // console.log(state.list);
      })

    }

    const spreadbom = (BOM) => {
      console.log('BOM', BOM);
    }

    return {
      // 表数据
      state,
      spreadbom,

      // 表头
      title,
      receiveactive,

    };
  },
}
</script>

<style scoped>
.orderitem {
  font-size: 14px;
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