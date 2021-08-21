<template>
  <van-sticky>
  <van-nav-bar title="销售订单" left-arrow fixed >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  </van-sticky>
<!--滑动切换-->
  <van-tabs title-active-color=var(--color-high-text) color=var(--color-high-text) line-width=25%
            v-model:active="active"
            sticky
            swipeable
            animated
            offset-top=46px >
    <van-tab v-for="(item, index) in state.tabtitle" :title="item" :key="index">
       <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh(index)">

<!--表头-->
         <table style="width: 100%">
           <thead>
           <tr>
             <th style="width: 12%"></th>
             <th style="width: 20%" @click="sorttable('order_date', index)">下单日期</th>
             <th style="width: 20%" @click="sorttable('delivery', index)">交货日期</th>
             <th style="width: 18%" @click="sorttable('customer', index)">客户</th>
             <th style="width: 30%" @click="sorttable('orderhao', index)">订单编号</th>
           </tr>
           </thead>
         </table>

        <van-list
            v-model:loading="state.loading"
            :finished="state.finished[index]"
            finished-text="没有更多了"
            @load="onLoad(index)"
            offset="500"

        >

          <table style="width: 100%">
            <tbody>
            <tr v-for="(item,index1) in state.orderall[index].list" :key="index1" style="margin-left: 3px">
              <th style="width: 8%"><van-checkbox v-model="checked" icon-size="15px"></van-checkbox></th>
              <th style="width: 20%" @click="Extensionline(item.orderhao, index)">{{item.order_date?.split(" ")[0]}}</th>
              <th style="width: 20%" @click="Extensionline(item.orderhao, index)">{{item.delivery?.split(" ")[0]}}</th>
              <th style="width: 20%" @click="Extensionline(item.orderhao, index)">{{ item.customer?.coding }}</th>
              <th style="width: 30%" @click="Extensionline(item.orderhao, index)"><b>{{ item.orderhao }}</b></th>
              <br>
              <div v-show="state.isshow[index].[item.orderhao]" v-for=" (orderitem, index2) in state.orderdetail.[item.orderhao]" :key="index2" style="margin-left: 0px">
              <th style="width: 5%"><van-checkbox v-model="checked" icon-size="13px"></van-checkbox></th>
              <th style="width: 25%;word-break:break-all">{{orderitem.sku.coding}}</th>
              <th style="width: 35%;word-break:break-all;margin-right:10px">{{orderitem.sku.name}}</th>
              <th style="width: 15%">{{orderitem.quantity}}</th>
              <th style="width: 10%">{{orderitem.unit}}</th>
              </div>
            </tr>
            </tbody>
          </table>


        </van-list>
      </van-pull-refresh>

    </van-tab>
  </van-tabs>

<!--提交订单部分-->
  <van-submit-bar button-color=var(--color-high-text)
                  :price="305000" button-text="提交订单" decimal-length=1 @submit="onSubmit">
    <van-checkbox v-model="checked">全选</van-checkbox>
  </van-submit-bar>

</template>

<script>
import { reactive, onMounted} from 'vue';
import {Toast} from "vant";
import {getOrderinfo, getOrderdetail} from "network/order";

export default {
  name: "Order",
  setup() {



    // list组件
    const state = reactive({
      // 是否扩展
      isshow: [{}, {}, {}, {},],

      ordering: ['delivery', 'delivery', 'delivery', 'delivery'],
      order_by: [true, true, true, true],
      orderstaus: [2 ,1 ,3 ,4 ],
      orderall: [
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
      ],
      orderdetail: {},
      loading: false,
      finished: [false, false, false, false,],
      refreshing: false,
      tabtitle: ['未完成订单', '物料待生成', '生产中订单', '全部订单']
    });

    // 获取默认数据
    onMounted(()=>{
      // 未完成订单数据获取
      getdate(state.orderstaus[0], state.ordering[0], 0)

      // 物料待生成数据获取
      getdate(state.orderstaus[1], state.ordering[1], 1)

      // 生产中订单数据获取
      getdate(state.orderstaus[2], state.ordering[2], 2)

      // 全部订单数据获取
      getdate(state.orderstaus[3], state.ordering[3], 3)

    })
    // 获取订单数据
    const getdate = (orderstatus, ordering, index)=> {

      const page = state.orderall[index].page += 1

      getOrderinfo(orderstatus, page, state.ordering[index]).then(res => {
        state.orderall[index].list.push(...res.results)
        state.orderall[index].count = res.count

      }).catch(err =>{console.log(err)})

      // console.log(state.orderall)
    }

    const onLoad = (index) => {
      setTimeout(() => {
        // 下拉刷新前清空数据
        if (state.refreshing) {
          state.orderall[index] =  {count: 0, page: 0, list:[] },
          state.refreshing = false;
          getdate(2, state.ordering, index)
        }

        // 加载下一页数据
        const orderstaus = state.orderstaus[index]
        const ordering = state.ordering[index]
        getdate(orderstaus, ordering, index)
        state.loading = false;

        // 所有页获取完，设置true，没有更多了
        if (state.orderall[index].list.length >= state.orderall[index].count) {
          state.finished[index] = true;
        }

      }, 1000);
    };

    const onRefresh = (index) => {
      // 清空列表数据
      state.finished[index] = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      onLoad(index);
    };
    // 排序
    const sorttable = (ordering, index) => {

      // 确定正序和倒序
      state.order_by[index] = !state.order_by[index]
      if (state.order_by[index]){
        state.ordering[index] = ordering
        state.orderall[index] =  {count: 0, page: 0, list:[] },
        getdate(state.orderstaus[index],  state.ordering[index], index)
      } else {
        state.ordering[index] = '-'+ordering
        state.orderall[index] =  {count: 0, page: 0, list:[] },
            getdate(state.orderstaus[index],  state.ordering[index], index)

      }
  }
    // 提交订单按钮
    const onSubmit = () => Toast('点击按钮');

    // 扩展行
    const Extensionline = (orderhao, index) => {
      if (state.isshow[index].[orderhao]){
        delete state.isshow[index].[orderhao]
      } else (state.isshow[index].[orderhao] = true)
      // console.log(state.isshow);
      // 获取订单详情信息
      getOrderdetail(orderhao).then(res=>{
        state.orderdetail.[orderhao] = res.results
        console.log(state.orderdetail);
      }).catch(err =>{console.log(err)})



    }

    return {
      sorttable,
      onSubmit,
      state,
      onLoad,
      onRefresh,
      checked: false,
      getdate,
      Extensionline,

    };
  },

}
</script>

<style scoped lang="scss">
.van-nav-bar {
  position: absolute;
  z-index: 9999;
}

.van-submit-bar{
  margin-bottom: 50px;
}

.van-list{
  top: 90px;
  bottom: 90px;
  left: 0;
  right: 0;
  overflow: hidden;
}

.van-tabs{
  margin: 0px 0 150px 0;
  top: 44px;
}
.demo-list-wrap {
  width: 100%;
  max-width: 360px;
  overflow: hidden;
}


table {
  border-collapse: collapse;
  thead {
    background-color: #ffffff;
    tr {
      height: 40px;
      th{
        text-align: left;
        padding: 10px 0px ;
        font-size: 12PX;
        color: rgba(131,135,137,0.54);
        font-weight: 700;
      }
    }
  }

  tbody {

    tr {
      width: 100%;
      border-bottom: 1pt solid #efecec;
      display: inline-block;

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

</style>