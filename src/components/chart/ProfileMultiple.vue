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
      <van-col span="4" v-for="(item, index) in data.pr_data" :key="index" style="margin-top:15px;font-size: 14px; height: 40px;text-align: center;vertical-align: middle">
        <p>{{item.quantity===0 || data.sa_data[index].quantity===0 ? 0 : parseInt(item.quantity /data.sa_data[index].quantity*100)}}%</p>
        <p>{{data.sa_data[index].quantity}}</p>
        <span style="font-weight: initial ;font-size: 10px;color: #d29403">{{item.month}}</span>
      </van-col>
    </van-row>
  </div>
  <!--// 多元折线图-->
  <van-row>
    <van-col span="24">
      <canvas :id="myChart2" width="370" height="150"></canvas>
    </van-col>
  </van-row>
</template>

<script>
import _ from 'lodash';
import { Canvas, Chart, Line, Axis, Legend } from '@antv/f2';
import {onMounted, watch, nextTick, ref} from "vue";
export default {
  name: "ProfileMultiple",
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
    const myChart2 = "myChart2" + Date.now() + Math.random()

    onMounted(()=>{
      chartdata.value = props.data.pr_data.concat(props.data.sa_data)

      nextTick(()=>{
        drawChart()
      });
    })

    watch(
        () => props.data,
        () => {
          // 逻辑代码
          chartdata.value = props.data.pr_data.concat(props.data.sa_data)
          nextTick(()=>{
            drawChart()
          });
        }
    )
    const chartdata = ref([])
    const drawChart = () => {

      const context = document.getElementById(myChart2).getContext('2d');
      const { props } = (
          <Canvas context={context} pixelRatio={window.devicePixelRatio}>
            <Chart data={chartdata.value}>
              <Axis
                  field="month"
                  tickCount={12}
                  style={{
                    label: { align: 'between' },
                  }}
              />
              <Axis field="quantity" tickCount={7} />
              <Line x="month" y="quantity" lineWidth="4px" color="type" shape="smooth"/>
              <Legend
                  position="top"
                  style={{
                    justifyContent: 'space-around',
                  }}
                  triggerMap={{
                    press: (items, records, legend) => {
                      const map = {};
                      items.forEach((item) => (map[item.name] = _.clone(item)));
                      records.forEach((record) => {
                        map[record.type].value = record.value;
                      });
                      legend.setItems(_.values(map));
                    },
                    pressend: (items, records, legend) => {
                      legend.setItems(items);
                    },
                  }}
              />
            </Chart>
          </Canvas>
      );

      const chart = new Canvas(props);
      chart.render();
    }



    return{
      myChart2,
    }
  }
}
</script>

<style scoped>

</style>