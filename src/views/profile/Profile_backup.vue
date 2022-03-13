<template>
    <van-sticky>
    <van-nav-bar :title="state.username" left-text="报表"  right-text="登出" @click-left="onClickLeft" @click-right="tologout"  fixed="true">
    </van-nav-bar>

      <van-popup v-model:show="showPopup" closeable position="top" :style="{ height: '50%'}">
        <div style="margin-top:60px;font-size: 22px;color: var(--color-high-text)">
          <van-cell title="产品报表统计" @click="goodsstatement" is-link/>
          <van-cell title="客户报表统计" @click="customerStatement" is-link/>
          <van-cell title="产能报表统计" @click="capacityStatement" is-link/>
          <van-cell title="产品年度对比报表" @click="yeargoodsstatement" is-link/>
          <van-cell title="客户年度对比报表" @click="yearcustomerStatement" is-link/>
        </div>
      </van-popup>
    </van-sticky>

    <div style="margin-top: 60px">
      <van-image
        round
        fit="cover"
        width="60px"
        height="60px"
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

  <div class="uploader">
    <van-uploader :after-read="RecordsiImport" name='files' :accept="accept" result-type="file">
      <van-button icon="plus" type="primary">
        点击存货往来导入（上传存货往来.xls）
      </van-button>

    </van-uploader>
  </div>




<!--    <div class="reg" style="margin-top: 30px; font-size: 10px; color:var(&#45;&#45;color-high-text)">-->
<!--      <span @click="tologout">退出登录</span>-->
<!--&lt;!&ndash;      <div @click="$router.push({path:'/register'})">没有账号？立即注册</div>&ndash;&gt;-->
<!--    </div>-->

</template>

<script>
import {onMounted, reactive, ref} from "vue";
import { useRouter } from 'vue-router'
import {Dialog, Toast} from "vant";
import {upSkuimport, upShortmold, upSupplier, uporderimport, upCustomer, upSupplierdir, upBOM, recordsimport} from "network/upimport";
import { getuserinfo } from 'network/user'
import { useStore } from 'vuex'


export default {
  name: "Profile",
  setup(){
    // 左侧弹出是否显示
    const showPopup = ref(false);
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
      Toast.loading({duration: 0,message:'订单导入中...', forbidClick:true});
      uporderimport(data).then(res=>{
        Toast.clear()
        Dialog.alert({
          message: res,
        }).then(() => {
          // on close
        });
      }).catch(err=>{
        Toast.clear()
        Toast.fail({duration: 1000,message:"失败，请检查！！！"})
        console.log(err);
      })
    }

    // 存货往来导入
    const RecordsiImport = (file)=>{
      const data = new FormData();
      data.append('files', file.file)
      Toast.loading({duration: 0,message:'存货往来导入中...', forbidClick:true});
      recordsimport(data).then(res=>{
        Toast.clear()
        Dialog.alert({
          message: res,
        }).then(() => {
          // on close
        });
      }).catch(err=>{
        Toast.clear()
        Toast.fail({duration: 1000,message:"失败，请检查！！！"})
        console.log(err);
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

    // 报表页面
    const  onClickLeft = ()=>{
      showPopup.value = true;
      console.log(showPopup.value);
      // router.push({path:'/statement'})
    }

    // 产品报表统计
    const goodsstatement = ()=>{
      router.push({path:'/statement'})
    }
    // 客户报表统计
    const customerStatement = ()=>{
      router.push({path:'/customerStatement'})
    }
    // 年度产品报表统计
    const yeargoodsstatement = ()=>{
      router.push({path:'/yearstatement'})
    }
    // 年度客户报表统计
    const yearcustomerStatement = ()=>{
      router.push({path:'/yearcustomerStatement'})
    }
    // 产能报表统计
    const capacityStatement = ()=>{
      router.push({path:'/capacityStatement'})
    }

    return{
      ...props,
      state,
      showPopup,
      Shortmold,
      Skuimport,
      Supplierimport,
      toRegister,
      tologout,
      Orderimport,
      Suppledirimport,
      Customerimport,
      Bomimport,
      RecordsiImport,
      onClickLeft,

      goodsstatement,
      customerStatement,
      yeargoodsstatement,
      yearcustomerStatement,
      capacityStatement,

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