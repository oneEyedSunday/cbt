import { Injectable } from '@angular/core';


@Injectable()
export class UtilsService {

  constructor() { }

  isLoaded(loading: boolean): boolean {
    return loading === false;
  }

  questionCount(array: any []): number {
    return array.length;
  }

  tabIs(currentTab: string, tab: string): boolean {
    // Check if current tab is tab name
    return currentTab === tab;
  }

}
