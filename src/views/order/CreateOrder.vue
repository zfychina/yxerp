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



    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        创建
      </van-button>
    </div>
  </van-form>


</template>

<script>
import { ref } from 'vue';
import {useRouter} from "vue-router";
import {countOrderhao} from "network/order";

export default {
  name: "CreateOrder",
  setup() {
    const router = useRouter()

    // 订单data
    const showCalendar = ref(false);
    const onConfirm = (date) => {
      orderdate.value = `${date.getYear() + 1900}年${date.getMonth() + 1}月${date.getDate()}日`;
      showCalendar.value = false;
    };

    const orderdate = ref('');
    const orderhao = ref('');
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


    // 返回上一页
    const onClickLeft = () => {
      router.go(-1)
    }
    return {
      onClickLeft,

      onConfirm,
      showCalendar,
      validator,
      orderhao,
      orderdate,
    };
  },

}
</script>

<style scoped>

</style>