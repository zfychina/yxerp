<template>
<!--  <van-nav-bar title="缺料表" left-arrow>-->
<!--    <template #right>-->
<!--      <van-icon name="search" size="18" />-->
<!--    </template>-->
<!--  </van-nav-bar>-->
  <van-sticky>
  <van-dropdown-menu active-color="#1989fa">
    <van-dropdown-item v-model="state.value1" :options="option1" />
  </van-dropdown-menu>
<!--表头-->
    <table style="width: 100%">
      <thead>
      <tr>
        <th style="width: 20%" @click="sorttable('coding')">物料编号</th>
        <th style="width: 30%" @click="sorttable('name')">物料名称</th>
        <th style="width: 17%" @click="sorttable('orderNum')">需求量</th>
        <th style="width: 17%" @click="sorttable('shortmoldNum')">缺数</th>
        <th style="width: 16%" @click="sorttable('supplier')">供应商</th>
      </tr>
      </thead>
    </table>

  </van-sticky>

  <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
    <van-list
        v-model:loading="state.loading"
        :finished="state.finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
<!--      <van-cell v-for="item in state.list" :key="item" :title="item"/>-->
    <table style="width: 100%;margin-left: 8px;">
      <tbody>
      <tr v-for="item in state.list" :key="item">
        <th style="width: 20%" @click="Extensionline(item.id)">{{ item.coding }}</th>
        <th style="width: 30%" @click="Extensionline(item.id)">{{ item.name }}</th>
        <th style="width: 17%" @click="Extensionline(item.id)">{{ item.orderNum }}</th>
        <th style="width: 17%" @click="Extensionline(item.id)">{{ item.shortmoldNum }}</th>
        <th style="width: 16%" @click="Extensionline(item.id)">{{ item.supplier }}</th>
        <br>
<!--        一层-->
        <div class="detailorder" v-show="state.isshow?.[item.id]" v-for=" (item1, index1) in state.bomdetail?.[item.id]?.subs" :key="index1" style="margin-left: 2px">
          <th style="width: 5%"></th>
          <th style="width: 20%" @click="Extensionline(item1.coding.split(':')[0])">{{ item1.coding.split(':')[1] }}</th>
          <th style="width: 30%" @click="Extensionline(item1.coding.split(':')[0])">{{ item1.coding.split(':')[2] }}</th>
          <th style="width: 17%" @click="Extensionline(item1.coding.split(':')[0])">{{ item1.stock }}</th>
          <th style="width: 17%" @click="Extensionline(item1.coding.split(':')[0])">{{ item1.coding.split(':')[3] }}</th>
          <th style="width: 11%"></th>
        <!--        二层-->
          <div class="detailorder" v-show="state.isshow?.[ item1.coding.split(':')[0] ]" v-for=" (item2, index2) in state.bomdetail?.[item1.coding.split(':')[0]]?.subs" :key="index2" style="margin-left: 6px">
            <th style="width: 8%"></th>
          <th style="width: 20%" @click="Extensionline(item2.coding.split(':')[0])">{{ item2.coding.split(':')[1] }}</th>
          <th style="width: 30%" @click="Extensionline(item2.coding.split(':')[0])">{{ item2.coding.split(':')[2] }}</th>
          <th style="width: 17%" @click="Extensionline(item2.coding.split(':')[0])">{{ item2.stock }}</th>
          <th style="width: 17%" @click="Extensionline(item2.coding.split(':')[0])">{{ item2.coding.split(':')[3] }}</th>
            <th style="width: 8%"></th>
          <!--        三层-->
          <div class="detailorder" v-show="state.isshow?.[ item2.coding.split(':')[0] ]" v-for=" (item3, index3) in state.bomdetail?.[item2.coding.split(':')[0]]?.subs" :key="index3" style="margin-left: 6px">
            <th style="width: 11%"></th>
            <th style="width: 20%" @click="Extensionline(item3.coding.split(':')[0])">{{ item3.coding.split(':')[1] }}</th>
            <th style="width: 30%" @click="Extensionline(item3.coding.split(':')[0])">{{ item3.coding.split(':')[2] }}</th>
            <th style="width: 17%" @click="Extensionline(item3.coding.split(':')[0])">{{ item3.stock }}</th>
            <th style="width: 17%" @click="Extensionline(item3.coding.split(':')[0])">{{ item3.coding.split(':')[3] }}</th>
            <th style="width: 5%"></th>
            <!--        四层-->
            <div class="detailorder" v-show="state.isshow?.[ item3.coding.split(':')[0] ]" v-for=" (item4, index4) in state.bomdetail?.[item3.coding.split(':')[0]]?.subs" :key="index4" style="margin-left: 6px">
              <th style="width: 14%"></th>
              <th style="width: 20%" @click="Extensionline(item4.coding.split(':')[0])">{{ item4.coding.split(':')[1] }}</th>
              <th style="width: 30%" @click="Extensionline(item4.coding.split(':')[0])">{{ item4.coding.split(':')[2] }}</th>
              <th style="width: 17%" @click="Extensionline(item4.coding.split(':')[0])">{{ item4.stock }}</th>
              <th style="width: 17%" @click="Extensionline(item4.coding.split(':')[0])">{{ item4.coding.split(':')[3] }}</th>
              <th style="width: 1%"></th>
              <!--        五层-->
              <div class="detailorder" v-show="state.isshow?.[ item4.coding.split(':')[0] ]" v-for=" (item5, index5) in state.bomdetail?.[item4.coding.split(':')[0]]?.subs" :key="index5" style="margin-left: 6px">
                <th style="width: 14%"></th>
                <th style="width: 20%" @click="Extensionline(item5.coding.split(':')[0])">{{ item5.coding.split(':')[1] }}</th>
                <th style="width: 30%" @click="Extensionline(item5.coding.split(':')[0])">{{ item5coding.split(':')[2] }}</th>
                <th style="width: 17%" @click="Extensionline(item5.coding.split(':')[0])">{{ item5.stock }}</th>
                <th style="width: 17%" @click="Extensionline(item5.coding.split(':')[0])">{{ item5.coding.split(':')[3] }}</th>
                <th style="width: 1%"></th>
                <!--        六层-->
                <div class="detailorder" v-show="state.isshow?.[ item5.coding.split(':')[0] ]" v-for=" (item6, index6) in state.bomdetail?.[item5.coding.split(':')[0]]?.subs" :key="index6" style="margin-left: 6px">
                  <th style="width: 14%"></th>
                  <th style="width: 20%" @click="Extensionline(item6.coding.split(':')[0])">{{ item6.coding.split(':')[1] }}</th>
                  <th style="width: 30%" @click="Extensionline(item6.coding.split(':')[0])">{{ item6.coding.split(':')[2] }}</th>
                  <th style="width: 17%" @click="Extensionline(item6.coding.split(':')[0])">{{ item6.stock }}</th>
                  <th style="width: 17%" @click="Extensionline(item6.coding.split(':')[0])">{{ item6.coding.split(':')[3] }}</th>
                  <th style="width: 1%"></th>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
      </tr>
      </tbody>
    </table>
    </van-list>
  </van-pull-refresh>

</template>

<script>
import {onMounted, reactive} from 'vue';
import {shortmoldDate} from 'network/shortmold'
import {getbomdetail} from 'network/bom'
import {Toast} from "vant";

export default {

  name: "Shortmold",
  setup() {

    const state = reactive({
      // 排序
      order_by:true,
      // 导航栏
      value1: 0,
      // 列表
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      sortType: 'in_price',


      month: {page:0, list: []},
      amig: {page:0, list: []},
      apecs: {page:0, list: []},

      // 是否扩展
      isshow: {},
      bomdetail: {}

    });
    const option1 = [
      { text: '本月缺料', value: 0 },
      { text: 'AMIG缺料', value: 1 },
      { text: 'APECS缺料', value: 2 },
    ];
    // 列表
    const onLoad = () => {
      setTimeout(() => {
        if (state.refreshing) {
          //state.list = [];
          state.refreshing = false;
        }

        for (let i = 0; i < 2; i++) {
          state.list.push(state.list.length + 1);
        }
        state.loading = false;

        if (state.list.length >= 10) {
          state.finished = true;
        }
      }, 1000);
    };
    //数据
    onMounted(()=>{
      shortmoldDate({ordering: 'coding'}).then(res=>{
        state.list = res
        // console.log(state.list);
      })
    })
    // 下拉刷新
    const onRefresh = () => {
      // 清空列表数据
      state.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      onLoad();
    };
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
    // 排序按钮
    const sorttable = (type) => {
      state.order_by = !state.order_by
      if(state.order_by) {
        if (type === 'shortmoldNum' | type === 'orderNum'){
          state.sortType = type
          state.list.sort(upsortList(state.sortType))
        } else {
          shortmoldDate({ordering: type}).then(res => {
            state.list = res
          })
        }
      }else {
        if (type === 'shortmoldNum' | type === '0'){
          state.sortType = type
          state.list.sort(downsortList(state.sortType))
        } else {
          shortmoldDate({ordering:'-'+type}).then(res => {
            state.list = res
          })
        }
      }
    }
    // 扩展行
    const Extensionline = (skuid) => {
      if (state.isshow?.[skuid]){
        delete state.isshow?.[skuid]
      } else (state.isshow.[skuid] = true)
      // 获取订单详情信息
      getbomdetail(skuid).then(res=>{
        state.bomdetail.[skuid] = res[0]
        if ( state.bomdetail.[skuid] === undefined || state.bomdetail.[skuid].subs.length === 0){
          Toast('没有数据')
        }
      }).catch(err =>{console.log(err)})
    }




    return {
      // 导航栏
      state,
      option1,

      // 列表
      onLoad,
      onRefresh,
      sorttable,

      // 展开按钮
      Extensionline,

    };

  },
}
</script>
<style scoped lang="scss">
table {
  border-collapse: collapse;
  thead {
    background-color: #ffffff;
    tr {
      height: 40px;
      th{
        text-align: left;
        padding: 10px 8px ;
        font-size: 12PX;
        color: var(--color-high-text);
        font-weight: 800;
      }
    }
  }

  tbody {

    tr {
      width: 100%;
      border-bottom: 1pt solid #efecec;
      font-family: "微软雅黑", "仿宋", sans-serif;
      font-weight: bold; //bold：加粗；bloder：深度加粗；lighter：细体；


      th {
        display: inline-block;
        //display: inline-block;
        text-align: left;
        padding: 10px 0px ;
        font-size: 10PX;
        color: var(--color-text);
        font-weight: 400;

      }
    }
}
}

.demo-list-wrap {
  width: 100%;
  max-width: 360px;
  overflow: hidden;
}

table tbody tr:nth-child(odd){ background : #f9faff;}

.detailorder {
  font-family: "微软雅黑", "仿宋", sans-serif;
  font-weight: bold;  //bold：加粗；bloder：深度加粗；lighter：细体；
  border-top: 1px dashed #d7d7d7
}

//th:first-child
//{
//  background-color:yellow;
//}
</style>