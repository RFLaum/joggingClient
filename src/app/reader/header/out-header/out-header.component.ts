import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel, FormControl } from '@angular/forms';

import { ReaderService } from '../../reader.service';
import { PassMatchDirective } from '../../../users/pass-match.directive';
import { UtilityService } from '../../../utility.service';

@Component({
  selector: 'app-out-header',
  templateUrl: './out-header.component.html',
  styleUrls: ['./out-header.component.css']
})
export class OutHeaderComponent implements OnInit {
  showLoginForm: boolean;
  showRegisterForm: boolean;

  // @ViewChild("password_confirmation") pcfrm: NgModel;

  constructor(private reader: ReaderService, private util: UtilityService) { }

  // errIter(obj: any): Array<any>{
  //   if (obj === null){
  //     return null;
  //   }
  //   return Object.keys(obj);
  // }

  ngOnInit() {
    this.showLoginForm = false;
    this.showRegisterForm = false;
  }

  onLogClicked(){
    this.showRegisterForm = false;
    this.showLoginForm = !this.showLoginForm;
  }

  onRegClicked(){
    this.showLoginForm = false;
    this.showRegisterForm = !this.showRegisterForm;
  }

  // onLogSubmit(form: NgForm){
  //   console.log(form.value);
  // }
  // onRegSubmit(){}

  // isBad(ctrl: NgModel):boolean {
  //   return ctrl.invalid && ctrl.dirty;
  // }

}
