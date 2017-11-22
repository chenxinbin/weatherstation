<template>
  <div>
    <x-header style="background-color:#304457;" :left-options="{showBack: false}" :right-options="{showMore: true}" @on-click-more="show13 = true" title="slot:overwrite-title">
      观海二路气象站
      <!--
      <div class="overwrite-title-demo" slot="overwrite-title">
        <button-tab>
          <button-tab-item selected>温度</button-tab-item>
          <button-tab-item>湿度</button-tab-item>
        </button-tab>
      </div>
      -->
    </x-header>

    <div style="width:100vw; display: table-cell; height:40vh; vertical-align: middle; text-align:center; margin:10px auto;">
        <div style="display:inline;">
          <img v-if="vv.vten" class="num" :src="vsrc.vten" />
          <img v-if="vv.vone" class="num" :src="vsrc.vone" />
          <img v-if="vv.vdot" class="dot" :src="vsrc.vdot" />
          <img v-if="vv.vdec" class="num" :src="vsrc.vdec" />  
        </div>
        <div style="height:142px;display:inline;">
          <div style="display:inline-block">
          <img class="num" src="../assets/ic_temp_celsius.png" /><br />
          <img class="num" src="../assets/thermometer.png" />
          </div>
        </div>
      <div style="text-align:center; color:#D3D8DC;;width:100vw; margin-top:20px ">
        {{ meter.last_update2 }} 更新
      </div>
    </div>
    <div v-if="showchart" style="height:50vh; width:100%; position: absolute; left:0; top:50vh; background-color: #FFFFFF;">
      <div style="text-align: right;padding:6px 6px;">
        <div style="float:left; line-height:50px;">最近气温变化</div>
        <x-switch title="" v-model="showchart"></x-switch>
      </div>
      <line-chart :chart-data="datacollection" style="height:40vh"></line-chart>
    </div>
    <div v-if="!showchart" style="height:50vh; width:100%; position: absolute; left:0; top:50vh;">
      <div style="position: absolute;  top: 30%; left: 50%;  transform: translate(-50%,-50%);">
        <x-button plain type="primary" 
        @click.native="toggleChart" class="custom-primary-red" style="background-color:#fff; width:80vw">打开最近气温变化图</x-button>
      </div>
    </div>
    <!--
    <div style="height:50vh;position: relative;">
      <div style="position: absolute;  top: 50%; left: 50%;  transform: translate(-50%,-50%);">
        <x-button plain type="primary" class="custom-primary-red" style="background-color:#fff; width:80vw">打开最近气温变化图</x-button>
      </div>
    </div>
    -->

    <div v-transfer-dom>
      <popup v-model="show13" position="bottom" max-height="50%">

        <div style="padding:20px">
          <p style="font-size:0.9rem">

          　　本气象站属个人搭建，纯为指导小孩子上学穿衣提供气象资料。<br /><br />

          硬件平台：<br />
          Esp8266-01(ESPEasy_v2.0.0-dev12)/DHT22<br />
          软件平台:<br />
          CentOS,Nginx,PHP,RRDTool
          </p>
        </div>
        <div style="margin: 15px;">
          <x-button  @click.native="show13 = false" plain type="primary" style="width:90vw"> 关闭 </x-button>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { XHeader, XButton, XSwitch, TransferDom, ButtonTab, ButtonTabItem,Popup, Group, Cell } from 'vux'
import LineChart from '@/components/LineChart'

export default {
  directives: {
    TransferDom
  },
  components: {
    LineChart, XHeader, XButton, ButtonTab, XSwitch, ButtonTabItem,Popup, Group, Cell
  },
  data () {
    return {
      show13: false,
      showchart: false,
      datacollection: null,
      meter: {'temperatur':'-', 'last_update2': '-'},
      vv: {'vten':true, 'vone':true, 'vdot': true, 'vdec': true},
      vsrc: {'vten':this.STATIC_ROOT + 'temp_0.png', 'vone':this.STATIC_ROOT + 'temp_0.png', 'vdot': this.STATIC_ROOT + 'temp_dot.png', 'vdec': this.STATIC_ROOT + 'temp_0.png'},
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    toggleChart() {
      console.log(this.showchart);
      if(!this.showchart)
        this.fillData()
      

    },
    fillData () {
      this.$http.post(this.API_ROOT+'/lastday.php','')
      .then((response) => {
        var resp = response.data.resp
        console.log(resp)
        console.log(this.datacollection)
        this.datacollection = {
        //Data to be represented on x-axis
          labels: resp.label, 
          datasets: [
            {
              label: '温度',
              //backgroundColor: '#f87979',
              pointBackgroundColor: '#F7464A',
              borderColor: '#F7464A',
              fill: false,
              //pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: resp.data
            }
          ]
        }
        this.showchart = !this.showchart;
        console.log(this.datacollection)
      })
    },
    fetchData () {
      this.error = this.post = null
      this.$http.post(this.API_ROOT+'/fetch.php','')
      .then((response) => {
        this.meter = response.data.resp
        console.log(this.meter)
        var val = this.meter.temperatur.split('.')
        var val1 = parseInt(val[0])
        console.log(val)
        if(val1<0)
        {
          //负号显示
          val1 = -1 * val1;
        }

        if(val1>=10)
        {
          this.vv.vten = true
          this.vsrc.vten = this.STATIC_ROOT + 'temp_' + parseInt(val1/10) + '.png'
        }else{
          this.vv.vten = false
        }
        this.vsrc.vone = this.STATIC_ROOT + 'temp_' + (val1%10) + '.png'

        this.vsrc.vdec = this.STATIC_ROOT + 'temp_' + val[1][0] + '.png'


      })

    },
  }
}
</script>
<style lang="less">
.custom-primary-red {
  border-radius: 99px!important;
  border-color: #304457!important;
  color: #304457!important;
  &:active {
    border-color: rgba(0, 0, 0, 0.6)!important;
    color: rgba(0, 0, 0, 0.6)!important;
    background-color: #ffffff;
  }
}

body{
  background-color: #304457;
}
.overwrite-title-demo {
  margin-top: 5px;
}
.num {width: 16vw;vertical-align:bottom;}
.dot {width: 4vw;vertical-align:bottom;}
</style>
