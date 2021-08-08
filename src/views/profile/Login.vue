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
            v-model="state.sms"
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
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  <div class="reg" style="margin: 10px; font-size: 10px; color:var(--color-high-text)">
    <div @click="toRegister">没有账号？立即注册</div>
    <!--      <div @click="$router.push({path:'/register'})">没有账号？立即注册</div>-->
  </div>

</template>

<script>
import {onMounted, reactive} from "vue";
import {useRouter} from "vue-router";
import {nanoid} from "nanoid";


export default {
  name: "Register.vue",

  setup () {
    const router = useRouter()
    const img_code_url = {img_code_url:''}
    const state = reactive({
      username: '',
      password: '',
      sms: '',
    });

    onMounted(()=>{
      onimg()
    })

    // 图片验证码更新
    const onimg = ()=>{
      state.image_code_id = nanoid()
      img_code_url['img_code_url'] = 'http://www.zfychina.cn:8000/image_codes/' +  state.image_code_id
      console.log(img_code_url['img_code_url']);
    }

    // 登录按钮提交
    const onSubmit = (values) => {
      console.log('submit', values);
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
    }
  }
}
</script>

<style scoped>


</style>