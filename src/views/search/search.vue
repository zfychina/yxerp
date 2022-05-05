<template>
  <van-row>
    <van-col span="24">
        <van-search background="#1989fa" v-model="searchvalue" placeholder="请输入物料编码 名称 供应商 订单号等(显示前50条)" shape="round" clearable/>
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
  <div>
    div
  </div>
</template>

<script>
import {onMounted, reactive, ref} from 'vue';
import { Toast } from 'vant';
import { Searchxsorder, Searchscorder, Searchcgorder, Searchscrk, Searchscll,
  Searchsctl, Searchcgrk, Searchnotcgrk, Searchcgth, Searchxsck, Searchnotxsck, Searchxsth, Searchsku,
  Searchcategory, Searchto_unity, Searchuser, Searchsupplier} from "network/search";

export default {
  name: "search",
  setup() {
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


    // 搜索
    const search = ()=>{
      console.log(checked.value, date_start.value, date_end.value, searchvalue.value);

      if (checked.value != 0 && searchvalue.value){
        Toast.loading({duration: 20000, forbidClick: true, message: '加载中'})
        // 销售订单
        if(checked.value === 'xsorder'){
          Searchxsorder({searchvalue:searchvalue.value, date_start:date_start.value, date_end:date_end.value}).then(res=>{
            state.search_rel = res
            Toast.clear()
            Toast.success("加载完成")

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
            Toast.clear()
            Toast.success("加载完成")

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
            Toast.clear()
            Toast.success("加载完成")

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
            Toast.clear()
            Toast.success("加载完成")

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
            Toast.clear()
            Toast.success("加载完成")

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
            Toast.clear()
            Toast.success("加载完成")

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
            Toast.clear()
            Toast.success("加载完成")

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
            Toast.clear()
            Toast.success("加载完成")

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
            Toast.clear()
            Toast.success("加载完成")

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
            Toast.clear()
            Toast.success("加载完成")

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
            Toast.clear()
            Toast.success("加载完成")

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
            Toast.clear()
            Toast.success("加载完成")

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
            Toast.clear()
            Toast.success("加载完成")

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
            Toast.clear()
            Toast.success("加载完成")

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
            Toast.clear()
            Toast.success("加载完成")

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
            Toast.clear()
            Toast.success("加载完成")

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
            Toast.clear()
            Toast.success("加载完成")

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

    return {
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
  margin-left: 12px;
  line-height: 30px;
}
.date_css{
  border: 1px solid;
  border-color: var(--color-border);
}


</style>