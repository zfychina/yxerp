<template>
  <van-sticky>
    <van-nav-bar :title="category + ' 详情'" left-arrow :border='false' fixed  :right-text="year" @click-left="onClickLeft"   @click-right="onClickright">
    </van-nav-bar>
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
      />
    </van-popup>
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
    <!--    折线图 -->
          <profile-line v-if="line_show" :data="state.data" :active='active'></profile-line>


          <div v-for="(item, index) in state.data" :key="index">
            <div>
              <div style="color: white;line-height: 2;text-align: left; background-image: linear-gradient(#043eb8, #399efd);border-radius: 5px;margin-top: 5px;margin-bottom: 5px;">
                <van-row >
                  <van-col span="4" style="text-align: center;font-size:14px">{{year}}</van-col>
                  <van-col span="10" style="text-align: left;font-weight: bold;">{{item.month}}</van-col>
                  <van-col span="10" style="text-align: left"><span style="font-size: 12px;">Q：</span>{{item.quantity}}</van-col>
                </van-row>
              </div>

              <div class="orderitem"  v-if="item.quantity > 0">
                <div v-for="(itemsku, indexsku) in item.sku" :key="indexsku">

                  <van-row justify="center" style="margin-top: 15px">
                    <van-col span="7" style="text-align: left;font-size: 10px;color: var(--color-border)">
                      {{itemsku.order.order ? itemsku.order.order : itemsku.order.orderhao}}
                    </van-col>
                    <van-col span="7" style="text-align: center;font-size: 10px;color: var(--color-border)">
                      <span v-if="details==='sales'">
                        {{itemsku.order.delivery.slice(0,10)}}
                      </span>
                      <span v-else>
                        {{itemsku.order.order_date.slice(0,10)}}
                      </span>
                    </van-col>
                    <van-col span="7"  style="text-align: right;font-size: 10px;color: var(--color-border)">
                      {{itemsku.order.user}}
                    </van-col>
                  </van-row>

                  <van-row justify="center">
                    <van-col span="16" style="line-height:2;text-align: left">
                      {{itemsku.sku.sku ? itemsku.sku.sku.coding : itemsku.sku.coding}}
                    </van-col>
                    <van-col span="5" style="line-height:2;text-align: right;font-weight: bold">
                      {{parseInt(itemsku.report_quantityed)}}
                    </van-col>
                  </van-row>

                  <van-row  justify="center">
                    <van-col span="21" style="font-size:12px;color: var(--color-red)">
                      {{itemsku.sku.sku ? itemsku.sku.sku.name : itemsku.sku.name}}
                    </van-col>
                  </van-row>

                  <van-row  justify="center">
                    <van-col span="10" style="font-size:10px;color: #a8a7a7">
                      {{ itemsku.sku.order ? itemsku.sku.order.order : ''}}
                    </van-col>
                    <van-col span="1"></van-col>
                    <van-col span="10" style="text-align:right;font-size:10px;color: #a8a7a7">
                      {{itemsku.sku.xs_order ? itemsku.sku.xs_order : itemsku.order.customer}}
                    </van-col>
                  </van-row>

                  <!--分割线-->
                  <van-config-provider :theme-vars="themeVars">
                    <van-divider v-show="indexsku + 1 < item.sku.length" :style="{ color: 'var(--color-border)', borderColor: 'var(--color-border)', padding: '0 16px' }"/>
                  </van-config-provider>
                </div>
              </div>

            </div>
          </div>

        </van-list>
        <van-divider style="margin-bottom: 60px" :style="{ padding: '0 56px' }">我是有底线的哦！！！</van-divider>
      </van-pull-refresh>
    </van-col>
  </van-row>

</template>

<script>
import { onMounted, reactive, ref } from "vue";
import {useRoute} from "vue-router";
import {getGoodCateReport, getXSGoodCateReport, getYearList} from "network/statement";
import {Toast} from "vant";
import ProfileLine from "components/chart/ProfileLine";

export default {
  name: "CategoryGoodsDetail",
  components: { ProfileLine,},
  setup(){
    const year = ref()
    const category = ref()
    const active = ref()
    const showPicker = ref()
    const columns = ref()
    const line_show = ref(false)
    const details = ref(false)

    const state = reactive({
      refreshing: false,
      loading: false,
      finished: true,

      data: []
    })

    // 获取年份列表
    const getyearlist = () => {
      getYearList().then(res=>{
        columns.value = res
      }).catch(err=>{console.log(err);})
    }

    // 接收数据
    const route =useRoute();
    onMounted(() => {
      getyearlist()
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
      if (details.value === 'sales'){
        getXSGoodCateReport(year.value, category.value).then(res=>{
          console.log(res);

          state.data = res[0]?.[sku_category[active.value]]
          console.log(state.data);
          line_show.value = true
          Toast.clear()
          Toast.success('加载完成')

        }).catch(err =>{
          Toast(err)
          console.log(err)})
      }else {
        getGoodCateReport(year.value, category.value).then(res=>{
          console.log(res);

          state.data = res[0]?.[sku_category[active.value]]
          console.log(state.data);
          line_show.value = true
          Toast.clear()
          Toast.success('加载完成')

        }).catch(err =>{
          Toast(err)
          console.log(err)})
      }
    }

    // 返回按钮和搜索按钮
    const onClickLeft = () => history.back();
    const onClickright = () => {
      showPicker.value = true
    }
    const onConfirm = (value) => {
      if(value === year.value){
        showPicker.value = false;
      } else {
        console.log('获取数据', value);
        year.value = value
        GoodCate()
        showPicker.value = false;

      }
    };

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
    return{
      showPicker,
      columns,
      onConfirm,
      onClickright,
      onClickLeft,
      state,

      year,
      category,
      line_show,

      onRefresh,

      themeVars,

    }
  }
}
</script>

<style scoped>
.orderitem {
  font-size: 14px;
  color: #666;
  text-align: left;

  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 0px;
  margin-left: 0px;

  font-weight: bloder; /*bold：加粗；bloder：深度加粗；lighter：细体；*/
  border: 1px solid;
  border-color: var(--color-border);
}


</style>