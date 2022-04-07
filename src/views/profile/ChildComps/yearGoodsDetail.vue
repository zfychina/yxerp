<template>
  <van-sticky>
    <van-nav-bar :title="category + ' 详情'" left-arrow :border='false' fixed  @click-left="onClickLeft">
    </van-nav-bar>
   </van-sticky>

  <van-row justify="center">
    <van-col span="23">
      <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh" success-text="刷新成功" style="min-height: 100vh;">
        <van-list
            v-model:loading="state.loading"
            :finished="state.finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
          <div style="margin-top: 45px"></div>

          <!--                年总-->
          <year-profile-lnterval v-if="year_flag && state.yeardata?.[sku_category[active]]" :data='state.yeardata?.[sku_category[active]]' ></year-profile-lnterval>
          <!--                月总-->
          <year-profile-multiple v-if="year_flag && state.yeardata?.[sku_category[active]]" :data="state.yeardata?.[sku_category[active]]"></year-profile-multiple>

        </van-list>
        <van-divider style="margin-bottom: 60px" :style="{ padding: '0 56px' }">我是有底线的哦！！！</van-divider>
      </van-pull-refresh>
    </van-col>
  </van-row>

</template>

<script>
import {Toast} from "vant";
import {useRoute} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import {getYearcugoodsReport, getYeargoodsReport, getYearsagoodsReport} from "network/statement";
import YearProfileLnterval from "components/chart/yearProfileLnterval";
import YearProfileMultiple from "components/chart/yearProfileMultiple";

export default {
  name: "yearGoodsDetail",
  components: {YearProfileLnterval, YearProfileMultiple},
  setup(){
    const year = ref()
    const category = ref()
    const active = ref()
    const year_flag = ref(false)
    const details = ref(false)
    const detail_show = ref([true, true, true, true, true, true, true, true, true, true, true, true])

    const state = reactive({
          refreshing: false,
          loading: false,
          finished: true,

          yeardata: []
        })

    // 接收数据
    const route =useRoute();
    onMounted(() => {
      year.value = route.query.year
      category.value = route.query.category
      active.value =  route.query.active
      details.value =  route.query.details

      GoodCate()

    });

    // 获取产品数据
    const sku_category = ['锁体', '锁芯', '保护器', '面板', '配件']
    const GoodCate = () => {
      Toast.loading({duration: 20000, forbidClick: true, message: '加载中'})
      if (details.value === 'yearcustomer'){
        getYearcugoodsReport(category.value).then(res=>{
          console.log(res);

          state.yeardata = res[0]
          console.log(state.yeardata);
          year_flag.value = true
          Toast.clear()
          Toast.success('加载完成')

        }).catch(err =>{
          Toast(err)
          console.log(err)})
      }else if (details.value === 'yearsagoods'){
        getYearsagoodsReport(category.value).then(res=>{
          console.log(res);

          state.yeardata = res[0]
          console.log(state.yeardata);
          year_flag.value = true
          Toast.clear()
          Toast.success('加载完成')

        }).catch(err =>{
          Toast(err)
          console.log(err)})
      }
      else if (details.value === 'yearcagoods'){
        getYeargoodsReport(category.value).then(res=>{
          console.log(res);

          state.yeardata = res[0]
          console.log(state.yeardata);
          year_flag.value = true
          Toast.clear()
          Toast.success('加载完成')

        }).catch(err =>{
          Toast(err)
          console.log(err)})
      }
      else {
        getYeargoodsReport(category.value).then(res=>{
          console.log(res);

          state.yeardata = res[0]
          console.log(state.yeardata);
          year_flag.value = true
          Toast.clear()
          Toast.success('加载完成')

        }).catch(err =>{
          Toast(err)
          console.log(err)})
      }
    }

    // 返回按钮和搜索按钮
    const onClickLeft = () => history.back();
    // 下拉刷新
    const onRefresh = () => {
      // 清空列表数据
      state.finished = false;
      state.refreshing = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = false;
      onLoad();
    };

    const onLoad = () => {
      setTimeout(() => {

        state.loading = false;
        // 所有页获取完，设置true，没有更多了
        state.finished = true;
      },1000)
    }

    // VAN分割样式修改
    const themeVars = {
      dividerMargin: '1px',
      dividerTextColor:	'#969799',
      dividerFontSize: '14px',
      dividerLineHeight: '1px',
      dividerBorderColor:	'#ebedf0',
      dividerContentPadding: '16px',
      dividerContentLeftWidth: '10%',
      dividerContentRightWidth:	'10%',

    };

    const onclick_detail_show = (index) =>{
      console.log(detail_show.value[index]);
      detail_show.value[index] = !detail_show.value[index]
      console.log(detail_show.value[index]);
    }
    return{
      onClickLeft,
      state,

      year,
      active,
      category,
      year_flag,
      detail_show,
      sku_category,
      onclick_detail_show,

      onRefresh,

      themeVars,
    }
  }
}
</script>

<style scoped>

</style>