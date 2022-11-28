<template>
  <div class="register">
   <div>
    <van-nav-bar title="密码修改" left-arrow  @click-left="onClickLeft">
      </van-nav-bar>
  </div>
  <van-form style="margin-top: 0px">
     <van-cell-group>

      <van-field
            v-model="state.password"
            required
            type="password"
            label="原密码"
            placeholder="请输入原密码"
        />
      <van-field
            v-model="state.password1"
            required
            type="password"
            label="新密码"
            placeholder="请输入新密码"
        />
      <van-field
          v-model="state.password2"
          required
          type="password"
          label="确认新密码"
          placeholder="请再次输入新密码"
      />
    </van-cell-group>

  </van-form>

  <div style="margin: 16px; margin-top: 20px">
    <van-button round block type="primary" native-type="submit" @click="onsubmit">提交</van-button>
  </div>

  </div>
</template>

<script>
import {onMounted, reactive} from "vue";
import { Toast } from 'vant';
import {useRouter} from "vue-router";
import {updatepwd} from "network/user";

export default {
  name: "Register.vue",

  setup () {
    const router = useRouter()

    const state = reactive ({
      password:'',
      password1:'',
      password2:'',
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
    })

    // 返回按钮和搜索按钮
    const onClickLeft = () => history.back();
    // 注册按钮提交
    const onsubmit = ()=> {
      if (state.password === "" || state.password1 === "" || state.password2 === "") {
        Toast('密码不能为空');
      } else if (state.password1 !== state.password2) {
        Toast('新密码两次输入不一致！');
      } else {
        updatepwd(state).then(res=>{
          if(res.status === 201) {
            Toast.success('修改成功')

            setTimeout(() => {
              router.push({path:'/setting'})
              }, 1000);

          } else {
            Toast.fail('修改失败')
          }
        }).catch(err=>{
          console.log('reg + err', err);
          Toast('原密码错误')
        })
      }
    }

    return {
      state,
      onsubmit,
      onClickLeft,
    }
  }
}
</script>

<style scoped>

</style>