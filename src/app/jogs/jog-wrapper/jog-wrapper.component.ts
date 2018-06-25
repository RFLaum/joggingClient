import { Component, OnInit, Input } from '@angular/core';

import { Jog } from '../jog.model';

@Component({
  selector: 'app-jog-wrapper',
  templateUrl: './jog-wrapper.component.html',
  styleUrls: ['./jog-wrapper.component.css']
})
export class JogWrapperComponent implements OnInit {
  @Input() jog: Jog;
  private editMode: boolean;

  constructor() { this.editMode = false; }

  ngOnInit() {
  }

  toggleEdit(){
    this.editMode = !this.editMode;
  }

}
