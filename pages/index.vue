<template>
  <div class="full-page">
    <div class="library-wrapper">
      <div class="library-banner">
        <h3>Bibliothèque</h3>
        <Search />
        <Filters />
      </div>
      <div class="vertical-list">
        <h1 v-if="results.length == 0" class="hint">No results</h1>
        <div v-for="lesson in results">
          <Post
            v-if="checkFilter(lesson)"
            :title="lesson.title"
            :lessonStyle="lesson.style"
            :level="lesson.level"
            :postid="lesson.id"
          />
        </div>
      </div>
      <Footer class="footer-positioning" />
    </div>
    <BaseHighlight v-if="activePost.title" :title="tradTitle(page)" :showLike="page == 'Details'">
      <Details v-if="page == 'Details'" />
      <Graph v-else-if="page == 'Graphics'" />
      <div v-else class="dummy-page">
        <h1>Development in progress</h1>
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          class="video-player"
        />
        </div>
    </BaseHighlight>
    <div v-else class="awaiting-selection">
      <div class="centered-items">
        <img src="https://drumstik.com/wp-content/themes/Drumstik_Theme/img/logo-text.png" alt="Drumstik" width="500px"/>
        <h1><i class="fa fa-arrow-left" /> Sélectionnez un cours sur le panneau de gauche</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Footer from '~/components/Footer.vue'
import Filters from '~/components/Filters.vue'
import Search from '~/components/Search.vue'
import Post from '~/components/Post.vue'
import BaseHighlight from '~/components/BaseHighlight.vue'
import Details from '~/components/Details.vue'
import Graph from '~/components/Graph.vue'
import ExtractWasm from '~/mixins/extractWasm'
import storeData from '~/store/storeData'
import { PostClass } from '~/shims/types'
import { Component, Vue, mixins, namespace } from 'nuxt-property-decorator'
import { getModule } from 'vuex-module-decorators'

const storeDataNamespace = namespace('storeData')
@Component({
  components: {
    Footer,
    Filters,
    Search,
    Post,
    BaseHighlight,
    Details,
    Graph
  }
})
export default class Index extends mixins(ExtractWasm) {
  storeModule = getModule(storeData, this.$store)
  Wasm: any;
  @storeDataNamespace.Getter
  public lessons!: PostClass[]
  @storeDataNamespace.Getter
  public results!: PostClass[]
  @storeDataNamespace.Getter
  public activePost!: PostClass
  @storeDataNamespace.Getter
  public page!: string
  @storeDataNamespace.Getter
  public filter!: string
  @storeDataNamespace.Mutation
  public initLikes!: () => void;

  public getPostById(searchedId: number) {
    for (const post in this.lessons)
      if (this.lessons[post].id == searchedId)
        return this.lessons[post]
    return null
  }
  public checkFilter(lesson: PostClass) {
    if (this.page == 'Graphics' && (!lesson.performances && !lesson.stopwatches))
      return false;
    if (this.filter == 'all')
      return true;
    if (this.filter == 'favorites' && lesson.liked == true)
      return true;
    if (this.filter == 'files')
      return true;
    return false;
  }
  public tradTitle(title: string) {
    switch (title) {
      case 'Details':
        return 'Détails';
      case 'Graphics':
        return 'Statistiques';
      default:
        return 'En développement';
    }
  }
  public mounted() {
    this.Wasm = this.extractModule();
    this.storeModule.initLikes();
  }
}
</script>
