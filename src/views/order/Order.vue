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
             <th style="width: 8%"></th>
             <th style="width: 20%" @click="sorttable('order_date')">下单日期</th>
             <th style="width: 20%" @click="sorttable('delivery')">交货日期</th>
             <th style="width: 18%" @click="sorttable('customer')">客户</th>
             <th style="width: 30%" @click="sorttable('orderhao')">订单编号</th>
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
            <tr v-for="(item,index) in state.orderall[index].list" :key="index">
              <th style="width: 8%"><van-checkbox v-model="checked" icon-size="15px"></van-checkbox></th>
              <th style="width: 20%" @click="sorttable('order_date')">{{item.order_date?.split(" ")[0]}}</th>
              <th style="width: 20%" @click="sorttable('delivery')">{{item.delivery?.split(" ")[0]}}</th>
              <th style="width: 18%" @click="sorttable('customer')">{{ item.customer?.coding }}</th>
              <th style="width: 30%" @click="sorttable('orderhao')">{{ item.orderhao }}</th>
              <br>
              <div v-show="false" v-for=" i in 5" :key="i">
              <th style="width: 15%"><van-checkbox v-model="checked" icon-size="15px"></van-checkbox></th>
              <th style="width: 20%" @click="sorttable('order_date')">{{item.order_date?.split(" ")[0]}}</th>
              <th style="width: 20%" @click="sorttable('delivery')">{{item.delivery?.split(" ")[0]}}</th>
              <th style="width: 18%" @click="sorttable('customer')">{{ item.customer?.coding }}</th>
              <th style="width: 30%" @click="sorttable('orderhao')">{{ item.orderhao }}</th>
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
import {getOrderinfo} from "network/order";

export default {
  name: "Order",
  setup() {

    // list组件
    const state = reactive({
      ordering:'delivery',
      orderstaus: [2 ,1 ,3 ,4 ],
      orderall: [
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
      ],
      loading: false,
      finished: [false, false, false, false,],
      refreshing: false,
      tabtitle: ['未完成订单', '物料待生成', '生产中订单', '全部订单']
    });

    // 获取默认数据
    onMounted(()=>{
      // 未完成订单数据获取
      getdate(2, state.ordering, 0)

      // 物料待生成数据获取
      getdate(1, state.ordering, 1)

      // 生产中订单数据获取
      getdate(3, state.ordering, 2)

      // 全部订单数据获取
      getdate(4, state.ordering, 3)

    })

    // 获取订单数据
    const getdate = (orderstatus, ordering, index)=> {
      const page = state.orderall[index].page += 1
      console.log(page)
      getOrderinfo(orderstatus, page, ordering).then(res => {
        state.orderall[index].list.push(...res.results)
        state.orderall[index].count = res.count

      })
      console.log(state.orderall)
    }


    const onLoad = (index) => {
      setTimeout(() => {
        // 下拉刷新前清空数据
        if (state.refreshing) {
          state.orderall[index] =  {count: 0, page: 0, list:[] },
          state.refreshing = false;
          getdate(2, state.ordering, index)
        }
        console.log('加载下一页',index)
        // 所有页获取完，设置true，没有更多了
        if (state.orderall[index].list.length >= state.orderall[index].count) {
          state.finished[index] = true;
        } else {
        // 加载下一页数据
        const orderstaus = state.orderstaus[index]
        getdate(orderstaus, state.ordering, index)
        console.log('加载下一页loading')
        state.loading = false;
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


    // 提交订单按钮
    const onSubmit = () => Toast('点击按钮');

    return {
      onSubmit,
      state,
      onLoad,
      onRefresh,
      checked: false,
      getdate,

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