<template>
  <div class="details-content">
    <div class="video-positioning">
      <div class="video-wrapper">
        <iframe
          frameBorder="0"
          width="100%"
          height="100%"
          :src="activePost.videoUrl"
          allowfullscreen
        />
      </div>
    </div>
    <div>
      <Stars :level="activePost.level" :scale="30" style="float: right;"/>
      <h1>{{ activePost.title }}</h1>
      <b>{{ activePost.style.toUpperCase() }}</b>
      <p>
        <fa :icon="['far', 'fa-clock']"></fa><!--  <i class="fa fa-clock-o"></i> --> {{ formatTime(activePost.duration) + formatSkills(activePost.skills) }}
      </p>
    </div>
    <div>
      <p v-html="activePost.resume">{{ activePost.resume }}</p><br />
      <p v-html="activePost.description">{{ activePost.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, namespace, Getter, mixins } from 'nuxt-property-decorator'
import { PostClass } from '~/shims/types'
import Formatting from '~/mixins/formatting'
import Stars from '~/components/Stars.vue'
const storeData = namespace('storeData')

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
    return key in obj
}

@Component({
  components: {
    Stars
  }
})
export default class Comp extends mixins(Formatting) {
  @storeData.Getter
  public activePost!: PostClass;
  @storeData.Getter
  public lessons!: PostClass[];
  @storeData.Getter
  public results!: PostClass[];
  @storeData.Getter
  public heartClass!: string;

  public formatTime(mins: number): string {
    return formatTimeStr(mins);
  }
  public formatSkills(skills: string): string {
    return formatSkillStr(skills);
  }
  public likeItem() {
    if (this.activePost.liked) {
      this.$store.commit('removeLike');
    } else {
      this.$store.commit('addLike');
    }
  }
}
</script>

<style lang="less">

  @import '~/assets/css/devices.less';


  .details-content {
    position: relative;

    div { padding: 1%; }
    b { float: right; }
    p { font-size: 15px; }

    .video-positioning {
      width: 70% !important;
      max-width: 70% !important;
      margin-left: auto !important;
      margin-right: auto !important;

      .video-wrapper {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25% !important;

        iframe {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          border-top-width: 0px;
          border-right-width: 0px;
          border-bottom-width: 3px;
          border-left-width: 0px;
          border-style: inset;
          border-color: @neon-blue;
          border-image: initial;
        }
      }
    }
  }

  @media screen and (min-width: 850px) {
    .details-container .details-content Stars { float: right; }
  }

</style>