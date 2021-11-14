<template>
  <van-sticky>
    <van-nav-bar title="报表统计" left-arrow fixed @click-left="onClickLeft"  @click-right="onClickRight">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
  </van-sticky>

  <!--滑动切换-->
  <van-tabs title-active-color=var(--color-high-text) color=var(--color-high-text) line-width=20%
            v-model:active="active"
            sticky
            animated
            offset-top=46px >
    <van-tab v-for="(item, index) in state.tabtitle" :title="item" :key="index">
      <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh" style="min-height: 100vh;">

        <div v-for="(item_div, index_div) in state.divider" :key="index_div">

          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">{{ item_div }}</van-divider>
          <el-table sum-text="合计:" highlight-current-row size="small" :data="state.tableData[index_div][index][0]" stripe border show-summary style="width: 100%">
          <el-table-column fixed prop="name" label="分类" width="70" />
          <el-table-column prop="Jan" sortable label="1月" width="65" />
          <el-table-column prop="Feb" sortable label="2月" width="65" />
          <el-table-column prop="Mar" sortable label="3月" width="65" />
          <el-table-column prop="Apr" sortable label="4月" width="65" />
          <el-table-column prop="May" sortable label="5月" width="65" />
          <el-table-column prop="Jun" sortable label="6月" width="65" />
          <el-table-column prop="Jul" sortable label="7月" width="65" />
          <el-table-column prop="Aug" sortable label="8月" width="65" />
          <el-table-column prop="Sep" sortable label="9月" width="65" />
          <el-table-column prop="Oct" sortable label="10月" width="75" />
          <el-table-column prop="Nov" sortable label="11月" width="75" />
          <el-table-column prop="Dec" sortable label="12月" width="75" />
          <el-table-column prop="total" sortable label="合计" width="75" />
        </el-table>

        </div>
        <van-divider>已触底，需要反弹</van-divider>
      </van-pull-refresh>
    </van-tab>
  </van-tabs>
</template>

<script>
import {Toast} from "vant";
import { useRouter } from 'vue-router'
import {onMounted, reactive, ref} from "vue";
import {getReportsku} from "network/statement";

export default {
  name: "Statement",
  setup() {
    const router = useRouter()
    // Tab当前位置
    const active = ref(0);

    const state = reactive({
      tabtitle: ['锁体', '锁芯', '保护器', '面板', '配件'],
      divider: ['订单数据统计', '已完成数据统计', '未完成数据统计'],
      refreshing: false,
      loading: false,
      finished: [false, false, false, false, false],
      tableData: [
        [
          [],
          [],
          [],
          [],
          [],
        ],
        [
          [],
          [],
          [],
          [],
          [],
        ],
        [
          [],
          [],
          [],
          [],
          [],
        ],
      ]
    });


    onMounted(() => {
      getreport()
    });
    // 获取数据
    const getreport = () => {
      Toast.loading({duration: 0, forbidClick: true, message: '加载中'})
      getReportsku(2021).then(res=>{
        Toast.clear()
        Toast.success("加载完成")
        for (const i in state.tabtitle) {
          console.log(i, res[0], res[0]?.[state.tabtitle[i]]);
          state.tableData[0][i].push(res[0]?.[state.tabtitle[i]])
          state.tableData[1][i].push(res[1]?.[state.tabtitle[i]])
          state.tableData[2][i].push(res[2]?.[state.tabtitle[i]])
        }
        console.log(state.tableData);
      }).catch(err =>{console.log(err)})
    }

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


    // 返回上一页
    const onClickLeft = () => {
      router.go(-1)
    }


    return{
      state,
      active,

      onClickLeft,

      onRefresh,

      getreport,

    }
  }
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


</style>