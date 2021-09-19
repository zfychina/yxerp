<template>
    <van-sticky>
    <van-nav-bar :title="state.username" left-arrow  fixed="true">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    </van-sticky>

    <div style="margin-top: 60px">
      <van-image
        round
        fit="cover"
        width="120px"
        height="120px"
        :src="state.avatar_img"
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
          点击更新物料供应商（上传供应商.xls）
        </van-button>

      </van-uploader>
    </div>
    <div class="uploader">
      <van-uploader :after-read="Orderimport" name='files' :accept="accept" result-type="file">
        <van-button icon="plus" type="primary">
          点击销售订单导入（上传订单情况.xls）
        </van-button>

      </van-uploader>
    </div>
    <div class="uploader">
      <van-uploader :after-read="Suppledirimport" name='files' :accept="accept" result-type="file">
        <van-button icon="plus" type="primary">
          点击供应商名录导入（上传供应商.xls）
        </van-button>

      </van-uploader>
    </div>
    <div class="uploader">
      <van-uploader :after-read="Customerimport" name='files' :accept="accept" result-type="file">
        <van-button icon="plus" type="primary">
          点击客户名录导入（上传客户名录.xls）
        </van-button>

      </van-uploader>
      </div>
    <div class="uploader">
        <van-uploader :after-read="Bomimport" name='files' :accept="accept" result-type="file">
          <van-button icon="plus" type="primary">
            点击BOM表导入（上传产品BOM.xls）
          </van-button>

        </van-uploader>
      </div>




    <div class="reg" style="margin-top: 30px; font-size: 10px; color:var(--color-high-text)">
      <span @click="tologout">退出登录</span>
<!--      <div @click="$router.push({path:'/register'})">没有账号？立即注册</div>-->
    </div>

</template>

<script>
import {onMounted, reactive} from "vue";
import { useRouter } from 'vue-router'
import {Dialog, Toast} from "vant";
import {upSkuimport, upShortmold, upSupplier, uporderimport, upCustomer, upSupplierdir, upBOM} from "network/upimport";
import {getuserinfo} from "network/user";
import { useStore } from 'vuex'


export default {
  name: "Profile",
  setup(){
    const router = useRouter()
    const store = useStore()
    const props =reactive( {
      accept: '.xls, .xlsx',
    })
    const state = reactive({
      user_id: sessionStorage.user_id || localStorage.user_id,
      username: '',
      mobile: '',
      avatar_img: '',
    })

    // 登录后获取user信息
    onMounted(()=>{
      getuserinfo().then(res=>{
        state.user_id = res.id
        state.username = res.username
        state.mobile = res.mobile
        state.avatar_img = res.avatar_img
      })
    })

    // 缺料表更新
    const Shortmold=(file)=> {
      const data = new FormData();
      data.append('files', file.file)
      Toast.loading({message:'缺料导入中...', forbidClick:true});
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
      Toast.loading({message:'物料更新中...', forbidClick:true});
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
      Toast.loading({message:'供应商更新中...', forbidClick:true});
      upSupplier(data).then(res=>{
        Dialog.alert({
          message: res,
        }).then(() => {
          // on close
        });
      })
    }

    // 订单信息导入
    const Orderimport = (file)=>{
      const data = new FormData();
      data.append('files', file.file)
      Toast.loading({message:'订单导入中...', forbidClick:true});
      uporderimport(data).then(res=>{
        Dialog.alert({
          message: res,
        }).then(() => {
          // on close
        });
      })
    }

    // 供应商名录导入
    const Suppledirimport = (file)=>{
      const data = new FormData();
      data.append('files', file.file)
      Toast.loading({message:'供应商名录导入中...', forbidClick:true});
      upSupplierdir(data).then(res=>{
        Dialog.alert({
          message: res,
        }).then(() => {
          // on close
        });
      })
    }

    // 客户名录导入
    const Customerimport = (file)=>{
      const data = new FormData();
      data.append('files', file.file)
      Toast.loading({message:'客户名录导入中...', forbidClick:true});
      upCustomer(data).then(res=>{
        Dialog.alert({
          message: res,
        }).then(() => {
          // on close
        });
      })
    }

    // 产品BOM表导入
    const Bomimport = (file)=>{
      const data = new FormData();
      data.append('files', file.file)
      Toast.loading({message:'BOM导入中...', forbidClick:true});
      upBOM(data).then(res=>{
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

    return{
      ...props,
      state,
      Shortmold,
      Skuimport,
      Supplierimport,
      toRegister,
      tologout,
      Orderimport,
      Suppledirimport,
      Customerimport,
      Bomimport,
    }
  }
}
</script>

<style scoped lang="scss">
.uploader {
  margin-top: 20px;
  display:inline-block;
  width: 90%;
  height: 30px;
}

</style>