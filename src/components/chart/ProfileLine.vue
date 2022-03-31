<template>
  <div style="
    border-radius: 5px;
    background-image: linear-gradient(#043eb8, #399efd);
    height: 130px;
    color: white;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 5px;
  ">
    <van-row justify="center">
      <van-col span="4" v-for="(item, index) in data" :key="index" style="margin-top:15px;font-size: 14px; height: 40px;text-align: center;vertical-align: middle">
        <p>{{ item.quantity }}</p>
        <span style="font-weight: initial ;font-size: 10px;color: #d29403">{{item.month}}</span>
      </van-col>
    </van-row>
  </div>

<!--// 折线图-->
  <van-row>
    <van-col span="24">
      <canvas :id="myChart" width="400" height="150"></canvas>
    </van-col>
  </van-row>


</template>

<script>
import {Canvas, Chart, Line, Axis, Tooltip, Point } from '@antv/f2';
import {nextTick, onMounted, reactive, watch} from "vue";

export default {
  name: "ProfileLine",
  props: {
    data:{
      type:Array,
      required:true,
      default(){
        return []
      }
    },
    active:{
      type:Number,
    }
  },
  setup(props){
    const myChart = "myChart" + Date.now() + Math.random()

    const state = reactive({

      goodimg:[
        'http://s.zfychina.cn/yxgoods/A81-CP.png',
        'http://s.zfychina.cn/yxgoods/GD70-SN.png',
        'http://s.zfychina.cn/yxgoods/C01H14-CP.png',
        'http://s.zfychina.cn/yxgoods/V07-CP.png',
        'http://s.zfychina.cn/yxgoods/N13-CP.png', ]
    })

    onMounted(()=>{

      nextTick(()=>{
            drawChart()
          });
    })

    watch(
        () => props.data,
        () => {
          // 逻辑代码
          nextTick(()=>{
            drawChart()
          });
        }
    )

    const drawChart=()=>{
      const context = document.getElementById(myChart).getContext('2d');
      const LineChart = (
          <Canvas context={context} pixelRatio={window.devicePixelRatio}>
            <Chart data={props.data}>
              <Axis
                  field="month"
                  tickCount={12}
                  style={{
                    label: { align: 'between' },
                  }}
              />
              <Axis field="quantity" tickCount={6} />
              <Line x="month" y="quantity" shape="smooth"/>
              <Point x="month" y="quantity" color="#518DFE"/>
              <Tooltip />
            </Chart>
          </Canvas>
      );

      const chart = new Canvas(LineChart.props);
      chart.render();
    }


    return{
      state,
      myChart,
    }
  }
}
</script>

<style scoped>

</style>