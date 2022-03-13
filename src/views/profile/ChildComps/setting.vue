<template>
  <van-sticky>
    <van-row>
      <van-col span="24">
        <van-nav-bar left-arrow title="个人设置" :border='false' @click-left="onClickLeft">
        </van-nav-bar>
      </van-col>
    </van-row>
  </van-sticky>

  <p>1</p>  <p>1</p>  <p>1</p>  <p>1</p>  <p>1</p>  <p>1</p>  <p>1</p>
  <p>1</p>  <p>1</p>  <p>1</p>  <p>1</p>  <p>1</p>  <p>1</p>  <p>1</p>


  <div style="margin: 16px;">
    <van-button block type="primary" @click="tologout">
      登出
    </van-button>
  </div>
</template>

<script>
import {Toast} from "vant";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
  name: "setting",

  setup(){
    const router = useRouter()
    const store = useStore()


    // 返回按钮和搜索按钮
    const onClickLeft = () => history.back();

    // 退出登录
    const tologout = ()=>{
      // 清除boken window.localStroage
      window.localStorage.setItem('token', "")
      sessionStorage.clear();
      localStorage.clear();
      Toast.success('退出成功')

      // 在vuex isLogin
      store.commit('setIsLogin', false);
      setTimeout(()=>{
        router.push({path:'/'})
      },500)
    }
    return {
      onClickLeft,
      tologout,
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