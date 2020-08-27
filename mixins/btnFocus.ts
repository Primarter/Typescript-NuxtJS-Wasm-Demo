import { Component, Vue } from 'nuxt-property-decorator'
@Component
class BtnFocus extends Vue {
    focusBtnClass: string[] = []
    public updateBtn(idx: number, newFocus: string, storeCommit: string, classString=" btn-focus") {
        for (let i = 0; i < this.focusBtnClass.length; i++) {
            if (i == idx) {
                this.$set(this.focusBtnClass, i, classString)
            } else {
                this.$set(this.focusBtnClass, i, "");
            }
        }
        if (newFocus != 'Same' && storeCommit) {
            this.$store.commit(storeCommit, newFocus);
        }
    }
}
export default BtnFocus