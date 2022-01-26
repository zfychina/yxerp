<template>
  <van-row justify="left" style="font-size: 12px" align="center">
    <van-col span="2"  offset="1" style="font-size: 14px">{{serial + 1}}</van-col>
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
    </van-col>

    <van-col span="2" style="text-align: center;">
      <van-icon name="close" v-show="data.coding ? true : false || data.quantity ? true : false" alt="" @click="cleardata"/>
      <van-icon v-show="is_spread" size="15" name="arrow" color="var(--color-high-text)" @click="spread(data.id)"/>
      <van-icon v-show="is_spread" size="15" name="arrow-down" color="var(--color-high-text)" @click="spread(data.id)"/>
    </van-col>
  </van-row>

  <!--分割线-->
  <van-config-provider :theme-vars="themeVars">
    <van-divider :style="{ color: 'var(--color-border)', borderColor: 'var(--color-border)', padding: '0 16px' }"/>
  </van-config-provider>
</template>

<script>
import {reactive, ref} from "vue";
import AutoCell from "components/content/AutoCell";
import AutoCellGood from "components/content/AutoCellGood";
import {Toast} from "vant";
import {goodslist} from "network/good";
export default {
  name: "FieldCellListItem",
  components: {AutoCell, AutoCellGood},
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
      autocompleteshow.value = !autocompleteshow.value
      value.serial = props.serial
      console.log(props.quantity);
      value.quantity = props.data.quantity
      console.log(value);
      emit('inputvalue', value)
      showPopover.value = !showPopover.value
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