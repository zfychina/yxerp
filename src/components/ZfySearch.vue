<template>
  <van-row class="title" justify="left">
    <van-col span="3" style="text-align: center;vertical-align: middle;"><van-icon name="search" size="18"/></van-col>
    <van-col span="19" style="text-align: left;vertical-align: middle;">
<!--      <span style="line-height: 2; font-size: 12px; text-align: left;">-->
<!--        <p>-->
          <van-popover v-model:show="showPopover" @select="onSelect" placement="bottom-start">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh"  class="autocomplete">
              <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" offset="100" @load="onLoad">
                <auto-cell :data="{coding:'',shortname:'',name:' -------------选择空------------- '}" @selecdata="selecdata"></auto-cell>
                <auto-cell-good v-for="(data, index) in state.autodata" :key="index" :data="data" @selecdata="selecdata"/>
              </van-list>
            </van-pull-refresh>

            <template #reference>
              <input class="input" @blur="onblur" @focus="onfocus" type="text" :name="name" :value="data.coding" @input="oninput" placeholder="请输入物料编号或名称" autocomplete="off" style="width: 140%"/>
            </template>
          </van-popover>
<!--        </p>-->
<!--      </span>-->
    </van-col>
    <van-col span="2" style="text-align: center;vertical-align: middle;">
      <van-icon name="close" v-show="clearicon" alt="" @click="cleardata"/>
    </van-col>
<!--    <van-col span="4" style="text-align: center;vertical-align: middle;" @click="bomsearch">查询</van-col>-->
  </van-row>
</template>

<script>
import AutoCell from "components/content/AutoCell";
import AutoCellGood from "components/content/AutoCellGood";
import {goodslist} from "network/good";
import {reactive, ref} from "vue";

export default {
  name: "ZfySearch",
  components: {AutoCell, AutoCellGood},
  props: {
    name: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
  },
  setup(props, { emit }){
    const autocompleteshow = ref(false)
    const clearicon = ref(false)

    const finished = ref(false);
    const loading = ref(false)
    const refreshing  = ref(false)

    const showPopover = ref(false);

    const state = reactive({
      autodata: []
    })



    const bomsearch = ()=>{
      console.log('bomsearch',props.data);
      emit('search','')
    }

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
      emit('onblur', true)
    }

    const cleardata = () => {
      console.log('cleardata');
      emit('inputvalue', '')
    }

    const selecdata =(value) => {
      autocompleteshow.value = !autocompleteshow.value
      console.log(value);
      emit('inputvalue', value)
      showPopover.value = !showPopover.value
      onblur()
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


    return{
      state,
      oninput,
      onblur,
      onfocus,
      cleardata,
      clearicon,

      bomsearch,

      finished,
      loading,
      refreshing,

      showPopover,
      onRefresh,
      onLoad,
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