<template>
  <van-sticky>
    <van-row>
      <van-col span="24">
        <van-nav-bar left-arrow title="创建采购订单" :border='false' @click-left="onClickLeft" @click-right="onClickRight">
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
            <!--            订单交期-->
            <van-field v-model="delivery" name="delivery" label="订单交期" placeholder="点击选择订单交货日期" @click="showCalendar = true" readonly required colon is-link arrow-direction="down"/>
            <van-calendar row-height="53" v-model:show="showCalendar" @confirm="onConfirm" :show-confirm="false" color="#1989fa" :min-date="minDate" :max-date="maxDate" :formatter="formatter" round="false" show-title="false"/>

            <field-cell title="订单编号" required colon placeholder="   请输入生产订单编号" name="orderhao" :autodata="state.orderhaodata" :data="orderhao" @inputvalue="receiveorderhaovalue" @onfocus="orderhaoonfocus" @onblur="orderhaoonblur"></field-cell>

            <field-cell title="生产线名" required colon placeholder="   请输入生产线名" name="productline" :autodata="state.productlinedata" :data="productline" @inputvalue="receiveproductlinevalue" @onfocus="productlineonfocus" @onblur="productlineonblur"></field-cell>

<!--            <field-cell title="销售订单" colon placeholder="   请输入源销售订单编号" name="xsorderhao" :autodata="state.xsorderhaodata" :data="xsorderhao" @inputvalue="receivexsorderhaovalue" @onfocus="xsorderhaoonfocus" @onblur="xsorderhaoonblur"></field-cell>-->

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

</template>

<script>

import FieldCell from "components/content/FieldCell";
import FieldCellList from "components/content/FieldCellList";
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {Dialog, Toast} from "vant";
import {orderCGlist, countOrderCG, getOrderCGdetail, supplierlist, supplierount, createorderCG, updateorderCG, deleteorderCG} from "network/unsettled";


export default {
  name: "createorderCG",
  components: {FieldCell, FieldCellList},
  setup() {
    // 订单交期
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

    // 订单编号
    // 订单列表  订单数据
    // 获取生产订单列表
    const getorderSClist = (query) => {
      console.log(productline.value);
      orderCGlist( query, productline.value).then(res => {
        console.log(res);
        state.orderhaodata = res
      })
    }
    const receiveorderhaovalue = (value) => {
      console.log(value, 'receiveorderhaovalue');
      orderhao.value = value
      getorderSClist(orderhao.value, )
    }
    const orderhaoonfocus = () => {
      console.log(state.orderhaodata);
      state.orderhaodata = []
      getorderSClist(orderhao.value)
    }
    // 失焦 校验订单名称是否存在
    const orderhaoonblur = () => {
      setTimeout(() => {}, 10);
      console.log(orderhao.value);
      // 校验生产订单是否存在
      if (orderhao.value) {
        countOrderCG(orderhao.value).then(res=>{
          console.log(res);
          if (res.count > 0) {
            Dialog.confirm({message: '是否打开已存在的订单？',}).then(() => {
              // on confirm
              getOrderCGdetail(orderhao.value).then(res=>{
                console.log(res);
                if (res.count===0){
                  //先清空前面的遗留数据
                  state.skulist = [{},{},{},{},{},{}]
                  Toast('此订单无产品详情')
                }else {
                  delivery.value = res.results[0].order.delivery.split(' ')[0]
                  orderhao.value = res.results[0].order.order
                  productline.value = res.results[0].order.supplier.shortname
                  message.value = res.results[0].order.remarks
                  xsorderhao.value = res.results[0].xs_order
                  state.skulist = []
                  for(let i in res.results){
                    state.skulist.push({
                      id:res.results[i].sku.id,
                      coding:res.results[i].sku.coding,
                      name:res.results[i].sku.name,
                      unit:res.results[i].sku.unit,
                      quantity:res.results[i].quantity,
                      quantityed:res.results[i].quantityed,
                    })
                  }


                  // skulist最后一行是否为空，不为空则增加两行空值
                  if ( JSON.stringify(state.skulist[state.skulist.length - 1]) !== '{}'){
                    state.skulist.push({},{})
                  }
                }
              })
            }).catch(() => {
              // on cancel
            });
          } else {
            // Toast('此订单没有未完成的产品,请重新输入')
            console.log(res);
          }
        })}
    }

    // 生产线名
    // 获取客户列表
    const getproductlinelist = (query) => {
      supplierlist(query).then(res => {
        state.productlinedata = res
        console.log(res);
      })
    }
    const receiveproductlinevalue = (value) => {
      productline.value = value
      getproductlinelist(productline.value)
    }
    // 聚焦
    const productlineonfocus = () => {
      getproductlinelist()
    }
    // 失焦 校验客户名称是否存在
    const productlineonblur = () => {
      // 校验客户名称是否存在，如果不存在，重新选择或者跳转新建
      setTimeout(() => {}, 10);
      if (productline.value) {
        supplierount(productline.value).then(res=>{
          if (res.count === 0) {
            state.productlinecount = false
            Toast({message: '客户名称不存在，请重新选择', duration: 2000})
          } else {state.productlinecount = true}
        })}
    }

    // 详情列表
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

    // 数据
    const delivery = ref('')
    const message = ref('')
    const orderhao = ref('')
    const xsorderhao = ref('')
    const productline = ref('');
    const state = reactive({
      orderhaodata: [],
      xsorderhaodata: [],
      productlinedata: [],
      skulist: [
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      // 客户/供应商/生产线是否存在
      productlinecount: false
    })

    // 接收数据
    const route =useRoute();
    onMounted(() => {
      delivery.value = addDate()
      orderhao.value = route.query.order
      // if(orderhao.value){
      //   orderhaoonblur(orderhao.value)
      // }
    });

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
              deleteorderCG({'order':orderhao.value}).then(res=>{
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
      let data = {}
      data.delivery = delivery.value
      if (!data.delivery){
        Toast({message:'请输入订单交货期', duration: 1000 })
        return
      }
      data.order = orderhao.value
      if (!data.order){
        Toast({message:'请输入订单编号', duration: 1000 })
        return
      }
      data.productline = productline.value
      if (!data.productline){
        Toast({message:'请选择生产线', duration: 1000 })
        return
      }
      data.remarks = message.value

      data.sku = []
      for (let i in state.skulist){
        // if ( JSON.stringify(state.skulist[i]) === '{}'){
        //   continue
        // }

        if(state.skulist[i]?.coding && state.skulist[i]?.quantity && Number(state.skulist[i]?.quantity) !== 0) {
          data.sku.push({coding:state.skulist[i]?.coding, name:state.skulist[i]?.name, unit:state.skulist[i]?.unit, quantity:state.skulist[i]?.quantity})
        }
      }
      if (data.sku.length === 0){
        Toast({message:'产品编号有误或未添加产品数量', duration: 1000 })
        return
      }
      state.skulist = data.sku
      state.skulist.push({},{})

      // 校验订单编号是否重复
      console.log(data, data.sku);
      countOrderCG(data.order).then(res=> {
        console.log(res);
        if (res.count >= 1) {
          // 订单已存在，弹出对话框选择是覆盖 还是取消
          console.log(data);
          Dialog.confirm({
            message: `订单编号已存在，需要更新原订单，请点击"确认"`,
          }).then(() => {
            // 覆盖原订单
            updateorderCG(data).then(res=>{
              if(res === 'ok'){
                Toast.success('订单更新成功')
              } else {
                Toast("在订单列表页面打开，查看是否更新成功")
              }
            })
          }).catch(() => {
            // on cancel
          });
        } else {
          // 订单不存在，创建订单执行下面的代码
          createorderCG(data).then(res=>{
            if(res === 'ok'){
              Toast.success('订单创建成功')
            } else {
              Toast("重新打开订单，查看是否创建成功")
            }
          })
        }
      })
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
    return {
      // themeVars 内的值会被转换成对应 CSS 变量
      themeVars,

      // 数据
      state,
      message,
      delivery,
      orderhao,
      xsorderhao,
      productline,

      // 订单交期
      showCalendar,
      onConfirm,
      formatter,
      minDate: new Date(2019, 0, 1),
      maxDate: new Date(2050, 11, 31),

      // 订单编号
      receiveorderhaovalue,
      orderhaoonfocus,
      orderhaoonblur,

      // 生产线名
      receiveproductlinevalue,
      productlineonfocus,
      productlineonblur,

      // 详情列表
      receiveskulistvalue,

      onClickLeft,
      onClickRight,

      onSubmit,
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