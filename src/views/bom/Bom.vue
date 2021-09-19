<template>
  <van-sticky>
    <van-nav-bar title="BOM" left-arrow fixed @click-left="onClickLeft">
    </van-nav-bar>
    </van-sticky>

  <van-sticky>
    <div style="background-color:#ffffff;margin-top: 46px;text-align:center;width: 100%">
      <img src="~assets/images/search.svg" style="height: 20px;width: 20px;margin: 0px 10px 0 0"/>
      <el-autocomplete
          input-style='width:100%'
          :popper-append-to-body="false"
          v-model="coding"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入需要查询的产品编号或名称"
          @select="handleSelect"
          clearable
          value-key="coding"
          debounce="0"
          >
          <template #default="{ item }">
            <div class="name">{{ item.coding }} : {{ item.name }}</div>
          </template>
      </el-autocomplete>

      <p/>

      <div style='margin-top: 15px;text-align: center;font-weight: bold;margin-left: 30px;font-family: "微软雅黑", "仿宋", sans-serif;'>
      {{codingname.coding}} {{codingname.name}}
      </div>

      <van-divider
          :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 10px' }"
      >
        BOM展开
      </van-divider>

      <table class="table-order">
        <thead>
        <tr>
          <th>序号</th>
          <th>产品编号</th>
          <th>产品名称</th>
          <th>BOM</th>
          <th>单位</th>
        </tr>
        </thead>
      </table>

    </div>
  </van-sticky>

  <div>

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

              <td style="width: 30%;word-break:break-all">
                <el-autocomplete
                  v-model="goodcoding[index]"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="输入产品编号"
                  @select="handleSelectbom"
                  :trigger-on-focus="false"
                  clearable
                  value-key="coding"
                  debounce="0"
              >
                <template #default="{ item }">

                  <div class="name">{{ item.coding }}</div>
                  <p class="addr">&{{ item.name }}</p>
                </template>
              </el-autocomplete>
              </td>

              <td style="width: 20%;word-break:break-all;font-size: 12PX;" >{{ goodname[index] }}</td>
              <td style="width: 20%;word-break:break-all"> <input v-model="bomnum[index]" style="height:30px;width: 70%; border: 0;background-color: #eeeeee"/></td>
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

  </div>

</template>

<script>
import {useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import {goodslist} from "network/good";
import {Dialog, Toast} from "vant";
import {getbomdetail} from "../../network/bom";

export default {
  name: "Bom",
  setup() {
    const router = useRouter()
    // 带建议输入用
    const restaurants = ref([])
    const coding = ref('');
    const codingname = ref('')

    // 带搜索输入,物料编码查询
    let timeout;
    const querySearchAsync = (queryString, cb)=> {
      goodslist(queryString).then(res=>{
        restaurants.value =res
        // console.log(res);
      })
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(restaurants.value);
      }, 300);
    }

    const handleSelect = (item) => {
      console.log(item.id);
      codingname.value = item

      // 查询产品BOM 并赋值
      getbomdetail(codingname.value.id).then((res)=>{
        console.log(res);
        if(res[0]) {
          state.cellnum = res[0].subs.length + 3
          goodcoding.value = []
          bomnum.value = []
          goodname.value = []
          goodunit.value = []

          console.log(state.cellnum);
          console.log(res[0].subs);

          for (let i in res[0].subs) {
            console.log(i, res[0].subs[i].coding.split(':')[1]);
            goodcoding.value[Number(i)+1] = res[0].subs[i].coding.split(':')[1]
            bomnum.value[Number(i)+1] = res[0].subs[i].stock
            goodname.value[Number(i)+1] = res[0].subs[i].coding.split(':')[2]
            goodunit.value[Number(i)+1] = res[0].subs[i].coding.split(':')[4]


          }
          console.log(goodcoding.value);
        }
      })
    };

    onMounted(() => {
      restaurants.value = loadAll();
      console.log(restaurants.value);
    });
    // 客户数据加载
    const loadAll = () => {
      let arr1=[]
      goodslist().then(res=>{
        // 将json对象转换成列表
        for(let i in res){
          arr1.push(res[i])
        }
      })
      return arr1
    };

    const onClickLeft = () => {
      router.go(-1)
    }


    // 下拉刷新
    const state = reactive({
      cellnum: 5,
      loading: false,
      finished: true,
      refreshing:false,
      list: []
    })
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
    // BOM列表
    const restaurantsgoods = ref([])
    const goodcoding = ref([])
    const bomnum = ref([])
    const goodname = ref([])
    const goodunit = ref([])




    const handleSelectbom = (item) => {
      for (let i in goodcoding.value) {
        if (item.coding.indexOf(goodcoding.value[i])===0){
          goodname.value[i]=item.name
          goodunit.value[i]= item.unit
        }
      }
    };

    // 侧滑 清除 内容
    const cleargood = (index) => {
      Dialog.confirm({
        message: '确认清除吗？',
      })
          .then(() => {
            // on confirm
            delete goodcoding.value?.[index]
            delete bomnum.value?.[index]
            delete goodname.value?.[index]
            delete goodunit.value?.[index]
            Toast('清除成功')

          })
          .catch(() => {
            // on cancel
          });

    };

    // 增加行
    const oncellnum = ()=>{
      state.cellnum += 1
    }
    return{
      restaurantsgoods,
      goodcoding,
      bomnum,
      goodname,
      goodunit,
      state,
      onRefresh,
      coding,
      codingname,
      onClickLeft,
      querySearchAsync,
      handleSelect,
      handleSelectbom,
      oncellnum,
      cleargood,
    }
  }
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

/deep/ .el-autocomplete-suggestion{
  width: auto!important;
}
</style>