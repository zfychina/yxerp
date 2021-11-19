<template>
  <van-sticky>
    <van-nav-bar title="产品年度对比报表" left-arrow right-text="年份选择" fixed @click-left="onClickLeft"  @click-right="onClickright">
    </van-nav-bar>
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker
            :columns="state.columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
        />
      </van-popup>


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
          <el-table-column prop="2020" sortable label="2020" width="65" />
          <el-table-column prop="2021" sortable label="2021" width="65" />
          <el-table-column prop="2022" sortable label="2022" width="65" />
          <el-table-column prop="2023" sortable label="2023" width="65" />
          <el-table-column prop="2024" sortable label="2024" width="65" />
          <el-table-column prop="2025" sortable label="2025" width="65" />
          <el-table-column prop="2026" sortable label="2026" width="65" />
          <el-table-column prop="2027" sortable label="2027" width="65" />
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
import {getYearList} from "../../../network/statement";

export default {
  name: "yearStatement",
  setup() {
    const router = useRouter()
    // Tab当前位置
    const active = ref(0);
    // 年份
    const currentDate = ref();

    const state = reactive({
      tabtitle: ['锁体', '锁芯', '保护器', '面板', '配件'],
      divider: ['产品年度对比'],
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
      ],
      columns: []
    });

    onMounted(() => {
      currentDate.value = Date().split(' ')[3]
      getyearlist()
      getreport(currentDate.value)

    });
    // 获取年份列表
    const getyearlist = () => {
      getYearList().then(res=>{
        state.columns = res
      }).catch(err=>{console.log(err);})
    }
    // 获取数据
    const getreport = (year) => {
      Toast.loading({duration: 20000, forbidClick: true, message: '加载中'})
      getReportsku(year, 'yeargood').then(res=>{
        Toast.clear()
        Toast.success("加载完成")
        console.log(res);
        state.tableData = [
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
        for (let i in state.tabtitle) {
          state.tableData[0][i].push(res[0]?.[state.tabtitle[i]])
          state.tableData[1][i].push(res[1]?.[state.tabtitle[i]])
          state.tableData[2][i].push(res[2]?.[state.tabtitle[i]])
        }
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

    // 年份选择
    const showPicker = ref(false);
    const onConfirm = (value) => {
      if(value === currentDate.value){
        showPicker.value = false;
      } else {
      getreport(value)
      currentDate.value = value;
      showPicker.value = false;
      }
    };
    const onClickright = () => {
      showPicker.value = true
    }



    return{
      state,
      active,
      currentDate,

      onConfirm,
      showPicker,

      onClickLeft,
      onClickright,

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