<template>
  <!--  柱形图-->
    <div>
    <profile-lnterval :data="data" :active='active'></profile-lnterval>
  </div>

    <div class="cellborder">
      <!--产品分类详情-->
      <div  v-for="(item,index) in data" :key="index">
        <van-row justify="left" align="bottom" style="line-height: 2;" @click="spread_detail(item.category, year, item.month, active)">
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
import {onMounted, reactive, } from "vue";
import ProfileLnterval from "components/chart/ProfileLnterval";
import {useRouter} from "vue-router";

export default {
  name: "ProcessGoods",
  components: { ProfileLnterval},
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    year:{
      type: Number,
    },
    active:{
      type:Number,
    },
    details:{
      type:Number,
    }
  },
  setup(props){
    const state = reactive({

    })

    onMounted(()=>{
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

    const router = useRouter()
    const spread_detail = (category, year, month, active)=>{
      console.log('spread_detail', category, year,month);

      router.push({path:'/ProcessGoodsDetail', query: { category: category, year: year, month: month, active: active, details:props.details}})
    }
    return{
      themeVars,
      state,
      spread_detail,

    }
  }
}
</script>

<style scoped>


.cellborder {
  /*line-height: 50px;*/
  border: 1px solid;
  border-color: var(--color-border);
}
</style>