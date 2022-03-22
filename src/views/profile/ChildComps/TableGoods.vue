<template>
  <div class="cellborder">
  <!--缺料物料详情-->
  <van-row justify="left" align="bottom" style="line-height: 2;">
    <van-col span="18" offset="1">
      <span style="line-height: 1; font-size: 16px; text-align: left;"><p>{{data.name}}</p></span>
    </van-col>
    <van-col span="5" style="text-align: center;">
      <van-uploader :after-read="upfile" name='files' :accept="accept" result-type="file">
        <van-icon size="15" name="arrow" color="var(--color-high-text)"/>
      </van-uploader>
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
import {upSkuimport, upShortmold, upSupplier, uporderimport, upCustomer, upSupplierdir, upBOM, recordsimport} from "network/upimport";
import {Dialog, Toast} from "vant";



export default {
  name: "TableOrder",
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
    accept: {
      type: String,
      default() {
        return '.xls, .xlsx'
      }
    },

  },
  setup(props,) {
    const state = reactive({
      goodslist: [],
    })

    const upfile=(file)=> {
      console.log(file);
      const data = new FormData();
      data.append('files', file.file)
      Toast.loading({message:props.data.url + '文件导入中...', forbidClick:true});
      if(props.data.url === 'upShortmold') {
        // 缺料表更新
        upShortmold(data).then(res=>{
          console.log(res);
          Dialog.alert({
            message: res,
          }).then(() => {
            // on close
          });
        })
      }else if(props.data.url === 'upSkuimport') {
        // 物料基础数据更新更新
        upSkuimport(data).then(res=>{
          console.log(res);
          Dialog.alert({
            message: res,
          }).then(() => {
            // on close
          });
        })
      }else if(props.data.url === 'upSupplier') {
        // 供应商更新
        upSupplier(data).then(res=>{
          console.log(res);
          Dialog.alert({
            message: res,
          }).then(() => {
            // on close
          });
        })
      }else if(props.data.url === 'uporderimport') {
        // 订单信息导入
        uporderimport(data).then(res=>{
          console.log(res);
          Dialog.alert({
            message: res,
          }).then(() => {
            // on close
          });
        })
      }else if(props.data.url === 'upCustomer') {
        // 客户名录导入
        upCustomer(data).then(res=>{
          console.log(res);
          Dialog.alert({
            message: res,
          }).then(() => {
            // on close
          });
        })
      }else if(props.data.url === 'upSupplierdir') {
        // 供应商名录导入
        upSupplierdir(data).then(res=>{
          console.log(res);
          Dialog.alert({
            message: res,
          }).then(() => {
            // on close
          });
        })
      }else if(props.data.url === 'upBOM') {
        // 产品BOM表导入
        upBOM(data).then(res=>{
          console.log(res);
          Dialog.alert({
            message: res,
          }).then(() => {
            // on close
          });
        })
      }else if(props.data.url === 'recordsimport') {
        // 存货往来导入
        recordsimport(data).then(res=>{
          console.log(res);
          Dialog.alert({
            message: res,
          }).then(() => {
            // on close
          });
        })
      }
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

      upfile,
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