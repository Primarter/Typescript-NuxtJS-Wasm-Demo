<script lang="ts">
import { Line } from 'vue-chartjs'
import LoadData from '~/mixins/loadData'
import { Component, Vue, Prop, namespace, Getter, mixins, Watch } from 'nuxt-property-decorator'
import { PostClass } from '~/shims/types'
import { ChartOptions } from 'chart.js'
const storeData = namespace('storeData')

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor).forEach(name => {
      if (name !== 'constructor') {
        derivedCtor.prototype[name] = baseCtor.__proto__[name];
      }
    });
  });
  return derivedCtor
}

@Component({
    extends: Line
})
class LineChart extends mixins(LoadData) implements Line {
  graphOptions = {
    // events: ['click'],
    // onClick:this.handle,
    tooltips: {
        mode: 'nearest'
    },
    elements: {
      point: {
        radius: 5,
        backgroundColor: "#ffffff",
        borderColor: "rgba(96, 223, 232, 1)"
      }
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                fontColor: "#fff",
                min: 0,
                max : 100,
                stepsize: 10,
            },
            gridLines: {
                display: true,
                color: "#cccccc44",
            }
        }],
        xAxes: [ {
            ticks: {
                fontColor: "#fff"
            },
            gridLines: {
                display: false
            }
        }]
    },
    legend: {
        display: false
    },
    responsive: true,
    maintainAspectRatio: false,
  }
  @storeData.Getter
  public activePost!: PostClass
  @storeData.Getter
  public dataType!: string

  addPlugin!: (plugin?: object) => void;
  renderChart!: (chartData: Chart.ChartData, options?: Chart.ChartOptions | undefined) => void;

  public mounted() {
    let graphData = this.extractData();
    if (graphData)
      this.renderChart(graphData, this.graphOptions as ChartOptions);
  }
  @Watch('dataType')
  public reloadChart() {
    let graphData = this.extractData();
    if (graphData)
      this.renderChart(graphData, this.graphOptions as ChartOptions);
  }
}
export default applyMixins(LineChart, [Line])
</script>