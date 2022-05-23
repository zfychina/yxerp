<template>
  <van-row>
    <van-col span="24">
        <van-search background="#1989fa" v-model="searchvalue" placeholder="注：加#号为精确查询(显示前50条)" shape="round" clearable/>
    </van-col>
  </van-row>

<!--// 单选选框-->
  <div name="checked">
    <van-radio-group style="line-height: 35px" v-model="checked" direction="horizontal">

      <div class="check_css">
        <van-radio name='xsorder' shape="square"><div style="line-height: 30px">销售订单</div></van-radio>
        <van-radio name='scorder' shape="square"><div style="line-height: 30px">生产订单</div></van-radio>
        <van-radio name='cgorder' shape="square"><div style="line-height: 30px">采购订单</div></van-radio>
      </div>

     <div class="check_css">
       <van-radio name='scrk' shape="square"><div style="line-height: 30px">生产入库</div></van-radio>
       <van-radio name='scll' shape="square" disabled><div style="line-height: 30px">生产领料</div></van-radio>
       <van-radio name='sctl' shape="square"><div style="line-height: 30px">生产退料</div></van-radio>
     </div>

      <div class="check_css">
        <van-radio name='cgrk' shape="square"><div style="line-height: 30px">采购入库(有)</div></van-radio>
        <van-radio name='notcgrk' shape="square"><div style="line-height: 30px">采购入库(无)</div></van-radio>
        <van-radio name='cgth' shape="square"><div style="line-height: 30px">采购退货</div></van-radio>
      </div>

      <div class="check_css">
        <van-radio name='sku' shape="square"><div style="line-height: 30px">物料查询</div></van-radio>
        <van-radio name='category' shape="square"><div style="line-height: 30px">产品分类</div></van-radio>
        <van-radio name='to_unit' shape="square"><div style="line-height: 30px">单位转换</div></van-radio>
      </div>

      <div class="check_css">
        <van-radio name='user' shape="square"><div style="line-height: 30px">用户查询</div></van-radio>
        <van-radio name='supplier' shape="square"><div style="line-height: 30px">供 应 商</div></van-radio>
      </div>

      <div class="check_css">
        <van-radio name='xsck' shape="square"><div style="line-height: 30px">销售出库(有)</div></van-radio>
        <van-radio name='notxsck' shape="square"><div style="line-height: 30px">销售出库(无)</div></van-radio>
        <van-radio name='xsth' shape="square"><div style="line-height: 30px">销售退货</div></van-radio>
      </div>

    </van-radio-group>
    <van-divider style="margin-bottom: 1px" :style="{ padding: '0 56px' }"/>
    <div class="check_css">
      日期范围：
    </div>
    <van-row justify="center" style="line-height: 35px">
      <van-col span="3">开始</van-col>
      <van-col span="7" class="date_css" @click="click_start">{{ date_start }}</van-col>
      <van-col span="2">至</van-col>
      <van-col span="7" class="date_css" @click="click_end">{{ date_end }}</van-col>
      <van-col span="3">结束</van-col>
    </van-row>

<!--    选择年月日-->
    <van-popup v-model:show="showPicker" position="bottom">
      <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirm"
          @cancel="showPicker = false"
      />
    </van-popup>
    <div style="margin: 16px;">
      <van-button block type="primary" @click="search">
        查询
      </van-button>
    </div>
  </div>

<!--  搜索结果展示-->
  <div v-if="checked === 'xsorder'">
    <van-row justify="center">
      <van-col span="23">
  <!--      <table-title :title="title"></table-title>-->
        <div>{{title?.[checked]}}({{'共'+state.search_rel.length+'条'}})</div>
        <div  class="orderitem">
          <order-goods-col v-for="(data, index) in state.search_rel" :data="data" :button_show="state.button_show.indexOf(data.id) > -1" :key="index" @spreadorder="spreadorder">{{state.button_show=data.id}}</order-goods-col>
        </div>
        <van-divider style="margin-bottom: 60px" :style="{ padding: '0 56px' }">只显示最近50条！！！</van-divider>
      </van-col>
    </van-row>
  </div>

  <div v-if="checked === 'scorder' || checked === 'scrk' || checked === 'scll' || checked === 'sctl' ||
               checked === 'cgorder' || checked === 'cgrk' || checked === 'notcgrk' || checked === 'cgth' ||
               checked === 'xsck' || checked === 'notxsck' || checked === 'xsth' ">
    <van-row justify="center">
      <van-col span="23">
<!--              <table-title :title="title"></table-title>-->
        <div>{{title?.[checked]}}({{'共'+state.search_rel.length+'条'}})</div>
        <div  class="orderitem">
          <sc-order-goods-col v-for="(data, index) in state.search_rel" :data="data" :key="index" @spreadorder="Unspreadorder">{{state.button_show=data.id}}</sc-order-goods-col>
        </div>
        <van-divider style="margin-bottom: 60px" :style="{ padding: '0 56px' }">只显示最近50条！！！</van-divider>
      </van-col>
    </van-row>
  </div>

  <div v-if="checked === 'sku'|| checked === 'user'|| checked === 'supplier'|| checked === 'to_unit'|| checked === 'user'|| checked === 'category'">
    <van-row justify="center">
      <van-col span="23">
        <!--      <table-title :title="title"></table-title>-->
        <div>{{title?.[checked]}}({{'共'+state.search_rel.length+'条'}})</div>
        <div  class="orderitem">
          <other-info  v-for="(data, index) in state.search_rel" :data="data" :key="index" @spreadorder="otherspreadorder"></other-info>
        </div>
        <van-divider style="margin-bottom: 60px" :style="{ padding: '0 56px' }">只显示最近50条！！！</van-divider>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import {nextTick, onMounted, reactive, ref, watch} from 'vue';
import { Toast } from 'vant';
import { Searchxsorder, Searchscorder, Searchcgorder, Searchscrk, Searchscll,
  Searchsctl, Searchcgrk, Searchnotcgrk, Searchcgth, Searchxsck, Searchnotxsck, Searchxsth, Searchsku,
  Searchcategory, Searchto_unity, Searchuser, Searchsupplier} from "network/search";
// import {useRouter} from "vue-router";

// import TableTitle from "components/common/TableTitle";
import OrderGoodsCol from './ChildComps/OrderGoodsCol'
import ScOrderGoodsCol from './ChildComps/ScOrderGoodsCol'
import OtherInfo from './ChildComps/OtherInfo'
import {useRouter} from "vue-router";

export default {
  name: "search",
  components: {  OrderGoodsCol, ScOrderGoodsCol, OtherInfo },
  setup() {
    // const title = ['下单日期', '物料编号', '交货日期', '客户', '制单人']
    const title ={
      xsorder: '销售订单',
      scorder: '生产订单',
      cgorder: '采购订单',
      scrk: '生产入库',
      scll: '生产领料',
      sctl: '生产退料',
      cgrk: '采购入库(有)',
      notcgrk: '采购入库(无)',
      cgth: '采购退货',
      xsck: '销售出库(有)',
      notxsck: '销售出库(无)',
      xsth: '销售退货',
      category: '产品分类',
      to_unit: '单位转换',
      sku: '物料查询',
      user: '用户查询',
      supplier: '供应商',
    }

    const searchvalue = ref('');
    // 时间选择器
    const showPicker = ref(false);
    const Mydate = ref(new Date());
    onMounted(() => {
      let year = Mydate.value.getFullYear()
      let month = Mydate.value.getMonth()
      let day = Mydate.value.getDate()
      date_end.value = year + '-' + String(parseInt(month)+1) + '-' + day
      date_start.value = year + '-' + month + '-' + day
    })

    const state = reactive({
      button_show: [],
      search_rel: [],
    })
    // 单选
    const checked = ref([])
    const date_start = ref('')
    const date_end = ref('')
    const currentDate = ref(new Date());
    const start_end = ref(false);
    const onConfirm = ()=> {
      showPicker.value = false
      console.log(currentDate.value);
      let year = currentDate.value.getFullYear()
      let month = currentDate.value.getMonth()
      let day = currentDate.value.getDate()

      // 判断选择改变哪个日期
      if (start_end.value){
        date_end.value = year + '-' + String(parseInt(month)+1) + '-' + day
      }else {
        date_start.value = year + '-' + String(parseInt(month)+1) + '-' + day
      }
    }
    const click_end = ()=>{
      start_end.value=true
      showPicker.value = true
    }
    const click_start = ()=>{
      start_end.value=false
      showPicker.value = true
    }

    watch(
        () => checked.value,
        () => {
          // 逻辑代码
          nextTick(()=>{
            state.search_rel = []
          });
        },

    )

    // 搜索
    // const router = useRouter()
    const search = ()=>{
      console.log(checked.value, date_start.value, date_end.value, searchvalue.value);

      if (checked.value != 0 && searchvalue.value){
        Toast.loading({duration: 20000, forbidClick: true, message: '加载中'})
        // 销售订单
        if(checked.value === 'xsorder'){
          Searchxsorder({searchvalue:searchvalue.value, date_start:date_start.value, date_end:date_end.value}).then(res=>{
            state.search_rel = res
            if(res.length === 0) {
              Toast.clear()
              Toast('没有数据')
            } else {
              Toast.clear()
              Toast.success("加载完成")
            }

            console.log(res);
          }).catch(err=>{
            console.log(err);
            Toast.clear()
            Toast.fail('查询失败')
          })
        }
        // 生产订单
        if(checked.value === 'scorder'){
          Searchscorder({searchvalue:searchvalue.value, date_start:date_start.value, date_end:date_end.value}).then(res=>{
            state.search_rel = res
            if(res.length === 0) {
              Toast.clear()
              Toast('没有数据')
            } else {
              Toast.clear()
              Toast.success("加载完成")
            }

            console.log(res);
          }).catch(err=>{
            console.log(err);
            Toast.clear()
            Toast.fail('查询失败')
          })
        }
        // 采购订单
        if(checked.value === 'cgorder'){
          Searchcgorder({searchvalue:searchvalue.value, date_start:date_start.value, date_end:date_end.value}).then(res=>{
            state.search_rel = res
            if(res.length === 0) {
              Toast.clear()
              Toast('没有数据')
            } else {
              Toast.clear()
              Toast.success("加载完成")
            }

            console.log(res);
          }).catch(err=>{
            console.log(err);
            Toast.clear()
            Toast.fail('查询失败')
          })
        }
        // 生产入库
        if(checked.value === 'scrk'){
          Searchscrk({searchvalue:searchvalue.value, date_start:date_start.value, date_end:date_end.value}).then(res=>{
            state.search_rel = res
            if(res.length === 0) {
              Toast.clear()
              Toast('没有数据')
            } else {
              Toast.clear()
              Toast.success("加载完成")
            }

            console.log(res);
          }).catch(err=>{
            console.log(err);
            Toast.clear()
            Toast.fail('查询失败')
          })
        }
        // 生产领料
        if(checked.value === 'scll'){
          Searchscll({searchvalue:searchvalue.value, date_start:date_start.value, date_end:date_end.value}).then(res=>{
            state.search_rel = res
            if(res.length === 0) {
              Toast.clear()
              Toast('没有数据')
            } else {
              Toast.clear()
              Toast.success("加载完成")
            }

            console.log(res);
          }).catch(err=>{
            console.log(err);
            Toast.clear()
            Toast.fail('查询失败')
          })
        }
        // 生产退料
        if(checked.value === 'sctl'){
          Searchsctl({searchvalue:searchvalue.value, date_start:date_start.value, date_end:date_end.value}).then(res=>{
            state.search_rel = res
            if(res.length === 0) {
              Toast.clear()
              Toast('没有数据')
            } else {
              Toast.clear()
              Toast.success("加载完成")
            }

            console.log(res);
          }).catch(err=>{
            console.log(err);
            Toast.clear()
            Toast.fail('查询失败')
          })
        }
        // 采购入库有订单
        if(checked.value === 'cgrk'){
          Searchcgrk({searchvalue:searchvalue.value, date_start:date_start.value, date_end:date_end.value}).then(res=>{
            state.search_rel = res
            if(res.length === 0) {
              Toast.clear()
              Toast('没有数据')
            } else {
              Toast.clear()
              Toast.success("加载完成")
            }

            console.log(res);
          }).catch(err=>{
            console.log(err);
            Toast.clear()
            Toast.fail('查询失败')
          })
        }
        // 采购入库无订单
        if(checked.value === 'notcgrk'){
          Searchnotcgrk({searchvalue:searchvalue.value, date_start:date_start.value, date_end:date_end.value}).then(res=>{
            state.search_rel = res
            if(res.length === 0) {
              Toast.clear()
              Toast('没有数据')
            } else {
              Toast.clear()
              Toast.success("加载完成")
            }

            console.log(res);
          }).catch(err=>{
            console.log(err);
            Toast.clear()
            Toast.fail('查询失败')
          })
        }
        // 采购退货
        if(checked.value === 'cgth'){
          Searchcgth({searchvalue:searchvalue.value, date_start:date_start.value, date_end:date_end.value}).then(res=>{
            state.search_rel = res
            if(res.length === 0) {
              Toast.clear()
              Toast('没有数据')
            } else {
              Toast.clear()
              Toast.success("加载完成")
            }

            console.log(res);
          }).catch(err=>{
            console.log(err);
            Toast.clear()
            Toast.fail('查询失败')
          })
        }
        // 销售出库有订单
        if(checked.value === 'xsck'){
          Searchxsck({searchvalue:searchvalue.value, date_start:date_start.value, date_end:date_end.value}).then(res=>{
            state.search_rel = res
            if(res.length === 0) {
              Toast.clear()
              Toast('没有数据')
            } else {
              Toast.clear()
              Toast.success("加载完成")
            }

            console.log(res);
          }).catch(err=>{
            console.log(err);
            Toast.clear()
            Toast.fail('查询失败')
          })
        }
        // 销售出库无订单
        if(checked.value === 'notxsck'){
          Searchnotxsck({searchvalue:searchvalue.value, date_start:date_start.value, date_end:date_end.value}).then(res=>{
            state.search_rel = res
            if(res.length === 0) {
              Toast.clear()
              Toast('没有数据')
            } else {
              Toast.clear()
              Toast.success("加载完成")
            }

            console.log(res);
          }).catch(err=>{
            console.log(err);
            Toast.clear()
            Toast.fail('查询失败')
          })
        }
        // 销售退货
        if(checked.value === 'xsth'){
          Searchxsth({searchvalue:searchvalue.value, date_start:date_start.value, date_end:date_end.value}).then(res=>{
            state.search_rel = res
            if(res.length === 0) {
              Toast.clear()
              Toast('没有数据')
            } else {
              Toast.clear()
              Toast.success("加载完成")
            }

            console.log(res);
          }).catch(err=>{
            console.log(err);
            Toast.clear()
            Toast.fail('查询失败')
          })
        }
        // 物料查询
        if(checked.value === 'sku'){
          Searchsku({searchvalue:searchvalue.value, date_start:date_start.value, date_end:date_end.value}).then(res=>{
            state.search_rel = res
            if(res.length === 0) {
              Toast.clear()
              Toast('没有数据')
            } else {
              Toast.clear()
              Toast.success("加载完成")
            }

            console.log(res);
          }).catch(err=>{
            console.log(err);
            Toast.clear()
            Toast.fail('查询失败')
          })
        }
        // 产品类别查询
        if(checked.value === 'category'){
          Searchcategory({searchvalue:searchvalue.value, date_start:date_start.value, date_end:date_end.value}).then(res=>{
            state.search_rel = res
            if(res.length === 0) {
              Toast.clear()
              Toast('没有数据')
            } else {
              Toast.clear()
              Toast.success("加载完成")
            }

            console.log(res);
          }).catch(err=>{
            console.log(err);
            Toast.clear()
            Toast.fail('查询失败')
          })
        }
        // 单位箱转换
        if(checked.value === 'to_unit'){
          Searchto_unity({searchvalue:searchvalue.value, date_start:date_start.value, date_end:date_end.value}).then(res=>{
            state.search_rel = res
            if(res.length === 0) {
              Toast.clear()
              Toast('没有数据')
            } else {
              Toast.clear()
              Toast.success("加载完成")
            }

            console.log(res);
          }).catch(err=>{
            console.log(err);
            Toast.clear()
            Toast.fail('查询失败')
          })
        }
        // 用户
        if(checked.value === 'user'){
          Searchuser({searchvalue:searchvalue.value, date_start:date_start.value, date_end:date_end.value}).then(res=>{
            state.search_rel = res
            if(res.length === 0) {
              Toast.clear()
              Toast('没有数据')
            } else {
              Toast.clear()
              Toast.success("加载完成")
            }

            console.log(res);
          }).catch(err=>{
            console.log(err);
            Toast.clear()
            Toast.fail('查询失败')
          })
        }
        // 供应商
        if(checked.value === 'supplier'){
          Searchsupplier({searchvalue:searchvalue.value, date_start:date_start.value, date_end:date_end.value}).then(res=>{
            state.search_rel = res
            if(res.length === 0) {
              Toast.clear()
              Toast('没有数据')
            } else {
              Toast.clear()
              Toast.success("加载完成")
            }
            console.log(res);
          }).catch(err=>{
            console.log(err);
            Toast.clear()
            Toast.fail('查询失败')
          })
        }

      }else {
        Toast('查询类别未选或未输入搜索关键字')
      }

    }


    // 销售订单展开数据接收
    const spreadorder = (id, order, coding) => {
      console.log('订单展开数据接收-spreadorder', id, order, coding);
      // 按钮展示
      if (state.button_show.indexOf(id) > -1 ){
        state.button_show = []
      } else {
        state.button_show = []
        state.button_show.push(id)
        console.log(state.button_show);
      }
    }
    // 生产 采购 销售相关展开 未完成跳转编辑页面
    const router = useRouter()
    const Unspreadorder = (id, order, coding)=> {
      console.log(checked.value, id, order, coding);
      if (checked.value === 'scorder') {
        // 打开生产订单
        console.log(order);
        router.push({path:'/createordersc', query: { order: order}})
      }
      if (checked.value === 'scll') {
        // 打开生产领料
        console.log(checked.value, order);
      }
      if (checked.value === 'scrk') {
        // 打开生产入库
        console.log(checked.value, order);
        router.push({path:'/createorderscrk', query: { order: order}})
      }
      if (checked.value === 'cgorder') {
        // 打开采购订单
        console.log(checked.value, order);
        router.push({path:'/createordercg', query: { order: order}})
      }
      if (checked.value === 'cgrk') {
        // 打开采购入库
        console.log(checked.value, order);
        router.push({path:'/createordercgrk', query: { order: order}})
      }
      if (checked.value === 'notcgrk') {
        // 打开无订单采购入库
        console.log(checked.value, order);
        router.push({path:'/createordercgrk', query: { order: order}})
      }
      if (checked.value === 'cgth') {
        // 打开采购退货
        console.log(checked.value, order);
        router.push({path:'/createordercgre', query: { order: order}})
      }
      if (checked.value === 'sctl') {
        // 打开生产退料
        console.log(checked.value, order);
        router.push({path:'/createorderscre', query: { order: order}})
      }
      if (checked.value === 'xsck') {
        // 打开销售出库
        console.log(checked.value, order);
        router.push({path:'/createorderxs', query: { order: order}})
      }
      if (checked.value === 'notxsck') {
        // 打开无订单销售出库
        console.log(checked.value, order);
        router.push({path:'/createorderxs', query: { order: order}})
      }
    }
    const otherspreadorder = (data)=> {
      console.log(checked.value, data );
      data.checked = checked.value
      router.push({path:'/edititem',  query: { data: JSON.stringify(data)}})
      // if (checked.value === 'user') {
      //   // 用户查询
      //   console.log(id);
      //   // router.push({path:'/createordersc', query: { id: id}})
      // }
      // if (checked.value === 'supplier') {
      //   // 供应商
      //   console.log(id);
      //   // router.push({path:'/createordersc', query: { id: id}})
      // }
      // if (checked.value === 'to_unit') {
      //   // 单位转换
      //   console.log(id);
      //   // router.push({path:'/createordersc', query: { id: id}})
      // }
      // if (checked.value === 'category') {
      //   // 产品分类
      //   console.log(id);
      //   // router.push({path:'/createordersc', query: { id: id}})
      // }
    }

    return {
      title,
      spreadorder,
      Unspreadorder,
      otherspreadorder,

      state,
      searchvalue,

      search,

      // 单选选框
      checked,
      date_start,
      date_end,
      click_end,
      click_start,
      showPicker,
      minDate: new Date(2019, 0, 1),
      maxDate: new Date(2050, 11, 1),
      onConfirm,
      currentDate,

    };
  },

}

</script>

<style scoped>

.check_css {
  margin-top: 12px;
  margin-left: 5px;
  line-height: 30px;
}
.date_css{
  border: 1px solid;
  border-color: var(--color-border);
}


.orderitem {
  font-size: 14px;
  color: #666;
  text-align: left;
  line-height: 2;

  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 0px;
  margin-left: 0px;

  font-weight: bloder; /*bold：加粗；bloder：深度加粗；lighter：细体；*/
  border: 1px solid;
  border-color: var(--color-border);
}
</style>