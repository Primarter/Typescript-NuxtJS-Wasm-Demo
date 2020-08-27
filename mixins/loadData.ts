import { Component, Vue, namespace } from 'nuxt-property-decorator'
import { PostClass, PerformanceInterface, StopwatchInterface } from '@/shims/types'
const storeData = namespace('storeData')

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
    return key in obj
}

interface datasetsInterface {
    label: string,
    data: number[],
    borderColor: string[],
    backgroundColor: string[]
}

interface graphDataInterface {
    labels: string[],
    datasets: datasetsInterface[]
}

@Component
class LoadData extends Vue {
    @storeData.Getter
    public activePost!: PostClass
    @storeData.Getter
    public dataType!: string

    public extractData() {
        if (hasKey(this.activePost, this.dataType) && this.activePost[this.dataType] == undefined) {
          console.log(this.activePost[this.dataType] + " " + this.dataType);
          return null;
        }
        let graphData: graphDataInterface = {
          labels: [],
          datasets: [{
            label: '',
            data: [],
            borderColor: [
              'rgba(96, 223, 232, 1)',
            ],
            backgroundColor: [
              'rgba(96, 223, 232, 0.2)',
            ],
          }]
        };
        graphData.datasets[0].label = this.activePost.title;
        if (hasKey(this.activePost, this.dataType)) {
            let activePostData = this.activePost[this.dataType] as PerformanceInterface[] | StopwatchInterface[]
            activePostData.forEach((element: PerformanceInterface | StopwatchInterface) => {
              graphData.datasets[0].data.push(Math.round(element.percent));
              let date = new Date(element.updated_at);
              graphData.labels.push(date.getDate() + '/' + date.getMonth());
            });
        }
        return graphData;
      }
}
export default LoadData