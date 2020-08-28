<template>
  <section v-if="activePost == null || activePost.id != postid" class="post" @click="changeActive(postid)">
    <h4>{{ title }}</h4>
    <p>{{ capitalizeFLetter(lessonStyle) }}</p>
    <Stars :level="level" :scale="22" style="float: right" />
  </section>
  <section v-else class="active-post">
    <h4>{{ title }}</h4>
    <p>{{ capitalizeFLetter(lessonStyle) }}</p>
    <Stars :level="level" :scale="22" style="float: right" />
  </section>
</template>

<script lang="ts">
import storeData from '~/store/storeData'
import { getModule } from 'vuex-module-decorators'
import Stars from '~/components/Stars.vue'
import { Component, Vue, Prop, namespace, Getter } from 'nuxt-property-decorator'
import { PostClass } from '~/shims/types'
const storeDataNamespace = namespace('storeData')
@Component({
  components: {
    Stars
  }
})
export default class Post extends Vue {
  storeDataModule = getModule(storeData, this.$store)
  @Prop() title!: string
  @Prop() lessonStyle!: string
  @Prop() level!: number
  @Prop() postid!: number

  @storeDataNamespace.Getter
  public activePost!: PostClass

  public capitalizeFLetter(str: string): string {
    if (str)
      return str[0].toUpperCase() + str.slice(1).toLowerCase();
    else
      return "None"
  }
  public changeActive(postid: number) {
    this.storeDataModule.updateActive(postid);
  }
  mounted() {
    console.log(this.title, this.lessonStyle, this.level, this.postid)
  }
}
</script>

<style lang="less">

  @import '~/assets/css/devices.less';

  .post {
    font-size: 11px;
    background-color: @dark-background;
    color: white;
    padding: 0;
    text-decoration: none;
    display: flow-root;
    height: 80px;
    border-bottom: solid @neon-blue 1px;
    padding-top: 3px;
  }

  .post:hover {
    cursor: pointer;
    background-color: #4d5261;
    animation-name: post-click;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }

  @keyframes post-click {
    from { background-color: @dark-background; padding: 3px 0 0 0; }
    to { background-color: #4d5261; padding: 3px 0 0 5px; }
  }

  .active-post {
    background-color: #4d5261;
    color: white;
    padding: 0;
    text-decoration: none;
    display: flow-root;
    height: 80px;
    border-bottom: solid @neon-blue 1px;
    animation-name: post-click;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }
  .post h4, p {
    margin: 0;
  }

  .active-post h4, p {
    margin: 0;
  }
</style>