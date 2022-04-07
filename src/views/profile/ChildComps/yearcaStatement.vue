<template>
  <van-sticky>
    <van-nav-bar title="产量统计" left-arrow :border='false' fixed @click-left="onClickLeft">
    </van-nav-bar>
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
<!--                年总-->
                <year-profile-lnterval v-if="year_flag && state.yeardata?.[state.tabtitle[active]]" :data='state.yeardata?.[state.tabtitle[active]]' ></year-profile-lnterval>
<!--                月总-->
                <year-profile-multiple v-if="year_flag && state.yeardata?.[state.tabtitle[active]]" :data="state.yeardata?.[state.tabtitle[active]]"></year-profile-multiple>
<!--                详情-->
                <category-goods  v-if="category_flag && state.categorydata?.[state.tabtitle[active]]" :data="sortBykey(state.categorydata?.[state.tabtitle[active]], 'quantity')"  :active='active' details= 'yearcagoods'></category-goods>
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
import YearProfileLnterval from "components/chart/yearProfileLnterval";
import YearProfileMultiple from "components/chart/yearProfileMultiple";
import {getYeargoodsReport} from "network/statement";
import {Toast} from "vant";
import CategoryGoods from "./CategoryGoods";

export default {
  name: "yearcaStatement",
  components: {CategoryGoods, YearProfileLnterval, YearProfileMultiple},
  setup(){
    const year_flag = ref(false)
    const category_flag = ref(false)

    const state = reactive({
      // 产品分类切换
      tabtitle: ['锁体', "锁芯", '保护器', '面板', '配件'],
      refreshing: false,
      loading: false,
      finished: [true, true, true, true, true],


      yeardata:[],
      categorydata:[],

    })

    onMounted(() => {
      getyeardata()
      getcategorydata()
    });

    const getyeardata=() =>{
      getYeargoodsReport('year').then(res=>{
        console.log(res);
        state.yeardata = res[0]

        year_flag.value = true

      }).catch(err =>{
        Toast(err)
        console.log(err)
        })
    }

    const getcategorydata=() =>{
      getYeargoodsReport('category').then(res=>{
        console.log(res);
        state.categorydata = res[0]

        category_flag.value = true
      }).catch(err =>{
        Toast(err)
        console.log(err)
      })
    }

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

    // VAN组件CSS样式
    const themeVars = {
      gridItemContentBackgroundColor: "#ffffff",
      gridItemContentPadding: "8px 1px",
      gridItemIconSize: "25px",
      gridItemTextColor: "#666",
      gridItemTextFontSize: "10px",
      noticeBarHeight: "50px"
    };

    // 据数组中对象为数字情况进行排序
    const sortBykey = (ary, key) => {
      return ary.sort(function (a, b) {
        let x = a[key]
        let y = b[key]
        return ((x > y) ? -1 : (x < y) ? 1 : 0)
      })
    }

    // 返回按钮和搜索按钮
    const onClickLeft = () => history.back();
    return{
      onClickLeft,
      themeVars,

      state,
      active,
      year_flag,
      category_flag,

      onRefresh,

      sortBykey,
    }
  }
}
</script>

<style scoped>

</style>