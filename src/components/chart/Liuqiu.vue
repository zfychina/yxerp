<template>
  <van-row>
    <van-col span="24">
      <canvas :id="myChart1" width="370" height="200"></canvas>
    </van-col>
  </van-row>
</template>

<script>
import {nextTick, onMounted, watch, reactive} from "vue";
import { Canvas, Chart, Interval, TextGuide, ArcGuide } from '@antv/f2';

export default {
  name: "ProfileLnterval",
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
      data : [{x: '1',y: 85,},]
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
        },

    )

    const drawChart=()=>{
      const context = document.getElementById(myChart1).getContext('2d');
      const LntervalChart = (
          <Canvas context={context} pixelRatio={window.devicePixelRatio}>
            <Chart
                data={state.data}
                coord={{
                  type: 'polar',
                  transposed: true,
                  innerRadius: 0.8,
                }}
                scale={{
                  y: {
                    max: 100,
                    min: 0,
                  },
                }}
            >
              <ArcGuide
                  records={[
                    {
                      x: 0,
                      y: 0,
                    },
                    {
                      x: 1,
                      y: 99.98,
                    },
                  ]}
                  style={{
                    lineWidth: 11,
                    stroke: '#ccc',
                  }}
              />
              <TextGuide
                  records={[
                    {
                      x: '1',
                      y: '25%',
                    },
                  ]}
                  content={'85%'}
                  style={{
                    fill: '#1890FF',
                  }}
              />
              <Interval x="x" y="y" />
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