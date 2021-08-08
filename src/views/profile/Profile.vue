<template>
  <div>
    <van-nav-bar title="我的" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div style="margin-top: 20px">
      <van-image
        round
        fit="cover"
        width="120px"
        height="120px"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
    />
    </div>
    <div class="uploader">
      <van-uploader :after-read="Shortmold" name='files' :accept="accept" result-type="file">
        <van-button icon="plus" type="primary">
          点击缺料更新（请上传最新缺料表.xls）
        </van-button>

      </van-uploader>
    </div>
    <div class="uploader">
      <van-uploader :after-read="Skuimport" name='files' :accept="accept" result-type="file">
        <van-button icon="plus" type="primary">
          点击物料添加（请上传编码及名称.xls）
        </van-button>

      </van-uploader>
    </div>
    <div class="uploader">
      <van-uploader :after-read="Supplierimport" name='files' :accept="accept" result-type="file">
        <van-button icon="plus" type="primary">
          点击供应商批量更新（请上供应商.xls）
        </van-button>

      </van-uploader>
    </div>




    <div class="reg" style="margin: 10px; font-size: 10px; color:var(--color-high-text)">
      <div @click="toRegister">已有账号？立即登录</div>
<!--      <div @click="$router.push({path:'/register'})">没有账号？立即注册</div>-->
    </div>

  </div>
</template>

<script>
import {reactive} from "vue";
import { useRouter } from 'vue-router'
import {Dialog} from "vant";
import {upSkuimport, upShortmold, upSupplier} from "network/upimport";

export default {
  name: "Profile",
  setup(){
    const router = useRouter()
    const props =reactive( {
      accept: '.xls, .xlsx',

    })

    // 缺料表更新
    const Shortmold=(file)=> {
      const data = new FormData();
      data.append('files', file.file)
      upShortmold(data).then(res=>{
        Dialog.alert({
          message: res,
        }).then(() => {
          // on close
        });
      })
    }

    // 物料基础数据更新更新
    const Skuimport=(file)=> {
      const data = new FormData();
      data.append('files', file.file)
      upSkuimport(data).then(res=>{
        Dialog.alert({
          message: res,
        }).then(() => {
          // on close
        });
      })
    }

    // 供应商更新
    const Supplierimport = (file)=>{
      const data = new FormData();
      data.append('files', file.file)
      upSupplier(data).then(res=>{
        Dialog.alert({
          message: res,
        }).then(() => {
          // on close
        });
      })
    }

    // 跳转到注册页面
    const toRegister=()=>{
      router.push({path:'/login'})
    }

    return{
      ...props,
      Shortmold,
      Skuimport,
      Supplierimport,
      toRegister
    }
  }
}
</script>

<style scoped lang="scss">
.uploader {
  margin-top: 20px;
  display:inline-block;
  width: 90%;
}

</style>