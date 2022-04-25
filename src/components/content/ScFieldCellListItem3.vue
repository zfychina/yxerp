<template>
  <!--分割线-->
  <van-config-provider :theme-vars="themeVars">
    <van-divider  :style="{ color: 'var(--color-border)', borderColor: '#929191', padding: '0 30px' }"/>
  </van-config-provider>

  <van-swipe-cell :before-close="beforeClose">
    <template #left>
      <van-button @click="is_spread=!is_spread" square type="primary" text="折叠" style="height: 100%;"/>
    </template>

    <van-row justify="left" :style="[{'background-color':(data.process===4?'#fffd0f':'#ffffff')},{fontSize:'12px'}]" align="center">
      <van-col span="2"  offset="1" style="font-size: 14px">---{{serial + 1}}</van-col>
      <van-col span="11">
      <span style="line-height: 2; font-size: 12px; text-align: left;">
        <p>
          <van-popover v-model:show="showPopover" @select="onSelect" placement="bottom-start">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh"  class="autocomplete">
              <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" offset="100" @load="onLoad">
                <auto-cell :data="{coding:'',shortname:'',name:' -------------选择空------------- '}" @selecdata="selecdata"></auto-cell>
                <auto-cell-good v-for="(data, index) in state.autodata" :key="index" :data="data" @selecdata="selecdata"/>
              </van-list>
            </van-pull-refresh>

            <template #reference>
              <input class="input" @blur="onblur" @focus="onfocus" type="text" :name="name" :value="data.coding" @input="oninput" placeholder="请输入物料编号" autocomplete="off" style="width: 100%"/>
            </template>
          </van-popover>
        </p>
      </span>

        <span style="line-height: 0.5; font-size: 8px; color: var(--color-border); text-align: left;">{{data.name}}</span>
      </van-col>
      <van-col span="2">
        <span style="line-height: 2; font-size: 12px; text-align: center;"><p>{{data.unit ? data.unit : '-'}}</p></span>
        <span v-show="false" style="line-height: 0.5; font-size: 8px; color: var(--color-border); text-align: left;">需求数: {{ "" }}</span>
      </van-col>

      <van-col span="6">
        <input class="input" type="number" step="0.001" name="quantity" :value="data.quantity" @input="quantityoninput" placeholder="请输入数量" autocomplete="off" style="text-align: center;width: 100%"/>
        <span style="line-height: 0.5; font-size: 8px; color: var(--color-border); text-align: center;">
        <p>{{data.quantityed >0 ? '完成 ' + data.quantityed : (data.coding ? (data.stock ? '库存 ' + data.stock : '') : '')}}</p>
      </span>
      </van-col>

      <van-col span="2" style="text-align: center;">
        <van-icon name="close" v-show="data.coding ? true : false || data.quantity ? true : false" alt="" @click="cleardata"/>
        <!--      <van-icon v-show="is_spread" size="15" name="arrow" color="var(&#45;&#45;color-high-text)" @click="spread(data.id)"/>-->
        <!--      <van-icon v-show="is_spread" size="15" name="arrow-down" color="var(&#45;&#45;color-high-text)" @click="spread(data.id)"/>-->
      </van-col>
    </van-row>
    <template #right>
      <van-button square type="primary" text="预料" style="height: 100%;"/>
    </template>
  </van-swipe-cell>

  <!--展开显示订单商品  1 -->
  <div v-show="is_spread" >
    <sc-field-cell-list-item4 v-for="(goodsdata,index) in state.goodslist"  @inputvalue="receiveskulistvalue" :key="index" :serial="index" :data="goodsdata" @spreadbomone="spreadbomone"></sc-field-cell-list-item4>
  </div>

</template>

<script>
import {nextTick, onMounted, reactive, ref, watch} from "vue";
import AutoCell from "components/content/AutoCell";
import AutoCellGood from "components/content/AutoCellGood";
import {Toast} from "vant";
import {goodslist} from "network/good";
import { Dialog } from 'vant';
import ScFieldCellListItem4 from "./ScFieldCellListItem4";
import {getbomdetail} from 'network/bom'

export default {
  name: "ScFieldCellListItem3",
  components: {ScFieldCellListItem4, AutoCell, AutoCellGood},
  props: {
    quantity: {
      type: Number,
    },
    serial:{
      type: Number,
    },

    name: {
      type: String,
      default: ''
    },

    data: {
      type: String,
      default: ''
    },

    autodata: {
      type: Array,
      default() {
        return []
      }
    },

  },
  setup(props, { emit }) {
    const autocompleteshow = ref(false)
    const input = ref(null)

    const finished = ref(false);
    const loading = ref(false)
    const refreshing  = ref(false)


    const state = reactive({
      goods: [],
      autodata: [],
      goodslist: []
    })

    watch(
        () => props.data,
        () => {
          // 逻辑代码
          nextTick(()=>{
            state.goodslist = props.data.bom
          });
        },
    )

    onMounted(()=>{
      state.goodslist = props.data.bom
      console.log(props.data);
      console.log(props.data.bom);
      console.log( state.goodslist);
    })
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

    // 防抖函数
    // const debounce = (fn, delay) => {
    //   let timer = null;
    //   return (...args) => {
    //     clearTimeout(timer);
    //     timer = setTimeout(() => {
    //       fn.apply(this, args);
    //     }, delay);
    //   };
    // };

    // autodata  物料搜索结果列表
    const getgoodslist = (query) => {
      goodslist(query).then(res=>{
        state.autodata = res
        console.log('goodslist', state.autodata);
      })
    }

    // 传送数据
    const oninput = (event)=>{
      console.log('inputvalue',props.name, event.target.value);
      // ddebounce(getgoodslist(event.target.value),50)
      getgoodslist(event.target.value)
      // emit('inputvalue',event.target.value)
    }
    const quantityoninput = (event)=>{
      const data = props.data
      data.quantity = event.target.value
      data.serial = props.serial
      console.log('数据内增加数量,用data中转一下GOOD',data.quantity, data);
      emit('inputvalue',data)
    }

    // 聚焦
    const onfocus = ()=>{
      console.log('聚焦');
      autocompleteshow.value = !autocompleteshow.value
      emit('onfocus', true)
      // 自动聚焦
      // nextTick(()=>{
      //   input.value.focus()
      // })
    }
    // 失焦
    const onblur = ()=>{
      setTimeout(() => {
        console.log('失焦');
      }, 10);
    }

    // 气泡弹窗
    const showPopover = ref(false);
    const onSelect = (action) => {
      console.log(action);
      Toast('action.text');
    }

    const selecdata =(value) => {
      console.log(value, props.serial);
      if(value){
        autocompleteshow.value = !autocompleteshow.value
        value.serial = props.serial
        console.log(props.quantity);
        value.quantity = props.data.quantity
        console.log(value);
        emit('inputvalue', value)
      }
      showPopover.value = !showPopover.value
    }

    // 详情列表
    // skulist数据列表
    const receiveskulistvalue = (value) => {
      console.log(props.serial, value);
      // splice(‘要插入的位置’, '要删除的项数', '需要插入的项', '需要插入的项', ‘……’)
      if(value.bom){
        state.goodslist[value.serial].bom = value.bom
      } else {
        state.goodslist.splice(value.serial,1, value)
      }
      // console.log('父级data', props.data);
      console.log('一级传BOM', state.goodslist);
      emit('inputvalue', {serial:props.serial, bom:state.goodslist})
      // skulist最后一行是否为空，不为空则增加两行空值
      // if ( JSON.stringify(state.goodslist[state.goodslist.length - 1]) !== '{}'){
      //   state.goodslist.push({})
      // }
    }

    const cleardata = () => {
      console.log('cleardata', props.serial);
      const data = {}
      data.serial = props.serial
      console.log('清除本行数据', data);
      emit('inputvalue', data)
    }

    const onRefresh = () => {
      setTimeout(() => {
        finished.value = false;
        loading.value = true;
        onLoad();
      }, 1);
    };

    const onLoad = () => {
      setTimeout(() => {
        if (refreshing.value) {
          refreshing.value = false;
        }
        loading.value = false;
        finished.value = true;
      }, 2000);
    };

    //滑动展开
    const beforeClose = ({ position }) => {
      switch (position) {
        case 'left':
        case 'cell':
        case 'outside':
          return true;
        case 'right':
          return new Promise(() => {
            if( props.data.coding && props.data.quantity){
              Dialog.confirm({
                title: '确定展开预料吗？',
              }).then(() => {
                // on confirm
                spread(props.data.id)
              }).catch(() => {
                // on cancel
              });
            } else {Toast('请输入物料编号和数量')}
          });
      }
    };

    const is_spread = ref(false)

    const spread = (skuid) => {
      emit('spreadbom', skuid)
      console.log('spread  skuid', skuid);
      getbomdetail(skuid).then(res=>{

        if ((res[0] ? res[0].subs.length : 0) === 0){
          // state.goodslist.push({})
          Toast('没有数据')
        } else {
          console.log(res[0].subs);
          state.goodslist = format_data(res[0].subs)
          // state.goodslist.push({})
          is_spread.value = true
          console.log(state.goodslist);
          emit('inputvalue', {serial:props.serial, bom:state.goodslist})
        }
      }).catch(err =>{console.log(err)})
    }

    const format_data = (data)=>{
      const result = []
      data.forEach(res=>{
        res.coding.quantity = res.stock * props.data.quantity
        result.push( res.coding )
      })
      return result
    }

    return {
      themeVars,
      state,

      // 气泡弹窗
      onSelect,
      showPopover,
      // 下拉刷新
      loading,
      finished,
      refreshing,
      onRefresh,
      onLoad,

      // 传送数据
      oninput,
      quantityoninput,
      // 失焦
      onblur,
      // 聚焦
      onfocus,
      // 自动聚集
      input,
      selecdata,
      cleardata,

      // 展开
      beforeClose,
      is_spread,
      spread,

      receiveskulistvalue,


    };
  },
}
</script>

<style scoped>

.input {
  color: var(--color-text);
  font-size: 16px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: none;
  /*border-bottom: 1px solid #66666646;*/
  line-height: 2;
  width: 100%;
  background-color: #ffffff;
}
/*下拉窗口样式*/
.autocomplete{
  /*display: none;*/
  position: relative;
  z-index: 100;
  /*background-color: #f9f9f9;*/

  /*height: 400px;*/
  height: auto;
  width: 249px;

  border: 1px solid;
  /*border-bottom:none;*/
  border-color: var(--color-border);
  /*margin: 15px 0 15px 0*/

  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  color: #fff;
  overflow: scroll;
}

input::-webkit-input-placeholder {  /* WebKit browsers*/
  color: #c8c9cc;
  background-color: #ffffff;
  font-size: 14px;
}

input:-ms-input-placeholder { /* Internet Explorer 10+*/
  color: #c8c9cc;
  background-color: #ffffff;
  font-size: 14px;
}

</style>