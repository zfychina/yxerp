<template>
  <van-sticky>
    <van-row>
      <van-col span="24">
        <van-nav-bar left-arrow title="BOM" :border='false' @click-left="onClickLeft">
          <template #right>
            <van-uploader :after-read="Bomimport" name='files' :accept="accept" result-type="file" style="color: #1989fa">
              导入
            </van-uploader>
          </template>
        </van-nav-bar>
      </van-col>
    </van-row>
  </van-sticky>

  <van-row justify="center" style="background-color: white">
    <van-col span="23">
      <zfy-search name="search" :data="state.searchvalue" @inputvalue="inputvalue" @search="onsearch"></zfy-search>
    </van-col>
  </van-row>

  <van-row justify="center">
    <van-col span="23">
      <good-img :data="state.searchvalue"></good-img>
    </van-col>
  </van-row>

  <van-row justify="center">
    <van-col span="23">
      <field-cell-list :skulist="state.skulist" @inputvalue="receiveskulistvalue"></field-cell-list>
    </van-col>
  </van-row>

    <van-row justify="center">
      <van-col span="23" style="margin: 16px;">
        <van-button type="primary" block @click="submit" >保存</van-button>
      </van-col>
    </van-row>

  <van-row justify="center" style="margin-bottom: 70px">
    <van-col span="23">
      <van-button type="danger" block  @click="delsubmit">删除</van-button>
    </van-col>
  </van-row>


</template>

<script>
import {Dialog, Toast} from "vant";
import ZfySearch from "components/ZfySearch";
import {reactive} from "vue";
import GoodImg from "components/GoodImg";
import FieldCellList from "components/content/FieldCellList";
import {getbomdetail, bomcreate, bomdelete, bomquery} from "network/bom";
import {upBOM} from "network/upimport";


export default {
  name: "Bom",
  components: {GoodImg, ZfySearch, FieldCellList},
  setup() {
    const props =reactive( {
      accept: '.xls, .xlsx',
    })
    const state = reactive({
      searchvalue: {},
      autodata: [],
      skulist: [
        {},
        {},
        {},
        {},
        {},
        {},
      ],
    })


    // skulist数据列表
    const receiveskulistvalue = (value) => {
      console.log(value);
      // splice(‘要插入的位置’, '要删除的项数', '需要插入的项', '需要插入的项', ‘……’)
      state.skulist.splice(value.serial,1, value)

      // skulist最后一行是否为空，不为空则增加两行空值
      if ( JSON.stringify(state.skulist[state.skulist.length - 1]) !== '{}'){
        state.skulist.push({},{})
      }
    }

    const inputvalue = (value) => {
      console.log(value);
      state.searchvalue = value

      // 查询用途
      bomquery(value.coding).then(res=>{
        state.searchvalue.usebom = res
      })

      console.log(state.searchvalue);
      if (state.searchvalue){
        GETbomdetail()
      } else {
        state.skulist = [{},{},{},{},{},{},]
      }

    }

    const GETbomdetail = () =>{
      getbomdetail(state.searchvalue.id).then(res=>{
        if (res.length === 0){
          state.skulist = [{},{},{},{},{},{},]
          Toast('没有数据')
        } else {
          console.log(res[0]);
          const subs = res[0].subs
          state.skulist = []
          for (let i in subs) {
            state.skulist.push({coding:subs[i].coding.coding,name:subs[i].coding.name,quantity:subs[i].stock,unit:subs[i].coding.unit,})
          }
          state.skulist.push({},{})
        }
      })
    }
    const onsearch = () =>{
      console.log('搜索按钮');
    }


    // 产品BOM表导入
    const Bomimport = (file)=>{
      const data = new FormData();
      data.append('files', file.file)
      Toast.loading({message:'BOM导入中...', forbidClick:true});
      upBOM(data).then(res=>{
        Dialog.alert({
          message: res,
        }).then(() => {
          // on close
        });
      })
    }

    // 返回按钮和搜索按钮
    const onClickLeft = () => history.back();
    // const onClickRight = () => Toast('按钮');

    // 保存按钮
    const submit = ()=> {
      console.log('保存');
      let data = {}
      data.coding = state.searchvalue.coding
      data.sku = []

      for (let i in state.skulist) {
        if (!state.skulist[i].coding || !state.skulist[i].quantity || state.skulist[i].quantity === 0) {
          continue
        }
        data.sku.push({coding: state.skulist[i].coding, quantity: state.skulist[i].quantity})
      }

      if (data.sku.length === 0) {
        Toast({message: '产品编号有误或未添加产品数量', duration: 1000})
        return
      }
      if (data.coding) {
        console.log(data);
        bomcreate(data).then(res => {
          if (res === 'ok') {
            Toast.success('BOM更新成功')
          } else {
            Toast("BOM查询页面确认更新成功")
          }
        })

      } else {
        Dialog.confirm({
          message: '没有主BOM产品编号，是否只创建子BOM产品编号？',
        })
            .then(() => {
              // on confirm
              bomcreate(data).then(res => {
                if (res === 'ok') {
                  Toast.success('BOM更新成功')
                } else {
                  Toast("BOM查询页面确认更新成功")
                }
              })
            })
            .catch(() => {
              // on cancel
            });
      }

    }

    // 删除按钮
    const delsubmit = ()=>{
      console.log('删除');
      let data = {}
      data.coding = state.searchvalue.coding
      data.sku = []

      for (let i in state.skulist) {
        if (!state.skulist[i].coding || !state.skulist[i].quantity || state.skulist[i].quantity === 0) {
          continue
        }
        data.sku.push({coding: state.skulist[i].coding, quantity: state.skulist[i].quantity})
      }

      if (!data.coding && data.sku.length === 0) {
        Toast({message: '产品编号有误或未添加产品数量', duration: 1000})
        return
      }

      bomdelete(data).then(res => {
        if (res === 'ok') {
          Toast.success('BOM删除成功')
        } else {
          Toast("BOM查询页面确认是否删除成功")
        }
      })
    }
    return {
      onClickLeft,
      Bomimport,

      ...props,
      state,
      receiveskulistvalue,
      inputvalue,
      onsearch,

      submit,
      delsubmit,
    }
  }
}
</script>

<style scoped>

</style>