<template>
  <van-sticky>
    <van-row>
      <van-col span="24">
        <van-nav-bar left-arrow :title="title?.[state.data.checked]" :border='false' @click-left="onClickLeft">
        </van-nav-bar>
      </van-col>
    </van-row>
  </van-sticky>

  <van-row  justify="center">
    <van-col span="23">
      <van-form @submit="onSubmit">
        <van-cell-group v-if="state.data.checked === 'sku'" inset>
          <van-field v-model="state.data.coding" name="coding" label="编码：" readonly/>
          <van-field v-model="state.data.name" name="name" label="名称："/>
          <van-field v-model="state.data.stock" name="stock" label="库存数量："/>
          <van-field v-model="state.data.return_num" name="return_num" label="退货仓数量："/>
          <van-field v-model="state.data.unit" name="unit" label="单位："/>
          <van-field v-model="state.data.supplier" name="supplier" label="供应商："  placeholder="输入供应商名称"/>
          <van-field v-model="state.data.process" name="process" label="工序：" placeholder="输入工序名称"/>
          <van-field v-model="state.data.storage" name="storage" label="库位：" placeholder="输入仓库类另"/>
          <van-field v-model="state.data.category" name="category" label="类别：" placeholder="输入锁体配件或锁芯配件"/>
          <van-field v-model="state.data.category1" name="category1" label="类别1：" placeholder="输入锁体类别"/>
          <van-field v-model="state.data.category2" name="category2" label="类别2：" placeholder="输入面板类别"/>
          <van-field v-model="state.data.category3" name="category3" label="类别3：" placeholder="输入保护器类别"/>
          <van-field v-model="state.data.category4" name="category4" label="类别4：" placeholder="输入锁芯类别"/>
        </van-cell-group>
        <van-cell-group v-if="state.data.checked === 'category'" inset>
          <van-field v-model="state.data.name" name="name" label="型号：" readonly/>
          <van-field v-model="state.data.parent" name="parent" label="属于"/>
          <van-field v-model="state.data.capacity" name="capacity" label="工时：" placeholder="每小时生产的数量"/>
          <van-field v-model="state.data.process" name="process" label="工序：" placeholder="输入生产工序"/>
        </van-cell-group>
        <van-cell-group v-if="state.data.checked === 'to_unit'" inset>
          <van-field v-model="state.data.coding" name="name" label="型号：" readonly/>
          <van-field v-model="state.data.name" name="stock" label="属于" readonly/>
          <van-field v-model="state.data.num" name="num" label="数量：" placeholder="装箱数量"/>
        </van-cell-group>
        <van-cell-group v-if="state.data.checked === 'user'" inset>
          <van-field v-model="state.data.date_joined" name="date_joined" label="创建时间：" readonly/>
          <van-field v-model="state.data.username" name="username" label="姓名"/>
          <van-field v-model="state.data.mobile" name="mobile" label="手机"/>
          <van-field v-model="state.data.last_login" name="last_login" label="最后登入时间" readonly/>
          <van-field v-model="state.data.email" name="email" label="邮箱："/>

        </van-cell-group>
        <van-cell-group v-if="state.data.checked === 'supplier'" inset>
          <van-field v-model="state.data.create_time" name="create_time" label="创建时间：" readonly/>
          <van-field v-model="state.data.update_time" name="update_time" label="更新时间：" readonly/>
          <van-field v-model="state.data.coding" name="coding" label="编码" readonly/>
          <van-field v-model="state.data.name" name="name" label="全称" />
          <van-field v-model="state.data.shortname" name="shortname" label="简称" />
          <van-field v-model="state.data.productline" name="productline" label="是否生产线" />

        </van-cell-group>
        <div style="margin: 16px;">
          <van-button block type="primary" native-type="submit">
            保存
          </van-button>
        </div>
    </van-form>
    </van-col>
  </van-row>

</template>

<script>
import {Toast} from "vant";
import {onMounted, reactive} from "vue";
import {useRoute} from "vue-router";
import {Search} from "network/search";


export default {
  name: "EditItem",
  components: {},

  setup(){
    // 返回按钮和搜索按钮
    const onClickLeft = () => history.back();
    const title ={
      category: '产品分类',
      to_unit: '单位转换',
      sku: '物料编辑',
      user: '用户编辑',
      supplier: '供应商',
    }

    const state = reactive({
      data: {},
    })
    // 接收数据
    const route =useRoute();
    onMounted(() => {
      //要这样传值
      // router.push({path:'/xsresult',  query: { data: JSON.stringify(res)}})

      //才能这样接收
      state.data = JSON.parse(decodeURIComponent(route.query.data))
      console.log(state.data);
      if (state.data.unit){
        state.data.unit =state.data.unit.name
      }
      if (state.data.category){
        state.data.category =state.data.category.name
      }
      if (state.data.category1){
        state.data.category1 =state.data.category1.name
      }
      if (state.data.category2){
        state.data.category2 =state.data.category2.name
      }
      if (state.data.category3){
        state.data.category3 =state.data.category3.name
      }
      if (state.data.category4){
        state.data.category4 =state.data.category4.name
      }
      if (state.data.parent){
        state.data.parent =state.data.parent.name
      }
      if (state.data.checked === 'to_unit'){
        state.data.coding =state.data.sku.coding
        state.data.name =state.data.sku.name
      }
      state.data.productline = state.data.productline ? '是': '否'
    });

    // 保存修改
    const onSubmit = (values) =>{
      values.checked = state.data.checked
      values.id = state.data.id
      console.log('submit', values);
      Search(values).then(res=>{
        if(res==='ok'){
          Toast.success('保存成功')
        } else {
          Toast.fail(res)
        }
      }).catch(err=>{
        console.log(err);
        Toast.fail('保存失败，请联系管理员')
      })

    }

    return {
      onClickLeft,
      title,
      state,

      onSubmit,
    }
  }
}
</script>

<style scoped>
.orderitem {
  font-size: 14px;
  color: #666;
  text-align: left;
  line-height: 2;

  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 0px;
  margin-left: 0px;

  font-weight: bloder; /*bold：加粗；bloder：深度加粗；lighter：细体；*/
  border: 1px solid;
  border-color: var(--color-border);
}
</style>