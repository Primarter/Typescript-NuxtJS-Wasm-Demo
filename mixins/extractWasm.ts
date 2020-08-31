declare var Module: any
import { Component, Vue } from 'nuxt-property-decorator'
@Component
class ExtractWasm extends Vue {
    public extractModule() {
        return {
            "say_hi": Module.cwrap('say_hi', null, [null]),
            "return_forty_two": Module.cwrap('return_forty_two', 'number', [null]),
            "createJson": Module.cwrap('createJson', null, [null]),
        }
    }
}
export default ExtractWasm