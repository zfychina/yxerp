<template>
  <van-sticky>
  <van-row  @click="setting" justify="center " class="touxiang" style="vertical-align: bottom;line-height: 4;background-color: white;" align="bottom">
    <van-col span="6" style="vertical-align: bottom; line-height: 2 ;margin-top: 20px;">
<!--      头像-->
      <van-image
          round
          fit="cover"
          width="70px"
          height="70px"
          :src="state.avatar_img"
      />
    </van-col>
    <van-col span="15" style="text-align: left;vertical-align: bottom;">
      <p style="font-weight: bold;line-height: 2.5; color: var(--color-text); font-size: 20px">{{state.username}}</p>
      <p style="line-height: 1;margin-bottom: 10px;font-size: 14px">手机：{{state.mobile}}</p>
    </van-col>
    <van-col span="2">
      <van-icon name="arrow" size=25px color="var(--color-border)"/>
    </van-col>
  </van-row>
  </van-sticky>
  <!--  系统设置-->
  <div ref="container">
    <van-sticky :container="container" :offset-top="90">
      <van-row justify="center" @click="state.systemshow=!state.systemshow">
        <van-col span="23">
          <div class="textcss">系统设置</div>
        </van-col>
      </van-row>
    </van-sticky>
  </div>
  <van-row justify="center" v-show="state.systemshow">
    <van-col span="23" class="cellborder">
      <unit-convert  v-for="(data, index) in state.systemdata" :data="data" :key="index" :serial="index" :serials="state.systemdata.length" @click="convert"></unit-convert>
    </van-col>
  </van-row>


  <!--  报表-->
  <div ref="container">
    <van-sticky :container="container" :offset-top="90">
      <van-row justify="center" @click="state.reportshow=!state.reportshow">
        <van-col span="23">
          <div class="textcss">报表</div>
        </van-col>
      </van-row>
    </van-sticky>
  </div>

  <van-row justify="center" v-show="state.reportshow">
    <van-col span="23" class="cellborder">
      <table-report  v-for="(data, index) in state.reportdata" :data="data" :key="index" :serial="index" :serials="state.reportdata.length"></table-report>
    </van-col>
  </van-row>



<!--  数据导入-->
  <div ref="container">
    <van-sticky :container="container" :offset-top="140">
      <van-row justify="center" @click="state.importshow=!state.importshow">
        <van-col span="23">
          <div class="textcss">数据导入</div>
        </van-col>
      </van-row>
    </van-sticky>
  </div>
  <!--  数据导入-->
  <van-row justify="center" v-show="state.importshow">
    <van-col span="23" class="cellborder">
      <table-goods  v-for="(data, index) in state.importdata" :data="data" :key="index" :serial="index" :serials="state.importdata.length"></table-goods>
    </van-col>
  </van-row>





  <van-divider style="margin-bottom: 60px" :style="{ padding: '0 56px' }">我是有底线的哦！！！</van-divider>
</template>

<script>

import {onMounted, reactive} from "vue";
import { getuserinfo } from 'network/user'
import {useRouter} from "vue-router";
import TableGoods from "./ChildComps/TableGoods";
import TableReport from "./ChildComps/TableReport";
import UnitConvert from "./ChildComps/UnitConvert";


export default {
  name: "Profile",
  components: {UnitConvert, TableGoods, TableReport },
  setup(){
    const router = useRouter()

    const state = reactive({
      // 个人设置
      user_id: sessionStorage.user_id || localStorage.user_id,
      username: '',
      mobile: '',
      avatar_img: '',

      // 导入数据
      importshow:true,
      importdata: [
        {name:'缺料表更新', explain:'加载项缺料表导出保存为.xls文件', url:'upShortmold'},
        {name:'物料编码批量导入', explain:'含物料编号、物料名称、单位.xls文件，从第二行开始', url:'upSkuimport'},
        {name:'供应商名录导入', explain:'含供应商编号、名称、名称缩写.xls文件，从第二行开始', url:'upSupplierdir'},
        {name:'销售订单导入', explain:'加载项订单完成情况保存为.xls文件', url:'uporderimport'},
        {name:'物料供应商更新', explain:'含物料编号、物料名称、供应商名称缩写.xls文件，从第二行开始', url:'upSupplier'},
        {name:'客户名称导入', explain:'含物料编号、物料名称、单位.xls文件，从第二行开始', url:'upCustomer'},
        {name:'BOM表导入', explain:'系统BOM导出保存为.xls文件', url:'upBOM'},
        {name:'存货往来导入', explain:'先导入库成品查询文件，再导入存货往来文件', url:'recordsimport'},
        {name:'物料类型分类', explain:'将物料分类，及装箱数更新', url:'upcategoryimport'},
      ],

      // 报表
      reportshow: true,
      reportdata: [
        {name:'产能统计', explain:'生产未完成产品及所需的工时统计', url:'/processstatement'},
        {name:'产量统计', explain:'生产年度完成每月产品数据(成品入库日期)', url:'/capacityStatement'},
        {name:'销售统计', explain:'销售年度完成每月产品数据（合同交货日期）', url:'/SalesStatement'},
        {name:'客户统计', explain:'客户年度订购每月产品数据（合同签订日期）', url:'/customerStatement'},

        {name:'产量年度对比报表', explain:'往年产品产量对比（成品入库日期）', url:'/yearcastatement'},
        {name:'产品年度对比报表', explain:'往年产品销售对比（合同交货日期）', url:'/yearsastatement'},
        {name:'客户年度对比报表', explain:'往年产品客户订购对比（合同签订日期）', url:'/yearcuStatement'}
      ],

      // 系统设置
      systemshow: true,
      update: false,
      systemdata: [
        {name:'产品数量更新-常更新 ！！！', explain:'对新增订单数量转换为报表数量', url:'unit_convert'},

      ],
    })

    // 登录后获取user信息
    onMounted(()=>{

      getuserinfo().then(res=>{
        console.log(res);
        state.user_id = res.id
        state.username = res.username
        state.mobile = res.mobile
        state.avatar_img = res.avatar_img
      })
    })

    // 个人设置
    const setting = ()=>{
      console.log('个人设置');
      router.push({path:'/setting'})
    }


    return{
      state,
      setting,

    }
  }
}
</script>

<style scoped lang="scss">

.cellborder {
  border: 1px solid;
  border-color: var(--color-border);
}

.textcss {
  font-size: 16px;
  text-align: left;
  line-height: 50px;
  /*margin-top: 0;*/
  /*margin-bottom: 0;*/
  /*margin-right: 0;*/
  /*margin-left: 0;*/
  font-weight: bold; /*bold：加粗；bloder：深度加粗；lighter：细体；*/
  /*border: 1px solid;*/
  background-color: white;
}

</style>