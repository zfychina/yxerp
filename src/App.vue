<template>
<!--  第一种：不缓存-->
  <router-view/>

<!--  第二种：全部缓存-->
<!--  <router-view v-slot="{ Component }" v-if="$route.meta.keepAlive">-->
<!--    <transition>-->
<!--      <keep-alive >-->
<!--        <component :is="Component"/>-->
<!--      </keep-alive>-->
<!--    </transition>-->
<!--  </router-view>-->

<!--&lt;!&ndash;  第三种：网上查阅，根据需要缓存&ndash;&gt;-->
<!--  <router-view v-slot="{ Component }">-->
<!--    <keep-alive v-if="$route.meta.keepAlive">-->
<!--      <component :is="Component" >-->
<!--&lt;!&ndash;        <p>缓存页面</p>&ndash;&gt;-->
<!--      </component>-->
<!--    </keep-alive>-->
<!--    <component :is="Component" v-if="!$route.meta.keepAlive">-->
<!--&lt;!&ndash;      <p>没有缓存的页面</p>&ndash;&gt;-->
<!--    </component>-->
<!--  </router-view>-->


  <div v-show="$route.meta.showNav" id="nav">
    <router-link class="tab-bar-item" to="/">
      <div class="icon"><i class="iconfont icon-que"></i></div>
      <div>缺料</div>
    </router-link>

    <router-link class="tab-bar-item" to="/order">
      <div class="icon"><i class="iconfont icon-dingdan"></i></div>
      <div>订单</div>
    </router-link>

    <router-link class="tab-bar-item" to="/bom">
      <div class="icon"><i class="iconfont icon-bom"></i></div>
      <div>BOM</div>
    </router-link>

    <router-link class="tab-bar-item" to="/unsettled">
      <div class="icon"><i class="iconfont icon-icon_weijueguanli"></i></div>
      <div>未决</div>
    </router-link>

    <router-link class="tab-bar-item" to="/profile">
      <div class="icon"><i class="iconfont icon-icon_pc"></i></div>
      <div>我的</div>
    </router-link>
  </div>

</template>
<script>

</script>

<style lang="scss">
@import "assets/css/base.css";
@import "assets/css/iconfont.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background-color: #fff;
  display: flex;
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  //设置阴影
  box-shadow: 0 -0.1px 0px rgb(25, 137, 250);
  a {

    color: var(--color-text);

    &.router-link-exact-active {
      color: var(--color-high-text);
    }
  }
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 50px;
    font-size: var(--font-size);
  }
  .tab-bar-item .icon {
    width: 24px;
    height: 24px;
    margin-top: 5px;
    vertical-align: middle;
    display: inline-block;
  }
}
</style>
