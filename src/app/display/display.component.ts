import { Component, OnInit } from '@angular/core';

import { ReaderService } from '../reader/reader.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(private reader: ReaderService) { }

  ngOnInit() {
  }

}
