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

            <field-cell title="订单编号" required colon placeholder="   请输入订单交货编号" name="orderhao" :autodata="state.orderhaodata" :data="orderhao" @inputvalue="receiveorderhaovalue" @onfocus="orderhaoonfocus" @onblur="orderhaoonblur"></field-cell>
            <field-cell title="客户名称" required colon placeholder="   请输入货主名称" name="customer" :autodata="state.customerdata" :data="customer" @inputvalue="receivecustomervalue" @onfocus="customeronfocus" @onblur="customeronblur"></field-cell>
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
import {Dialog, Toast} from "vant";
import FieldCell from "components/content/FieldCell";
import {customerslist} from "network/customer";
import {orderhaolist, countOrderhao, getOrderdetail, createorder, updateorder, deleteorder} from "network/order";
import FieldCellList from "components/content/FieldCellList";
import {customerscount} from "network/customer";
import {useRoute} from "vue-router";

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
      ],

      // 客户是否存在
      customerscount: false
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
    // 接收数据
    const route =useRoute();
    onMounted(() => {
      delivery.value = addDate()
      orderhao.value = route.query.order
      orderhaoonblur()

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
        state.customerdata = res
      })
    }

    // 客户数据
    const receivecustomervalue = (value) => {
      customer.value = value
      getcustomerlist(customer.value)
    }
    // 聚焦
    const customeronfocus = () => {
      getcustomerlist()
    }

    // 失焦 校验订单名称是否存在
    const orderhaoonblur = () => {
      // 校验客户名称是否存在，如果不存在，重新选择或者跳转新建
      if (orderhao.value) {
        countOrderhao(orderhao.value).then(res=>{
          if (res.count > 0) {
            Dialog.confirm({
              message: '是否打开已存在的订单？',
            })
              .then(() => {
                // on confirm
                getOrderdetail(orderhao.value).then(res=>{
                  delivery.value = res[0].order.delivery.split(' ')[0]
                  orderhao.value = res[0].order.orderhao
                  customer.value = res[0].order.customer
                  message.value = res[0].order.remarks
                  state.skulist = []
                  for (let i in res){
                    console.log(res[i]);
                    state.skulist.push({
                      coding:res[i].sku.coding,
                      quantity:res[i].quantity,
                      name:res[i].sku.name,
                      unit:res[i].sku.unit,
                    })
                  }
                  state.skulist.push({},{})

                  // 检查客户名称属性
                  state.customerscount = true
                })
              })
              .catch(() => {
                // on cancel
              });
          }
        })}
    }

    // 失焦 校验客户名称是否存在
    const customeronblur = () => {
      // 校验客户名称是否存在，如果不存在，重新选择或者跳转新建
      if (customer.value) {
      customerscount(customer.value).then(res=>{
        if (res.count === 0) {
          state.customerscount = false
          Toast({message: '客户名称不存在，请重新选择', duration: 2000})
        } else {state.customerscount = true}
      })}
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

    // 删除按钮
    const onClickRight = () => {
      if(orderhao.value){
        Dialog.confirm({
          message: `删除订单，请点击"确认"`,
        })
            .then(() => {
              // 删除订单
              deleteorder({orderhao:orderhao.value}).then(res=>{
                Toast(res)
              })
            })
            .catch(() => {
              // on cancel
            });

      }else {Toast('请输入订单编号')}
    }

    // 保存/更新按钮
    const onSubmit = () => {
      const data = {}

      // 检查销售订单是否输入
      if (!orderhao.value) {
        Toast({message: '请输入销售订单编号', duration: 1000})
        return
      }
      // 检查客户名称是否输入
      if (!customer.value || !state.customerscount){
        Toast({message:'客户未选择或者选择错误', duration: 1000 })
        return
      }

      data.delivery = delivery.value
      data.orderhao = orderhao.value
      data.customer = customer.value

      data.remarks = message.value
      data.sku = []

      for (let i in state.skulist){
        if(state.skulist[i]?.coding && state.skulist[i]?.quantity) {
          data.sku.push({coding:state.skulist[i]?.coding, name:state.skulist[i]?.name, quantity:state.skulist[i]?.quantity})
        }
      }

      if (data.sku.length === 0) {
        Toast({message:'产品编号有误或未添加产品数量', duration: 1000 })
        return
      }

      state.skulist = data.sku
      state.skulist.push({},{})

      // 校验订单编号是否重复----->如果重复，提示是否复盖，不重复直接创建
      countOrderhao(data.orderhao).then(res=>{
        if (res.count >= 1) {
          // 订单已存在，弹出对话框选择是覆盖 还是取消
          console.log('订单已存在，弹出对话框选择是覆盖 还是取消');
            Dialog.confirm({
              message: `订单编号已存在，需要更新原订单，请点击"确认"`,
            }).then(() => {
              // 覆盖原订单
              updateorder(data).then(res=>{
                if(res === 'ok'){
                  Toast.success('订单更新成功')
                } else {
                  Toast("在订单列表页面打开，查看是否更新成功")
                }
              })
            })
            .catch(() => {
              // on cancel
            });
        } else {
          // 订单不存在，创建订单执行下面的代码
          createorder(data).then(res=>{
            if(res === 'ok'){
              Toast.success('订单创建成功')
            } else {
              Toast("在订单列表页面打开，查看是否创建成功")
            }
          })
        }
      })
    }


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
      orderhaoonblur,
      customeronfocus,
      customeronblur,

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