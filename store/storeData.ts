import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { PostClass } from '../shims/types'

function getPostIndById(posts: PostClass[], postId: number): number {
  for (let post in posts)
    if (posts[post].id == postId) {
      return parseInt(post)
    }
  return -1
}

@Module({
  name: 'storeData',
  stateFactory: true,
  namespaced: true
})
export default class storeData extends VuexModule {
  public _lessons: PostClass[] = require('../data.json');
  public _results: PostClass[] = require('../data.json');
  public _activePost = new PostClass;
  public _filter = 'all';
  public _search = 'title';
  public _heartClass = 'fa fa-heart fa-2x';
  public _page = 'Details';
  public _dataType = 'performances';

  get lessons(): PostClass[] {
    return this._lessons;
  }
  get results(): PostClass[] {
    return this._results;
  }
  get activePost(): PostClass {
    return this._activePost;
  }
  get filter(): string {
    return this._filter;
  }
  get search(): string {
    return this._search;
  }
  get heartClass(): string {
    return this._heartClass;
  }
  get Page(): string {
    return this._page;
  }
  get dataType(): string {
    return this._dataType;
  }

  @Mutation
  public initLikes() {
    this._lessons.forEach(lesson => {
      lesson.liked = false;
    });
  }
  @Mutation
  public updateFilter(newFilter: string): void {
    this._filter = newFilter;
  }
  @Mutation
  public updateResults(newResults: PostClass[]): void {
    this._results = newResults;
  }
  @Mutation
  public updateSearch(newSearch: string): void {
    this._search = newSearch;
  }
  @Mutation
  public updatePage(newPage: string): void {
    this._page = newPage;
  }
  @Mutation
  public updateActive(postId: number): void {
    if (postId == -1) {
      PostClass.resetPost(this._activePost);
      return;
    }
    this._activePost = this._lessons[getPostIndById(this._lessons, postId)];
    this._heartClass = this._activePost.liked == true ? 'fa fa-heart fa-2x' : 'fa fa-heart-o fa-2x'
  }
  @Mutation
  public addLike() {
    this._heartClass = 'fa fa-heart fa-2x';
    this._activePost.liked = true;
    this._lessons[getPostIndById(this._lessons, this._activePost.id)].liked = true;
  }
  @Mutation
  public removeLike() {
    this._heartClass = 'fa fa-heart-o fa-2x';
    this._activePost.liked = false;
    this._lessons[getPostIndById(this._lessons, this._activePost.id)].liked = false;
  }
  @Mutation
  public toggleDataType() {
    if (this._dataType == 'performances') {
      this._dataType = 'stopwatches';
    } else
      this._dataType = 'performances';
    console.log('Showing ' + this._dataType);
  }
}