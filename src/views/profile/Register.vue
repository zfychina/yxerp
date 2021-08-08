<template>
   <div>
    <van-nav-bar title="注册" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
  </div>

  <van-image
      width=100%
      height=auto
      fit="scale-down"
      src="http://s.zfychina.cn/R_logo.jpg"
  />

  <van-form style="margin-top: 10px">
    <van-field
        v-model="state.username"
        required
        type="name"
        label="姓名"
        placeholder="真实姓名"
    />

    <van-cell-group>
      <van-field
            v-model="state.mobile"
            required
            label="手机号"
            placeholder="请输入手机号"
            :rules="[
                         { required: true },
                         { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！' },
        ]"
        />
      <van-field
            v-model="state.img_code"
            required
            center
            clearable
            label="图片验证码"
            placeholder="请输入图片验证码"
        >
        <template #right-icon>
          <van-image width=100 height="30" :src="img_code_url['img_code_url']" @click="onimg"/>
        </template>
        </van-field>
      <van-field
            v-model="state.password"
            required
            type="password"
            label="密码"
            placeholder="请输入密码"
        />
      <van-field
            v-model="state.password1"
            required
            type="password"
            label="确认密码"
            placeholder="请再次输入密码"
        />
    </van-cell-group>

  </van-form>

  <div style="margin: 16px; margin-top: 20px">
    <van-button round block type="primary" native-type="submit" @click="onsubmit">注册</van-button>
  </div>

  <div class="reg" style="margin: 5px; font-size: 10px; color:var(--color-high-text)">
    <div @click="toRegister">已有账号？立即登录</div>
    <!--      <div @click="$router.push({path:'/register'})">没有账号？立即注册</div>-->
  </div>


</template>

<script>
import {onMounted, reactive} from "vue";
import { Toast } from 'vant';
import {useRouter} from "vue-router";
import {register} from "network/user";
import { nanoid } from 'nanoid'

export default {
  name: "Register.vue",

  setup () {
    const router = useRouter()
    const img_code_url = {img_code_url:''}

    const state = reactive ({
      username:'',
      mobile:'',
      img_code:'',
      image_code_id:'',
      password:'',
      password1:'',
    })

    // 上传服务器
    // const afterRead = (file)=>{
    //   const data = new FormData();
    //   state.uploader.append({url: file})
    //   data.append('files', file.file);
    //
    //   console.log(data);
    // }
    onMounted(()=>{
      onimg()
    })

    // 图片验证码更新
    const onimg = ()=>{
      state.image_code_id = nanoid()
      img_code_url['img_code_url'] = 'http://www.zfychina.cn:8000/image_codes/' +  state.image_code_id
      console.log(img_code_url['img_code_url']);
    }

    // 注册按钮提交
    const onsubmit = ()=> {
      if (state.mobile == "" || state.img_code == "" || state.password == "" || state.password1 == "") {
        Toast('注册失败！信息未完善');
      } else if (state.password != state.password1) {
        Toast('密码输入两次不一致！');
      } else {
        register(state).then(res=>{
          if(res.status === 201) {
            Toast.success('注册成功')
            setTimeout(() => {
                // sessionStorage.clear("regis");
              toRegister();
              }, 1000);
          } else {
            Toast.fail('注册失败')
          }
        }).catch(err=>{
          console.log('reg + err' + err);
        })
      }
    }

    // 跳转到注册页面
    const toRegister=()=>{
      router.push({path:'/login'})
    }

    return {
      state,
      onsubmit,
      toRegister,
      img_code_url,
      onimg,
    }
  }
}
</script>

<style scoped>


</style>