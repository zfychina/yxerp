<template>
  <canvas id="container" width="400" height="260"></canvas>
</template>

<script>
import {onMounted} from "vue";
import { Canvas, Chart, Interval, Axis, Tooltip, Legend} from '@antv/f2';

export default {
  name: "ProfileLnterval",
  setup(){
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];

    onMounted(()=>{
      drawChart()
    })

    const drawChart=()=>{

// 获取 canvas context
      const context = document.getElementById('container').getContext('2d');
      const { props } = (
          <Canvas context={context} pixelRatio={window.devicePixelRatio}>
            <Chart data={data}>
              <Legend/>
              <Axis field="genre" />
              <Axis field="sold" />
              <Interval x="genre" y="sold" color="genre" />
              <Tooltip />
            </Chart>
          </Canvas>
      );

      const canvas = new Canvas(props);
      canvas.render();


    }
    return{
      data
    }
  }

}
</script>

<style scoped>

</style>