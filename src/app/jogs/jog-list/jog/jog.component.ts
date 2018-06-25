import { Component, OnInit, Input } from '@angular/core';

import { Jog } from '../../jog.model';

@Component({
  selector: 'app-jog',
  templateUrl: './jog.component.html',
  styleUrls: ['./jog.component.css']
})
export class JogComponent implements OnInit {
  @Input() jogData: Jog;

  constructor() { }

  ngOnInit() {
  }

}
