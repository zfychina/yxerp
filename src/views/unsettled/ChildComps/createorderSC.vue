<template>
  <van-sticky>
    <van-nav-bar title="生产订单" left-arrow fixed @click-left="onClickLeft" right-text="删除" @click-right="deleteSubmit">
    </van-nav-bar>
  </van-sticky>
  <van-form style="margin-top: 50px" @submit="onSubmit">
    <!--  日历选择器-->
    <van-sticky :offset-top="45">
      <van-field
          required
          colon
          v-model="delivery"
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
          v-model.trim="order"
          name="order"
          label="生产订单"
          placeholder="请输入生产订单编号"
          :rules="[{ validator, message: '已读取此订单号内容' }]"

      />
      <!--客户编号-->
      <!--ELEMENT-->
      <van-cell>
        <nobr class="sub-title"><nobr style="color:red;">*</nobr>生&nbsp;产&nbsp;线:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-autocomplete
              input-style='width:100%;border:none'
              resize="horizontal "
              class="inline-input"
              v-model="productline"
              :fetch-suggestions="querySearch"
              placeholder="请输入生产线"
              @select="handleSelect"
              clearable
              name="productline"
              value-key="shortname"
          />
        </nobr>
      </van-cell>
      <!--技术要求-->
      <van-field
          v-model="remarks"
          rows="1"
          autosize
          label="技术要求:"
          type="textarea"
          placeholder="请输入技术要求"
          border
      />


      <!--    订单商品-->
      <table class="table-order">
        <thead>
        <tr>
          <th>序号</th>
          <th>产品编号</th>
          <th>产品名称</th>
          <th>数量</th>
          <th>单位</th>
        </tr>
        </thead>
      </table>
    </van-sticky>

    <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
      <van-list
          v-model:loading="state.loading"
          :finished="state.finished"
          @load="onLoad">
        <van-swipe-cell v-for="index in state.cellnum" v-bind:key="index">

          <table cellpadding = 8px style="width: 100%">
            <tbody>
            <tr>
              <td style="width: 7%;word-break:break-all">{{ index }}.</td>

              <td style="width: 30%;word-break:break-all"><el-autocomplete
                  v-model="goodcoding[index]"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="输入产品编号"
                  @select="handleSelect"
                  :trigger-on-focus="false"
                  clearable
                  value-key="coding"
                  debounce="0"
              >
                <template #default="{ item }">

                  <div class="name">{{ item.coding }}</div>
                  <p class="addr">&{{ item.name }}</p>
                </template>
              </el-autocomplete></td>

              <td style="width: 20%;word-break:break-all;font-size: 12PX;" >{{ goodname[index] }}</td>
              <td style="width: 20%;word-break:break-all"> <input v-model="goodnum[index]" style="height:30px;width: 70%; border: 0;background-color: #eeeeee"/></td>
              <td style="width: 10%;word-break:break-all;font-size: 12PX;">{{ goodunit[index] }}</td>
              <td style="width: 3%"></td>
            </tr>
            </tbody>
          </table>

          <template #right>
            <van-button square type="danger" text="清除" @click="cleargood(index)"/>
          </template>
          <van-divider style="margin: 0 0 0 0"/>
        </van-swipe-cell>
        <P @click="oncellnum" style="height: 80px; color: rgba(0,127,250,0.54); margin-top: 15px">+ 增加行 +</P>
      </van-list>
    </van-pull-refresh>

  </van-form>


  <div class="submit-bar">
    <van-submit-bar :price="total * 100" currency="" button-text="创建订单" button-color=var(--color-high-text) @submit="onSubmit" />
  </div>
</template>

<script>
import {ref, onMounted, reactive, computed} from 'vue';
import {useRouter} from "vue-router";
import {productlinelist, countOrderSC, getOrderSCdetail, createorderSC, updateorderSC, deleteorderSC} from "network/unsettled";
import {goodslist} from "network/good";
import {Toast, Dialog} from "vant";

export default {
  name: "createorderSC",
  setup() {
    const router = useRouter()
    // 带建议输入用
    const restaurants = ref([])

    // 订单data
    const showCalendar = ref(false);
    const onConfirm = (date) => {
      delivery.value = `${date.getYear() + 1900}-${date.getMonth() + 1}-${date.getDate()}`;
      showCalendar.value = false;
    };

    const delivery = ref('');
    const order = ref('');
    const productline = ref('');
    const remarks = ref('');

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
            // 这里设置搜索的字段
            restaurant.shortname.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    };
    const handleSelect = (item) => {
      for (let i in goodcoding.value) {
        if (item.coding.indexOf(goodcoding.value[i])===0){
          goodname.value[i]=item.name
          goodunit.value[i]= item.unit
        }
      }
    };
    onMounted(() => {
      restaurants.value = loadAll();
    });
    // 生产线数据加载
    const loadAll = () => {
      let arr1=[]
      productlinelist().then(res=>{
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

    //订单商品部分
    const restaurantsgoods = ref([])
    const goodcoding = ref([])
    const goodnum = ref([])
    const goodname = ref([])
    const goodunit = ref([])
    const state = reactive({
      cellnum: 5,
      loading: false,
      finished: true,
      refreshing: false,
      list: []
    })
    // 产品数据加载
    let timeout;
    const querySearchAsync = (queryString, cb)=> {
      goodslist(queryString).then(res=>{
        restaurantsgoods.value =res
      })
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(restaurantsgoods.value);
      }, 300);
    }
    // 增加行
    const oncellnum = ()=>{
      state.cellnum += 1
    }
    // 提交创建
    const onSubmit=()=>{
      let data = {}
      console.log(order.value, goodcoding.value);
      data.delivery = delivery.value
      if (!data.delivery){
        Toast({message:'请输入订单交货期', duration: 1000 })
        return
      }
      data.order = order.value
      if (!data.order){
        Toast({message:'请输入订单编号', duration: 1000 })
        return
      }
      data.productline = productline.value
      if (!data.productline){
        Toast({message:'请输入选择客户编号', duration: 1000 })
        return
      }
      data.remarks = remarks.value
      data.sku = []
      for (let i in goodcoding.value){
        if(!goodname.value[i] || !goodnum.value[i] || parseInt(goodnum.value[i]) === 0){
          continue
        }

        data.sku.push({'coding':goodcoding.value[i], 'quantity':goodnum.value[i]})
      }
      if (data.sku.length === 0){
        Toast({message:'产品编号有误或未添加产品数量', duration: 1000 })
        return
      }

      // 校验订单编号是否重复
      console.log(data);
      countOrderSC(data.order).then(res=> {
        if (res.count >= 1) {
          // 订单已存在，弹出对话框选择是覆盖 还是取消
          console.log(data);
          Dialog.confirm({
            message: `订单编号已存在，需要更新原订单，请点击"确认"`,
          })
              .then(() => {
                // 覆盖原订单
                updateorderSC(data).then(res=>{
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
          createorderSC(data).then(res=>{
            if(res === 'ok'){
              Toast.success('订单创建成功')
            } else {
              Toast("重新打开订单，查看是否创建成功")
            }
          })
        }
      })
    }

    // 下拉刷新
    const onRefresh = () => {
      // 清空列表数据
      state.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      onLoad();
    };
    // 列表
    const onLoad = () => {
      setTimeout(() => {
        if (state.refreshing) {
          //state.list = [];
          state.refreshing = false;
        }

        for (let i = 0; i < 2; i++) {
          state.list.push(state.list.length + 1);
        }
        state.loading = false;

        if (state.list.length >= 10) {
          state.finished = true;
        }
      }, 1000);
    };

    // 校验  检查订单号是否存在，如果存在，是否打开已存在的订单
    // const validator = (val) => /1\d{10}/.test(val);
    const validator = (val) => countOrderSC(val).then(res => {
      if(res.count >= 1) {
        Dialog.confirm({
          message: '是否打开已存在的订单？',
        })
            .then(() => {
              // on confirm
              getOrderSCdetail(val).then(res=>{
                if (res.count===0){
                  //先清空前面的遗留数据

                  goodcoding.value = []
                  goodname.value = []
                  goodunit.value = []
                  goodnum.value = []
                  Toast('此订单无产品详情')
                }else {
                  state.cellnum = res.count + 3
                  delivery.value = res.results[0].order.delivery.split(" ")[0]
                  productline.value = res.results[0].order.supplier
                  remarks.value = res.results[0].order.remarks

                  //先清空前面的遗留数据
                  goodcoding.value = []
                  goodname.value = []
                  goodunit.value = []
                  goodnum.value = []
                  for(let i in res.results){
                    goodcoding.value[parseInt(i)+1] = res.results[i].sku.split(":")[1]
                    goodname.value[parseInt(i)+1] = res.results[i].sku.split(":")[2]
                    goodunit.value[parseInt(i)+1] = res.results[i].sku.split(":")[4]
                    goodnum.value[parseInt(i)+1] = res.results[i].quantity
                  }
                }
              })
            })
            .catch(() => {
              // on cancel
            });
      }
      return res.count < 1
    })

    // 删除按钮
    const deleteSubmit = ()=>{
      if(order.value){
        Dialog.confirm({
          message: `删除订单，请点击"确认"`,
        })
            .then(() => {
              // 删除订单
              deleteorderSC({'order':order.value}).then(res=>{
                Toast(res)
              })
            })
            .catch(() => {
              // on cancel
            });

      }else {Toast('请输入订单编号')}
    }

    // 通过计算属性 计算数量列的和
    const total = computed(()=> {
      let sum = 0;
      for (let i in goodnum.value){
        sum +=  parseInt(goodnum.value[i])
      }
      return sum;
    })

    // 侧滑 清除 内容
    const cleargood = (index) => {
      Dialog.confirm({
        message: '确认清除吗？',
      })
          .then(() => {
            // on confirm
            delete goodcoding.value?.[index]
            delete goodnum.value?.[index]
            delete goodname.value?.[index]
            delete goodunit.value?.[index]
            Toast('清除成功')

          })
          .catch(() => {
            // on cancel
          });

    };

    return {
      remarks,
      total,
      onRefresh,
      querySearchAsync,
      state,
      oncellnum,
      goodcoding,
      goodnum,
      goodname,
      goodunit,
      loadAll,
      handleSelect,
      querySearch,
      onClickLeft,
      onSubmit,
      onConfirm,
      showCalendar,
      order,
      delivery,
      productline,
      validator,
      cleargood,
      deleteSubmit,

    };
  },
}
</script>

<style scoped>
.table-order {
  background-color: #ffffff;
  border-collapse: separate;
  border-spacing: 10px 0px;
  width: 100%;
  height: 40px;
  margin-left: 8px;
}
.table-order thead {
  margin-left: 0;
  text-align: left;
  background-color: #ffffff;
  font-size: 12PX;
  color: rgba(131,135,137,0.54);
}
.van-swipe-cell {
  margin-top: 10px;
  margin-left: 8px;
  width: 100%;
}
.van-swipe-cell tbody {
  height: 40px;
  font-family: "微软雅黑", "仿宋", sans-serif;

}

.submit-bar {
  background-color: #f6f6f6;
  display: flex;
  position: fixed;
  z-index: 98;
  left: 0;
  right: 0;
  margin-bottom: 10px;
}
</style>