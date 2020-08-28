<template>
  <div class="search-container">
    <div class="search-icon-wrapper">
      <i class="fa fa-search" />
    </div>
    <input
      ref="search-input"
      id="search-input"
      type="search"
      v-on:keyup="onKeyUp()"
      placeholder="Votre recherche"
    />
  </div>
</template>

<script lang="ts">
import storeData from '~/store/storeData'
import { getModule } from 'vuex-module-decorators'
import formatting from '~/mixins/formatting';
import { Component, Vue, Prop, namespace, Getter, mixins } from 'nuxt-property-decorator'
import { PostClass } from '~/shims/types'
const storeDataNamespace = namespace('storeData')

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
    return key in obj
}

@Component
export default class Post extends mixins(formatting) {
  storeDataModule = getModule(storeData, this.$store);
  @Prop() title!: string
  @Prop() lessonStyle!: string
  @Prop() level!: number
  @Prop() postid!: number

  @storeDataNamespace.Getter
  public lessons!: PostClass[]
  @storeDataNamespace.Getter
  public results!: PostClass[]
  @storeDataNamespace.Getter
  public search!: string

  public checkName (name: string, str: string) {
    const pattern = str
      .split('')
      .map((x) => {
        return `(?=.*${x})`
      })
      .join('')
    const regex = new RegExp(`${pattern}`, 'g')
    return name.match(regex)
  }
  public onKeyUp () {
    const str = (<HTMLInputElement>event!.target!).value.toLowerCase().substring(0, 3)
    const filteredArr = this.lessons.filter((x) => {
      if (hasKey(x, this.search)) {
        const xSub = x[this.search].toString().substring(0, 3).toLowerCase()
        return x[this.search].toString().toLowerCase().includes(str) || this.checkName(xSub, str)
      }
    })
    this.storeDataModule.updateResults(filteredArr)
  }
  public updateSearch(newSearch: string) {
    this.storeDataModule.updateSearch(newSearch);
  }
  public searchTrad() {
    switch (this.search) {
      case 'title':
        return 'Titres';
      case 'style':
        return 'Styles';
      case 'resume':
        return 'Résumé';
      case 'description':
        return 'Description';
      case 'skills':
        return 'Techniques';
      case 'duration':
        return 'Durée';
      default:
        break;
    }
  }
}
</script>

<style>
.search-container {
  float: left;
  padding: 2%;
  color: black;
  background-color: #ffffff;
}
.search-container input {
  display: flex;
  float: left;
  width: 60%;
  font-size: 18px;
  padding-left: 5px;
  margin-bottom: 0px;
  border: 0;
  box-shadow: none;
}
@media screen and (max-width: 1000px) {
  .search-container input {
    font-size: 16px;
  }
}
@media screen and (max-width: 800px) {
  .search-container input {
    font-size: 14px;
  }
}
.search-icon-wrapper { display: flex; float: left; width: 10% }
.search-icon-wrapper i { font-size: 1.5em; }

.search-dropdown { display: flex; float: right; width: 20%; }

.wordwrap {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}
</style>