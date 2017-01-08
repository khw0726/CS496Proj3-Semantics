<script>
  import { Line, mixins } from 'vue-chartjs'
  export default Line.extend({
    name: 'mychart',
    mixins: [mixins.reactiveProp],
    props: ['chartData', 'options'],
    mounted () {
      // console.log(this.chartData)
      this.renderChart(this.chartData, this.options)
    }
  })
  </script>
