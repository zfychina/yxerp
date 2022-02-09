<template>

  <van-sticky>
    <van-row>
      <van-col span="24">
        <van-nav-bar left-arrow title="销售订单" :border='false' @click-left="onClickLeft">
          <template #right>
            <van-uploader :after-read="Orderimport" name='files' :accept="accept" result-type="file" style="color: #1989fa">
              导入
            </van-uploader>
          </template>
        </van-nav-bar>
      </van-col>
    </van-row>
  </van-sticky>

<!--产品分类切换-->
    <van-row justify="center">
    <van-col span="23">
      <van-config-provider :theme-vars="themeVars">
        <van-tabs title-active-color=var(--color-high-text) color=var(--color-high-text) line-width=20%
                  v-model:active="active"
                  sticky
                  animated
                  swipeable
                  offset-top=46px >
          <van-tab v-for="(item, index) in state.tabtitle" :title="item" :key="index">

            <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh" success-text="刷新成功" style="min-height: 100vh;">
              <van-list
                  v-model:loading="state.loading"
                  :finished="state.finished[active]"
                  finished-text="没有更多了"
                  @load="onLoad"
              >
              <table-title :title="title" @titleActive="receiveactive"></table-title>
              <div  class="orderitem">
                <order-goods-col v-for="(data, index) in state.tabledata[active].list" :data="data" :button_show="state.button_show.indexOf(data.id) > -1" :key="index" @spreadorder="spreadorder">{{state.button_show=data.id}}</order-goods-col>
              </div>
              </van-list>
              <van-divider style="margin-bottom: 60px" :style="{ padding: '0 56px' }">我是有底线的哦！！！</van-divider>
            </van-pull-refresh>
          </van-tab>
        </van-tabs>
      </van-config-provider>
    </van-col>
  </van-row>

</template>

<script>
import {Dialog, Toast} from 'vant';
import {onMounted, reactive, ref} from "vue";
import TableTitle from "components/common/TableTitle";
import OrderGoodsCol from "./ChildComps/OrderGoodsCol";
import {getOrdergoodsinfo} from "network/order";
import {uporderimport} from "network/upimport";


export default {
  name: "Order",
  components: {OrderGoodsCol, TableTitle },
  setup() {
    // Tab当前位置
    const active = ref(0);

    const props =reactive( {
      accept: '.xls, .xlsx',
    })

    // 表头及排序点击
    const title = ['下单日期', '物料编号', '交货日期', '客户', '制单人']
    const title_ordering = ['order__order_date', 'sku__coding', 'order__delivery', 'order__customer', 'order__user']

    const state = reactive({
      // 展开显示-只展开一个
      button_show: [],
      // 控制排序正倒序
      title_by: [true, true, true, true, true],
      tabtitle: ['锁体', '锁芯', '保护器', '面板', '配件'],
      ordering: ['-order__order_date', ''],

      refreshing: false,
      loading: false,
      finished: [false, false, false, false, false],
      tabledata: [
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
      ],
    });

    onMounted(()=>{
      for (let i in state.tabtitle){
        getordergoods(i)
      }
    })

    // 获取信息
    const getordergoods = (index)=>{
      getOrdergoodsinfo(state.tabtitle[index], state.tabledata[index].page += 1, state.ordering[0]).then(res=>{
        state.tabledata[index].list.push(...res.results)
        state.tabledata[index].count = res.count

      }).catch(err => err)
    }


    // 下拉刷新
    const onLoad = () => {

      setTimeout(() => {
        // 是滞清空数据
        if (state.refreshing) {
          state.ordering = ['-order__order_date', '']
          state.tabledata[active.value] = {count: 0, page: 0, list:[] }
          state.refreshing = false;
        }
        // 加载下一页数据
        getordergoods(active.value)

        state.loading = false;
        // 所有页获取完，设置true，没有更多了
        if ( (state.tabledata[active.value].count !== 0) && state.tabledata[active.value].list.length >= state.tabledata[active.value].count) {
          state.finished[active.value] = true;
        }
        console.log('下拉刷新',state.tabledata);
      }, 1000);
    };

    const onRefresh = () => {
      // 清空列表数据
      state.finished[active.value] = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      onLoad();
    };

    // 排序
    const receiveactive = (number) => {
      console.log('titlenumber', number, 'active', active.value);
      if (state.title_by[number]){
        state.title_by[number] = !state.title_by[number]
        state.ordering.unshift(title_ordering[number])
      } else {
        state.title_by[number] = !state.title_by[number]
        state.ordering.unshift("-"+title_ordering[number])
      }

      console.log(state.ordering);
      state.tabledata[active.value] = {count: 0, page: 0, list:[] }
      getordergoods(active.value)



    }

    // 订单展开数据接收
    const spreadorder = (id, order, coding) => {
      console.log('订单展开数据接收-spreadorder', id, order, coding);
      // 按钮展示
      if (state.button_show.indexOf(id) > -1 ){
        state.button_show = []
      } else {
        state.button_show = []
        state.button_show.push(id)
        console.log(state.button_show);
      }
    }


    // VAN组件CSS样式
    const themeVars = {
      gridItemContentBackgroundColor: "#ffffff",
      gridItemContentPadding: "8px 1px",
      gridItemIconSize: "25px",
      gridItemTextColor: "#666",
      gridItemTextFontSize: "10px",
      noticeBarHeight: "50px"
    };
    // 返回按钮和搜索按钮
    const onClickLeft = () => history.back();
    // const onClickRight = () => Toast('按钮');

    // 订单信息导入
    const Orderimport = (file)=>{
      const data = new FormData();
      data.append('files', file.file)
      Toast.loading({duration: 0,message:'订单导入中...', forbidClick:true});
      uporderimport(data).then(res=>{
        Toast.clear()
        Dialog.alert({
          message: res,
        }).then(() => {
          // on close
        });
      }).catch(err=>{
        Toast.clear()
        Toast.fail({duration: 1000,message:"失败，请检查！！！"})
        console.log(err);
      })
    }

    return {
      ...props,
      onClickLeft,
      Orderimport,
      themeVars,
      state,
      active,
      onRefresh,
      onLoad,

      title_ordering,
      title,
      receiveactive,
      spreadorder,
    };
  },

}
</script>

<style scoped >
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