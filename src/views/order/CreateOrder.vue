<template>
  <van-sticky>
    <van-nav-bar title="销售订单" left-arrow fixed @click-left="onClickLeft">
    </van-nav-bar>
  </van-sticky>
    <van-form style="margin-top: 50px" @submit="onSubmit">
<!--  日历选择器-->
      <van-sticky :offset-top="45">
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
            input-style='{width:100%;border:none}'
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
      <van-list>
        <van-swipe-cell v-for="index in state.cellnum" v-bind:key="index">

        <table cellpadding = 10px style="width: 100%">
          <tbody>
            <tr>
              <td style="width: 5%;word-break:break-all">{{ index }}.</td>

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

              <td style="width: 20%;word-break:break-all;font-size: 12PX;" >产品名称</td>
              <td style="width: 20%;word-break:break-all"> <input v-model="goodnum[index]" style="height:30px;width: 70%; border: 0;background-color: #eeeeee"/></td>
              <td style="width: 10%;word-break:break-all;font-size: 12PX;">单位</td>
              <td style="width: 3%"></td>
            </tr>
        </tbody>
        </table>

        <template #right>
          <van-button square type="danger" text="删除" />
        </template>
          <van-divider style="margin: 0 0 0 0"/>
      </van-swipe-cell>
        <P @click="oncellnum" style="height: 80px; color: rgba(0,127,250,0.54); margin-top: 20px">+ 增加行 +</P>
      </van-list>
    </van-form>



  <div class="submit-bar">
    <van-submit-bar :price="3050 * 100" button-text="创建订单" button-color=var(--color-high-text) @submit="onSubmit" />
  </div>

</template>

<script>
import {ref, onMounted, reactive} from 'vue';
import {useRouter} from "vue-router";
import {countOrderhao} from "network/order";
import {customerslist} from "network/customer";
import {goodslist} from "network/good";

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
            restaurant.coding.toLowerCase().indexOf(queryString.toLowerCase()) === 0
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

    //订单商品部分
    const restaurantsgoods = ref([])
    const goodcoding = ref([])
    const goodnum = ref([])
    const state = reactive({
      cellnum: 5,
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
      console.log(goodcoding.value.length)
      console.log(goodcoding.value)
      console.log(goodnum.value)
    }

    return {
      querySearchAsync,
      state,
      oncellnum,
      goodcoding,
      goodnum,
      loadAll,
      handleSelect,
      querySearch,
      onClickLeft,
      onSubmit,
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
    .tr {

  }
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
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 10px;
}
.el-autocomplete-suggestion{
  width: 300px !important;
}


</style>