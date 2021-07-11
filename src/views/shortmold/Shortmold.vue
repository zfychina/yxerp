<template>
<!--  <van-nav-bar title="缺料表" left-arrow>-->
<!--    <template #right>-->
<!--      <van-icon name="search" size="18" />-->
<!--    </template>-->
<!--  </van-nav-bar>-->
  <van-sticky>
  <van-dropdown-menu active-color="#1989fa">
    <van-dropdown-item v-model="state.value1" :options="option1" />
  </van-dropdown-menu>
<!--表头-->
    <table style="width: 100%">
      <thead>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%" @click="sorttable">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      </thead>
    </table>

  </van-sticky>

  <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
    <van-list
        v-model:loading="state.loading"
        :finished="state.finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
<!--      <van-cell v-for="item in state.list" :key="item" :title="item">-->
    <table style="width: 100%">
      <tbody>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      <tr>
        <th style="width: 20%">物料编号</th>
        <th style="width: 30%">物料名称</th>
        <th style="width: 15%">需求量</th>
        <th style="width: 15%">缺料数</th>
        <th style="width: 20%">供应商</th>
      </tr>
      </tbody>
    </table>

    </van-list>
  </van-pull-refresh>

</template>

<script>
import { reactive } from 'vue';

export default {

  name: "Shortmold",
  setup() {

    const state = reactive({
      // 导航栏
      value1: 0,
      // 列表
      list: [],
      loading: false,
      finished: false,
      refreshing: false,

      month: {page:0, list: []},
      amig: {page:0, list: []},
      apecs: {page:0, list: []},

    });
    const option1 = [
      { text: '本月缺料', value: 0 },
      { text: 'AMIG缺料', value: 1 },
      { text: 'APECS缺料', value: 2 },
    ];

    // 列表
    const onLoad = () => {
      setTimeout(() => {
        if (state.refreshing) {
          state.list = [];
          state.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          state.list.push(state.list.length + 1);
        }
        state.loading = false;

        if (state.list.length >= 40) {
          state.finished = true;
        }
      }, 1000);
    };

    const onRefresh = () => {
      // 清空列表数据
      state.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      onLoad();
    };
    // 排序
    const sorttable = () => {
      console.log("llsjldfjlas")
    }


    return {
      // 导航栏
      state,
      option1,

      // 列表
      onLoad,
      onRefresh,
      sorttable,

    };

  },
}
</script>

<style scoped lang="scss">
table {
  border-collapse: collapse;
  thead {
    background-color: #ffffff;
    tr {
      height: 40px;
      th{
        text-align: left;
        padding: 10px ;
        font-size: 12PX;
        color: var(--color-high-text);
        font-weight: 800;
      }
    }
  }

  tbody {
    tr {
      th {
        text-align: left;
        padding: 10px ;
        font-size: 10PX;
        color: var(--color-text);
        font-weight: 400;

        border-bottom: 1pt solid #efecec;
      }
    }
}
}


</style>