<template>
  <div class="cellborder">
  <!--缺料物料详情-->
  <van-row justify="left" align="bottom" style="line-height: 2;">
    <van-col span="18" offset="1">
      <span style="line-height: 1; font-size: 16px; text-align: left;"><p>{{data.name}}</p></span>
    </van-col>
    <van-col span="5" style="text-align: center;">
        <van-icon size="15" name="arrow" color="var(--color-high-text)" @click="onclick"/>
    </van-col>
  </van-row>
  <van-row  justify="center">
    <van-col  span="23">
      <span style="line-height: 2; font-size: 12px; text-align: left;color:var(--van-gray-6)"><p>{{data.explain}}</p></span>
    </van-col>
  </van-row>
  </div>

  <!--分割线-->
  <van-config-provider :theme-vars="themeVars">
    <van-divider v-show="serial+1 < serials" :style="{ color: 'var(--color-border)', borderColor: 'var(--color-border)', padding: '0 16px' }"/>
  </van-config-provider>
</template>

<script>
import {reactive} from "vue";
import {useRouter} from "vue-router";



export default {
  name: "TableReport",
  props: {
    serial:{
      type: Number,
    },
    serials:{
      type: Number,
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },

  },
  setup(props) {
    const state = reactive({
      goodslist: [],
    })

    const router = useRouter()
    const onclick = ()=>{
      console.log(props.data.url);
      router.push({path:props.data.url})
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

    return {
      themeVars,
      state,

      onclick,

    };
  },
}
</script>

<style scoped>


.cellborder {
  line-height: 50px;
  /*border: 1px solid;*/
  /*border-color: var(--color-border);*/
}
</style>