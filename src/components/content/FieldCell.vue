<template>
  <van-row class="title" justify="space-between">
    <van-col span="6" style="text-align: center;vertical-align: middle;">
      <span v-show="required" style="color: red">*</span>
      {{ title }}
      <span v-show="colon">:</span>
    </van-col>

    <van-col span="16">
      <van-popover v-model:show="showPopover" @select="onSelect" placement="bottom-end">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh"  class="autocomplete">
          <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" offset="100" @load="onLoad">
            <auto-cell :data="{coding:'',shortname:'',name:' -------------选择空------------- '}" @selecdata="selecdata"></auto-cell>
            <auto-cell v-for="(data, index) in autodata" :key="index" :data="data" @selecdata="selecdata"/>
          </van-list>
        </van-pull-refresh>

        <template #reference>
          <input @blur="onblur" @focus="onfocus" type="text" :name="name" :value="data" @input="oninput" :placeholder="placeholder" autocomplete="off" style="width: 100%"/>
        </template>
      </van-popover>


    </van-col>
    <van-col span="2" style="text-align: left;vertical-align: middle;">
      <van-icon name="close" v-show="clearicon" alt="" @click="cleardata"/>
      <van-icon name="arrow-down" v-show="!clearicon"/>
    </van-col>

  </van-row>

</template>
<script>
import {reactive, ref,} from "vue";
import AutoCell from "components/content/AutoCell";
import { Toast } from 'vant';


export default {
  name: "FieldCell",
  components: {AutoCell},
  props: {

    colon:{
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },

    data: {
      type: String,
      default: ''
    },

    placeholder: {
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
  setup(props, { emit }){
    const autocompleteshow = ref(false)
    const input = ref(null)
    const clearicon = ref(false)

    const finished = ref(false);
    const loading = ref(false)
    const refreshing  = ref(false)

    const state = reactive({

    })
    // 传送数据
    const oninput = (event)=>{
      console.log('inputvalue',props.name, event.target.value);

        emit('inputvalue',event.target.value)
    }

    // 聚焦
    const onfocus = ()=>{
      console.log('聚焦');
      autocompleteshow.value = !autocompleteshow.value
      clearicon.value = true
      emit('onfocus', true)
      // 自动聚焦
      // nextTick(()=>{
      //   input.value.focus()
      // })
    }
    // 失焦
    const onblur = ()=>{
      setTimeout(() => {
        clearicon.value = false
      }, 10);
     console.log('失焦');

    }

    const cleardata = () => {

      emit('inputvalue', '')
    }

    const selecdata =(value) => {
      autocompleteshow.value = !autocompleteshow.value
      console.log(value);
      emit('inputvalue', value)
      showPopover.value = !showPopover.value
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

// 气泡弹窗
    const showPopover = ref(false);
    const onSelect = (action) => {
      console.log(action);
      Toast('action.text');
    }



    return {
      // 气泡弹窗
      onSelect,
      showPopover,
      // 下拉刷新
      loading,
      finished,
      refreshing,
      onRefresh,
      onLoad,

      state,
      autocompleteshow,
      // 自动聚集
      input,
      clearicon,
      // 聚焦
      onfocus,
      // 失焦
      onblur,

      oninput,

      cleardata,
      selecdata,
     }
  }
}
</script>

<style scoped>
.title {
  font-size: 14px;
  color: var(--color-border);
  text-align: left;
  line-height: 3;

  border: 1px solid;
  /*border-bottom:none;*/
  border-color: var(--color-border);
  margin: 15px 0 15px 0
}

.title input {
  color: var(--color-text);
  font-size: 16px;
  border:none;
  line-height: 2;
  width: 100%;
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