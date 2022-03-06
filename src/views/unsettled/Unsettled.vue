<template>
  <van-sticky>
    <van-row>
      <van-col span="24">
        <van-nav-bar left-arrow title="未决" :border='false' @click-left="onClickLeft">
          <template #right>
            <van-uploader :after-read="RecordsiImport" name='files' :accept="accept" result-type="file" style="color: #1989fa">
              导入
            </van-uploader>
          </template>
        </van-nav-bar>
      </van-col>
    </van-row>
  </van-sticky>

  <van-row justify="center">
    <van-col span="23">
      <van-config-provider :theme-vars="themeVars">
        <van-grid :column-num="4" clickable gutter="5px" :border='false'>
          <van-grid-item v-for="(value, index) in gridvalue" :key="index" :icon="'http://s.zfychina.cn/'+ gridicon[index]" :text="value" :to="torouter[index]"/>
        </van-grid>
      </van-config-provider>
    </van-col>
  </van-row>

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
                <div class="orderitem">
                  <order-goods-col v-for="(data, index) in state.tabledata[active].list" :data="data" :key="index" @spreadorder="spreadorder">{{state.button_show=data.id}}</order-goods-col>
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

import {onMounted, reactive, ref} from "vue";
import {recordsimport} from "network/upimport";
import {Dialog, Toast} from "vant";
import TableTitle from "components/common/TableTitle";
import OrderGoodsCol from "./ChildComps/OrderGoodsCol";
import {getorderCG, getorderCGRE, getorderSC, getorderSCRE, getorderNOTCGRE, getorderCGRETURN, getorderSCRETURN, getorderXS, getorderNOTXS} from "network/unsettled";
import {useRouter} from "vue-router";


export default {
  name: "Unsettled",
  components: {OrderGoodsCol, TableTitle },
  setup() {
    // Tab当前位置
    const active = ref(0);

    const props =reactive( {
      accept: '.xls, .xlsx',
    })

    // 表头及排序点击
    const title = ['下单日期', '物料', '订单', '制单人', '供应商', '客户']
    const title_ordering = ['order__order_date', 'sku__coding', 'order__order', 'order__user', 'order__supplier', 'order__customer__shortname']

    const state = reactive({
      // 展开显示-只展开一个
      button_show: [],
      // 控制排序正倒序
      title_by: [true, true, true, true, true, true, true, true, true, true],
      tabtitle: ['生产订单', '生产领料', '生产入库', '采购订单', '采购入库', '无订单采购入库', '采购退货', '生产退料', '销售出库', '无订单销售出库'],
      ordering: ['-order__order_date', ''],

      refreshing: false,
      loading: false,
      finished: [false, false, false, false, false, false, false, false, false, false],
      tabledata: [
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
      ],
    })

    onMounted(()=>{
      for (let i in state.tabtitle){
        getordergoods(Number(i))
      }
    })


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

    const getordergoods = (index)=>{
      // console.log(index, typeof (index));
      if (index === 0){
        getorderSC(state.tabledata[index].page += 1, state.ordering[0]).then(res=>{
          // console.log(res);
          state.tabledata[index].list.push(...res.results)
          state.tabledata[index].count = res.count
        }).catch(err => err)
      }

      if (index === 1){
        console.log(index);
      }

      if (index === 2){
        getorderSCRE(state.tabledata[index].page += 1, state.ordering[0]).then(res=>{
          // console.log(res);
          state.tabledata[index].list.push(...res.results)
          state.tabledata[index].count = res.count
        }).catch(err => err)
      }

      if (index === 3){
        getorderCG(state.tabledata[index].page += 1, state.ordering[0]).then(res=>{
          // console.log(res);
          state.tabledata[index].list.push(...res.results)
          state.tabledata[index].count = res.count
        }).catch(err => err)
      }

      if (index === 4){
        getorderCGRE(state.tabledata[index].page += 1, state.ordering[0]).then(res=>{
          // console.log(res);
          state.tabledata[index].list.push(...res.results)
          state.tabledata[index].count = res.count
        }).catch(err => err)
      }

      if (index === 5){
        getorderNOTCGRE(state.tabledata[index].page += 1, state.ordering[0]).then(res=>{
          // console.log(res);
          state.tabledata[index].list.push(...res.results)
          state.tabledata[index].count = res.count
        }).catch(err => err)
      }

      if (index === 6){
        getorderCGRETURN(state.tabledata[index].page += 1, state.ordering[0]).then(res=>{
          // console.log(res);
          state.tabledata[index].list.push(...res.results)
          state.tabledata[index].count = res.count
        }).catch(err => err)
      }

      if (index === 7){
        getorderSCRETURN(state.tabledata[index].page += 1, state.ordering[0]).then(res=>{
          // console.log(res);
          state.tabledata[index].list.push(...res.results)
          state.tabledata[index].count = res.count
        }).catch(err => err)
      }

      if (index === 8){
        getorderXS(state.tabledata[index].page += 1, state.ordering[0]).then(res=>{
          // console.log(res);
          state.tabledata[index].list.push(...res.results)
          state.tabledata[index].count = res.count
        }).catch(err => err)
      }

      if (index === 9){
        getorderNOTXS(state.tabledata[index].page += 1, state.ordering[0]).then(res=>{
          // console.log(res);
          state.tabledata[index].list.push(...res.results)
          state.tabledata[index].count = res.count
        }).catch(err => err)
      }
    }

    // 存货往来导入
    const RecordsiImport = (file)=>{
      const data = new FormData();
      data.append('files', file.file)
      Toast.loading({duration: 0,message:'存货往来导入中...', forbidClick:true});
      recordsimport(data).then(res=>{
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

    // grid使用
    const gridvalue = ['生产订单', '生产领料', '生产入库', '生产退料', '销售出库', '采购订单', '采购退货', '采购入库']
    const gridicon = ['icon_scdd.svg', 'icon_scll.svg', 'icon_scrk.svg', 'icon_sctl.svg', 'icon_xsck.svg', 'icon_cgdd.svg', 'icon_cgtl.svg', 'icon_cgrk.svg']
    const torouter = ['/createordersc', '/createordersctl', '/createorderscrk', '/createorderscre', '/createordercg', '/createordercg', '/createordercgre', '/createordercgrk']

    // VAN组件CSS样式
    const themeVars = {
      gridItemContentBackgroundColor: "#ffffff",
      gridItemContentPadding: "8px 1px",
      gridItemIconSize: "25px",
      gridItemTextColor: "#666",
      gridItemTextFontSize: "10px",
      noticeBarHeight: "50px"
    };

    // 未完成跳转编辑页面
    const router = useRouter()
    const spreadorder = (id, order, coding)=> {
      console.log(active.value, id, order, coding);
      if (active.value === 0) {
        // 打开生产订单
        console.log(active.value, order);
        router.push({path:'/createordersc', query: { order: order}})
      }
      if (active.value === 1) {
        // 打开生产领料
        console.log(active.value, order);
      }
      if (active.value === 2) {
        // 打开生产入库
        console.log(active.value, order);
        router.push({path:'/createorderscrk', query: { order: order}})
      }
      if (active.value === 3) {
        // 打开采购订单
        console.log(active.value, order);
        router.push({path:'/createordercg', query: { order: order}})
      }
      if (active.value === 4) {
        // 打开采购入库
        console.log(active.value, order);
        router.push({path:'/createordercgrk', query: { order: order}})
      }
      if (active.value === 5) {
        // 打开无订单采购入库
        console.log(active.value, order);
        router.push({path:'/createordercgrk', query: { order: order}})
      }
      if (active.value === 6) {
        // 打开采购退货
        console.log(active.value, order);
        router.push({path:'/createordercgre', query: { order: order}})
      }
      if (active.value === 7) {
        // 打开生产退料
        console.log(active.value, order);
        router.push({path:'/createorderscre', query: { order: order}})
      }
      if (active.value === 8) {
        // 打开销售出库
        console.log(active.value, order);
      }
      if (active.value === 9) {
        // 打开无订单销售出库
        console.log(active.value, order);
      }
    }
    return {
      ...props,
      RecordsiImport,
      themeVars,
      gridvalue,
      gridicon,
      torouter,

      active,
      state,
      title,
      title_ordering,
      receiveactive,
      onRefresh,
      onLoad,
      spreadorder,
    };
  },

}
</script>

<style scoped>

.van-grid {
  border: 1px solid;
  border-color: var(--color-border);
}

.notice-swipe {
  height: 40px;
  line-height: 40px;
}

.textcss {
  font-size: 15px;
  text-align: left;
  line-height: 50px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 0px;
  margin-left: 0px;
  font-weight: bloder; /*bold：加粗；bloder：深度加粗；lighter：细体；*/
  /*border: 1px solid;*/
  background-color: white;
}

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