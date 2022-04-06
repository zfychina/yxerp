<template>
  <van-row>
    <van-col span="24">
      <canvas :id="myChart1" width="370" height="200"></canvas>
    </van-col>
  </van-row>
</template>

<script>
import {nextTick, onMounted, watch, reactive} from "vue";
import { Canvas, Chart, Interval, Axis, Tooltip, Legend} from '@antv/f2';

export default {
  name: "yearProfileLnterval",
  props: {
    data: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    active:{
      type:Number,
    }
  },
  setup(props){
    const myChart1 ="myChart1" + Date.now() + Math.random()
    const state = reactive({

    })
    onMounted(()=>{
      console.log(props.data);
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
        },

    )

    const drawChart=()=>{
      const context = document.getElementById(myChart1).getContext('2d');
      const LntervalChart = (
          <Canvas context={context} pixelRatio={window.devicePixelRatio}>
            <Chart data={ props.data}>
              <Legend/>
              <Axis field="year" />
              <Axis field="quantity" />
              <Interval x="year" y="quantity" color="year"/>
              <Tooltip />
            </Chart>
          </Canvas>
      );

      const canvas = new Canvas( LntervalChart.props );
      canvas.render();
    }
    return{
      state,
      myChart1,
    }
  }

}
</script>

<style scoped>

</style>