<template>
  <van-sticky>
    <van-nav-bar title="未决" left-text="+新增" fixed @click-left="onClickLeft"  @click-right="onClickRight">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-popup v-model:show="showPopup" closeable position="top" :style="{ height: '50%'}">
      <div style="margin-top:60px;font-size: 22px;color: var(--color-high-text)">
        <van-cell title="新建生产订单" @click="createsc" is-link/>
        <van-cell title="新建生产入库单" @click="createscrk" is-link/>
        <van-cell title="新建采购订单" @click="createcg" is-link/>
        <van-cell title="新建采购入库单" @click="createcgrk" is-link/>
        <van-cell title="新建生产提料单(暂无此入口)" @click="createsctl" is-link/>

      </div>
    </van-popup>
  </van-sticky>


  <!--滑动切换-->
  <van-tabs title-active-color=var(--color-high-text) color=var(--color-high-text) line-width=20%
            v-model:active="active"
            sticky
            swipeable
            animated
            offset-top=46px >
    <van-tab v-for="(item, index) in state.tabtitle" :title="item" :key="index">

      <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">

        <!--表头-->
        <table style="width: 100%">
          <thead>
          <tr>
            <th style="width: 5%"></th>
            <th style="width: 10%" @click="sorttable('order', index)">日期</th>
            <th style="width: 20%" @click="sorttable('sku', index)">物料编号</th>
            <th style="width: 20%" @click="sorttable('sku', index)">物料名称</th>
            <th style="width: 15%" @click="sorttable('quantity', index)">订单数</th>
            <th style="width: 15%" @click="sorttable('quantity', index)">入(提)数</th>
            <th style="width: 15%" @click="sorttable('order', index)">供应商</th>
          </tr>
          </thead>
        </table>

        <van-list
            v-model:loading="state.loading"
            :finished="state.finished[index]"
            finished-text="没有更多了"
            @load="onLoad(index)"
            offset="300"
        >

          <table style="width: 100%">
            <tbody>
            <tr v-for="(item,index1) in state.orderall[index].list" :key="index1" style="margin-left: 3px">
              <th style="width: 5%"><van-checkbox @click="oncheckorder(item.id)" v-model="state.checkorder[index].[item.id]" icon-size="15px"></van-checkbox></th>
              <th style="width: 10%" @click="newdetail(item.order.order)">{{item.order.order_date?.split(" ")[0]}}</th>
              <th style="width: 18%" @click="newdetail(item.order.order)">{{item.sku.sku ? item.sku.sku?.split(":")[1] : item.sku?.split(":")[1]}}</th>
              <th style="width: 25%" @click="newdetail(item.order.order)">{{item.sku.sku ? item.sku.sku?.split(":")[2] : item.sku?.split(":")[2]}}</th>
<!--              <br>-->
              <th style="width: 15%" @click="newdetail(item.order.order)">{{ item.quantityed ? item.quantity : item.quantityed}}</th>
              <th style="width: 15%" @click="newdetail(item.order.order)">{{ item.quantityed ? item.quantityed : item.quantity }}</th>
              <th style="width: 10%" @click="newdetail(item.order.order)">{{item.order.supplier ? item.order.supplier : item.sku.order.supplier}}</th>
            </tr>
            </tbody>
          </table>


        </van-list>
      </van-pull-refresh>



    </van-tab>
  </van-tabs>

  <!--提交订单部分-->
  <van-submit-bar button-color=var(--color-high-text)
                  :price="total*100" currency="" button-text="提交订单" decimal-length=1 @submit="onSubmit">
    <van-checkbox v-model="state.checkall[active]" @click="oncheckall">全选</van-checkbox>

  </van-submit-bar>

</template>

<script>
import {ref, reactive, onMounted, computed} from 'vue';
import {Toast} from "vant";
import {useRouter} from "vue-router";
import {getorderCG, getorderCGRE, getorderSC, getorderSCRE} from "network/unsettled";

export default {
  name: "Order",
  setup() {
    const router = useRouter()
    // Tab当前位置
    const active = ref(0);
    // 左侧弹出是否显示
    const showPopup = ref(false);
    // list组件
    const state = reactive({
      // 控制第一次全选，提示是否展开所有订单内的商品信息
      orderdialog: [true, true, true, true, true],
      // 是否全选
      checkall:[false, false, false, false, false],
      checkorder: [{}, {}, {}, {}, {}],

      // 是否扩展
      isshow: [{}, {}, {}, {}, {}],

      ordering: ['order', 'order', 'order', 'order', 'order'],
      order_by: [true, true, true, true, true],
      orderstaus: [2 ,1 ,3 ,4 ],
      orderall: [
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
        {count: 0, page: 0, list:[] },
      ],
      orderdetail: {},
      loading: false,
      finished: [false, false, false, false, false],
      refreshing: false,
      tabtitle: ['生产订单', '生产提料', '生产入库', '采购订单', '采购入库']
    });

    // 获取默认数据
    onMounted(()=>{
      // 生产订单数据获取
      getordersc(state.ordering[0], 0)
      // 生产提料数据获取

      // 生产入库数据获取
      getorderscre(state.ordering[2], 2)
      // 采购订单数据获取
      getordercg(state.ordering[3], 3)

      // 采购入库数据获取
      getordercgre(state.ordering[4], 4)

    })
    // 采购订单数据获取
    const getordercg = (ordering, index)=> {

      const page = state.orderall[index].page += 1

      getorderCG(page, state.ordering[index]).then(res => {
        state.orderall[index].list.push(...res.results)
        state.orderall[index].count = res.count
        console.log(res);
      }).catch(err => err)
    }

    // 采购入库数据获取
    const getordercgre = (ordering, index)=> {

      const page = state.orderall[index].page += 1

      getorderCGRE(page, state.ordering[index]).then(res => {
        state.orderall[index].list.push(...res.results)
        state.orderall[index].count = res.count
        console.log(res);
      }).catch(err => err)
    }

    // 生产订单数据获取
    const getordersc = (ordering, index)=> {

      const page = state.orderall[index].page += 1

      getorderSC(page, state.ordering[index]).then(res => {
        state.orderall[index].list.push(...res.results)
        state.orderall[index].count = res.count
        console.log(res);

      }).catch(err => err)
    }

    // 生产提料数据获取

    // 生产入库数据获取
    const getorderscre = (ordering, index)=> {

      const page = state.orderall[index].page += 1

      getorderSCRE(page, state.ordering[index]).then(res => {
        state.orderall[index].list.push(...res.results)
        state.orderall[index].count = res.count
        console.log(res);
      }).catch(err => err)
    }

    const onLoad = (index) => {
      setTimeout(() => {
        const ordering = state.ordering[index]

        // 加载下一页数据
        if (index === 0) {
          getordersc(ordering, active.value)
        }
        if (index === 2) {
          getorderscre(ordering, active.value)
        }
        if (index === 3) {
          getordercg(ordering, active.value)
        }
        if (index === 4) {
          getordercgre(ordering, active.value)
        }
        state.loading = false;
        // 所有页获取完，设置true，没有更多了
        if ( (state.orderall[index].count !== 0) && state.orderall[index].list.length >= state.orderall[index].count) {
          state.finished[index] = true;
        }
      }, 1000);
    };

    const onRefresh = () => {
      // 清空列表数据
      state.finished[active.value] = false;
      state.refreshing = false;
      state.orderall[active.value] =  {count: 0, page: 0, list:[] },

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;

      // 下拉刷新前清空数据
      if (active.value === 0) {
        getordersc(state.ordering[active.value], active.value)
      }
      if (active.value === 2) {
        getorderscre(state.ordering[active.value], active.value)
      }
      if (active.value === 3) {
        getordercg(state.ordering[active.value], active.value)
      }
      if (active.value === 4) {
        getordercgre(state.ordering[active.value], active.value)
      }

      onLoad([active.value]);
    };
    // 排序
    const sorttable = (ordering, index) => {

      // 确定正序和倒序
      state.order_by[index] = !state.order_by[index]
      state.ordering[index] = ordering

      if (state.order_by[index]){

        state.orderall[index] =  {count: 0, page: 0, list:[] }
        // 获取数据
        if (active.value === 0) {
          getordersc(state.ordering[index], active.value)
        }
        if (active.value === 2) {
          getorderscre(state.ordering[index], active.value)
        }
        if (active.value === 3) {
          getordercg(state.ordering[index], active.value)
        }
        if (active.value === 4) {
          getordercgre(state.ordering[index], active.value)
        }
      } else {
        state.ordering[index] = '-'+ordering
        state.orderall[index] =  {count: 0, page: 0, list:[] }

        if (active.value === 0) {
          getordersc(state.ordering[index], active.value)
        }
        if (active.value === 2) {
          getorderscre(state.ordering[index], active.value)
        }
        if (active.value === 3) {
          getordercg(state.ordering[index], active.value)
        }
        if (active.value === 4) {
          getordercgre(state.ordering[index], active.value)
        }

      }
    }
    // 提交订单按钮
    const onSubmit = () => Toast('点击按钮');
    // 选择-全选
    const oncheckall = () =>{
      if(state.checkall[active.value]){
        // 清空数组里数据-ID
        state.checkorder[active.value] = {}
        //将已加载的数据-ID，添加到数组里
        let x
        for (x in state.orderall[active.value].list) {
          const order_id = state.orderall[active.value].list[x].id
          state.checkorder[active.value].[order_id] = true
        }
      }else {
        // 清空数组里数据-ID
        state.checkorder[active.value] = {}
      }
    }
    // 选择-订单单选
    const oncheckorder = (orderid) =>{

      // 检查未选中的删除掉

      if (state.checkorder[active.value]?.[orderid] ===false){
        delete state.checkorder[active.value]?.[orderid]
        state.checkall[active.value] = false
      }

      // 提取state.checkorder[active.value]里的KEY值
      if(Object.keys(state.checkorder[active.value]).length === state.orderall[active.value].list.length){
        state.checkall[active.value] = true
      } else {state.checkall[active.value] = false}
    }

     // 通过计算属性 计算选中产品数量
    const total = computed(()=> {
      let sum = 0;
      const data = Object.keys(state.checkorder[active.value])
      const list = state.orderall[active.value].list
      let x
      for (x in list) {
        data.forEach(item => {
          if (list[x].id === parseInt(item)) {
            sum += parseInt(list[x].quantity)
          }
        })
      }
      return sum;
    })

    // click-left 导航栏左点击，增加订单按钮
    const onClickLeft = ()=>{
      showPopup.value = true;
    }
    // click-right 导航栏右点击，搜索按钮
    const onClickRight = ()=>{
      router.push({path:'/search'})
    }

    // 新建生产订单入口
    const createsc = ()=>{
      router.push({path:'/createordersc'})
    }
    // 新建生产提料单入口
    const createsctl = ()=>{
      console.log("新建生产提料单入口");
    }
    // 新建生产入库单入口
    const createscrk = ()=>{
      router.push({path:'/createorderscrk'})
    }
    // 新建采购订单入口
    const createcg = ()=>{
      router.push({path:'/createordercg'})
    }
    // 新建采购入库单入口
    const createcgrk = ()=>{
      router.push({path:'/createordercgrk'})
    }

    // 跳转详情
    const newdetail = (order)=>{
      console.log(order);
      if (active.value === 0) {
        router.push({path:'/createordersc', query:{order:order}})
      }

      if (active.value === 2) {
        router.push({path:'/createorderscrk', query:{order:order}})
      }

      if (active.value === 3) {
        router.push({path:'/createordercg', query:{order:order}})
      }

      if (active.value === 4) {
        router.push({path:'/createordercgrk', query:{order:order}})
      }

    }

    return {
      showPopup,
      sorttable,
      onSubmit,
      state,
      onLoad,
      onRefresh,
      oncheckall,
      oncheckorder,
      active,
      total,
      onClickLeft,
      onClickRight,

      getordercg,
      getordercgre,
      getordersc,
      getorderscre,

      createsc,
      createsctl,
      createscrk,
      createcg,
      createcgrk,
      // 跳转详情
      newdetail,
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
// 隔行填充
table tbody tr:nth-child(odd){ background : #f9faff;}

.detailorder {
  font-family: "微软雅黑", "仿宋", sans-serif;
  font-weight: bold; //bold：加粗；bloder：深度加粗；lighter：细体；
}
</style>