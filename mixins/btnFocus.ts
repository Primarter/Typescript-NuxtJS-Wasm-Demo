import { Component, Vue } from 'nuxt-property-decorator'
import storeData from '~/store/storeData'
import { getModule } from 'vuex-module-decorators'

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
    return key in obj
}

@Component
export default class BtnFocus extends Vue {
    storeDataModule = getModule(storeData, this.$store);
    focusBtnClass: string[] = []
    public updateBtn(idx: number, newFocus: string, storeCommit: string, classString=" btn-focus") {
        for (let i = 0; i < this.focusBtnClass.length; i++) {
            if (i == idx) {
                this.$set(this.focusBtnClass, i, classString)
            } else {
                this.$set(this.focusBtnClass, i, "");
            }
        }
        if (newFocus != 'Same' && storeCommit && hasKey(this.storeDataModule, storeCommit)) {
            this.storeDataModule[storeCommit](newFocus);
        }
    }
}