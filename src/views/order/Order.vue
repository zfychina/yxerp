<template>
  <van-sticky>
  <van-nav-bar title="销售订单" left-text="+新增" fixed @click-left="onClickLeft"  @click-right="onClickRight">
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

       <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">

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
            offset="300"
        >

          <table style="width: 100%">
            <tbody>
            <tr v-for="(item,index1) in state.orderall[index].list" :key="index1" style="margin-left: 3px">
              <th style="width: 8%"><van-checkbox @click="oncheckorder(item.orderhao)" v-model="state.checkorder[index].[item.orderhao]" icon-size="15px"></van-checkbox></th>
              <th style="width: 20%" @click="Extensionline(item.orderhao, index)">{{item.order_date?.split(" ")[0]}}</th>
              <th style="width: 20%" @click="Extensionline(item.orderhao, index)">{{item.delivery?.split(" ")[0]}}</th>
              <th style="width: 20%" @click="Extensionline(item.orderhao, index)">{{ item.customer }}</th>
              <th style="width: 30%" @click="Extensionline(item.orderhao, index)"><b>{{ item.orderhao }}</b></th>
              <br>
              <div class="detailorder" v-show="state.isshow[index]?.[item.orderhao]" v-for=" (orderitem, index2) in state.orderdetail?.[item.orderhao]" :key="index2" style="margin-left: 2px">
              <th style="width: 5%"><van-checkbox @click="oncheckgood(item.orderhao, orderitem.id)" v-model="state.checkdetail[index].[item.orderhao + '&' + orderitem.id]" icon-size="13px"></van-checkbox></th>
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
                  :price="total*100" currency="" button-text="提交订单" decimal-length=1 @submit="onSubmit">
    <van-checkbox v-model="state.checkall[active]" @click="oncheckall">全选</van-checkbox>

  </van-submit-bar>

</template>

<script>
import {ref, reactive, onMounted, computed} from 'vue';
import {Toast, Dialog} from "vant";
import {getOrderinfo, getOrderdetail} from "network/order";
import {useRouter} from "vue-router";

export default {
  name: "Order",
  setup() {
    const router = useRouter()
    // Tab当前位置
    const active = ref(0);


    // list组件
    const state = reactive({
      // 控制第一次全选，提示是否展开所有订单内的商品信息
      orderdialog: [true, true, true, true],
      // 是否全选
      checkall:[false, false, false, false,],
      checkorder: [{}, {}, {}, {}],
      checkdetail: [{}, {}, {}, {}],

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
        console.log(state.orderall[index].list);
      }).catch(err => err)
    }

    const onLoad = (index) => {
      setTimeout(() => {
        const orderstaus = state.orderstaus[index]
        const ordering = state.ordering[index]

        // 加载下一页数据
        getdate(orderstaus, ordering, index)
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

      // 是否展开所有订单 复位
      state.orderdialog[active.value] = true

      // 下拉刷新前清空数据
      // getdate(state.orderstaus[active.value], state.ordering[active.value], [active.value])
      onLoad([active.value]);
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
      if (state.isshow[index]?.[orderhao]){
        delete state.isshow[index]?.[orderhao]
      } else (state.isshow[index].[orderhao] = true)
      // console.log(state.isshow);
      // 获取订单详情信息
      getOrderdetail(orderhao).then(res=>{
        state.orderdetail.[orderhao] = res.results
      }).catch(err =>{console.log(err)})
    }
    // 选择-全选
    const oncheckall = () =>{

      if (state.orderdialog[active.value] && state.checkall[active.value] && (Object.keys(state.isshow[active.value]).length !== state.orderall[active.value].list.length)){

      Dialog.confirm({
        // title: `是否展开所有订单内的产品？`,
        message: `是否展开所有订单内的产品？`,
        // theme: 'round-button',
      })
          .then(() => {
            state.orderdialog[active.value] = false
           const orderobj = Object.keys(state.checkorder[active.value]);
            Toast.loading({message:'订单展开中...', forbidClick:true, duration: 4000});
            orderobj.forEach(item=>Extensionline(item,active.value))
            // on confirm
          })
          .catch(() => {
            state.orderdialog[active.value] = false
            // on cancel
          });

      }
      if(state.checkall[active.value]){
        // 清空数组里数据-订单号
        state.checkorder[active.value] = {}
        state.checkdetail[active.value] = {}
        //将已加载的数据-订单号，添加到数组里
        let x
        for (x in state.orderall[active.value].list) {
          const order_hao = state.orderall[active.value].list[x].orderhao
          state.checkorder[active.value].[order_hao] = true

          // 如果这个订单没有获取订单详情 则跳过
          const orderdetail = state.orderdetail[order_hao]
          if(orderdetail){
            let y
            for( y in orderdetail){
              const orderhao_detail = order_hao + '&' + orderdetail[y].id
              state.checkdetail[active.value].[orderhao_detail] = true
          }}
        }
      }else {
        // 清空数组里数据-订单号
        state.checkorder[active.value] = {}
        state.checkdetail[active.value] = {}
      }
    }
    // 选择-订单全选
    const oncheckorder = (orderhao) =>{

      // 检查未选中的删除掉
      if (state.checkorder[active.value]?.[orderhao] ===false){
        delete state.checkorder[active.value]?.[orderhao]
        state.checkall[active.value] = false

        // 删除订单详情里选中的
        if (state.isshow[active.value]?.[orderhao]){

        const orderdetail = state.orderdetail[orderhao]
        if(orderdetail){
          let y
          for( y in orderdetail){
            const orderhao_detail = orderhao + '&' + orderdetail[y].id
            state.checkdetail[active.value].[orderhao_detail] = false
            delete state.checkdetail[active.value]?.[orderhao_detail]
          }}}

      }

      // 检查选中的，是否展开订单详情，
      if (state.checkorder[active.value]?.[orderhao]){
        if (state.isshow[active.value]?.[orderhao]){

          const orderdetail = state.orderdetail[orderhao]
          if(orderdetail){
            let y
            for( y in orderdetail){
              const orderhao_detail = orderhao + '&' + orderdetail[y].id
              state.checkdetail[active.value].[orderhao_detail] = true
            }}
      }}


      if(Object.keys(state.checkorder[active.value]).length === state.orderall[active.value].list.length){
        state.checkall[active.value] = true
      } else {state.checkall[active.value] = false}

    }
    // 选择-商品选择
    const oncheckgood = (orderhao, orderdetail) =>{
      // 不勾选的商品，为false，需要删除
      const orderhao_detail = orderhao + '&' + orderdetail
      if (state.checkdetail[active.value]?.[orderhao_detail] ===false){
        delete state.checkdetail[active.value]?.[orderhao_detail]
        state.checkall[active.value] = false
      }

      if(Object.keys(state.checkdetail[active.value]).length === Object.keys(state.orderdetail?.[orderhao]).length){
        state.checkorder[active.value].[orderhao] = true
      } else {state.checkorder[active.value].[orderhao] = false}

    }
    // 通过计算属性 计算选中产品数量
    const total = computed(()=> {
      let sum = 0;
      const data = Object.keys(state.checkdetail[active.value])
      let x
      for (x in data){
        const totalorder = data[x].split('&')[0]
        const totalgoodid = data[x].split('&')[1]
        state.orderdetail?.[totalorder].forEach(item=>{
          if (item.id ===  parseInt(totalgoodid)){
            sum +=  parseInt(item.quantity)
          }
        })
      }
      return sum;
    })

    // click-left 导航栏左点击，增加订单按钮
    const onClickLeft = ()=>{
      router.push({path:'/createorder'})
    }
    // click-right 导航栏右点击，搜索按钮
    const onClickRight = ()=>{
      router.push({path:'/search'})
    }
    return {
      sorttable,
      onSubmit,
      state,
      onLoad,
      onRefresh,
      getdate,
      Extensionline,
      oncheckall,
      oncheckorder,
      oncheckgood,
      active,
      total,
      onClickLeft,
      onClickRight,
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