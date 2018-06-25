import { Component, OnInit, Input, ViewChild, EventEmitter,
         Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';

import { Jog, BareJog } from '../jog.model';
import { SelectedService } from '../../users/selected.service';

@Component({
  selector: 'app-jog-edit[jog]',
  templateUrl: './jog-edit.component.html',
  styleUrls: ['./jog-edit.component.css']
})
export class JogEditComponent implements OnInit {
  private newJog: boolean;
  private hasErrors: boolean = false;

  private jogData: BareJog;
  @Input("jog") set baseJog(jog: Jog){
    this.newJog = (jog === null);
    this.jogData = {
      id: this.newJog ? 0 : jog.id,
      date: this.newJog ? formatDate(new Date(), "y-MM-dd", "en-US") : jog.date,
      pretty_distance: "" + (this.newJog ? 0 : jog.distance) + " mi",
      pretty_time: this.newJog ? "00:00:00" : jog.pretty_time
    }
  }

  @Output() cancel = new EventEmitter();

  constructor(private sel: SelectedService) {}

  ngOnInit() {
  }

  onSubmit(){
    this.hasErrors = false;
    if (this.newJog) {
      this.sel.makeJog(this.jogData, (resp) => this.setErrors(resp));
    } else {
      this.sel.updateJog(this.jogData, (resp) => this.setErrors(resp));
    }
  }

  setErrors(resp: any){
    this.hasErrors = true;
    let errors = resp.error;
    let message: string = "";
    for(let prop in errors){
      message += prop + ":\n"
      for (let val of errors[prop]){
        message += "\t" + errors[prop] + "\n";
      }
    }
    window.alert(message);
  }

  onDelete(){
    if (!confirm("Are you sure you want to delete this record?")){
      return;
    }
    this.sel.deleteJog(this.jogData);
  }

  // cancelFunc(){
  //   console.log("in cancel");
  //   this.cancel.emit();
  // }

}
