<template>
  <van-row justify="left" style="font-size: 12px" align="center">
    <van-col span="4" offset="1">
      <span style="line-height: 3; font-size: 12px; text-align: left;"><p>{{data.category2?.name}}{{data.category3?.name}}
                           {{data.sku?.category2?.name}}{{data.sku?.category3?.name}}</p></span>
      <span style="line-height: 0.5; font-size: 8px; color: var(--color-border); text-align: left;">
        <p>{{data.category1?.name}}
          {{data.sku?.category1?.name}}
          {{data.last_login ? data.last_login.split(' ')[0].split('-')[1]+"月"+data.last_login.split(' ')[0].split('-')[2]+"日" : ''}}
          {{data.shortname ? data.shortname : ''}}
        </p>
      <span style="color: var(--color-red);">{{data.category4?.name}}
                                             {{data.sku?.category4?.name}}</span>
      </span>
    </van-col>
    <van-col span="13">
      <span style="line-height: 3; font-size: 12px; text-align: left;"><p>{{data.coding ? data.coding : ''}}
                           {{data.sku?.coding ? data.sku?.coding : ''}}
                           {{data.parent? '创建：' + data.parent.create_time.split(' ')[0] : ''}}
                           {{data.username ? data.username : ''}}</p></span>
      <span style="line-height: 0.5; font-size: 8px; color: var(--color-border); text-align: left;">
        <p>{{data.name ? data.name : ''}}{{data.parent ? ' - ' + data.parent.name : ''}}
           {{data.sku?.name ? data.sku?.name : ''}}
           {{data.mobile ? data.mobile : ''}}</p>
        <span style="color: var(--color-red);">{{data.update_time ? '更新：' + data.update_time.split(' ')[0] : ''}}
                                               {{data.date_joined ? '创建：' + data.date_joined.split(' ')[0] : ''}}</span>
      </span>
    </van-col>
    <van-col span="4">
      <span style="line-height: 3; font-size: 10px; text-align: left;"><p>{{data.stock ? data.stock+ " "+data.unit?.name : ''}}</p></span>
      <span style="line-height: 0.5; font-size: 8px; color: var(--color-border); text-align: left;">
        <p>
          {{data.supplier ? data.supplier.shortname : ''}}
          {{data.num ? data.num : ''}}
          {{data.is_active ? '有头像' :''}}
          {{data.productline ? '生产线' :''}}
        </p>
        <span style="color: var(--color-red);font-size: 8px;">{{data.return_num ? '退仓:'+data.return_num + " "+data.unit?.name : ""}}</span>
      </span>
    </van-col>
    <van-col span="2" style="text-align: left;vertical-align: middle;">
      <van-icon name="arrow" size="20" color="var(--color-high-text)"  span="1"  @click="spread(data.id)"/>
    </van-col>
  </van-row>


  <!--分割线-->
  <van-config-provider :theme-vars="themeVars">
    <van-divider :style="{ color: 'var(--color-border)', borderColor: 'var(--color-border)', padding: '0 16px' }"/>
  </van-config-provider>
</template>

<script>

export default {
  name: "OtherInfo",
  props: {
    button_show: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
  },
  setup(props, { emit }) {

    const spread = (id) => {
      console.log(id, props.data);
      emit('spreadorder', props.data )
    }

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
    };

    return {
      themeVars,
      spread,

    };
  },

}
</script>

<style scoped>

</style>