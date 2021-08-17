<template>
  <van-sticky>
  <van-nav-bar title="销售订单" left-arrow fixed >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  </van-sticky>
<!--滑动切换-->
  <van-tabs title-active-color=var(--color-high-text) color=var(--color-high-text) line-width=25% v-model:active="active" sticky swipeable offset-top="46" >
    <van-tab v-for="(item, index) in state.tabtitle" :title="item" :key="index">

      <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
        <van-list
            v-model:loading="state.loading"
            :finished="state.finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
          <van-cell v-for="item in state.list" :key="item" :title="item" />
        </van-list>
      </van-pull-refresh>

    </van-tab>
  </van-tabs>


<!--提交订单部分-->
  <van-submit-bar button-color=var(--color-high-text)
                  :price="305000" button-text="提交订单" decimal-length=1 @submit="onSubmit">
    <van-checkbox v-model="checked">全选</van-checkbox>
  </van-submit-bar>

</template>

<script>
import {ref, reactive} from 'vue';
import {Toast} from "vant";

export default {
  name: "Order",
  setup() {
    const activeName = ref('a');

    // list组件
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      tabtitle: ['未完成订单', '物料待生成', '生产中订单', '全部订单']
    });

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


    // 切换内容按钮
    const onClickTab = ({ title }) => Toast(title);

    // 提交订单按钮
    const onSubmit = () => Toast('点击按钮');
    return {
      activeName,
      onClickTab,
      onSubmit,
      state,
      onLoad,
      onRefresh,
    };
  },

}
</script>

<style scoped>
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


</style>