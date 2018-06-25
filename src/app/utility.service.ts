import { Injectable } from '@angular/core';
import { NgModel } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  getKeys(obj: any): Array<any>{return this.objWrap(obj, 'keys');}
  getVals(obj: any): Array<any>{return this.objWrap(obj,'values');}
  getPairs(obj: any): Array<any>{return this.objWrap(obj,'entries');}

  isBad(ctrl: NgModel):boolean {return ctrl.invalid && ctrl.dirty;}

  expandURL(path: string): string {
    return "http://localhost:3000/" + path;
  }

  numPages(entries: number, perPage: number){
    return Math.trunc(entries/perPage) + 1;
  }

  private

  objWrap(obj: Object, func: string): Array<any> {
    if (obj === null){
      return [];
    }
    return Object[func](obj);
  }
}
