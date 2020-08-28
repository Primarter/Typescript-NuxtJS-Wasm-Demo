<script lang="ts">
import { Line } from 'vue-chartjs'
import LoadData from '~/mixins/loadData'
import { Component, Vue, Prop, namespace, Getter, mixins, Watch } from 'nuxt-property-decorator'
import { PostClass } from '~/shims/types'
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
  @storeData.Getter
  public graphOptions!: object
  @storeData.Getter
  public activePost!: PostClass
  @storeData.Getter
  public dataType!: string

  addPlugin!: (plugin?: object) => void;
  renderChart!: (chartData: Chart.ChartData, options?: Chart.ChartOptions | undefined) => void;

  public mounted() {
    let graphData = this.extractData();
    if (graphData)
      this.renderChart(graphData, this.graphOptions);
  }
  @Watch('dataType')
  public reloadChart() {
    let graphData = this.extractData();
    if (graphData)
      this.renderChart(graphData, this.graphOptions);
  }
}
export default applyMixins(LineChart, [Line])
</script>