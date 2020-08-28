<template>
  <div class="graph-component-wrapper">
    <h3>{{ activePost.title }}</h3>
    <section class="line-wrapper">
      <b class="under-title">{{ activePost.style.toUpperCase() }}</b>
      <Stars :level="activePost.level" :scale="30" style="margin: 0 10px 0 0;"/>
    </section>
    <section class="btn-wrapper">
      <div
        :class="'data-type-btn' + focusBtnClass[0]"
        @click="toggleDataType(); updateBtn(0, 'Same', null, ' data-type-btn-focus');"><h4>Performances</h4></div>
      <div
        :class="'data-type-btn' + focusBtnClass[1]"
        @click="toggleDataType(); updateBtn(1, 'Same', null, ' data-type-btn-focus');"><h4>Chronomètres</h4></div>
    </section>
    <div class="graph-wrapper">
      <line-chart />
    </div>
    <Medals :grade="grade" :maxPercent="percent" style="margin-top: 30px" />
  </div>
</template>

<script lang="ts">
import storeData from '~/store/storeData'
import { getModule } from 'vuex-module-decorators'
import BtnFocus from '~/mixins/btnFocus'
import LoadData from '~/mixins/loadData'
import Formatting from '~/mixins/formatting'
import { Component, Vue, Prop, namespace, Getter, mixins } from 'nuxt-property-decorator'
import { PostClass, PerformanceInterface, StopwatchInterface } from '~/shims/types'
const storeDataNamespace = namespace('storeData')

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
    return key in obj
}

@Component
export default class Graph extends mixins(BtnFocus, LoadData, Formatting) {
  storeDataModule = getModule(storeData, this.$store);
  public focusBtnClass: string[] = [' data-type-btn-focus', '']
  public grade: number = 0
  public percent: number = 0

  @storeDataNamespace.Getter
  public activePost!: PostClass
  @storeDataNamespace.Getter
  public dataType!: string

  public toggleDataType() {
    this.storeDataModule.toggleDataType();
  }
  public calculateMedals() {
    if (hasKey(this.activePost, this.dataType)) {
      let runs = this.activePost[this.dataType] as any[];
      runs.forEach((run: PerformanceInterface | StopwatchInterface) => {
        if (this.percent < run.percent) { this.percent = run.percent }
      });
    }
    this.grade = Math.round((this.percent * 3) / 100);
    return {
      grade: this.grade,
      percent: this.percent
    };
  }

  public mounted() {
    this.extractData();
    this.calculateMedals();
  }
}
</script>

<style lang="less">
  @import "@/assets/css/main.less";
  @import "@/assets/css/devices.less";

  .graph-component-wrapper {
    height: 100%;
    width: 100%;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: nowrap;

    h3 {
      margin: 0 0 5px 20px;
    }

    .line-wrapper {
      b {
        align-self: center
      }

      padding: 0 0 5px 20px;
      display: flex;
      width: 100%;
      justify-content: space-between;
    }

    .data-type-btn {
      align-items: center;
      justify-content: center;
      display: flex;
      margin: 10px;
      width: 200px;
      height: 50px;
      background-color: @light-background;
      border-radius: 4px;
      color: @neon-blue;
      border: 1px solid @neon-blue;
      box-sizing: border-box;

      :hover { cursor: pointer; }
      h4 { text-align: center; align-self: center;}
    }
    .data-type-btn-focus {
      border: none;
      color: white;
      background-color: #367b80;
    }
    .btn-wrapper {
      display: flex;
      flex-direction: row;

      /* .graph-btn-separation {
        .separation(3px, 75px, @neon-blue, @neon-blue, 0.5em);
        margin: 0 0.5em 0 0.5em;
      } */
    }
    .graph-wrapper {
      align-self: center;
      position: relative;
      width: 90%;
      justify-content: center;
    }
    .medal-wrapper {
      position: relative;

      svg {
        position: absolute;
      }
    }
  }
</style>