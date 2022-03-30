<template>
  <van-sticky>
    <van-nav-bar title="产能统计" left-arrow :right-text="currentDate" :border='false' fixed @click-left="onClickLeft"  @click-right="onClickright">
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
import {getYearList} from "network/statement";
import {Toast} from "vant";
import {getSTReportsku} from "network/statement";

export default {
  name: "capacityStatement",
  components: {ProfileLine},
  setup(){
    // 异步传值到子组件设定
    const flag = ref(false)

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
        currentDate.value = value;
        showPicker.value = false;
      }
    };

  const state = reactive({
    // 产品分类切换
    tabtitle: ['锁体', "锁芯", '保护器', '面板', '配件'],
    refreshing: false,
    loading: false,
    finished: [true, true, true, true, true],


    data:[],
  })
    onMounted(() => {
      currentDate.value = Date().split(' ')[3]
      getyearlist()
      getreport(currentDate.value)

    });

    // 获取数据
    const getreport = (year) => {
      // Toast.loading({duration: 20000, forbidClick: true, message: '加载中'})
      getSTReportsku(year).then(res=>{
        state.data = res[0]
        flag.value = true

        console.log('res',state.data);
        // Toast.clear()
        // Toast.success("加载完成")
      }).catch(err =>{
        Toast(err)
        console.log(err)})
    }


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


    }
  }
}

</script>
<style>

</style>