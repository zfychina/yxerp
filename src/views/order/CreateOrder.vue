<template>
  <van-sticky>
    <van-nav-bar title="销售订单" left-arrow fixed @click-left="onClickLeft">

    </van-nav-bar>
  </van-sticky>

  <van-form style="margin-top: 50px" @submit="onSubmit">
<!--  日历选择器-->
  <van-field
      required
      colon
      v-model="orderdate"
      is-link
      readonly
      name="calendar"
      label="订单交期"
      placeholder="点击选择日期"
      @click="showCalendar = true"
  />
  <van-calendar v-model:show="showCalendar" @confirm="onConfirm" color="#1989fa"/>
<!--订单编号-->
    <van-field
        scroll-to-error
        autofocus
        clickable
        clearable
        required
        colon
        v-model.trim="orderhao"
        name="orderhao"
        label="订单编号"
        placeholder="请输入订单编号"
        :rules="[{validator, message: '订单编号已存在或含有特殊字符，请重新输入'}]"
    />

    <!--客户编号-->
    <!--ELEMENT-->
    <van-cell>
    <nobr class="sub-title"><nobr style="color:red;">*</nobr>客&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <el-autocomplete
        input-style='{width:100%;border=none}'
        resize="horizontal "
        class="inline-input"
        v-model="customer"
        :fetch-suggestions="querySearch"
        placeholder="请输入客户编号"
        @select="handleSelect"
        clearable
        name="customer"
        value-key="coding"
    />
      </nobr>
    </van-cell>

    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        创建
      </van-button>
    </div>
  </van-form>


</template>

<script>
import { ref, onMounted } from 'vue';
import {useRouter} from "vue-router";
import {countOrderhao} from "network/order";
import {customerslist} from "network/customer";

export default {
  name: "CreateOrder",
  setup() {
    const router = useRouter()
    // 带建议输入用
    const restaurants = ref([])

    // 订单data
    const showCalendar = ref(false);
    const onConfirm = (date) => {
      orderdate.value = `${date.getYear() + 1900}年${date.getMonth() + 1}月${date.getDate()}日`;
      showCalendar.value = false;
    };

    const orderdate = ref('');
    const orderhao = ref('');
    const customer = ref('');
    // 校验订单编号是否重复
    const validator =  (val) => {
      return countOrderhao(val).then(res=> {
        if (res.count >= 1 || val.match('[:;/|,*&?"><]') != null) {
          return false
        } else {
          return true
        }
      })
    };
    // 带建议输入
    const querySearch = (queryString, cb) => {
      var results = queryString
          ? restaurants.value.filter(createFilter(queryString))
          : restaurants.value;
      // 调用 callback 返回建议列表的数据
      cb(results);
    };
    const createFilter = (queryString) => {
      return (restaurant) => {
        return (
            restaurant.coding.toLowerCase().indexOf(queryString.toLowerCase()) ===
            0
        );
      };
    };
    const handleSelect = (item) => {
      console.log(item);
    };
    onMounted(() => {
      restaurants.value = loadAll();
    });
    // 客户数据加载
    const loadAll = () => {
      let arr1=[]
      customerslist().then(res=>{
        // 将json对象转换成列表
        for(let i in res){
          arr1.push(res[i])
        }
      })
      return arr1
    };

    // 返回上一页
    const onClickLeft = () => {
      router.go(-1)
    }
    return {
      loadAll,
      handleSelect,
      querySearch,
      onClickLeft,

      onConfirm,
      showCalendar,
      validator,
      orderhao,
      orderdate,
      customer,
    };
  },

}
</script>

<style scoped lang="scss">


</style>