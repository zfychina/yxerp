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
        v-model="state.name"
        required
        type="name"
        label="姓名"
        placeholder="真实姓名"
    />

    <van-cell-group>
      <van-field
            v-model="state.phone"
            required
            label="手机号"
            placeholder="请输入手机号"
            :rules="[
                         { required: true },
                         { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！' },
        ]"
        />
      <van-field
            v-model="state.sms"
            required
            center
            clearable
            label="图片验证码"
            placeholder="请输入图片验证码"
        >
        <template #right-icon>
          <img width=100 height="30" src="http://s.zfychina.cn/R_logo.jpg" >
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

  <div style="margin: 16px; margin-top: 30px">
    <van-button round block type="primary" native-type="submit" @click="onsubmit">注册</van-button>
  </div>


</template>

<script>
import {reactive} from "vue";
import { Toast } from 'vant';

export default {
  name: "Register.vue",

  setup () {
    const state = reactive ({
      name:'',
      phone:'',
      sms:'',
      password:'',
      password1:'',


      uploader: [
        {url:'http://s.zfychina.cn/media/avatars/%E5%85%8B%E6%8B%89%E5%A5%B3%E7%A5%9E%E5%A7%9C%E7%92%90_%E6%A3%AE%E5%A5%B3_%E7%99%BD%E8%89%B2%E7%9D%A1%E8%A1%A3%E7%BE%8E%E5%A5%B3%E5%A3%81%E7%BA%B8.jpg'},
      ]
    })

    // 上传服务器
    const afterRead = (file)=>{
      const data = new FormData();
      state.uploader.append({url: file})
      data.append('files', file.file);

      console.log(data);
    }

    // 注册按钮提交
    const onsubmit = ()=> {
      console.log(state.phone ,state.sms)

      if (state.phone == "" || state.sms == "" || state.password == "" || state.password1 == "") {
        Toast('注册失败！信息未完善');
      } else if (state.password != state.password1) {
        Toast('密码输入两次不一致！');
      } else {
        Toast.success('注册成功');

        setTimeout(() => {
          sessionStorage.clear("regis");
          this.$router.go(-1);
        }, 3000);
      }
    }

    return {
      state,
      afterRead,
      onsubmit,
    }
  }
}
</script>

<style scoped>


</style>