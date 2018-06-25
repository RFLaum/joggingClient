import { Component, OnInit, ViewChild } from '@angular/core';

import { SelectedService } from '../../users/selected.service';
import { JogEditComponent } from '../jog-edit/jog-edit.component';
// import { Jog } from '../jog.model';

@Component({
  selector: 'app-new-jog',
  templateUrl: './new-jog.component.html',
  styleUrls: ['./new-jog.component.css']
})
export class NewJogComponent implements OnInit {
  private formShown: boolean
  @ViewChild(JogEditComponent) editComp: JogEditComponent;

  constructor(private sel: SelectedService) {
    this.formShown = false;
    this.sel.jogCreated.subscribe(() => this.formShown = false)
  }

  ngOnInit() {
  }

  toggleForm() {
    this.formShown = !this.formShown;
  }

  buttonText(): string {
    return this.formShown ? "Hide form" : "Create new jog";
  }

}
