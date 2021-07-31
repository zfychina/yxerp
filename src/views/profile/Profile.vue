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


  </div>
</template>

<script>
import {reactive} from "vue";
import {Dialog} from "vant";
import {upSkuimport, upShortmold} from "network/upimport";

export default {
  name: "Profile",
  setup(){
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

    return{
      ...props,
      Shortmold,
      Skuimport
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