<template>
  <van-sticky>
    <van-row>
      <van-col span="24">
        <van-nav-bar left-arrow title="创建销售订单" :border='false' @click-left="onClickLeft" @click-right="onClickRight">
          <template #right>
            <van-icon name="delete-o" size="22" />
          </template>
        </van-nav-bar>
      </van-col>
    </van-row>
  </van-sticky>


  <van-row justify="center">
    <van-col span="24">
      <van-config-provider :theme-vars="themeVars">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field v-model="delivery" name="delivery" label="订单交期" placeholder="点击选择订单交货日期" @click="showCalendar = true" readonly required colon is-link arrow-direction="down"/>
              <van-calendar row-height="53" v-model:show="showCalendar" @confirm="onConfirm" :show-confirm="false" color="#1989fa" :min-date="minDate" :max-date="maxDate" :formatter="formatter" round="false" show-title="false"/>
<!--            <van-field v-model="orderhao" name="orderhao" label="订单编号" placeholder="请输入订单交货编号" clearable required colon clickable is-link arrow-direction="down"/>-->
<!--            <van-field  v-model="customer" name="customer" label="客户名称" placeholder="请输入货主名称" clearable required colon clickable is-link arrow-direction="down"/>-->

            <field-cell title="订单编号" required colon placeholder="   请输入订单交货编号" name="orderhao" :autodata="state.orderhaodata" :data="orderhao" @inputvalue="receiveorderhaovalue" @onfocus="orderhaoonfocus"></field-cell>
            <field-cell title="客户名称" required colon placeholder="   请输入货主名称" name="customer" :autodata="state.customerdata" :data="customer" @inputvalue="receivecustomervalue" @onfocus="customeronfocus"></field-cell>
            <van-field  style="background-color: #fafafa" v-model="message" name="message" rows="1" autosize label="信息备注" type="textarea" colon clickable />

            <field-cell-list :skulist="state.skulist" @inputvalue="receiveskulistvalue"></field-cell-list>

          </van-cell-group>
          <div style="margin: 16px;">
            <van-button block type="primary" native-type="submit">
              保存
            </van-button>
          </div>
        </van-form>
      </van-config-provider>

    </van-col>
  </van-row>


<!--  <van-row justify="center">-->
<!--    <van-col span="23">-->
<!--      <van-button type="primary" block @click="submit">保存</van-button>-->
<!--    </van-col>-->
<!--  </van-row>-->

</template>

<script>
import {onMounted, reactive, ref} from "vue"
import {Toast } from "vant";
import FieldCell from "components/content/FieldCell";
import {customerslist} from "network/customer";
import {orderhaolist} from "network/order";
import FieldCellList from "components/content/FieldCellList";

export default {
  name: "CreateOrder",
  components: {FieldCellList, FieldCell},
  setup() {
    const showCalendar = ref(false);
    const formatter = (day) => {
      const month = day.date.getMonth() + 1;
      const date = day.date.getDate();
      const nowDate = new Date();

      if (month === nowDate.getMonth() + 1 && date === nowDate.getDate()) {
        day.bottomInfo = '今天';
        }
      return day;
    }
    const onConfirm = (date) => {
      delivery.value = `${date.getYear() + 1900}-${date.getMonth() + 1}-${date.getDate()}`;
      showCalendar.value = false;
    };

    const delivery = ref('')
    const orderhao = ref('')
    const customer = ref('')
    const message = ref('')

    const state = reactive({
      orderhaodata: [],
      customerdata: [],

      skulist: [
        {},
        {},
        {},
        {},
        {},
        {},
      ]
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

    onMounted(() => {
      delivery.value = addDate()
    });
    // 获取系统当前日期
    const addDate = () =>{
      const nowDate = new Date();
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      }
      const newmonth = date.month>9?date.month:'0'+date.month
      const day = date.date>9?date.date:'0'+date.date
      return date.year + '-' + newmonth + '-' + day
    };

    // 获取客户列表
    const getcustomerlist = (query) => {
      customerslist(query).then(res => {
        console.log(res);
        state.customerdata = res
      })
    }

    // 客户数据
    const receivecustomervalue = (value) => {
      customer.value = value
      getcustomerlist(customer.value)
    }
    const customeronfocus = () => {
      getcustomerlist()
    }

    // 获取销售订单列表
    const getorderhaolist = (query) => {
      orderhaolist( query).then(res => {
        console.log(res);
        state.orderhaodata = res
      })
    }

    // 订单数据
    const receiveorderhaovalue = (value) => {
      orderhao.value = value
      getorderhaolist(orderhao.value)
    }
    const orderhaoonfocus = () => {
      // state.orderhaodata = []
      getorderhaolist()
    }

    const onSubmit = (value) => {
      console.log('submit', value);
      Toast.success('保存成功');
    }

    // themeVars 内的值会被转换成对应 CSS 变量
    const themeVars = {
      fieldLabelColor: '#02519E8C',
      fieldLabelMarginRight: '8px',
      fieldLabelWidth: '80px',
      fieldClearIconSize: '14px',

      calendarBackgroundColor: '#fafafa',
      calendarHeaderBoxShadow: '0 1px 5px rgba(2, 81, 158, 0.55)',
      calendarPopupHeight: '60%',
      calendarMonthMarkColor: '#02519E17',
      calendarMonthMarkFontSize: '200px',

    };

    // 返回按钮和搜索按钮
    const onClickLeft = () => history.back();
    const onClickRight = () => Toast('删除成功');

    // 保存按钮

    // 删除按钮

    return {
      state,
      delivery,
      orderhao,
      customer,
      message,

      receivecustomervalue,
      receiveorderhaovalue,
      receiveskulistvalue,
      orderhaoonfocus,
      customeronfocus,

      showCalendar,
      onConfirm,
      formatter,
      minDate: new Date(2019, 0, 1),
      maxDate: new Date(2050, 11, 31),

      themeVars,

      onSubmit,

      onClickLeft,
      onClickRight,

    };
  },
}

</script>

<style scoped>

/*信息备注 样式*/
.van-field {
  font-size: 14px;
  line-height: 2;
  border: 1px solid;
  border-color: var(--color-border);
  margin: 15px 0 15px 0
}

</style>