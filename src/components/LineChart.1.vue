<script>
//Importing Line class from the vue-chartjs wrapper
import {Line} from 'vue-chartjs'

export default({ 
    extends: Line,
    data () {
      return {
        datacollection: {
        //Data to be represented on x-axis
          labels: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'], 
          datasets: [
            {
              label: '温度',
              //backgroundColor: '#f87979',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: [8.5,8.3,7.8,7.1,6.9,6.9,6.8,6.2,5.9,6,7,8.5,8.3,7.8,7.1,6.9,6.9,6.8,6.2,5.9,6,7,6,5,3,2,5]
            }
          ]
        },
        //Chart.js options that controls the appearance of the chart
        options: {

          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: { //图例
            display: false
          },
          responsive: true,
          maintainAspectRatio: false

        }
      }
    },
    mounted () {
    //renderChart function renders the chart with the datacollection and options object.
      this.renderChart(this.datacollection, this.options)
    }
  })
</script>