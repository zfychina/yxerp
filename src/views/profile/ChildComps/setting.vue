<template>
  <van-sticky>
    <van-row>
      <van-col span="24">
        <van-nav-bar left-arrow title="个人设置" :border='false' @click-left="onClickLeft">
        </van-nav-bar>
      </van-col>
    </van-row>
  </van-sticky>

  <van-row justify="center">
    <van-col span="23" class="cellborder" :accept="accept">
      <setting-item/>
    </van-col>
  </van-row>

  <van-row  justify="center">
    <van-col span="23">
      <div style="margin-top: 40px;">
        <van-button block type="primary" @click="updatepwd">
          修改密码
        </van-button>
      </div>
    </van-col>
  </van-row>

  <van-row  justify="center">
    <van-col span="23">
      <div style="margin-top: 20px;">
        <van-button block type="primary" @click="tologout">
          登出帐号
        </van-button>
      </div>
    </van-col>
  </van-row>
</template>

<script>
import {Toast} from "vant";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import SettingItem from "./SettingItem";

export default {
  name: "setting",
  components: {SettingItem,},

  setup(){
    const router = useRouter()
    const store = useStore()


    // 返回按钮和搜索按钮
    const onClickLeft = () => history.back();


    // 密码修改
    const updatepwd = () =>{
      Toast('密码无法修改，请联系管理员')
    }
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
        router.push({path:'/login'})
      },500)
    }
    return {
      onClickLeft,

      updatepwd,
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