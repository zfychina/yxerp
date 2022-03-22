<template>
  <van-config-provider :theme-vars="themeVars">
  <div class="cellborder">
  <!--头像-->
  <van-row justify="left" align="center" style="line-height: 1.5;">
    <van-col span="5" offset="1"  style="font-size: 16px; text-align: left;">
      头像
    </van-col>
    <van-col span="16" style="text-align: right;">
      <van-uploader :after-read="afterRead" v-model="fileList" multiple :max-count="1"/>
    </van-col>
    <van-col span="2" style="text-align: center;">
        <van-icon size="15" name="arrow" color="var(--color-high-text)"/>
    </van-col>
  </van-row>

  <van-divider v-show="true" :style="{ color: 'var(--color-border)', borderColor: 'var(--color-border)', padding: '0 16px' }"/>

  <div v-for="(item, index) in rows_user" :key="index">
    <van-row justify="left" align="center" style="line-height: 3;">
      <van-col span="5" offset="1"  style="font-size: 16px; text-align: left;">
        {{ item }}
      </van-col>
      <van-col span="16" style="text-align: right;">
        <input @blur="onblur" @focus="onfocus" type="text" :name="en_rows_user[index]" :value="state?.[en_rows_user[index]]" @input="oninput" disabled autocomplete="off" style="width: 100%"/>
      </van-col>
      <van-col span="2" style="text-align: center;"  @click="onclick(index)">
          <van-icon v-show="!disabled[index]" size="15" name="arrow" color="var(--color-high-text)"/>
      </van-col>
    </van-row>
    <van-divider v-show="true" :style="{ color: 'var(--color-border)', borderColor: 'var(--color-border)', padding: '0 16px' }"/>
  </div>

  </div>

  <!--分割线-->


  </van-config-provider>
</template>

<script>

import {onMounted, reactive, ref} from "vue";
import { getuserinfo } from 'network/user'
import {updateavatar} from "network/user";
import { Toast} from "vant";
// import {updateuser} from "network/user";

export default {
  name: "SettingItem",

  setup() {
    // 头像
    const accept = ref(["image/png, image/jpeg"])
    const fileList = ref([
      {url:'http://s.zfychina.cn/default1.jpg'}
    ]);
    const afterRead = (file) => {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      const data = new FormData();
      data.append('files', file.file)
      file.status = 'uploading';
      putavatar(data)
      setTimeout(() => {
        // 上传完成后状态清零
        file.status = '';
      }, 1000);
    };

    const rows_user = ['创建日期', '工号ID', '手机', '姓名', 'E_mail', '地址管理' ]
    const disabled =  [true,     true,  true, true,    false,   false, ]
    const en_rows_user = ['date_joined', 'id', 'mobile', 'username', 'email', 'address']
    const state= reactive({
      username: '',
      id: '',
      mobile: '',
      date_joined: '',
      email: '',
    });

    const putavatar =(data)=>{
      updateavatar(data).then(res=>{
        console.log(res);
        if(res){
          fileList.value[0].url = res.avatar_img

          Toast('头像更新成功')
        } else (Toast('头像更新失败'))
      })
    }
    onMounted(()=>{

      getuserinfo().then(res=>{
        console.log(res);
        fileList.value[0].url = res.avatar_img
        state.username = res.username
        state.id = res.id
        state.mobile = res.mobile
        state.date_joined = res.date_joined.split(' ')[0]
        state.email = res.email
        state.address = res.address
      })
    });


    const onclick = (index) =>{
      console.log(index);
    }
    // const onSubmit = () => {
    //   console.log('submit', state);
    //   updateuser(state).then(res=>{
    //     if(res.status === 201) {
    //       Toast.success('修改成功')
    //
    //     } else {
    //       Toast.fail('修改失败')
    //     }
    //   }).catch(err=>{
    //     console.log('reg + err' + err);
    //   })
    // };

    // VAN分割样式修改
    const themeVars = {
      dividerMargin: '1px',
      dividerTextColor:	'#969799',
      dividerFontSize: '14px',
      dividerLineHeight: '1px',
      dividerBorderColor:	'#ebedf0',
      dividerContentPadding: '16px',
      dividerContentLeftWidth: '10%',
      dividerContentRightWidth:	'10%',

      // 头像
      uploaderSize: '55px',
      uploaderIconSize: '24px',
      uploaderTextFontSize: '16px',
      uploaderDeleteIconSize:	'14px',
      uploaderFileIconSize:	'14px',

    };

    return {
      state,
      // 头像
      fileList,
      accept,
      afterRead,

      rows_user,
      en_rows_user,
      disabled,

      onclick,

      themeVars,

    };
  },
}
</script>

<style scoped>
:root {
  --van-uploader-size:40px
}

.cellborder {
  line-height: 50px;
  /*border: 1px solid;*/
  /*border-color: var(--color-border);*/
}

input {
  color: var(--color-text);
  font-size: 16px;
  border:none;
  line-height: 2;
  width: 100%;
  font-weight: bold;
  text-align: right;
}
input:disabled{
  background-color: white;
}

</style>