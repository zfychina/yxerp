<template>
  <van-sticky>
    <van-nav-bar title="产量统计" left-arrow :right-text="currentDate" :border='false' fixed @click-left="onClickLeft"  @click-right="onClickright">
    </van-nav-bar>
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
      />
    </van-popup>
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

                  <div style="margin-top: 45px"></div>
      <!--            // 折线图-->

                  <profile-line v-if="flag" :data="state.data?.[state.tabtitle[active]]" :active='active'></profile-line>

                <van-row justify="center">
                  <van-col span="23">
                    <div class="textcss">产量与销售订单量对比详情</div>
                  </van-col>
                </van-row>
                <profile-multiple v-if="sa_flag && state.sa_data"
                                  :data="state.sa_data?.[state.tabtitle[active]][0]"
                                  :active='active'
                                  :year="currentDate"></profile-multiple>
<!--                产品分类详情-->
                  <category-goods v-if="flag_category" :data="sortBykey(state.categorydata?.[state.tabtitle[active]], 'quantity')" :active='active' :year="currentDate"></category-goods>

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
import ProfileLine from "components/chart/ProfileLine";
import {onMounted, reactive, ref} from "vue";
import {Toast} from "vant";
import {getYearList, getSTReportsku, getCateReportsku, getPRcontrastReportsku} from "network/statement";
import CategoryGoods from "./CategoryGoods";
import ProfileMultiple from "components/chart/ProfileMultiple";

export default {
  name: "capacityStatement",
  components: {CategoryGoods, ProfileLine, ProfileMultiple},
  setup(){
    // 异步传值到子组件设定
    const flag = ref(false)
    const sa_flag = ref(false)
    const flag_category = ref(false)

    const currentDate = ref();
    // 年份选择
    const showPicker = ref(false);
    const columns= ref([])
    // 获取年份列表
    const getyearlist = () => {
      getYearList().then(res=>{
       columns.value = res
      }).catch(err=>{console.log(err);})
    }
    const onConfirm = (value) => {
      if(value === currentDate.value){
        showPicker.value = false;
      } else {
        console.log('获取数据', value);
        getreport(value)
        getsareport(currentDate.value)
        getreport_cat(value)
        currentDate.value = value;
        showPicker.value = false;
        Toast.success('加载完成')
      }
    };

  const state = reactive({
    // 产品分类切换
    tabtitle: ['锁体', "锁芯", '保护器', '面板', '配件'],
    refreshing: false,
    loading: false,
    finished: [true, true, true, true, true],


    data:[],
    categorydata:[],
    sa_data: [],
  })
    onMounted(() => {
      currentDate.value = Date().split(' ')[3]
      getyearlist()
      getreport(currentDate.value)
      getsareport(currentDate.value)
      getreport_cat(currentDate.value)

    });

    // 获取数据
    const getreport = (year) => {
      // Toast.loading({duration: 20000, forbidClick: true, message: '加载中'})
      getSTReportsku(year).then(res=>{
        state.data = res[0]
        flag.value = true

      }).catch(err =>{
        Toast(err)
        console.log(err)})
    }
    const getsareport = (year) => {
      console.log(year);
      // Toast.loading({duration: 20000, forbidClick: true, message: '加载中'})
      getPRcontrastReportsku(year).then(res=>{
        console.log(res);
        state.sa_data = res[0]
        sa_flag.value = true
      }).catch(err =>{
        Toast(err)
        console.log(err)})
    }
    const getreport_cat = (year) => {
      getCateReportsku(year).then(res=>{
        state.categorydata = res[0]
        flag_category.value = true

      }).catch(err =>{
        Toast(err)
        console.log(err)})
    }

    // 据数组中对象为数字情况进行排序
    const sortBykey = (ary, key) => {
      return ary.sort(function (a, b) {
        let x = a[key]
        let y = b[key]
        return ((x > y) ? -1 : (x < y) ? 1 : 0)
      })
    }
    // // 根据数组中对象为字母情况进行排序
    // sortList(lists){                // lists传的是数组
    //   return lists.sort((a, b) => {
    //     return a['grapheme'].localeCompare(b['grapheme'])     // grapheme为字母对应的属性名
    //   })
    // }

    // 返回按钮和搜索按钮
    const onClickLeft = () => history.back();
    const onClickright = () => {
      showPicker.value = true
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

    // Tab当前位置
    const active = ref(0);
    // 下拉刷新
    const onRefresh = () => {
      // 清空列表数据
      state.finished[active.value] = false;
      state.refreshing = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      onLoad([active.value]);
    };

    const onLoad = (index) => {
      setTimeout(() => {

        state.loading = false;
        // 所有页获取完，设置true，没有更多了
        state.finished[index] = true;
      },1000)
    }


    return{
      // 异步传值到子组件设定
      flag,
      flag_category,
      sa_flag,

      state,
      themeVars,

      onClickLeft,
      onClickright,

      // 年份选择
      currentDate,
      columns,
      onConfirm,
      showPicker,

      // 产品分类切换
      active,
      onRefresh,


      // 排序
      sortBykey,


    }
  }
}

</script>
<style>
.textcss {
  font-size: 14px;
  text-align: left;
  line-height: 50px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 0px;
  margin-left: 0px;
  font-weight: bold; /*bold：加粗；bloder：深度加粗；lighter：细体；*/
  /*border: 1px solid;*/
  background-color: white;
}
</style>