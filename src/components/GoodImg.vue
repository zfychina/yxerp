<template>
  <van-row>
    <van-col span="7">
      <van-image width="100" height="100" src="" @click="imgpreview"/>
    </van-col>
<!--    <van-col span="1"/>-->
    <van-col span="16" style="font-size:12px;text-align: left;vertical-align: middle; color: var(--color-text); line-height: 20px">
      <p><span style="color: #02519E8C">物料编号：</span>
        {{data.coding ? data.coding + ' (' + data.unit + ')' : ''}}
      </p>

      <p><span style="color: #02519E8C">物料名称：</span>
        {{data.name}}
      </p>

      <p><span style="color: #02519E8C">供&nbsp;&nbsp;应&nbsp;&nbsp;商：</span>
        {{data.supplier ? data.supplier : ''}}
      </p>

      <p><span style="color: #02519E8C">用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;途：</span>
        {{data.usebom ? data.usebom[0]?.name + ' — ' : ''}}
        {{data.usebom ? data.usebom[data.usebom.length-1]?.name: ''}}
      </p>
    </van-col>
  </van-row>
</template>

<script>
import { ImagePreview } from 'vant';
export default {
  name: "GoodImg",
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
  },
  setup() {

    const imgpreview = ()=>{
      ImagePreview([''])
    }

    return{
      imgpreview,
    }
  }
}
</script>

<style scoped>

</style>