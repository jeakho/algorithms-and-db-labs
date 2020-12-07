import { Injectable } from '@angular/core';
import { TreeRepConfig } from '../state/treeRepConfig'

@Injectable({
  providedIn: 'root'
})
export class TreeRepresentationApi {
  //private config: typeof TreeRepConfig

  constructor() {
    //this.config = TreeRepConfig;
  }

  getApi() {
    return TreeRepConfig;
  }

  setOnEmptyTreeMessage(value: string) {
    TreeRepConfig.onEmptyTreeMessage = value;
  }
}
