<template>
    <van-row justify="center" @click="state.systemshow=!state.systemshow">
      <van-col span="23">
        <div class="textcss">产品分类详情</div>
      </van-col>
    </van-row>

  <div class="cellborder">
    <!--缺料物料详情-->
    <div  v-for="(item,index) in data" :key="index">
      <van-row justify="left" align="bottom" style="line-height: 2;">
        <van-col span="12" offset="1">
          <span style="line-height: 1; font-size: 16px; text-align: left;">
            <p>{{item.category}}
              <span style="font-size: 14px;color: #666;">
                &nbsp;&nbsp;&nbsp;&nbsp;{{((item.quantity/item.total) *100).toFixed(2) + "%" }}
              </span>
            </p></span>
        </van-col>

        <van-col span="7">
          <span style="line-height: 1; font-size: 16px; text-align: right;"><p>
            <span style="font-size: 12px;color: var(--color-border)">Q：</span>
            {{item.quantity}}</p></span>
        </van-col>

        <van-col span="4" style="text-align: center;vertical-align: bottom">
            <van-icon style="vertical-align: bottom" size="15" name="arrow" color="var(--color-high-text)"/>
        </van-col>
      </van-row>
  <!--进度条-->
      <van-row  justify="center" style="line-height: 3">
        <van-col span="20">
          <van-progress pivot-text="" style="margin-bottom: 10px;margin-top: 20px" :percentage="((item.quantity/item.total) *100).toFixed(2)" show-pivot='false'/>
        </van-col>
      </van-row>

      <!--分割线-->
      <van-config-provider :theme-vars="themeVars">
        <van-divider v-show="index+1 < data.length" :style="{ color: 'var(--color-border)', borderColor: 'var(--color-border)', padding: '0 16px' }"/>
      </van-config-provider>
    </div>
  </div>

</template>

<script>
import {onMounted, reactive} from "vue";

export default {
  name: "CategoryGoods",
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
  },
  setup(props){

    const state = reactive({

    })

    onMounted(()=>{
      console.log(props.data);

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
    return{
      themeVars,
      state,

    }
  }
}
</script>

<style scoped>
.textcss {
  font-size: 14px;
  text-align: left;
  line-height: 50px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 0px;
  margin-left: 0px;
  font-weight: bold; /*bold：加粗；bloder：深度加粗；lighter：细体；*/
  /*border: 1px solid;*/
  background-color: white;
}

.cellborder {
  /*line-height: 50px;*/
  border: 1px solid;
  border-color: var(--color-border);
}
</style>