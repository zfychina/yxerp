<template>
   <div>
    <van-nav-bar title="登录" >

    </van-nav-bar>
  </div>

  <van-image
      width=100%
      height=auto
      fit="scale-down"
      src="http://s.zfychina.cn/R_logo.jpg"
  />

  <van-form  style="margin-top: 30px" @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="state.username"
            name="username"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="state.password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
            v-model="state.img_code"
            name="value1"
            center
            clearable
            label="验证码"
            placeholder="请输入图片验证码"
            :rules="[{ required: true, message: '请输入验证码' }]"
        >
          <template #right-icon>
            <van-image width=100 height="30" :src="img_code_url['img_code_url']" @click="onimg"/>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit" @click="onsubmit">
          登录
        </van-button>
      </div>
    </van-form>
  <div class="reg" style="margin: 10px; font-size: 10px; color:var(--color-high-text)">
    <span @click="toRegister">没有账号？立即注册</span>
    <!--      <div @click="$router.push({path:'/register'})">没有账号？立即注册</div>-->

  </div>

  <div class="icp"><p>沪ICP备2020030571号</p></div>
</template>

<script>
import {onMounted, reactive} from "vue";
import {useRouter} from "vue-router";
import {nanoid} from "nanoid";
import {login} from "network/user";
import { Toast } from 'vant';
import { useStore } from 'vuex'


export default {
  name: "Register.vue",

  setup () {
    const router = useRouter()
    const store = useStore()
    const img_code_url = {img_code_url:''}
    const state = reactive({
      username: '',
      password: '',
      img_code:'',
      image_code_id:'',
    });

    onMounted(()=>{
      onimg()
    })

    // 图片验证码更新
    const onimg = ()=>{
      state.image_code_id = nanoid()
      img_code_url['img_code_url'] = 'http://www.zfychina.cn:8000/image_codes/' +  state.image_code_id
    }

    // 登录按钮提交
    const onSubmit = () => {
      login(state).then(res=>{
        if (res.status === 400){
          setTimeout(()=> {
            Toast.fail(res.msg)
          },1000)
        } else
        {
          // 将token保存在本地 window.localStorage setItem(key, value) getItem(key)
          // eduwork2@lmonkey.com user123
          // console.log(res);
          sessionStorage.clear();
          localStorage.clear();
          window.localStorage.setItem('token', res.token);
          // 在vuex isLogin
          // console.log(store);
          store.commit('setIsLogin', true);

          Toast.success('登录成功')
          state.username = ""
          state.password = ""
          state.img_code = ""
          state.image_code_id = ""

          setTimeout(() => {
            // router.go(-1);
            router.push({path:'/profile'});
          }, 500)
        }
      })
    };

    // 跳转到注册页面
    const toRegister=()=>{
      router.push({path:'/register'})
    }


     return {
      state,
      onSubmit,
      toRegister,
      onimg,
      img_code_url,
      onsubmit,
    }
  }
}
</script>

<style scoped>
.icp{
  /*background-color: #fff;*/
  position: absolute;
  bottom: 5px;
  width: 100%;
  font-size: 10px;
  color: #898888;
  text-align: center;
}

</style>